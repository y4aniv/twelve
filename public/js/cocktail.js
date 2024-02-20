if ('share' in navigator) {
  // Si l'API Web Share est disponible
  document.getElementById('share').style.display = 'block'; // Affiche le bouton "Partager"
}

document.getElementById('share').addEventListener('click', () => {
  // Ajouter un écouteur d'événement sur le bouton "Partager"
  navigator.share({
    // Utilise l'API Web Share pour partager le cocktail
    title: "L'Aristote - Twelve, un hôtel dans les nuages", // Utilise un titre personnalisé
    text: `Découvre ${document.querySelectorAll('.ingredients__item').length == 1 ? "l'ingrédient secret" : `les ${document.querySelectorAll('.ingredients__item').length} ingrédients secrets`} de mon cocktail.`, // Utilise un texte personnalisé avec le nombre d'ingrédients qui est dynamique
    url: `${window.location.origin}/cocktail/${SHARE_ID}`, // Utilise l'URL de partage valide vers le cocktail
  });
});
