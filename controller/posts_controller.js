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
      const postId = req.params.id;
  
      // בדיקת תקינות של ObjectId
      if (!mongoose.Types.ObjectId.isValid(postId)) {
          return res.status(400).send({ message: "Invalid Post ID" });
      }
  
      try {
          // מחיקת הפוסט על פי מזהה
          const deletedPost = await PostModel.findByIdAndDelete(postId);
  
          if (deletedPost) {
              res.status(200).send({ message: "Post deleted successfully", post: deletedPost });
          } else {
              res.status(404).send({ message: "Post not found" });
          }
      } catch (error) {
          console.error("Error deleting post:", error);  // הדפסת שגיאה לקונסול
          res.status(500).send({ message: "Error deleting post", error: error.message });
      }
  };
  
  const getPostById = async (req, res) => {
    const postId = req.params.id;

    // בדיקת תקינות של ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).send({ message: "Invalid Post ID" });
    }

    try {
        const post = await PostModel.findById(postId);

        if (post) {
            res.status(200).send(post);
        } else {
            res.status(404).send({ message: "Post not found" });
        }
    } catch (error) {
        console.error("Error fetching post:", error); 
        res.status(500).send({ message: "Error fetching post", error: error.message });
    }
};


module.exports = {
    getAllPosts,
    createPost,
    deletePost,
    getPostById
};

