import { Router } from "express";
import userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.route("/").get(userController.list);

userRouter.route("/new").get(userController.new).post(userController.create);

userRouter
  .route("/signin")
  .get(userController.signin_form)
  .post(userController.signin);

userRouter.route("/signin/success").get(userController.success);

userRouter.route("/signin/failure").get(userController.failure);

userRouter
  .route("/edit/:id")
  .get(userController.edit)
  .put(userController.update)
  .delete(userController.delete);

userRouter.route("/:id").get(userController.show);

export default userRouter;
