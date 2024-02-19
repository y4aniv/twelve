const sliderLength = document.getElementsByClassName(
  "accommodation-detail__slider",
)[0].children.length; // Récupérer la longueur du slider afin de savoir combien d'images sont présentes
let sliderIndex = 0; // Initialiser l'index du slider à 0

setInterval(() => { // Créer un intervalle pour changer les images du slider
  sliderIndex = (sliderIndex + 1) % sliderLength; // Incrémenter l'index du slider
  document.getElementsByClassName("accommodation-detail__slider")[0].children[
    sliderIndex
  ].style.opacity = 1; // Afficher l'image correspondant à l'index
  document.getElementsByClassName("accommodation-detail__slider")[0].children[
    (sliderIndex + sliderLength - 1) % sliderLength // Utiliser l'opérateur modulo pour obtenir l'index précédent en tenant compte de la longueur du slider
  ].style.opacity = 0; // Masquer l'image précédente
}, 3000); // Changer l'image toutes les 3 secondes

gsap.to(".commodities__list li", { // Animer les éléments de la liste des commodités
  scrollTrigger: { // Utiliser le déclencheur de défilement pour déclencher l'animation
    trigger: ".commodities__list", // Utiliser l'élément .commodities__list comme déclencheur
    start: "top 80%", // Déclencher l'animation lorsque le déclencheur est à 80% de la fenêtre
    end: "bottom center", // Arrêter l'animation lorsque le déclencheur est à 50% de la fenêtre
    scrub: 1, // Activer le scrubbing pour synchroniser l'animation avec le défilement
  },
  opacity: 1, // Animer l'opacité de 0 à 1
  y: 0, // Animer la position verticale de 20px à 0
  stagger: 0.2, // Décaler l'animation de chaque élément
});
