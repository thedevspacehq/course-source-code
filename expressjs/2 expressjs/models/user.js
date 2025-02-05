import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      email TEXT,
      picture TEXT
    )`
  );
});

class User {
  constructor(id, username, email) {
    this.id = id;
    this.username = username;
    this.email = email;
  }

  // Fetch all users from the database
  static getAll(callback) {
    const sql = "SELECT * FROM users";
    db.all(sql, (err, rows) => {
      const users = rows.map(
        (row) => new User(row.id, row.username, row.email)
      );
      callback(null, users);
    });
  }

  // Fetch a user by ID from the database
  static getById(id, callback) {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      const user = new User(row.id, row.username, row.email);
      callback(null, user);
    });
  }

  // Insert a new user into the database
  static create(username, email, filePath, callback) {
    const sql = "INSERT INTO users (username, email, picture) VALUES (?, ?, ?)";
    db.run(sql, [username, email, filePath], function (err) {
      callback(null, this.lastID);
    });
  }

  // Update an existing user in the database
  static update(id, username, email, callback) {
    const sql = "UPDATE users SET username = ?, email = ? WHERE id = ?";
    db.run(sql, [username, email, id], function (err) {
      callback(null);
    });
  }

  // Delete a user from the database
  static delete(id, callback) {
    const sql = "DELETE FROM users WHERE id = ?";
    db.run(sql, [id], function (err) {
      callback(null);
    });
  }
}

export default User;
