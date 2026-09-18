//----------------------------------------------------------------------------
// preparation des constantes
//----------------------------------------------------------------------------

// on recupere toutes les cartes de la page
const cartesSauvegardees = document.querySelectorAll(".carte-sauvegardee");
// on recupere le texte qui indique le nombre de favoris
const nombreFavoris = document.querySelector("#nombre-favoris");
// on recupere les favoris enregistrés dans le navigateur
const favorisEnregistres = localStorage.getItem("favoris");
// on recupere tous les boutons Retirer
const boutonsRetirer = document.querySelectorAll(".retirer-favori");
// on recupere le boutton vider ma selection
const boutonVider = document.querySelector("#vider-selection");

//----------------------------------------------------------------------------
// affichage des favoris
//----------------------------------------------------------------------------

// tableau quicontient les favoris
let favoris = [];

// si des favoris existent alors on transforme le texte JSON en tableau
if (favorisEnregistres !== null) {
  favoris = JSON.parse(favorisEnregistres);
}

// on parcours toutes les cartes
cartesSauvegardees.forEach(function (carte) {
  // on recupere l'identifiant de la carte
  const idEspace = carte.dataset.id;

  // on verifie si l'espace est present dans les favoris
  if (favoris.includes(idEspace)) {
    carte.style.display = "flex";
  } else {
    carte.style.display = "none";
  }
});

mettreAJourCompteur();

//----------------------------------------------------------------------------
// suppression des favoris
//----------------------------------------------------------------------------

// on parcours tous les boutons Retirer
boutonsRetirer.forEach(function (bouton) {
  // on ecoute le clic sur chaque bouton
  bouton.addEventListener("click", function () {
    // on retrouve la carte qui a le bouton
    const carte = bouton.closest(".carte-sauvegardee");

    // on recupere l'identifiant de cette carte
    const idEspace = carte.dataset.id;
    // on retire l'identifiant du tableau des favoris
    favoris = favoris.filter(function (id) {
      return id !== idEspace;
    });

    // puis on enregistre le nouveau tableau dans localStorage
    localStorage.setItem("favoris", JSON.stringify(favoris));
    // et on masque l'espace retiré des favoris
    carte.style.display = "none";
    // met à jour le compteur
    mettreAJourCompteur();
  });
});

// fonction pour mettre à jour le nombre d'espace de la selection
function mettreAJourCompteur() {
  if (favoris.length === 1) {
    nombreFavoris.textContent = favoris.length + " espace dans votre sélection";
  } else {
    nombreFavoris.textContent =
      favoris.length + " espaces dans votre sélection";
  }
}

//----------------------------------------------------------------------------
// vider la selection
//----------------------------------------------------------------------------

// on ecoute le clic sur le bouton vider ma selection
boutonVider.addEventListener("click", function () {
  // on vide le tableau des favoris
  favoris = [];

  // onenregistre le tableau vide dans localStorage
  localStorage.setItem("favoris", JSON.stringify(favoris));

  // on parcours toutes les cartes
  cartesSauvegardees.forEach(function (carte) {
    // masque chaque carte
    carte.style.display = "none";
  });

  // on met à jour le compteur
  mettreAJourCompteur();
});
