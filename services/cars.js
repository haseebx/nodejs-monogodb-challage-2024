const cars = require("../models/cars");

exports.create = async (req, res) => {
  try {
    const { carModel, price, phoneNumber, city, maxPictures, pictureUrls } =
      req.body;
    const newCar = new cars({
      carModel,
      price,
      phoneNumber,
      city,
      maxPictures,
      pictures: pictureUrls,
      userId: req.user.userId,
    });

    const savedCar = await newCar.save();

    res.status(201).json({
      message: "Car details saved successfully!",
      data: savedCar,
    });
  } catch (error) {
    console.error("Error while saving car details:", error);
    res.status(500).json({
      message: "An error occurred while saving the car details.",
      error: error.message,
    });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    if (!file) {
      throw new Error("File is missing");
    }
    const filePath = `/uploads/${file.originalname}`;
    await fs.promises.writeFile(`./public${filePath}`, file.buffer);
    return {
      data: filePath,
    };
  } catch (error) {
    console.error(error.message);
  }
};

exports.getAll = async (req, res) => {
    try {
      // Fetch all car details from the database
      const carsList = await cars.find();
  
      if (!carsList || carsList.length === 0) {
        return res.status(404).json({ message: "No cars found." });
      }
      res.status(200).json({
        message: "Cars retrieved successfully!",
        data: carsList,  // Or `carsList` if not using populate
      });
  
    } catch (error) {
      console.error("Error while retrieving car details:", error);
      res.status(500).json({
        message: "An error occurred while retrieving the car details.",
        error: error.message,
      });
    }
  };