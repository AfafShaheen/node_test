const express = require('express');
const cors = require('cors');
const app = express();
const basicAuth = require('express-basic-auth');
const swaggerDocs = require('./config/swagger.js');

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true,
}));

app.use(express.json());

const swaggerAuth = basicAuth({
    users: { afaf: '123' },
    challenge: true,
});

app.use('/api-docs', swaggerAuth);
swaggerDocs(app);

const router = require('./router/router.js');
app.use(router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});