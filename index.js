const ws = require('websocket').server;
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8001;
const indexFile = path.join(process.cwd(), './remote/index.html');
const jsFile = path.join(process.cwd(), './remote/dreamremote.js');
const clients = new Set();

const server = http.createServer((request, response)=>{
  const file = request.url.indexOf('.js') > 0 ? jsFile : indexFile;

  if(request.url.indexOf('fav') > 0) {
    response.writeHead(404);
    response.end();
    return;
  }

  fs.readFile(file, 'binary', (err, file) => {
    response.writeHead(200);
    response.write(file, "binary");
    response.end();
  });
});

const socket = new ws({
  httpServer: server
});

server.listen(port, ()=>{
  console.log((new Date()) + " dream remote is listening");
});

socket.on('request', function(request) {
  const connection = request.accept(null, request.origin);

  clients.add(connection);

  connection.on('message', function(message) {
    for(let c of clients) {
      c.sendUTF(message.utf8Data);
    }
  });

  connection.on('close', function(connection) {
    clients.remove(connection);
  });
});
