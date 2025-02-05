import express from "express";
import postRouter from "./routes/post.js";
import postController from "./controllers/postController.js";

const app = express();
const port = 3001;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/uploads", express.static("uploads"));
app.use("/statics", express.static("statics"));

app.get("/", postController.list);
app.use("/posts", postRouter);

app.listen(port, () => {
  console.log(
    `Blog application listening on port ${port}. Visit http://localhost:${port}.`
  );
});
