const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
import connectDB from './utils/db-config';
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

connectDB();
// Routes
const usersRoute = require('./routes/users-route');

app.use('/api/users', usersRoute);

app.get('/', (req: any, res: any) => {
    res.send('Hello World');
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});