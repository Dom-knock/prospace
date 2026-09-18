//----------------------------------------------------------------------------
// preparation des constantes
//----------------------------------------------------------------------------
// on recupere le titre de la page
const nomEspace = document.querySelector("#nom-espace");
// on recupere l'adresse
const adresseEspace = document.querySelector("#adresse-espace");
// on recuepere les capacités
const capaciteEspace = document.querySelector("#capacite-espace");
// on recupere les differents prix
const prixHeure = document.querySelector("#prix-heure");
const prixDemiJournee = document.querySelector("#prix-demi-journee");
const prixJournee = document.querySelector("#prix-journee");
// on recupere la description d'un espace
const descriptionEspace = document.querySelector("#description-espace");
// on recupere la liste des equipements
const listeEquipements = document.querySelector("#liste-equipements");
// on recupere les images pour un espace
const imagePrincipale = document.querySelector("#image-principale");
const imageSecondaire = document.querySelector("#image-secondaire");
const imageTertiaire = document.querySelector("#image-tertiaire");
// on recupere les elements du fil d'ariane
const arianeVille = document.querySelector("#ariane-ville");
const arianeNom = document.querySelector("#ariane-nom");
const boutonFavori = document.querySelector("#bouton-favori");
// on recupere le lien vers la page contact
const lienContact = document.querySelector("#lien-contact");

// ------------------------------------------------------------
// chargement des données JSON
// ------------------------------------------------------------

async function chargerEspaces() {
  // on recupere le fichier JSON
  const reponse = await fetch("../assets/js/espaces.json");

  // on transforme la réponse en données JS
  const donnees = await reponse.json();
  // on retourne les donnée recuperés
  return donnees;
}

async function afficherEspace() {
  // on recupere les espaces depuis le fichier JSON
  const espacesJson = await chargerEspaces();

  // on recupere les paramètres présents dans l'URL
  const parametres = new URLSearchParams(window.location.search);

  // on recupere l'identifiant de l'espace
  const idEspace = parametres.get("id");
  // on ajoute l'identifiant de l'espace au lien vers la page contact
  lienContact.href = "contact.html?id=" + idEspace;

  // on recherche dans le JSON l'espace correspondant à l'identifiant
  const espaceSelectionne = espacesJson.find(function (espace) {
    return espace.id === idEspace;
  });

  // on affiche les informations de l'espace sélectionné
  nomEspace.textContent = espaceSelectionne.nom;
  adresseEspace.textContent = espaceSelectionne.adresse;
  prixHeure.textContent = espaceSelectionne.prixHeure + " €";
  descriptionEspace.textContent = espaceSelectionne.description;
  prixDemiJournee.textContent = espaceSelectionne.prixDemiJournee + " €";
  prixJournee.textContent = espaceSelectionne.prixJournee + " €";
  // partie pour afficher les images de l'espace selectionné
  imagePrincipale.src = espaceSelectionne.images[0];
  imageSecondaire.src = espaceSelectionne.images[1];
  imageTertiaire.src = espaceSelectionne.images[2];
  // on gere le nombre de personne
  capaciteEspace.textContent =
    "Jusqu'à " + espaceSelectionne.capacite + " personnes";
  // on met à jour le fil d'ariane
  arianeVille.textContent = espaceSelectionne.ville;
  arianeNom.textContent = espaceSelectionne.nom;

  // on parcours les equipements de l'espace selectionné
  espaceSelectionne.equipements.forEach(function (equipement) {
    // On crée un paragraphe
    const elementEquipement = document.createElement("p");

    // on ajoute le nom de l'equipement
    elementEquipement.textContent = equipement;

    // on ajoute le paragraphe dans la liste des equipements
    listeEquipements.appendChild(elementEquipement);
  });
}

afficherEspace();

// on recupere les favoris enregistrés
const favorisEnregistres = localStorage.getItem("favoris");

// on prepare le tableau des favoris
let favoris = [];

// si des favoris existent deja on transforme le JSON en tableau JS
if (favorisEnregistres !== null) {
  favoris = JSON.parse(favorisEnregistres);
}

// on recupere l'identifiant present dans l'url
const parametres = new URLSearchParams(window.location.search);
const idEspace = parametres.get("id");

// on verifie si l'espace est deja dans les favoris
if (favoris.includes(idEspace)) {
  boutonFavori.textContent = "Déjà sauvegardé";
} else {
  boutonFavori.textContent = "Sauvegarder en favoris";
}
boutonFavori.addEventListener("click", function () {
  // on recupere l'identifiant present dans l'url
  const parametres = new URLSearchParams(window.location.search);
  const idEspace = parametres.get("id");

  // si l'espace n'est pas encore dans les favoris
  if (favoris.includes(idEspace) === false) {
    // On ajoute son identifiant au tableau
    favoris.push(idEspace);

    // on enregistre le nouveau tableau dans le localStorage
    localStorage.setItem("favoris", JSON.stringify(favoris));
    // on modifie le texte du bouton
    boutonFavori.textContent = "Déjà sauvegardé";
  }
});
