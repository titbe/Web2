import { Router } from "express";
import Card1Route from "./Card1Route.mjs";
import Card2Route from "./Card2Route.mjs";
import WheelRoute from "./WheelRoute.mjs";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import config from "../config/firebase.mjs";
import { initializeApp } from "firebase/app";
import multer from "multer";

const router = Router();

initializeApp(config.firebaseConfig);

const storage = getStorage();

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type, only JPEG, PNG, and GIF are allowed."),
        false
      );
    }
  },
});

router.post("/api/uploadImage", upload.single("filename"), async (req, res) => {
  try {
    console.log("File:", req.file);

    const dateTime = new Date().toISOString().replace(/[:.]/g, "-");

    const storageRef = ref(
      storage,
      `files/${req.file.originalname}-${dateTime}`
    );
    const metadata = {
      contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    const downloadURL = await getDownloadURL(snapshot.ref);

    return res.send({
      message: "file uploaded to firebase storage",
      name: req.file.originalname,
      type: req.file.mimetype,
      downloadURL: downloadURL,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.use(Card1Route);
router.use(Card2Route);
router.use(WheelRoute)

export default router;
