const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConfig");
require("dotenv").config();

const mainRoute = require("./routes/main.route");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/", mainRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
