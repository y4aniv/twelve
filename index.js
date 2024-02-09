const express = require('express');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use('/public', express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/video', express.static(__dirname + 'public/video'));

app.listen(port, () => {
    console.log(`Le serveur est lancé sur le port ${port}`);
});