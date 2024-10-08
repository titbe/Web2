import mongoose from "mongoose";

const WheelSchema = new mongoose.Schema({
  wheel_id: { type: mongoose.Schema.Types.ObjectId, unique: true },
  percent: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});
const Wheel = mongoose.model("Wheel", WheelSchema);
export default Wheel;
