const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const http = require('http');
import connectDB from './utils/db-config';
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ limit: '200mb' }));

connectDB();

// Socket.io configuration
const httpServer = http.createServer(app);
const corsOptions = { origin: '*', methods: "GET,HEAD,PUT,PATCH,POST,DELETE", optionsSuccessStatus: 200 };
const io = new Server(httpServer, { cors: corsOptions });


const usersRoute = require('./routes/users-route');
const messagesRoute = require('./routes/messages-route');
const groupsRoute = require('./routes/groups-route');

app.use('/api/users', usersRoute);
app.use('/api/messages', messagesRoute);
app.use('/api/groups', groupsRoute);

app.get('/', (req: any, res: any) => {
    res.send('Hello World');
});

io.on('connection', (socket: any) => {
    console.log('New client connected:', socket.id);

    // Listen for new messages from clients
    socket.on('sendMessage', (data: any) => {
        console.log('Message received:', data);

        // Broadcast message to all connected clients
        io.emit('receiveMessage', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

const port = process.env.PORT || 4000;
httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
