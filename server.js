const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: { origin: "*" },
    maxHttpBufferSize: 1e7 // Increase limit to 10MB for images/audio
});
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    
    socket.on('join_room', ({ username, room }) => {
        socket.join(room);
        socket.to(room).emit('system_message', {
            text: `${username} joined.`,
            type: 'join'
        });
    });

    // 1. General Message Handler (Text, Image, Audio)
    socket.on('chat_message', (data) => {
        socket.to(data.room).emit('chat_message', data);
    });

    // 2. Typing Indicator
    socket.on('typing', (data) => {
        socket.to(data.room).emit('typing', data);
    });

    // 3. Delete Message Event
    socket.on('delete_message', (data) => {
        // Broadcast to everyone in room to remove this specific ID
        io.to(data.room).emit('delete_message', data.id); 
    });

    socket.on('disconnect', () => {});
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});