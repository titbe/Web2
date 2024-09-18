import { Router } from "express";

import {
  createCard2,
  deleteCard2,
  getCard2,
  updateCard2,
} from "../controller/Card2Controller.mjs";

const router = Router();

router.get("/card2", getCard2);
router.post("/card2/create", createCard2);
router.put("/card2/update/:id", updateCard2);
router.delete("/card2/delete/:id", deleteCard2);

export default router;
