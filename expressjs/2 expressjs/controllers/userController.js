import User from "../models/user.js";

const userController = {
  getUserById: async function (req, res) {
    const id = req.params.id;
    User.getById(id, (err, user) => {
      res.render("user", {
        user,
      });
    });
  },
  getAllUsers: async function (req, res) {},
  createNewUser: async function (req, res) {
    const { username, email } = req.body;
    const file = req.file;

    User.create(username, email, file.path, (err, userID) => {
      res.redirect(303, `/users/${userID}`);
    });
  },
  updateUser: async function (req, res) {
    const { username, email } = req.body;

    User.update(req.params.id, username, email, (err, userID) => {
      res.redirect(303, `/users/${userID}`);
    });
  },
  deleteUser: async function (req, res) {
    console.log(req.params);
    User.delete(req.params.id, (err) => {
      res.redirect(303, `/`);
    });
  },
};

export default userController;
