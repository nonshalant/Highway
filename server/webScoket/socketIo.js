const http = require('http'); 
const server = http.createServer();
const io = require('socket.io')(server)

const connectSocketIo = async() =>{
  io.on('connection', (socket) => {
      console.log('Client connected');
    
      socket.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Broadcast the message to all connected clients
        io.emit('message', message);
      });
    
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
  });

  
}

module.exports = connectSocketIo