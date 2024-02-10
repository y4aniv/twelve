const express = require('express');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/video', express.static(__dirname + 'public/video'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('pages/index', {
        currentUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
    });
})

app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send('User-agent: *\nDisallow: /');
});

app.all('*', (req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Le serveur est lancé sur le port ${port}`);
});