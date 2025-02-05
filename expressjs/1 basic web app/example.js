request.on('end', function(){
  response.writeHead(200, {"Content-Type": "text/html"});

  // For now, we'll use the data directly without a database,
  // Just to test if it works
  
  response.write(`
  <h2>Hello, ${name[1]}</h2>
  <p>What is your name?</p>
  <form method="POST" action="example/message.html">
    <p>Name: <input type="text" name="name"></p>
    <p><button type="submit">Submit</button></p>
  </form>
  `);
  response.end();
});