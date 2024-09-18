import Card2 from "../model/Card2.mjs";

export const getCard2 = async (req, res) => {
  try {
    const cards = await Card2.find();

    res.status(200).json({ cards });
  } catch (error) {
    console.error("Error get :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createCard2 = async (req, res) => {
  const { img_url, title } = req.body;

  try {
    const newCard = new Card2({
      img_url,
      title,
    });
    await newCard.save();

    res.status(201).json({ message: "Created successfully", newCard });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Nếu lỗi là từ validation của Mongoose
      return res.status(400).json({ message: error.message });
    }
    console.error("Error create :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCard2 = async (req, res) => {
  const { id } = req.params;
  const { img_url, title } = req.body;

  try {
    const cardUpdate = await Card2.findByIdAndUpdate(
      id,
      {
        img_url,
        title,
      },
      { new: true }
    );
    if (!cardUpdate) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json({ message: "Updated successfully", cardUpdate });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Nếu lỗi là từ validation của Mongoose
      return res.status(400).json({ message: error.message });
    }
    console.error("Error update :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCard2 = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteCard = await Card2.findByIdAndDelete(id);
    if (!deleteCard) {
      res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json({ message: "Deleted successfully", deleteCard });
  } catch (error) {
    console.error("Error delete :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
