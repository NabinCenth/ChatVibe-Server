const http= require("http");
const express= require("express");
const path = require("path");
const app= express();
const {Server}= require("socket.io")
const server=http.createServer(app);
const cors= require("cors");

 app.use(cors({ cors: {
    origin: ["http://localhost:5173","https://chat-vibes.netlify.app/"],
    methods: ["GET", "POST"],
    credentials: true
  }}));

app.get("/",(req,res)=>{
console.log(" a request was made to the server");
res.send("HII")

})
const io= new Server(server, {
    cors: {
      origin:["http://localhost:5173", "http://192.168.1.75:5173","https://chat-vibes.netlify.app/"],
      methods: ["GET", "POST"],
      credentials: true
    }
  });

 io.on("connection",(socket)=>{
  
    socket.on("name",(name)=>{
        console.log(name,", Connected to server");
        socket.broadcast.emit("name",name);
    });
   socket.on("message",(data)=>{
    console.log("Message Recieved",data);
    socket.broadcast.emit("message",data);
   });
 }
);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
