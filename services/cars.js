const AWS = require("aws-sdk");
const cars = require("../models/cars");

const s3 = new AWS.S3({
  region: process.env.REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

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

exports.uploadImageToS3 = async (req, res) => {
  // Check if the file exists in the request
  const { file } = req;
  console.log({ file });

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { originalname, buffer } = file; // Destructure the file object
  const bucketName = process.env.BUCKET_NAME || "challenge-task";
  const folderPath = `cars/images`;

  const uploadParams = {
    Bucket: bucketName, // S3 bucket name
    Key: `${folderPath}/${req.user.userId}/${Date.now()}_${originalname}`, // Unique path for the file
    Body: buffer, // File buffer
    ACL: "public-read", // Make the file publicly accessible
  };

  try {
    // Upload file to S3
    const uploadResult = await s3.upload(uploadParams).promise();

    const url = uploadResult.Location;

    // Log success
    console.log("File uploaded successfully:", url);

    res.status(200).json({
      message: "File uploaded successfully",
      url,
    });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    res.status(500).json({
      message: "Failed to upload file to S3",
      error: error.message,
    });
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