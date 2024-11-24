const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// בדיקת טעינת משתנים
console.log("DATABASE_URL:", process.env.DATABASE_URL);

// חיבור ל-MongoDB
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

// הגדרת Body Parser
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use(bodyParser.json());

// הגדרת מסלולים
const posts_Routes = require("./routes/posts_routes");
app.use("/posts", posts_Routes);

const Posts = require("./models/posts_model");
// Posts.create({
//     title: "First Post",
//     content: "This is my first post",
//     owner: "Yossi",
// });

// הפעלת השרת
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



