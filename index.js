const express = require('express');
const app = express();
const connectToDB = require('./db-config/db')
connectToDB;

const users = require('./schema/User');

app.get('', (req, res) => {
    return res.json({ message: 'Hola!!' });
});


app.post('/api/v1/register', (req, res) => {
    const user = req.body();
    if (user.termsConidtion) {


    } else {
        return res.status(400).json({ message: 'Please accept terms and condition' });
    }
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`server is up and listening on ${PORT}`);
});