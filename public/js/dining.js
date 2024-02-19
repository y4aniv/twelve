document.getElementById("button-menu").addEventListener("click", function () { // Ajouter un écouteur d'événements sur le bouton de menu
  gsap.to(".cocktail-builder", { // Fermer le cocktail builder si ouvert
    x: "-100%", // Déplacer le cocktail builder vers la gauche
  });
  gsap.to(".restaurant-menu", {  // Ouvrir le menu du restaurant
    x: 0, // Déplacer le menu du restaurant vers la gauche
    duration: 0.5, // Définir la durée de l'animation
    onComplete: function () { // À la fin de l'animation
      gsap.to(".menu__list li", { // Animer chaque élément de la liste du menu
        y: 0, // Réinitialiser la position verticale
        opacity: 1, // Réinitialiser l'opacité
        duration: 0.5, // Définir la durée de l'animation
        stagger: 0.1, // Décaler l'animation de chaque élément
      });
    },
  });
});

document.getElementById("menu-close").addEventListener("click", function () { // Ajouter un écouteur d'événements sur le bouton de fermeture du menu
  gsap.to(".restaurant-menu", { // Fermer le menu du restaurant
    x: "100%", // Déplacer le menu du restaurant vers la droite
    duration: 0.5, // Définir la durée de l'animation
    onComplete: function () { // À la fin de l'animation
      document.querySelectorAll(".menu__list li").forEach(function (li) { // Pour chaque élément de la liste du menu
        li.style.opacity = 0; // Réinitialiser l'opacité
        li.style.transform = "translateY(20px)"; // Réinitialiser la position verticale
      });
    },
  });
});

document
  .getElementById("button-cocktails")
  .addEventListener("click", function () { // Ajouter un écouteur d'événements sur le bouton de cocktails
    gsap.to(".cocktail-builder", { // Ouvrir le cocktail builder
      x: 0, // Déplacer le cocktail builder vers la droite
      duration: 0.5, // Définir la durée de l'animation
    });
  });

document
  .getElementById("cocktail-close")
  .addEventListener("click", function () { // Ajouter un écouteur d'événements sur le bouton de fermeture du cocktail builder
    gsap.to(".cocktail-builder", { // Fermer le cocktail builder
      x: "-100%", // Déplacer le cocktail builder vers la gauche
      duration: 0.5, // Définir la durée de l'animation
    });
  });

var cocktailIngredients = []; // Créer un tableau pour stocker les ingrédients du cocktail
var labsSearch = document.getElementById("labs-search"); // Récupérer l'élément de recherche des ingrédients
var labsResults = document.getElementById("labs-results"); // Récupérer l'élément des résultats des ingrédients
var labsList = document.getElementById("labs-list"); // Récupérer l'élément de la liste des ingrédients
var nextStep = document.getElementById("next-step"); // Récupérer le bouton d'étape suivante

for (var i = 1; i < 5; i++) { // Pour chaque ingrédient de 1 à 4 (données initiales)
  fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=" + i) // Récupérer les informations de l'ingrédient via l'API TheCocktailDB
    .then((response) => response.json()) // Convertir la réponse en JSON
    .then((data) => { // Utiliser les données JSON
      var ingr = data.ingredients[0].strIngredient; // Récupérer le nom de l'ingrédient
      labsResults.innerHTML += `<li onclick="addIngredient('${ingr}')" data-ingr="${ingr}">${ingr}</li>`; // Ajouter l'ingrédient à la liste des résultats avec un écouteur d'événements pour l'ajouter au cocktail
    });
}

function addIngredient(ingredient) { // Créer une fonction pour ajouter un ingrédient
    /**
     * @param {string} ingredient - Nom de l'ingrédient
     * @returns {void}
     * 
     * Ajoute un ingrédient à la liste des ingrédients du cocktail et masque l'ingrédient dans les résultats.
     */
  if (cocktailIngredients.includes(ingredient)) { // Si l'ingrédient est déjà dans le cocktail
    document.querySelector(`[data-ingr="${ingredient}"]`).style.display =
      "none"; // Masquer l'ingrédient dans les résultats
  } else { // Sinon
    cocktailIngredients.push(ingredient); // Ajouter l'ingrédient à la liste des ingrédients du cocktail
    document.querySelector(`[data-ingr="${ingredient}"]`).style.display =
      "none"; // Masquer l'ingrédient dans les résultats
    labsList.innerHTML += `<li onclick="removeIngredient('${ingredient}')" data-ingr="${ingredient}">${ingredient}</li>`; // Ajouter l'ingrédient à la liste des ingrédients du cocktail avec un écouteur d'événements pour le supprimer
  }
  nextStep.removeAttribute("disabled"); // Activer le bouton d'étape suivante car au moins un ingrédient est présent
}

function removeIngredient(ingredient) { // Créer une fonction pour supprimer un ingrédient
    /**
     * @param {string} ingredient - Nom de l'ingrédient
     * @returns {void}
     * 
     * Supprime un ingrédient de la liste des ingrédients du cocktail et affiche l'ingrédient dans les résultats.
     */
  cocktailIngredients = cocktailIngredients.filter( // Filtrer les ingrédients pour supprimer l'ingrédient
    (ingr) => ingr !== ingredient, // Retourner tous les ingrédients sauf celui à supprimer
  );
  document.querySelector(`[data-ingr="${ingredient}"]`).style.display = "block"; // Afficher l'ingrédient dans les résultats
  document.querySelector(`[data-ingr="${ingredient}"]`).remove(); // Supprimer l'ingrédient de la liste des ingrédients du cocktail sur l'interface

  if (cocktailIngredients.length === 0) { // Si aucun ingrédient n'est présent
    nextStep.setAttribute("disabled", "disabled"); // Désactiver le bouton d'étape suivante
  }
}

function fetchData(ingredient) { // Créer une fonction pour récupérer les ingrédients
    /**
     * @param {string} ingredient - Nom de l'ingrédient
     * @returns {void}
     * 
     * Récupère les ingrédients correspondant à la recherche et les ajoute à la liste des résultats.
     */
  fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + ingredient,
  ) // Récupérer les informations de l'ingrédient via l'API TheCocktailDB
    .then((response) => response.json()) // Convertir la réponse en JSON
    .then((data) => { // Utiliser les données JSON
      if (data.ingredients) { // Si des ingrédients sont trouvés
        data.ingredients.forEach((ingredient) => { // Pour chaque ingrédient
          if (
            cocktailIngredients.includes(ingredient.strIngredient) === false // Si l'ingrédient n'est pas déjà dans le cocktail
          ) { 
            labsResults.innerHTML += `<li onclick="addIngredient('${ingredient.strIngredient}')" data-ingr="${ingredient.strIngredient}">${ingredient.strIngredient}</li>`; // Ajouter l'ingrédient à la liste des résultats avec un écouteur d'événements pour l'ajouter au cocktail
          }
        });
        document
          .querySelector(".cocktail__labs") 
          .scrollTo(0, document.querySelector(".cocktail__labs").scrollHeight); // Faire défiler la liste des résultats jusqu'en bas pour améliorer l'expérience utilisateur
      }
    });
}

var timeout = null; // Créer un délai pour la recherche
labsSearch.addEventListener("input", function () { // Ajouter un écouteur d'événements sur la recherche d'ingrédients
  clearTimeout(timeout); // Réinitialiser le délai à chaque saisie
  timeout = setTimeout(function () { // Créer un délai de 500 ms
    labsResults.innerHTML = ""; // Réinitialiser la liste des résultats
    fetchData(labsSearch.value); 
  }, 500);
});

nextStep.addEventListener("click", function () { // Ajouter un écouteur d'événements sur le bouton d'étape suivante
  fetch("/api/cocktail", { // Créer un cocktail via l'API interne
    method: "POST", // Utiliser la méthode POST pour envoyer les données
    headers: { // Définir les en-têtes de la requête
      "Content-Type": "application/json", // Définir le type de contenu de la requête
    },
    body: JSON.stringify({ ingredients: cocktailIngredients }), // Convertir les ingrédients en chaîne JSON et les envoyer dans le corps de la requête
  })
    .then((response) => response.json()) // Convertir la réponse en JSON
    .then((json) => { // Utiliser les données JSON
      document.getElementById("cocktail-qr").src =
        `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.origin}/cocktail/${json.id}`; // Générer un code QR pour le cocktail avec l'identifiant en utilisant l'API QR Server
      gsap.to(".cocktail__labs", { // Enlever la liste des ingrédients
        opacity: 0,  // Changer l'opacité de 1 à 0
        display: "none", // Empêcher les interactions avec la liste meme si elle est invisible
        onComplete: function () { // À la fin de l'animation
          gsap.to(".cocktail__qr", { // Afficher le code QR du cocktail
            opacity: 1, // Changer l'opacité de 0 à 1
            display: "block", // Autoriser les interactions avec le code QR
          });
        },
      });
    })
    .catch((err) => { // Gérer les erreurs
      alert("Une erreur est survenue. Veuillez réessayer plus tard."); // Afficher une alerte en cas d'erreur
      window.location.reload(); // Recharger la page pour réinitialiser l'interface
    });
});
