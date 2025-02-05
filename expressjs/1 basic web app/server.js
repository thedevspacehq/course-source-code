const { createServer } = require("http");
const fileSystem = require("fs");

let server = createServer((request, response) => {
  // To make things more clear, name is used when writing to file
  // myName is used when reading from file
  let name = "";
  let myName = "";
  request.on("data", function (chunk) {
    name = name + chunk;
    name = name.split("=");
    name = name[1];

    // Write the data to data.txt
    fileSystem.writeFile("data.txt", name, function (error) {
      if (error) throw error;
    });
  });
  request.on("end", function () {
    response.writeHead(200, { "Content-Type": "text/html" });

    // Read the data from file
    fileSystem.readFile("data.txt", "utf8", (error, text) => {
      if (error) throw error;
      myName = text;
    });

    response.write(`
        <h2>Hello, ${myName}</h2>
        <p>What is your name?</p>
        <form method="POST" action="example/message.html">
          <p>Name: <input type="text" name="name"></p>
          <p><button type="submit">Submit</button></p>
        </form>
        `);
    response.end();
  });
});
server.listen(8000);
console.log("Listening! (port 8000)");
