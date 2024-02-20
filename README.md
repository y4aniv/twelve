# Twelve, un hôtel hors du temps

## Table des matières

1. [Introduction](#introduction)
2. [Présentation du projet](#présentation-du-projet)
3. [Technologies utilisées](#technologies-utilisées)
4. [Installation](#installation)
5. [Utilisation](#utilisation)
6. [Contributeurs](#contributeurs)
7. [Licence](#licence)

## Introduction

Bienvenue dans le projet NSI **Twelve** où nous vous invitons à explorer l'hôtel fictif **Twelve** à travers un site web élégant et immersif. Inspiré par l'atmosphère envoûtante de l'hôtel [Amanzoe](https://www.aman.com/fr-fr/resorts/amanzoe) en Grèce, **Twelve** vous transporte dans un monde de luxe et de tranquillité.

## Présentation du projet

Le projet **Twelve** est un site web dynamique qui vous permet de découvrir l'hôtel fictif **Twelve**. Vous pourrez y trouver des informations sur les chambres (villas ou pavillons) ainsi que sur les services de restauration.
Ce projet est réalisé dans le cadre de l'enseignement de spécialité NSI (Numérique et Sciences Informatiques) en classe de première.
Le site web est actuellement hébergé sur [Render](https://render.com/) et est accessible à l'adresse suivante : [https://twelve-resort.onrender.com/](https://twelve-resort.onrender.com/).

## Technologies utilisées

### Langages

- HTML5 (avec le moteur de rendu [EJS](https://ejs.co/))
- CSS3
- JavaScript
- Node.js
- Python

### Librairies

- [Express](https://expressjs.com/)
- [GSAP](https://greensock.com/gsap/)
- [ScrollTrigger](https://greensock.com/scrolltrigger/) (plugin GSAP)
- [Edit Json File](https://www.npmjs.com/package/edit-json-file)

### Outils

- [NPM](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### CI/CD

- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)

### Cloud

- [Render](https://render.com/)

## Installation

Pour installer le projet, veuillez suivre les étapes suivantes :

1. Cloner le dépôt GitHub

```sh
git clone https://github.com/y4aniv/twelve.git
```

2. Se rendre dans le dossier du projet

```sh
cd twelve
```

3. Installer les dépendances

```sh
npm install
```

## Utilisation

Pour lancer le projet, veuillez suivre les étapes suivantes :

1. Ajouter un fichier `.env` à la racine du projet
2. Ajouter les variables d'environnement suivantes dans le fichier `.env`

```sh
PORT=3000
```

3. Lancer le serveur

```sh
npm start
```

4. Ouvrir un navigateur web et se rendre à l'adresse suivante : [http://localhost:3000/](http://localhost:3000/)

## Contributeurs

- [Yaniv D.](https://github.com/y4aniv)
- Océanely T.

## Licence

Ce projet est sous licence [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0).

### Ressources

| Fichier                | Type       | Source                                                | Informations                                                     | Licence                                                         |
| ---------------------- | ---------- | ----------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------- |
| `accommodation.json`   | JSON       | [Amanzoe](https://www.aman.com/fr-fr/resorts/amanzoe) | Informations sur les chambres (les textes ont été modifiés)      | Propriétaire                                                    |
| `cocktails.json`       | JSON       | [Twelve](https://github.com/y4aniv/twelve)            | Base de données des cocktails personnalisés                      | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)       |
| `ingredients.json`     | JSON       | [The Cocktail DB](https://www.thecocktaildb.com/)     | Base de données des ingrédients de cocktails (valeurs traduites) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| `le12.json`            | JSON       | [Twelve](https://github.com/y4aniv/twelve)            | Base de données des plats à la carte                             | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)       |
| ---                    | ---        | ---                                                   | ---                                                              | ---                                                             |
| `*.css`                | CSS        | [Twelve](https://github.com/y4aniv/twelve)            | Feuilles de style                                                | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)       |
| ---                    | ---        | ---                                                   | ---                                                              | ---                                                             |
| `favicon.ico`          | Icône      | [Twelve](https://github.com/y4aniv/twelve)            | Icône du site web                                                | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)       |
| `logo-white.svg`       | Logo       | [Twelve](https://github.com/y4aniv/twelve)            | Logo du site web                                                 | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)       |
| `logo-black.svg`       | Logo       | [Twelve](https://github.com/y4aniv/twelve)            | Logo du site web                                                 | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)       |
| `le12-logo.png`        | Logo       | [Twelve](https://github.com/y4aniv/twelve)            | Logo du restaurant                                               | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)       |
| `bar-illustration.jpg` | Image      | [Hôtel Lutetia](https://www.hotellutetia.com/fr/)     | Illustration du bar                                              | Propriétaire                                                    |
| `*.jpg`                | Image      | [Amanzoe](https://www.aman.com/fr-fr/resorts/amanzoe) | Images de l'hôtel                                                | Propriétaire                                                    |
| ---                    | ---        | ---                                                   | ---                                                              | ---                                                             |
| `*.js`                 | JavaScript | [Twelve](https://github.com/y4aniv/twelve)            | Scripts                                                          | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)       |
| ---                    | ---        | ---                                                   | ---                                                              | ---                                                             |
| `*.py`                 | Python     | [Twelve](https://github.com/y4aniv/twelve)            | Scripts                                                          | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)       |
| ---                    | ---        | ---                                                   | ---                                                              | ---                                                             |
| `*.ejs`                | EJS        | [Twelve](https://github.com/y4aniv/twelve)            | Contenu du site web                                              | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)       |
