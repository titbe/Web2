import mongoose from "mongoose";

const Card1Schema = new mongoose.Schema({
  card1_id: { type: mongoose.Schema.Types.ObjectId },
  img_url: { type: String },
  title: { type: String },
  type: {
    type: String,
    enum: {
      values: ["water", "fire", "wind"],
      message:
        "{VALUE} is not a valid card type. Choose either 'water', 'fire', or 'wind'.",
    },
  },
});
const Card1 = mongoose.model("Card1", Card1Schema);
export default Card1;
