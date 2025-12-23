const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    // When a user joins
    socket.on('join', (username) => {
        io.emit('system_message', {
            text: `${username || 'Anon'} has joined the channel.`,
            type: 'join'
        });
    });

    // When a message is sent
    socket.on('chat_message', (data) => {
        // Broadcast the ENCRYPTED data to everyone else
        socket.broadcast.emit('chat_message', data);
    });

    socket.on('disconnect', () => {
        // Optional: Handle disconnects
    });
});

// Listen on all network interfaces (0.0.0.0) so other devices can connect
const PORT = 3000;
http.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running. Connect other devices to http://YOUR_IP_ADDRESS:${PORT}`);
});