const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    }));

app.use(express.json());

const swaggerAuth = (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme !== "Basic" || !encoded) {
        res.set("WWW-Authenticate", "Basic");
        return res.status(401).send("Authentication required");
    }
    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    const [user, pass] = decoded.split(":");
    if (user === "afaf" && pass === "123") {
        return next();
    }
    res.set("WWW-Authenticate", "Basic");
    return res.status(401).send("Invalid credentials");
};

app.use('/api-docs', swaggerAuth, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const router=require('./router/router.js');
app.use(router);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});