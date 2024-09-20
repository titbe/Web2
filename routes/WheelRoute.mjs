import { Router } from "express";
import Wheel from "../model/WheelRandom.mjs";
import Card1 from "../model/Card1.mjs";

const router = Router();

router.post("/spin/:card1_id", async (req, res) => {
  const { card1_id } = req.params;
  try {
    // Lấy tất cả các vòng quay từ cơ sở dữ liệu
    const wheels = await Wheel.find();

    if (!wheels.length) {
      return res
        .status(404)
        .json({ message: "Không có vòng quay nào trong hệ thống" });
    }

    // Tạo danh sách xác suất dựa trên phần trăm
    const prizePool = [];
    wheels.forEach((wheel) => {
      // Mỗi phần thưởng sẽ được đẩy vào mảng prizePool với số lượng tương ứng với xác suất của nó
      for (let i = 0; i < wheel.percent; i++) {
        prizePool.push(wheel);
      }
    });

    // Random từ mảng prizePool (mảng đã được xây dựng theo tỷ lệ phần trăm)
    const randomIndex = Math.floor(Math.random() * prizePool.length);
    const selectedWheel = prizePool[randomIndex];

    const card = await Card1.findByIdAndUpdate(card1_id, {
      wheel: selectedWheel._id,
    });

    // Trả về kết quả quay vòng quay cùng với thông tin Card1
    res
      .status(200)
      .json({ message: "Quay vòng thành công!", prize: selectedWheel, card });
  } catch (error) {
    console.error("Error spinning the wheel:", error);
    res.status(500).json({ message: "Lỗi khi quay vòng quay", error });
  }
});

router.post("/createSpin", async (req, res) => {
  const { id, percent } = req.body;

  try {
    const newWheel = new Wheel({
      wheel_id: id,
      percent,
    });
    await newWheel.save();

    res.status(201).json({ message: "Created successfully", newWheel });
  } catch (error) {
    console.error("Error create :", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
