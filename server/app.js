const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");

const app = express();

mongoose.connect(
    process.env.MONGO_URI ||
    "mongodb://127.0.0.1:27017/lostfound"
)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL
    ],
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    methodOverride("_method")
);

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);

app.use("/api", authRoutes);
app.use("/api", itemRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Lost & Found API Running"
  });
});

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `Server Running on Port ${PORT}`
    );
});