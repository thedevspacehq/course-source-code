const postController = {
  // The create action
  create: async function (req, res) {
    const { title, content } = req.body;
    try {
      console.log(
        "Creating a new post with title:",
        title,
        "and content:",
        content
      );

      res.status(201).json({ message: "Post created." });
    } catch (e) {
      console.log("Something went wrong.");
      res.status(500).json({ message: "Something went wrong." });
    }
  },

  // The retrieve action
  retrieve: async function (req, res) {
    console.log(`Retrieving post with ID: ${req.params.id}`);
    res.status(200).json({
      post: {
        id: req.params.id,
        title: "Sample Post",
        content: "This is the content for the sample post.",
      },
    });
  },

  // The update action
  update: async function (req, res) {
    const { title, content } = req.body;
    console.log("Updating post with ID:", req.params.id);
    console.log("New title:", title, "New content:", content);

    res.status(200).json({ message: "Post updated." });
  },

  // The delete action
  delete: async function (req, res) {
    console.log(`Deleting post with ID: ${req.params.id}`);
    res.status(200).json({ message: "Post deleted." });
  },

  // List all articles
  list: async function (req, res) {
    console.log("Retrieving a list of posts from the database");
    res.status(200).json({
      posts: [
        {
          id: 1,
          title: "Sample Post 1",
          content: "This is the content for sample post 1.",
        },
        {
          id: 2,
          title: "Sample Post 2",
          content: "This is the content for sample post 2.",
        },
      ],
    });
  },
};

export default postController;
