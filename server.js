const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    
    // 1. Join a specific Room
    socket.on('join_room', ({ username, room }) => {
        // The user effectively joins "IP-RoomName"
        socket.join(room);
        
        // Welcome message only to the user
        socket.emit('system_message', {
            text: `Connected to encrypted channel: ${room}`,
            type: 'system'
        });

        // Notify others IN THAT ROOM only
        socket.to(room).emit('system_message', {
            text: `${username} has joined the chat.`,
            type: 'join'
        });
    });

    // 2. Handle Messages
    socket.on('chat_message', (data) => {
        // Broadcast ONLY to specific room
        // data.room is passed from client
        socket.to(data.room).emit('chat_message', data);
    });

    socket.on('disconnect', () => {
        // Handle disconnect if needed
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});