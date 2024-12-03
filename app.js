require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

// Custom Middleware Imports
const cors = require('./middleware/cors');
const app = express();
const config = require('./config/config');
const mongoose = require('mongoose');

// API location
const api = require('./routes/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors);

app.use('/api', api);
app.get('/', (req, res) => res.send('API is running'));

//Set Port
const port = process.env.PORT || '4000';
app.set('port', port);

const server = http.createServer(app);

mongoose
  .connect(config.getMongoDBURL(), {
    useNewUrlParser: true,
  })
  .then(() => {
    server.listen(port, () => console.log(`http://localhost:${port}`)
    );
  });

