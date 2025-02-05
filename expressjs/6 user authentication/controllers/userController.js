import prisma from "../libs/prisma.js";

const userController = {
  list: async function (req, res) {
    const users = await prisma.user.findMany();

    res.render("user/list", {
      users,
    });
  },

  show: async function (req, res) {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        posts: true,
      },
    });

    res.render("user/show", {
      user,
    });
  },

  new: async function (req, res) {
    res.render("user/new");
  },

  create: async function (req, res) {
    const { name, email, password } = req.body;

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    res.redirect(`/users/${user.id}`);
  },

  signin_form: async function (req, res) {
    res.render("user/signin/show");
  },

  signin: async function (req, res) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: String(email),
      },
    });

    if (user.password === password) {
      res
        .cookie("authenticated", true, {
          expires: new Date(Date.now() + 12 * 30 * 24 * 3600), // cookie will be removed after 1 year
        })
        .redirect("/users/signin/success");
    } else {
      res.redirect("/users/signin/failure");
    }
  },

  success: async function (req, res) {
    res.render("user/signin/success");
  },

  failure: async function (req, res) {
    res.render("user/signin/failure");
  },

  edit: async function (req, res) {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    res.render("user/edit", {
      user,
    });
  },

  update: async function (req, res) {
    const { name, email } = req.body;

    const user = await prisma.user.update({
      data: {
        name: name,
        email: email,
      },
    });

    res.redirect(`/users/${user.id}`);
  },

  delete: async function (req, res) {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.redirect("/");
  },
};

export default userController;
