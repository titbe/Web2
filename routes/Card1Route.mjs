import { Router } from "express";
import {
  createCard1,
  deleteCard1,
  getCard1,
  updateCard1,
} from "../controller/Card1Controller.mjs";

const router = Router();

router.get("/card1", getCard1);
router.post("/card1/create",createCard1);
router.put("/card1/update/:id", updateCard1);
router.delete("/card1/delete/:id", deleteCard1);



export default router;
