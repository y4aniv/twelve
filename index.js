// Importer les dépendances
const express = require('express'); // Express permet de créer un serveur web
const dotenv = require('dotenv').config(); // Dotenv permet de charger les variables d'environnement depuis un fichier .env
const bodyParser = require('body-parser'); // Body-parser permet de parser les requêtes HTTP
const editJsonFile = require('edit-json-file'); // Edit-json-file permet de lire et écrire dans un fichier JSON
const compression = require('compression'); // Compression permet de compresser les réponses HTTP pour améliorer les performances

// Créer une application Express
const app = express();
const port = process.env.PORT || 3000; // Récupérer le port depuis les variables d'environnement ou utiliser le port 3000 par défaut

// Configurer body-parser pour parser les requêtes HTTP et récupérer les données dans req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Permet de parser les requêtes POST avec le type application/x-www-form-urlencoded

// Activer la compression des réponses HTTP
app.use(compression());

// Configurer Express pour servir les fichiers statiques depuis le dossier public
app.use(
  express.static('public', {
    maxAge: '1y', // Définir la durée de mise en cache à 1 an
    etag: false, // Désactiver la validation ETag pour améliorer les performances
  }),
);
app.use('/css', express.static(`${__dirname}public/css`));
app.use('/js', express.static(`${__dirname}public/js`));
app.use('/img', express.static(`${__dirname}public/img`));
app.use('/video', express.static(`${__dirname}public/video`));

// Configurer EJS comme moteur de rendu
app.set('view engine', 'ejs');
app.set('views', './views'); // Définir le dossier des vues

// Charger les données des cocktails depuis le fichier cocktails.json
const cocktailDB = editJsonFile('data/cocktails.json');

// Définir les routes
app.get('/', (req, res) => {
  // Définir une route pour la page d'accueil
  res.render('pages/index', {
    // Rendre la vue pages/index.ejs
    head: {
      // Passer des données à la vue
      url: `https://${req.get('host')}${req.originalUrl}`, // Récupérer l'URL complète de la requête
    },
  });
});

app.get('/accommodation', (req, res) => {
  // Définir une route pour la page d'hébergement
  res.render('pages/accommodation', {
    // Rendre la vue pages/accommodation.ejs
    head: {
      // Passer des données à la vue
      url: `https://${req.get('host')}${req.originalUrl}`, // Récupérer l'URL complète de la requête
    },
    data: require('./data/accommodation.json'), // Charger les données depuis le fichier accommodation.json
  });
});

app.get('/accommodation/:slug', (req, res) => {
  // Définir une route pour les détails d'un hébergement avec un paramètre dynamique
  const { slug } = req.params; // Récupérer le paramètre slug depuis la requête
  const data = require('./data/accommodation.json'); // Charger les données depuis le fichier accommodation.json
  const accommodation = data.find(
    // Rechercher l'hébergement correspondant au slug
    (accommodation) => accommodation.slug === slug,
  );
  if (accommodation) {
    // Si l'hébergement est trouvé, rendre la vue pages/accommodation-detail.ejs
    res.render('pages/accommodation-detail', {
      head: {
        // Passer des données à la vue
        url: `https://${req.get('host')}${req.originalUrl}`, // Récupérer l'URL complète de la requête
      },
      accommodation, // Passer les données de l'hébergement à la vue
    });
  } else {
    // Si l'hébergement n'est pas trouvé, rendre la vue pages/404.ejs
    res.render('pages/404', {
      head: {
        // Passer des données à la vue
        url: `https://${req.get('host')}${req.originalUrl}`, // Récupérer l'URL complète de la requête
      },
    });
  }
});

app.get('/dining', (req, res) => {
  // Définir une route pour la page de restauration
  res.render('pages/dining', {
    // Rendre la vue pages/dining.ejs
    head: {
      // Passer des données à la vue
      url: `https://${req.get('host')}${req.originalUrl}`, // Récupérer l'URL complète de la requête
    },
    le12: require('./data/le12.json'), // Charger le menu du restaurant Le 12 depuis le fichier le12.json
    ingredients: require('./data/ingredients.json'), // Charger les ingrédients depuis le fichier ingredients.json
  });
});

app.get('/cocktail/:id', (req, res) => {
  // Définir une route pour afficher un cocktail
  if (cocktailDB.get(req.params.id)) {
    // Vérifier si le cocktail existe dans la base de données
    res.render('pages/cocktail', {
      // Rendre la vue pages/cocktail.ejs
      head: {
        // Passer des données à la vue
        url: `https://${req.get('host')}${req.originalUrl}`, // Récupérer l'URL complète de la requête
      }, // Passer les données du cocktail à la vue
      ingredients: cocktailDB.get(req.params.id), // Récupérer les ingrédients du cocktail depuis la base de données
    });
  } else {
    // Si le cocktail n'existe pas, rendre la vue pages/404.ejs
    res.render('pages/404', {
      // Passer des données à la vue
      head: {
        // Passer des données à la vue
        url: `https://${req.get('host')}${req.originalUrl}`, // Récupérer l'URL complète de la requête
      },
    });
  }
});

app.get('/api/ingredients/', (req, res) => {
  const query = req.query.q; // Récupérer le paramètre de requête q
  let ingredients = require('./data/ingredients.json'); // Charger les ingrédients depuis le fichier ingredients.json
  if (query) {
    // Si un paramètre de requête q est présent
    ingredients = ingredients
      .filter((ingredient) =>
        // Filtrer les ingrédients correspondant à la requête
        ingredient.name.toLowerCase().includes(query.toLowerCase()))
      .map((ingredient) => {
        // Ajouter un score à chaque ingrédient
        // Ajouter un score à chaque ingrédient en fonction du nombre de caractères correspondants
        ingredient.score = 1 - (ingredient.name.length - query.length) / ingredient.name.length; // Calculer le score
        return ingredient; // Renvoyer l'ingrédient avec le score
      })
      .sort((a, b) => b.score - a.score) // Trier les ingrédients par score
      .slice(0, 5); // Trier les ingrédients par score et renvoyer les 5 premiers
  } else {
    ingredients = ingredients.slice(0, 5); // Renvoyer les 5 premiers ingrédients
  }

  res.json(ingredients); // Renvoyer les ingrédients au format JSON
});

app.post('/api/cocktail', (req, res) => {
  // Définir une route pour créer un cocktail
  const { ingredients } = req.body; // Récupérer les ingrédients depuis le corps de la requête
  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    // Vérifier que les ingrédients sont présents et sous forme de tableau
    res.status(400).send('Bad request'); // Renvoyer une erreur 400 Bad Request si les ingrédients sont manquants ou invalides
    return;
  }
  const id = Math.random().toString(36).substr(2, 9); // Générer un identifiant aléatoire
  try {
    // Essayer d'ajouter le cocktail à la base de données
    cocktailDB.set(id, ingredients); // Ajouter le cocktail à la base de données
    cocktailDB.save(); // Sauvegarder les modifications dans le fichier cocktails.json
    res.json({
      // Renvoyer une réponse JSON avec l'identifiant du cocktail
      id,
    });
  } catch (e) {
    // Si une erreur survient, renvoyer une erreur 500 Internal Server Error
    res.status(500).send('Internal server error');
  }
});

app.get('/robots.txt', (req, res) => {
  // Définir une route pour le fichier robots.txt
  res.type('text/plain'); // Définir le type de contenu de la réponse
  res.send('User-agent: *\nDisallow: /'); // Renvoyer le contenu du fichier robots.txt (interdire l'indexation de tout le site)
});

app.all('*', (req, res) => {
  // Définir une route pour toutes les autres requêtes non gérées
  res.render('pages/404', {
    // Rendre la vue pages/404.ejs
    head: {
      // Passer des données à la vue
      url: `https://${req.get('host')}${req.originalUrl}`, // Récupérer l'URL complète de la requête
    },
  });
});

app.listen(port, () => {
  // Démarrer le serveur Express
  console.log(`Le serveur est lancé sur le port ${port}`); // Afficher un message dans la console
});
