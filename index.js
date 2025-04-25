const http= require("http");
const express= require("express");
const path = require("path");
const app= express();
const {Server}= require("socket.io")
const server=http.createServer(app);
app.use(express.static(path.join(__dirname,"Public")));
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
})
const io= new Server(server);
 io.on("connection",(socket)=>{
    console.log("New User:",socket.id);
   socket.on("message",(data)=>{
    console.log("Message Recieved",data);
    socket.broadcast.emit("message",data);
   });
 }
);

server.listen(3000,()=>{
    console.log("Server is running on port 3000");
})