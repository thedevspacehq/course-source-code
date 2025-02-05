import prisma from "../libs/prisma.js";

const postController = {
  list: async function (req, res) {
    const posts = await prisma.post.findMany();

    res.render("index", {
      posts,
    });
  },

  show: async function (req, res) {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    res.render("post/show", {
      post,
    });
  },

  new: async function (req, res) {
    res.render("post/new");
  },

  create: async function (req, res) {
    const { title, content } = req.body;
    const image = req.file;

    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        image: image.path,
      },
    });

    res.redirect(`/posts/${post.id}`);
  },

  edit: async function (req, res) {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    res.render("post/edit", {
      post,
    });
  },

  update: async function (req, res) {
    const { title, content } = req.body;
    const image = req.file;

    if (image) {
      const post = await prisma.post.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          title: title,
          content: content,
          image: image.path,
        },
      });
      res.redirect(`/posts/${post.id}`);
    } else {
      const post = await prisma.post.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          title: title,
          content: content,
        },
      });
      res.redirect(`/posts/${post.id}`);
    }
  },

  delete: async function (req, res) {
    const post = await prisma.post.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.redirect("/");
  },
};

export default postController;
