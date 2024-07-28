const express = require('express');
const app = express();


app.get('', (req, res) => {
    return res.json({ message: 'Hola!!' });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`server is up and listening on ${PORT}`);
});