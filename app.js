const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
// User routes
app.use('/api/users', userRoutes);

module.exports = app;
