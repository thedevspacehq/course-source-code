// This file is unnecessary when we are using Prisma.

// import db from "../libs/db.js";

// db.serialize(() => {
//   db.run(
//     `CREATE TABLE IF NOT EXISTS posts (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         title TEXT,
//         content TEXT,
//         picture TEXT
//       )`
//   );
// });

// class Post {
//   constructor(id, title, content, picture) {
//     this.id = id;
//     this.title = title;
//     this.content = content;
//     this.picture = picture;
//   }

//   // Fetch all posts from the database
//   static getAll(callback) {
//     const sql = "SELECT * FROM posts";
//     db.all(sql, (err, rows) => {
//       const posts = rows.map(
//         (row) => new Post(row.id, row.title, row.content, row.picture)
//       );
//       callback(null, posts);
//     });
//   }

//   // Fetch a post by ID from the database
//   static getById(id, callback) {
//     const sql = "SELECT * FROM posts WHERE id = ?";
//     db.get(sql, [id], (err, row) => {
//       const post = new Post(row.id, row.title, row.content, row.picture);
//       callback(null, post);
//     });
//   }

//   // Insert a new post into the database
//   static create(title, content, picture, callback) {
//     const sql = "INSERT INTO posts (title, content, picture) VALUES (?, ?, ?)";
//     db.run(sql, [title, content, picture.path], function (err) {
//       callback(null, this.lastID);
//     });
//   }

//   // Update an existing post in the database
//   static update(id, title, content, picture, callback) {
//     if (picture) {
//       const sql =
//         "UPDATE posts SET title = ?, content = ?, picture = ? WHERE id = ?";
//       db.run(sql, [title, content, picture.path, id], function (err) {
//         callback(null, this.lastID);
//       });
//     } else {
//       const sql = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
//       db.run(sql, [title, content, id], function (err) {
//         callback(null, this.lastID);
//       });
//     }
//   }

//   // Delete a post from the database
//   static delete(id, callback) {
//     const sql = "DELETE FROM posts WHERE id = ?";
//     db.run(sql, [id], function (err) {
//       callback(null);
//     });
//   }
// }

// export default Post;
