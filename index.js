const express = require('express');
const app = express();
const connectToDB = require('./db-config/db')
connectToDB;

const users = require('./schema/users');

app.get('', (req, res) => {
    return res.json({ message: 'Hola!!' });
});


app.post('/api/v1/register', (req, res) => {
    // const {}
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`server is up and listening on ${PORT}`);
});