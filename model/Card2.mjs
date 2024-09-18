import mongoose from "mongoose";

const Card2Schema = new mongoose.Schema({
  card2_id: { type: mongoose.Schema.Types.ObjectId },
  img_url: { type: String },
  title: { type: String, required: true },
});
const Card2 = mongoose.model("Card2", Card2Schema);
export default Card2;
