const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConfig');
require('dotenv').config();

const categoryRoutes = require('./routes/categoryRoutes.js');
const serviceRoutes = require('./routes/serviceRoutes.js');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/categories', categoryRoutes);
app.use('/api/services', serviceRoutes);

app.get('/', (req, res) => {
  res.send('UttamSeva Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
