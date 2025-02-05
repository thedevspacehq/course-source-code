import { Router } from "express";
import tagController from "../controllers/tagController.js";

const tagRouter = Router();

tagRouter.route("/").get(tagController.list);

tagRouter.route("/new").get(tagController.new).post(tagController.create);

tagRouter
  .route("/edit/:id")
  .get(tagController.edit)
  .put(tagController.update)
  .delete(tagController.delete);

tagRouter.route("/:id").get(tagController.show);

export default tagRouter;
