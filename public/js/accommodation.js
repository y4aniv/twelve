function filterAccommodation(type) { // Fonction pour filtrer les types de logements
  /**
   * @param {string} type - Le type de logement à afficher
   */
  const sortingButtons = { // Les boutons de tri
    all: document.getElementById('sorting__all'),
    villa: document.getElementById('sorting__villa'),
    pavillon: document.getElementById('sorting__pavillon'),
  };
  const accommodationContent = document.getElementById(
    'accommodation__content',
  ); // Le contenu des logements

  document
    .querySelector('.sorting__active') // Récupère le bouton actif
    .classList.remove('sorting__active'); // Enlève la classe active
  sortingButtons[type].classList.add('sorting__active'); // Ajoute la classe active au bouton cliqué

  gsap.to('.content__item[style*="display: block;"]', { // Animation de transition des logements pour les cacher
    opacity: 0, // Opacité à 0
    y: 20, // Décalage de 20px
    stagger: 0.2, // Décalage de 0.2s
    onComplete() { // Une fois l'animation terminée
      const elements = document.querySelectorAll('.content__item'); // Récupère tous les éléments
      elements.forEach((element) => { // Pour chaque élément
        const dataType = element.getAttribute('data-type').toLowerCase(); // Récupère le type de logement en minuscule
        if (type === 'all' || dataType === type) { // Si le type est "all" ou si le type correspond
          element.style.display = 'block'; // Affiche l'élément
        } else { // Sinon
          element.style.display = 'none'; // Cache l'élément
        }
      });
      gsap.to('.content__item[style*="display: block;"]', { // Animation de transition des logements pour les afficher
        opacity: 1, // Opacité à 1
        y: 0, // Décalage de 0px
        stagger: 0.2, // Décalage de 0.2s
      });
    },
  });
}

document
  .getElementById('sorting__all')
  .addEventListener('click', () => filterAccommodation('all')); // Lance la fonction filterAccommodation avec le paramètre "all" lors du clic sur le bouton "all"
document
  .getElementById('sorting__villa')
  .addEventListener('click', () => filterAccommodation('villa')); // Lance la fonction filterAccommodation avec le paramètre "villa" lors du clic sur le bouton "villa"
document
  .getElementById('sorting__pavillon')
  .addEventListener('click', () => filterAccommodation('pavillon')); // Lance la fonction filterAccommodation avec le paramètre "pavillon" lors du clic sur le bouton "pavillon"

gsap.to('.content__item', { // Animation de transition des logements
  scrollTrigger: { // Déclenche l'animation lorsqu'un élément est visible à l'écran
    trigger: '.content__item', // L'élément à observer
    start: 'top center', // Le point de départ de l'animation est le centre de l'élément
  },
  opacity: 1, // Opacité à 1
  y: 0, // Décalage de 0px
  stagger: 0.2, // Décalage de 0.2s entre chaque élément
});

document.querySelectorAll('.content__item').forEach((element) => { // Pour chaque élément
  element.style.display = 'block'; // Affiche l'élément
});
