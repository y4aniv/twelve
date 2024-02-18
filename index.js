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
        head: {
            url: 'https://' + req.get('host') + req.originalUrl,
        }
    });
})

app.get('/accommodation', (req, res) => {
    res.render('pages/accommodation', {
        head: {
            url: 'https://' + req.get('host') + req.originalUrl,
        },
        data: require('./data/accommodation.json')
    });
})

app.get('/accommodation/:slug', (req, res) => {
    const slug = req.params.slug;
    const data = require('./data/accommodation.json');
    const accommodation = data.find(accommodation => accommodation.slug === slug);
    if (accommodation) {
        res.render('pages/accommodation-detail', {
            head: {
                url: 'https://' + req.get('host') + req.originalUrl,
            },
            accommodation
        });
    } else {
        res.render('pages/404', {
            head: {
                url: 'https://' + req.get('host') + req.originalUrl,
            }
        });
    }
});

app.get('/dining', (req, res) => {
    res.render('pages/dining', {
        head: {
            url: 'https://' + req.get('host') + req.originalUrl,
        },
    });
})

app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send('User-agent: *\nDisallow: /');
});

app.all('*', (req, res) => {
    res.render('pages/404', {
        head: {
            url: 'https://' + req.get('host') + req.originalUrl,
        }
    });
});

app.listen(port, () => {
    console.log(`Le serveur est lancé sur le port ${port}`);
});