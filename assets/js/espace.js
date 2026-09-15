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

// ------------------------------------------------------------
// chargement des données JSON
// ------------------------------------------------------------

async function chargerEspaces() {
  // On récupère le fichier JSON
  const reponse = await fetch("../assets/js/espaces.json");

  // On transforme la réponse en données JavaScript
  const donnees = await reponse.json();
  // on retourne les donnée recuperés
  return donnees;
}

async function afficherEspace() {
  // On récupère les espaces depuis le fichier JSON
  const espacesJson = await chargerEspaces();

  // On récupère les paramètres présents dans l'URL
  const parametres = new URLSearchParams(window.location.search);

  // On récupère l'identifiant de l'espace
  const idEspace = parametres.get("id");

  console.log(idEspace);
  console.log(espacesJson);

  // On recherche dans le JSON l'espace correspondant à l'identifiant
  const espaceSelectionne = espacesJson.find(function (espace) {
    return espace.id === idEspace;
  });

  // Test
  console.log(espaceSelectionne);

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

  // on parcours les equipements de l'espace sélectionné
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

//------------------------------------------------------------
// données des espaces
//------------------------------------------------------------

// les informations sur les differents espaces
const espaces = [
  {
    id: "1",
    nom: "Espace Wagram Opéra",
    ville: "Paris 8e",
    adresse: "14 avenue de Wagram, 75008 Paris",
    capacite: 12,
    prixHeure: 45,
    prixDemiJournee: 160,
    prixJournee: 280,
    description:
      "Au coeur du 8e arrondissement, à deux pas de l'Arc de Triomphe, l'Espace Wagram Opéra offre un cadre premium pour vos réunions stratégiques et présentations clients.",
    equipements: [
      "WiFi Fibre 1 Gb/s",
      'Écran 4K 86"',
      "Visioconférence intégrée",
      "Tableau blanc interactif",
      "Accès PMR complet",
      "Climatisation réversible",
      "Café & eau inclus",
      "Parking sécurisé",
    ],
    images: [
      "../assets/images/espace-wagram.webp",
      "../assets/images/espace-travail-hero.webp",
      "../assets/images/espace-wagram-opera-table-reunion.webp",
    ],
  },

  {
    id: "2",
    nom: "Atelier République",
    ville: "Paris 11e",
    capacite: 8,
    prixHeure: 35,
  },

  {
    id: "3",
    nom: "Confluence Executive Suite",
    ville: "Lyon 2e",
    capacite: 20,
    prixHeure: 55,
  },

  {
    id: "4",
    nom: "Les Chartrons Board Room",
    ville: "Bordeaux",
    capacite: 16,
    prixHeure: 40,
  },

  {
    id: "5",
    nom: "Île de Nantes Studio",
    ville: "Nantes",
    capacite: 6,
    prixHeure: 28,
  },

  {
    id: "6",
    nom: "Vieux-Port Panorama",
    ville: "Marseille",
    capacite: 14,
    prixHeure: 38,
  },
];

//console de test
console.log(espaces);

//------------------------------------------------------------
// recherche de l'espace
//------------------------------------------------------------

//------------------------------------------------------------
// affichage des donées
//------------------------------------------------------------
