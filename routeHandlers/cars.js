const cars = require("../models/cars");

exports.create = async (req, res) => {
  try {
    const { carModel, price, phoneNumber, city, maxPictures, pictureUrls } =
      req.body;
    // Create a new Cars document
    const newCar = new cars({
      carModel,
      price,
      phoneNumber,
      city,
      maxPictures,
      pictures: pictureUrls, // URLs from uploaded pictures
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
