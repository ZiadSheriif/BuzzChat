const cors = require('cors');
const express = require('express');
const app = express();
import connectDB from './utils/db-config';
require('dotenv').config();

app.use(cors());
app.use(express.json());

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