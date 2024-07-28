const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const { port } = require('./config/config');

const AuthRoute = require('./routes/AuthRoutes')

// connect to db
require('./db-config/db');

app.use(cors());
app.use(express.json())


app.get('', (req, res) => {
    return res.json({ message: 'Hola!!' });
});


app.use('/api/v1/auth', AuthRoute);

app.listen(port, () => {
    console.log(`server is up and listening on ${port}`);
});