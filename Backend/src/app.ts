const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
import connectDB from './utils/db-config';
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text({ limit: '200mb' }));


connectDB();
// Routes
const usersRoute = require('./routes/users-route');
const messagesRoute = require('./routes/messages-route');
const groupsRoute = require('./routes/groups-route');

app.use('/api/users', usersRoute);
app.use('/api/messages', messagesRoute);
app.use('/api/groups', groupsRoute);

app.get('/', (req: any, res: any) => {
    res.send('Hello World');
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});