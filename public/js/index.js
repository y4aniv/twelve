gsap.registerPlugin(ScrollTrigger); // Ajout du plugin ScrollTrigger à GSAP

gsap.to(".keywords__text span", {
  // Animer les mots-clés
  scrollTrigger: {
    // Déclencher l'animation au scroll
    trigger: ".keywords__text", // Définir l'élément à observer pour le déclenchement
    start: "10% 40%", // Définir le point de départ de l'animation
    end: "bottom 60%", // Définir le point de fin de l'animation
    scrub: 1, // Activer le scrubbing pour synchroniser l'animation avec le scroll
  },
  opacity: 0.1, // Changer l'opacité de 1 à 0.1 pendant l'animation
  stagger: 0.1, // Décaler l'animation de chaque mot-clé
});
