document.getElementById('button-menu').addEventListener('click', () => {
  // Ajouter un écouteur d'événements sur le bouton de menu
  gsap.to('.cocktail-builder', {
    // Fermer le cocktail builder si ouvert
    x: '-100%', // Déplacer le cocktail builder vers la gauche
  });
  gsap.to('.restaurant-menu', {
    // Ouvrir le menu du restaurant
    x: 0, // Déplacer le menu du restaurant vers la gauche
    duration: 0.5, // Définir la durée de l'animation
    onComplete() {
      // À la fin de l'animation
      gsap.to('.menu__list li', {
        // Animer chaque élément de la liste du menu
        y: 0, // Réinitialiser la position verticale
        opacity: 1, // Réinitialiser l'opacité
        duration: 0.5, // Définir la durée de l'animation
        stagger: 0.1, // Décaler l'animation de chaque élément
      });
    },
  });
});

document.getElementById('menu-close').addEventListener('click', () => {
  // Ajouter un écouteur d'événements sur le bouton de fermeture du menu
  gsap.to('.restaurant-menu', {
    // Fermer le menu du restaurant
    x: '100%', // Déplacer le menu du restaurant vers la droite
    duration: 0.5, // Définir la durée de l'animation
    onComplete() {
      // À la fin de l'animation
      document.querySelectorAll('.menu__list li').forEach((li) => {
        // Pour chaque élément de la liste du menu
        li.style.opacity = 0; // Réinitialiser l'opacité
        li.style.transform = 'translateY(20px)'; // Réinitialiser la position verticale
      });
    },
  });
});

document.getElementById('button-cocktails').addEventListener('click', () => {
  // Ajouter un écouteur d'événements sur le bouton de cocktails
  gsap.to('.cocktail-builder', {
    // Ouvrir le cocktail builder
    x: 0, // Déplacer le cocktail builder vers la droite
    duration: 0.5, // Définir la durée de l'animation
  });
});

document.getElementById('builder-close').addEventListener('click', () => {
  // Ajouter un écouteur d'événements sur le bouton de fermeture du cocktail builder
  gsap.to('.cocktail-builder', {
    // Fermer le cocktail builder
    x: '-100%', // Déplacer le cocktail builder vers la gauche
    duration: 0.5, // Définir la durée de l'animation
  });
});

document.getElementById('button-next').addEventListener('click', () => {
  // Ajouter un écouteur d'événements sur le bouton suivant
  gsap.to('.step-1', {
    opacity: 0, // Masquer l'étape 1
    display: 'none', // Masquer l'étape 1 (éviter les problèmes d'accessibilité)
    onComplete() {
      // À la fin de l'animation
      gsap.to('.step-2', {
        opacity: 1, // Afficher l'étape 2
        display: 'block', // Afficher l'étape 2 (éviter les problèmes d'accessibilité)
      });
    },
  });
});

let allIngredients = []; // Créer un tableau pour stocker les ingrédients
const searchInput = document.getElementById('input-ingredient'); // Récupérer l'élément input pour la recherche d'ingrédients

function highlightResult(string, search) {
  // Créer une fonction pour mettre en évidence les résultats de recherche
  /**
   * @param {string} string - La chaîne de caractères à modifier
   * @param {string} search - La chaîne de caractères à rechercher
   * @returns {string} La chaîne de caractères modifiée
   */
  return string.replace(new RegExp(search, 'gi'), (match) => `<b>${match}</b>`); // Remplacer les occurrences de la recherche par la même chaîne entourée de balises <b>
}

function addIngredient(name, type) {
  // Créer une fonction pour ajouter un ingrédient
  /**
   * @param {string} name - Le nom de l'ingrédient à ajouter
   * @param {string} type - Le type de l'ingrédient à ajouter
   */

  if (allIngredients.includes(name)) {
    // Vérifier si l'ingrédient est déjà présent
    document.querySelector(
      `.choices__item[data-ingredient="${name}"]`,
    ).style.display = 'none'; // Masquer l'ingrédient dans la liste des choix
  } else {
    // Si l'ingrédient n'est pas déjà présent
    document.getElementById('empty-ingredients').style.display = 'none'; // Masquer le message d'ingrédients vides car il y a au moins un ingrédient
    document.getElementById('button-validate').removeAttribute('disabled'); // Activer le bouton de validation car il y a au moins un ingrédient
    document.querySelector(
      `.choices__item[data-ingredient="${name}"]`,
    ).style.display = 'none'; // Masquer l'ingrédient dans la liste des choix
    allIngredients.push(name); // Ajouter l'ingrédient au tableau
    document.getElementById('list-ingredients').innerHTML
      += `<li class="ingredients__item" data-ingredient="${name}" onclick='removeIngredient("${escapeApostrophe(name)}")'><p>${name}</p><sub>${type}</sub></li>`; // Ajouter l'ingrédient à la liste des ingrédients
  }
}

function removeIngredient(name) {
  // Créer une fonction pour supprimer un ingrédient
  /**
   * @param {string} name - Le nom de l'ingrédient à supprimer
   */
  document
    .querySelector(`.ingredients__item[data-ingredient="${name}"]`)
    .remove(); // Supprimer l'ingrédient de la liste des ingrédients
  allIngredients = allIngredients.filter((ingredient) => ingredient !== name); // Filtrer le tableau pour supprimer l'ingrédient

  if (allIngredients.length === 0) {
    // Vérifier si le tableau est vide
    document.getElementById('empty-ingredients').style.display = 'block'; // Afficher le message d'ingrédients vides
    document
      .getElementById('button-validate')
      .setAttribute('disabled', 'disabled'); // Désactiver le bouton de validation
  }
}

function validateCocktail() {
  // Créer une fonction pour valider le cocktail
  fetch('/api/cocktail', {
    // Effectuer une requête POST
    method: 'POST', // Utiliser la méthode POST
    headers: {
      'Content-Type': 'application/json', // Définir le type de contenu
    },
    body: JSON.stringify({
      // Convertir les données en JSON
      ingredients: allIngredients, // Ajouter les ingrédients à la requête
    }),
  })
    .then(
      (response) =>
        // Récupérer la réponse de la requête
        response.json(), // Renvoyer la réponse au format JSON
    )
    .then((data) => {
      // Récupérer les données
      document.querySelector('#qrcode img').src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.origin}/cocktail/${data.id}&bgcolor=fdfaf6&color=0d0700`; // Générer un code QR avec l'URL du cocktail
      gsap.to('.step-2', {
        opacity: 0, // Masquer l'étape 2
        display: 'none', // Masquer l'étape 2 (éviter les problèmes d'accessibilité)
        onComplete() {
          // À la fin de l'animation
          gsap.to('.step-3', {
            opacity: 1, // Afficher l'étape 3
            display: 'block', // Afficher l'étape 3 (éviter les problèmes d'accessibilité)
          });
        },
      });
    })
    .catch((error) => {
      // Gérer les erreurs
      alert('Une erreur est survenue. Veuillez réessayer plus tard.'); // Afficher un message d'erreur
      window.location.reload(); // Recharger la page
    });
}

function escapeApostrophe(string) {
  // Créer une fonction pour échapper les apostrophes
  /**
   * @param {string} string - La chaîne de caractères à modifier
   * @returns {string} La chaîne de caractères modifiée
   */
  return string.replace(/'/g, '&#39;'); // Remplacer les apostrophes par leur équivalent HTML
}

let timeout = null; // Créer une variable pour stocker le délai de la recherche
searchInput.addEventListener('input', () => {
  // Ajouter un écouteur d'événements sur l'élément input pour la recherche d'ingrédients
  clearTimeout(timeout); // Effacer le délai précédent
  timeout = setTimeout(() => {
    // Ajouter un nouveau délai
    const value = searchInput.value.toLowerCase(); // Récupérer la valeur de l'élément input
    fetch(`/api/ingredients/?q=${value}`) // Effectuer une requête GET sur l'API /api/ingredients/ avec la valeur de l'élément input
      .then(
        (response) =>
          // Récupérer la réponse de la requête
          response.json(), // Renvoyer la réponse au format JSON
      ) // Récupérer la réponse au format JSON
      .then((data) => {
        // Récupérer les données
        document.getElementById('empty-choices').style.display = 'none'; // Masquer le message de choix vides
        document.getElementById('list-choices').innerHTML = ''; // Réinitialiser la liste des choix
        if (data.length === 0) {
          // Vérifier si les données sont vides
          document.getElementById('empty-choices').style.display = 'block'; // Afficher le message de choix vides
        } else {
          // Si les données ne sont pas vides
          data.forEach((ingredient) => {
            // Pour chaque ingrédient
            if (allIngredients.includes(ingredient.name)) {
              // Vérifier si l'ingrédient est déjà présent
              // Passer à l'itération suivante
            } else {
              // Si l'ingrédient n'est pas déjà présent
              document.getElementById('list-choices').innerHTML
                += `<li class="choices__item" data-ingredient="${ingredient.name}" onclick='addIngredient("${escapeApostrophe(ingredient.name)}", "${escapeApostrophe(ingredient.type)}")'><p>${highlightResult(ingredient.name, value)}</p><sub>${ingredient.type}</sub></li>`; // Ajouter l'ingrédient à la liste des choix
            }
          });
        }
      });
  }, 500); // Attendre 500 millisecondes avant d'effectuer la recherche pour éviter de surcharger le serveur
});
