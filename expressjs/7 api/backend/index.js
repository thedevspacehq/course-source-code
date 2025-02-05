import express from "express";
import postController from "../backend/controllers/postController.js";

import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/posts", postController.list);
app.post("/posts", postController.create);
app.get("/posts/:id", postController.retrieve);
app.put("/posts/:id", postController.update);
app.delete("/posts/:id", postController.delete);

app.listen(port, () => {
  console.log(
    `Blog application listening on port ${port}. Visit http://localhost:${port}.`
  );
});
