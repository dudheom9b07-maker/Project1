require('dotenv').config();
const express = require('express');
const cors = require("cors")
const connectDB = require("./config/db");
const app = express();
app.use(cors());
app.use(express.json());
// Connect to MongoDB
connectDB();
// Define routes
app.use("/api/auth", require("./routes/authRoutes"));
app.get("/", (req, res) => {
    res.send("Backend is running");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/uploads', express.static('uploads'));