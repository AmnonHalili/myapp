const getAllposts = (req, res) => {
    res.send('get all posts');
};
const createPost = (req, res) => {
    res.send("create a post");
};

const deletePost = (req, res) => {
    res.send("delete a post");
};

module.exports = {
    getAllposts,
    createPost,
    deletePost
};