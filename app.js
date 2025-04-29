const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');
const connectDB = require('./config/dbConfig.js'); // 
require('dotenv').config();
const app = express();

connectDB();


app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/users', userRoutes);

module.exports = app;

// Start the server
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
