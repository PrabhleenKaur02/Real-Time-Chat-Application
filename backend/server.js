const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const { error } = require("console");
require('dotenv').config();

const Message = require('./models/message');
const authRoute = require("./routes/auth");
const homepageRoute = require("./routes/homepage");

const app = express();
const server = http.createServer(app)
const io = socketIO(server);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(()=> console.log("MongoDB connected"))
.catch((error)=> {
    console.log("Failed to connect to MongoDB", error);
});

const PORT = process.env.PORT || 5000;

app.use('/auth', authRoute);
app.use('/homepage', homepageRoute);

io.on('connection', (socket)=> {
    console.log('User Connected:', socket.id);

    socket.on('send message', async(data)=>{
        const { sender, receiver, message } = data;

        // to save messages to database
        const newMessage = new Message({
            sender,
            receiver,
            message
        });
        await newMessage.save();

        // emit message to the receiver
        socket.broadcast.emit('receive message', data);
    });

    socket.on('disconnect', () => console.log('User Disconnected:', socket.id));
});

server.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
});