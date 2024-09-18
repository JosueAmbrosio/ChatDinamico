var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var messages = [
    {
        id: 1,
        text: "Hola, soy un mensaje",
        author: "Ricardo Coello Palomino"
    }
];

app.use(express.static("public"));

io.on("connection", function (socket) {
    console.log("Alguien se ha conectado con Sockets");
    socket.emit("messages", messages);

    socket.on("new-message", function (data) {
        messages.push(data);
        io.sockets.emit("messages", messages);
    });
});

// Cambia el puerto a 8054 y la dirección IP a 192.168.13.250
server.listen(8054, "192.168.13.250", function () {
    console.log("Servidor corriendo en http://192.168.13.250:8054");
});