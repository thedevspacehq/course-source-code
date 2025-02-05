import { Router } from "express";
import postController from "../controllers/postController.js";
import isAuthenticated from "../middlewares/auth.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const postRouter = Router();

postRouter
  .route("/new")
  .get(isAuthenticated, postController.new) // <== Only authenticated users can add new post
  .post(upload.single("image"), postController.create);

postRouter
  .route("/edit/:id")
  .get(postController.edit)
  .put(upload.single("image"), postController.update)
  .delete(postController.delete);

postRouter.route("/:id").get(postController.show);

export default postRouter;
