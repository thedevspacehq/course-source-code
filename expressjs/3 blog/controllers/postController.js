import Post from "../models/post.js";

const postController = {
  list: async function (req, res) {
    Post.getAll((err, posts) => {
      res.render("index", {
        posts,
      });
    });
  },

  show: async function (req, res) {
    const id = req.params.id;
    Post.getById(id, (err, post) => {
      res.render("post/show", {
        post,
      });
    });
  },

  new: async function (req, res) {
    res.render("post/new");
  },

  create: async function (req, res) {
    const { title, content } = req.body;
    const picture = req.file;

    Post.create(title, content, picture, (err, postID) => {
      res.redirect(`/posts/${postID}`);
    });
  },

  edit: async function (req, res) {
    const id = req.params.id;
    Post.getById(id, (err, post) => {
      res.render("post/edit", {
        post,
      });
    });
  },

  update: async function (req, res) {
    const { title, content } = req.body;
    const picture = req.file;

    Post.update(req.params.id, title, content, picture, (err, postID) => {
      res.redirect(`/posts/${postID}`);
    });
  },

  delete: async function (req, res) {
    Post.delete(req.params.id, (err) => {
      res.redirect("/");
    });
  },
};

export default postController;
