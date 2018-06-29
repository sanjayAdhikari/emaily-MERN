const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({hi: 'there'});
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    console.log(`Server is up at 5000 port`);
})