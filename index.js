const http = require("http");
const express = require("express");
const path = require("path");
const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
const cors = require("cors");

app.use(
  cors({
    cors: {
      origin: ["http://localhost:5173","http://192.168.1.70:5173", "https://chat-vibes.netlify.app/"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  })
);

app.get("/", (req, res) => {
  console.log(" a request was made to the server");
  res.send("HII");
});
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://192.168.1.70:5173",
      "https://chat-vibes.netlify.app/",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});


io.on("connection", (socket) => { 
  //   socket.on("room", (room,roomCallback) => {
  //        if (room.trim() === "") {
  //       room="General";//Default room nam
  //       console.log("Room name is empty, setting to default 'General'",room);
  //     }
  //       socket.join(room);
  // socket.room = room;  
  // console.log("Joined room:", room);
  // roomCallback(room); // Call the callback with the room name
  //   });

  socket.on("name", (name,room) => {
    //for room
    const roomName = room|| "";
      if (roomName.trim() === "") {
        room="General";//Default room nam
        console.log("Room name is empty, setting to default 'General'",roomName);
      }
       socket.to(room).emit("users-name",name);
             socket.join(room); 
  console.log("Joined room:", room);
  //for name 
    console.log(name, ", Connected to server");
    socket.broadcast.emit("name", name);
    socket.name = name; // Store the name in the socket object
    
  });
  socket.on("message", (data) => {
socket.room = data.room || ""; // Get the room from the socket or default to an empty string
 if (socket.room.trim() === "") {
          socket.room = "General"; // Default room name if not provided
          
 }
        console.log("Message Recieved in room", data, "Room:", data.room);
        socket.to(socket.room).emit("message", data);
        
            console.log("Room name from client", data.room);
     
   
    
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
