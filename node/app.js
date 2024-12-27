require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const app = express();
const modb = process.env.MONGODB_URI || 'NONE';
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// Conditionally connect to the appropriate database
if (process.env.NODE_ENV === 'test') {
  // Using the mock database for tests or if no external database is provided
  const { connectMockDB } = require('./configs/db-mock');
  connectMockDB();
} else {
  // Using the actual database for non-test environments
  const { connectDB } = require('./configs/db');
  connectDB();
}

// Serve static files from the "public" directory
app.use(express.static('public'));

// Use task routes
app.use('/tasks', require('./routes/task'));

if (process.env.NODE_ENV !== 'test') {
  if (modb === 'NONE') {
    logger.error('This app requires a valid URI for the MongoDB database. Please provide a valid URI.');
    process.exit(1);
} else {
    app.listen(port, () => {
      logger.info(`Task manager app listening at http://localhost:${port}`);
    });
  }
}
module.exports = app;