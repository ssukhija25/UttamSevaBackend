const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConfig");
require("dotenv").config();
const otpRoutes = require('./routes/otpRoutes');
const mainRoute = require("./routes/main.route");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/mainpage", mainRoute);
app.use('/api/otp', otpRoutes);
app.use('/',(req,res)=>{  res.status(200).json({ success: true, message: "API endpoint not found" });
})

app.use((req, res) => {
  res.status(404).json({ success: false, message: "API endpoint not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
