// L'objet XMLHttpRequest permet d'appliquer AJAX
let ticketData = new XMLHttpRequest();

// Définition de la méthode à utiliser et de la source du fichier
ticketData.open("GET", "/data/data.json");

// On attend que la requête soit chargée
ticketData.addEventListener("load", function() {
    if (this.status === 200) {
        // On analyse/décrypte (parse) le fichier JSON afin de récupérer responseText dans un tableau
        display(JSON.parse(this.responseText));
    }
})
// Envoi de la requête http avec la fonction ".send()"
requete.send();