//----------------------------------------------------------------------------
// preparation des constantes
//----------------------------------------------------------------------------
// on recupere le message
const message = document.querySelector("#message");
// on recupere la selection des sujets
const sujet = document.querySelector("#sujet");
// on recupere le formulaire de contact
const formulaireContact = document.querySelector(".formulaire-contact");
// on recupere la zone du message de confirmation
const confirmationMessage = document.querySelector("#confirmation-message");

//------------------------------------------------------------
// recuperation de l'espace de puis l'url
//------------------------------------------------------------

// on recupere les parametres dans l'url
const parametres = new URLSearchParams(window.location.search);

// on recupere l'id de l'espace
const idEspace = parametres.get("id");

// Test
console.log(idEspace);

//------------------------------------------------------------
// chargement de l'espace
//------------------------------------------------------------

async function chargerEspace() {
  // on charge le fichier JSON
  const reponse = await fetch("../assets/js/espaces.json");

  // on transforme les données JSON en tableau JS
  const espaces = await reponse.json();

  // on recherche l'espace correspondant à l'id
  const espaceSelectionne = espaces.find(function (espace) {
    return espace.id == idEspace;
  });

  // on prepare un meaage message avec le nom de l'espace sélectionné
  message.value =
    "Je souhaite obtenir des informations concernant " +
    espaceSelectionne.nom +
    ".";

  // On selectionne automatiquement le sujet du formulaire
  sujet.value = "information";

  // Test
  console.log(espaceSelectionne);
}

chargerEspace();

//------------------------------------------------------------
// validation d'un formulaire
//------------------------------------------------------------

formulaireContact.addEventListener("submit", function (event) {
  // empeche l'envoi du formulaire
  event.preventDefault();

  // affiche un message de confirmation
  confirmationMessage.textContent =
    "Votre message a bien été envoyé. Notre équipe vous répondra rapidement.";

  // on vide le formulaire après l'envoi
  formulaireContact.reset();
});
