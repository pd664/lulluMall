const { addUser, removeUser, users } = require('./User');

const rootSocket = (io) => {
    io.on("connection", (socket) => {
        // let url_connected = socket.handshake.headers.origin;
        const id = socket.id
        addUser(socket.id)
      
        socket.on('setSocketId', function (data) {
          var userName = data.name;
          var userId = data.userId;
        });
      
        socket.on('disconnect', () => {
          removeUser(socket.id)
        });
        socket.emit("hello", "world")
        socket.emit("timer", second)
      
      });
}

module.exports = rootSocket