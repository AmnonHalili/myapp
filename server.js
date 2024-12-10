const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const port = process.env.PORT;

const app = express();

// בדיקת טעינת משתנים
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("PORT:", port);

// חיבור ל-MongoDB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("MongoDB connection error:", error));

// הגדרת Body Parser
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use(bodyParser.json());

// הגדרת מסלולים
const posts_Routes = require("./routes/posts_routes");
app.use("/posts", posts_Routes);

const Posts = require("./models/posts_model");

// מסלול ראשי
app.get("/", (req, res) => {
    res.send("About page");
});

// האזנה לשרת
if (process.env.ENVIRONMENT !== "testing") {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app;
