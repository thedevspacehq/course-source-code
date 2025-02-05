import prisma from "../libs/prisma.js";

const postController = {
  // The create action
  create: async function (req, res) {
    const { title, content } = req.body;
    try {
      const post = await prisma.post.create({
        data: {
          title: title,
          content: content,
        },
      });

      res.status(201).json({
        message: "Post created.",
        post: {
          id: post.id,
          title: post.title,
          content: post.content,
        },
      });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong." });
    }
  },

  // The retrieve action
  retrieve: async function (req, res) {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      res.status(200).json({
        post: {
          id: post.id,
          title: post.title,
          content: post.content,
        },
      });
    } catch (e) {
      res.status(404).json({ message: "Cannot find the requested post." });
    }
  },

  // The update action
  update: async function (req, res) {
    const { title, content } = req.body;
    try {
      const post = await prisma.post.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          title: title,
          content: content,
        },
      });
      res.status(200).json({
        message: "Post updated.",
        post: {
          id: post.id,
          title: post.title,
          content: post.content,
        },
      });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong." });
    }
  },

  // The delete action
  delete: async function (req, res) {
    try {
      const post = await prisma.post.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.status(200).json({ message: "Post deleted." });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong." });
    }
  },

  // List all articles
  list: async function (req, res) {
    try {
      const posts = await prisma.post.findMany();
      res.status(200).json({
        posts: posts,
      });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong." });
    }
  },
};

export default postController;
