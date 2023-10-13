const express = require('express');
const path = require('path');
require('dotenv').config();

//Express app
const app = express();

//Node Server
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//Socket messages
io.on('connection', client => {
    console.log('Connected client');

    client.on('disconnect', () => {
        console.log('Disconnected client');
    });

    client.on('message', (payload) => {
        console.log('Message received', payload);

        io.emit('message', {admin: 'New message'});
    })
});

//Public path
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
    if(err) throw new Error(err);

    console.log('Servidor corriendo en el puerto', process.env.PORT);
});