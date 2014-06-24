window.onload = function() {
    if (sessionStorage.connected == "true") {
        var newHTML = '<h2>' + sessionStorage.prenom + ' ' + sessionStorage.nom + '<h2>Vous êtes connecté !</h2></br><input type="submit" value="Se Déconnecter"  onclick="deconnection()" >';
        document.getElementById('connected').innerHTML = newHTML;
        var poste = sessionStorage.poste;
        document.getElementById(poste).style.display = "block";
        if(sessionStorage.poste == "enseignant"){
        document.getElementById("ajouterRole").style.display = "block";
        }
    } else {
        var newHTML = '<h2>Connectez-vous</h2><form id="login"  method="post" action="" name ="formulaire"  onsubmit="return validerFormulaire();"><input id="codeMS" type="text" name="username" class="placeholder" placeholder="Code MS"><input id="passW" type="password" name="password" class="placeholder" placeholder="Mot de passe"><p class="radio"><input  type="radio" name="choix" id="etudiant" value = 0 checked/>Étudiant<input type="radio" name="choix" id="enseignant" value= 1 />Enseignant<input type="radio" name="choix" id="demonstateur" value= 2 />Démonstrateur </p><input type="submit" value="Valider"  ></form>';
        document.getElementById('connected').innerHTML = newHTML;
    }
};
function deconnection() {
    var decon = '</br></br></br></br></br><marquee behavior="scroll" direction="right" scrollamount="20"><img src="images/airplane.svg" width="120" height="100" alt="smile" /><p>Vous êtes maintenant déconnecté !</p></marquee>'
    document.body.innerHTML = decon;
    setTimeout(function() {
        sessionStorage.clear();
        sessionStorage.setItem('connected', false);
        window.location.href = "index.html";
    }, 5000);

}// JavaScript Document