import prisma from "../libs/prisma.js";

const postController = {
  list: async function (req, res) {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });

    res.render("index", {
      posts,
    });
  },

  show: async function (req, res) {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        author: true,
        tags: true,
      },
    });

    res.render("post/show", {
      post,
    });
  },

  new: async function (req, res) {
    const authors = await prisma.user.findMany();
    const tags = await prisma.tag.findMany();

    res.render("post/new", {
      authors,
      tags,
    });
  },

  create: async function (req, res) {
    const { title, content, author, tags } = req.body;
    const image = req.file;

    const newTags = tags.split(",").map((element) => {
      return { id: Number(element) };
    });

    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        image: image.path,
        author: {
          connect: {
            id: Number(author),
          },
        },
        tags: {
          connect: newTags,
        },
      },
    });

    res.redirect(`/posts/${post.id}`);
  },

  edit: async function (req, res) {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        author: true,
      },
    });

    const authors = await prisma.user.findMany();
    const tags = await prisma.tag.findMany();

    res.render("post/edit", {
      post,
      authors,
      tags,
    });
  },

  update: async function (req, res) {
    const { title, content, author, tags } = req.body;
    const image = req.file;

    const newTags = tags.split(",").map((element) => {
      return { id: Number(element) };
    });

    if (image) {
      const post = await prisma.post.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          title: title,
          content: content,
          image: image.path,
          author: {
            connect: {
              id: Number(author),
            },
          },
          tags: {
            connect: newTags,
          },
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
          author: {
            connect: {
              id: Number(author),
            },
          },
          tags: {
            connect: newTags,
          },
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
