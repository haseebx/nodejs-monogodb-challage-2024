require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const http = require('http');
const fs = require('fs');
const multer = require('multer');  
const cors = require('./middleware/cors');
const config = require('./config/config');
const mongoose = require('mongoose');
const path = require('path');
const api = require('./routes/api');

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(cookieParser());

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Route for file upload
// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'File is missing..' });
//   }

//   const filePath = `/uploads/${req.file.originalname}`;
//   fs.writeFileSync(`./public${filePath}`, req.file.buffer);

//   return res.status(201).json({ message: 'File uploaded successfully', filePath });
// });

// Set up API routes
app.use('/api', api);
app.get('/', (req, res) => res.send('API is running'));

// Set Port and start server
const port = process.env.PORT || '4000';
app.set('port', port);

const server = http.createServer(app);

mongoose
  .connect(config.getMongoDBURL(), {
    useNewUrlParser: true,
  })
  .then(() => {
    server.listen(port, () => console.log(`http://localhost:${port}/api`));
  });
