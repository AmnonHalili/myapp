process.env.ENVIRONMENT = "testing";

const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const postModel = require("../models/posts_model");

let server;

beforeAll(async () => {
    console.log("beforeAll");
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.TEST_DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    }
    await postModel.deleteMany();

    // הפעלת השרת רק לצורך הבדיקות
    server = app.listen(process.env.TEST_PORT || 4000);
});

const getPostById = async (req, res) => {
    const postId = req.params.id; // מזהה הפוסט מתוך הפרמטרים של הבקשה

    // בדיקת תקינות של ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).send({ message: "Invalid Post ID" });
    }

    try {
        // חיפוש הפוסט לפי מזהה
        const post = await PostModel.findById(postId);
        if (post) {
            // אם נמצא, מחזירים אותו
            res.status(200).send(post);
        } else {
            // אם לא נמצא, מחזירים הודעת 404
            res.status(404).send({ message: "Post not found" });
        }
    } catch (error) {
        // במקרה של שגיאה, מחזירים הודעת 500 עם פרטי השגיאה
        console.error("Error fetching post:", error);
        res.status(500).send({ message: "Error fetching post", error: error.message });
    }
};


afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
    
    // סגירת השרת כדי למנוע שגיאת Open Handle
    if (server) {
        server.close();
    }
});


afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});

var postId = "";
const testPost = {
    title: "First Post",
    content: "This is my first post",
    owner: "Amnon",
};

describe("Posts Test", () => {
    test("Test 1", async () => {
        const response = await request(app).get("/posts");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(0);
    });

    test("Test adding new post", async () => {
        const response = await request(app).post("/posts").send(testPost);
        expect(response.status).toBe(201);
        expect(response.body.title).toBe(testPost.title);
        expect(response.body.content).toBe(testPost.content);
        expect(response.body.owner).toBe(testPost.owner);
        postId = response.body._id;
    });

    test("Test get post by owner", async () => {
        const response = await request(app).get(`/posts?owner=${testPost.owner}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].owner).toBe(testPost.owner);
    });
    test("Test Delete post", async () => {
        const response = await request(app).delete("/posts/" + postId);
        expect(response.status).toBe(200);

        const responseGet = await request(app).get("/posts/" + postId);
        expect(responseGet.statusCode).toBe(404);
    });

    test("Create new post fail", async () => {
        const response = await request(app).post("/posts").send({
            title:"Test Post 1",
            content:"Test Content 1",
        });
        expect(response.status).toBe(400);
    });
});
