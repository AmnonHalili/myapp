const PostModel = require("../models/posts_model");
const mongoose = require("mongoose");
const getAllPosts = async(req, res) => {
  const filter = req.query;
  console.log(filter);
  try {
    if(filter.owner){
      const posts = await PostModel.find({owner: filter.owner});
      return res.send(posts);
    }else{
    const posts = await PostModel.find();
    return res.send(posts);
    }
  }catch (error) {
    returnres.status(400).send(error.message);
  }
};

const createPost = async (req, res) => {
    console.log(req.body);
    try {
      const post = await PostModel.create(req.body);
      res.status(201).send(post);//created post
    } catch (error) {
      res.status(400).send(error.message);//error message

      }
    };


    const deletePost = async (req, res) => {
      const postId = req.params.id; // מקבל את מזהה הפוסט מהפרמטרים של הבקשה
  
      try {
          // מחפש ומוחק את הפוסט על פי מזהה
          const deletedPost = await PostModel.findByIdAndDelete(postId);
  
          if (deletedPost) {
              res.status(200).send({ message: "Post deleted successfully", post: deletedPost });
          } else {
              res.status(404).send({ message: "Post not found" });
          }
      } catch (error) {
          // מחזיר שגיאה אם התהליך נכשל
          res.status(400).send({ error: error.message });
      }
  };
  
  const getPostById = async (req, res) => {
    const postId = req.params.id; // מזהה הפוסט מתוך הפרמטרים של הבקשה

    try {
        // חיפוש הפוסט לפי מזהה
        const post = await PostModel.findById(mongoose.Types.ObjectId(postId));
        if (post) {
            // אם נמצא, מחזירים אותו
            res.status(200).send(post);
        } else {
            // אם לא נמצא, מחזירים הודעת 404
            res.status(404).send({ message: "Post not found" });
        }
    } catch (error) {
        // במקרה של שגיאה, מחזירים הודעת 400 עם פרטי השגיאה
        res.status(400).send({ error: error.message });
    }
    return res.send(400).send(error.message);
};

module.exports = {
    getAllPosts,
    createPost,
    deletePost,
    getPostById
};

