import prisma from "../libs/prisma.js";

const tagController = {
  list: async function (req, res) {
    const tags = await prisma.tag.findMany();

    res.render("tag/list", {
      tags,
    });
  },

  show: async function (req, res) {
    const tag = await prisma.tag.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    res.render("tag/show", {
      tag,
    });
  },

  new: async function (req, res) {
    res.render("tag/new");
  },

  create: async function (req, res) {
    const { name } = req.body;

    const tag = await prisma.tag.create({
      data: {
        name: name,
      },
    });

    res.redirect(`/tags/${tag.id}`);
  },

  edit: async function (req, res) {
    const tag = await prisma.tag.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    res.render("tag/edit", {
      tag,
    });
  },

  update: async function (req, res) {
    const { name } = req.body;

    const tag = await prisma.tag.update({
      data: {
        name: name,
      },
    });

    res.redirect(`/tags/${tag.id}`);
  },

  delete: async function (req, res) {
    const tag = await prisma.tag.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.redirect("/");
  },
};

export default tagController;
