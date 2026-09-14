//----------------------------------------------------------------------------
// preparation des constantes
//----------------------------------------------------------------------------

// trouve moi l'element qui contient l'id ville
const filtreVille = document.querySelector("#ville");
// trouve moi tout les elements qui possedent la classe carte espace
const cartes = document.querySelectorAll(".carte-espace");
// on recupere les capacités (affiche le nbre de place avec le fitre mis en place)
const filtreCapacite = document.querySelector("#capacite");
// on recupere le filtre fibre
const filtreFibre = document.querySelector("#fibre");
// on recupere le filtre pmr
const filtrePmr = document.querySelector("#pmr");
// on recupere le filtre ecran
const filtreEcran = document.querySelector("#ecran");
// on recupere le nombre d'espace disponible
const nombreEspaces = document.querySelector("#nombre-espaces");

//----------------------------------------------------------------------------
// evenements
//----------------------------------------------------------------------------

// ecoute du changement de ville
filtreVille.addEventListener("change", filtrerEspaces);
// ecoute du changement de capacité
filtreCapacite.addEventListener("change", filtrerEspaces);
// ecoute du changement du filtre Fibre
filtreFibre.addEventListener("change", filtrerEspaces);
// ecoute du changement du filtre PMR
filtrePmr.addEventListener("change", filtrerEspaces);
// ecoute du changement de filtre ecran
filtreEcran.addEventListener("change", filtrerEspaces);

//----------------------------------------------------------------------------
// fonctions
//----------------------------------------------------------------------------

// fonction pour recuperer la ville choisie
function filtrerVille(evenement) {
  // recupere la ville choisi dans le menu
  const villeChoisie = evenement.target.value;

  console.log(villeChoisie);
}

// fonction pour examiner les 6 cartes
function filtrerVille(evenement) {
  // on recupere la ville choisie dans le menu
  const villeChoisie = evenement.target.value;

  // on parcourt toutes les cartes
  cartes.forEach(function (carte) {
    //on récupere la ville de la carte
    const villeCarte = carte.dataset.ville;

    // on verifie si la carte correspond à notre choix OU si
    // on selectionne toutes les villes
    if (villeChoisie === "" || villeCarte === villeChoisie) {
      carte.style.display = "block";
    } else {
      carte.style.display = "none";
    }
  });
}

// on filtre les cartes selon la capacité choisie
function filtrerCapacite(evenement) {
  // on recupere la capacité choisie dans le menu
  const capaciteChoisie = evenement.target.value;

  // on parcours toutes les cartes
  cartes.forEach(function (carte) {
    // on reucpoere la capacité enregistrée dans la carte
    const capaciteCarte = Number(carte.dataset.capacite);

    // on affiche la carte si la capacité convient
    // OU si l'utilisateur sélectionne toutes capacités
    if (capaciteChoisie === "" || capaciteCarte >= Number(capaciteChoisie)) {
      carte.style.display = "block";
    } else {
      carte.style.display = "none";
    }
  });
}

// on filtre les espaces selon la ville, la capacité, la fibre, le pmr et la 4K choisies
function filtrerEspaces() {
  // on recuepre les valeurs choisies dans les filtres
  //pour la ville
  const villeChoisie = filtreVille.value;
  //pour la capacite
  const capaciteChoisie = filtreCapacite.value;
  //pour la fibre si coche
  const fibreChoisie = filtreFibre.checked;
  //pour le pmr si coché
  const pmrChoisi = filtrePmr.checked;
  // pour un ecran 4K si coché
  const ecranChoisi = filtreEcran.checked;

  // Compte le nombre de cartes visibles
  let compteur = 0;

  // on parcourt toutes les cartes
  cartes.forEach(function (carte) {
    // on recupere les données de la carte
    const villeCarte = carte.dataset.ville;
    const capaciteCarte = Number(carte.dataset.capacite);
    const fibreCarte = carte.dataset.fibre;
    const pmrCarte = carte.dataset.pmr;
    const ecranCarte = carte.dataset.ecran;

    // on verifie si la ville correspond
    const villeCorrespond = villeChoisie === "" || villeCarte === villeChoisie;

    // on verifie si la capacité correspond (egal OU superieur)
    const capaciteCorrespond =
      capaciteChoisie === "" || capaciteCarte >= Number(capaciteChoisie);

    // on verifie si la fibre correspond (coché OU pas)
    const fibreCorrespond = fibreChoisie === false || fibreCarte === "true";

    // on verifie si le pmr correspond (coché OU pas)
    const pmrCorrespond = pmrChoisi === false || pmrCarte === "true";
    // on verifie si l'ecran correspond (coché OU pas)
    const ecranCorrespond = ecranChoisi === false || ecranCarte === "true";

    // et on affiche uniquementla carte si la ville correspond ET la capacité correspond
    // ET la fibre correspond Et le pmr sinon on cache
    if (
      villeCorrespond &&
      capaciteCorrespond &&
      fibreCorrespond &&
      pmrCorrespond &&
      ecranCorrespond
    ) {
      carte.style.display = "block";
      compteur = compteur + 1;
    } else {
      carte.style.display = "none";
    }
  });
  // on met à jour le texte selon le nombre d'espaces disponibles
  // si il est strictement egal à 1 on met pas de s sinon on en met partout
  if (compteur === 1) {
    nombreEspaces.textContent = compteur + " Espace disponible";
  } else {
    nombreEspaces.textContent = compteur + " Espaces disponibles";
  }
}
