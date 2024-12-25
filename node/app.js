require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');
const connectDB = require('./configs/db');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// Connect to MongoDB
connectDB();

// Serve static files from the "public" directory
app.use(express.static('public'));

// Use task routes
app.use('/tasks', require('./routes/task'));

app.listen(port, () => {
  logger.info(`Task manager app listening at http://localhost:${port}`);
});