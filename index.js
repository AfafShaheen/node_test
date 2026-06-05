const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    }));

app.use(express.json());

const router=require('./router/router.js');
app.use('/api',router);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});