
var validerFormulaire, verifChamp;

verifChamp = function(champ, erreur) {
    if (erreur) {
        champ.style.backgroundColor = "#FF0000";
        return false;
    } else {
        champ.style.backgroundColor = "#FFFFFF";
        return true;
    }
};



validerFormulaire = function() {
    var formatCodeMS, formatMotDePasse, codeMS, passW, radioEtudiant, radioProf, radioDemo;
    formatMotDePasse = new RegExp("^[a-zA-Z]{4}[0-9]{5}$", "g");
    formatCodeMS = new RegExp("^[a-zA-Z]{2}[0-9]{6}$", "g");


    codeMS = document.getElementById("codeMS");
    passW = document.getElementById("passW");

    radioEtudiant = document.getElementById("radioEtudiant");
    radioProf = document.getElementById("radioProf");
    radioDemo = document.getElementById("radioDemo");

    if (codeMS.value === "") {
        verifChamp(document.formulaire.username, true);
        alert("Le champ code MS doit être rempli.");
        return false;
    } else {
        verifChamp(document.formulaire.username, false);
    }

    if (passW.value === "") {
        verifChamp(document.formulaire.password, true);
        alert("Le champ mot de passe doit être rempli.");
        return false;
    } else {
        verifChamp(document.formulaire.password, false);
    }


    if (!formatCodeMS.test(codeMS.value)) {
        verifChamp(document.formulaire.username, true);
        alert("Le champ code MS doit être composé de 2 lettres suivies de 6 chiffres.");
        return false;
    } else {
        verifChamp(document.formulaire.username, false);
    }


    if (!formatMotDePasse.test(passW.value)) {
        verifChamp(document.formulaire.password, true);
        alert("Le champ mot de passe doit être composé de 4 lettres suivies de 5 chiffres.");
        return false;
    } else {
        verifChamp(document.formulaire.password, false);
    }

    var poste = validerReponse();
    var userVerif = verifierUser(codeMS.value, passW.value, poste);
    if (userVerif) {
        if(localStorage.db==null || typeof (localStorage.db) == undefined){
        var jsonObject = {section: []};
        localStorage.setItem('db', JSON.stringify(jsonObject));
        }
        if(localStorage.role==null || typeof (localStorage.role) == undefined){
        var dbrole = {"role": []};
        localStorage.setItem('role', JSON.stringify(dbrole));
        }
        window.location = poste + ".html";
        return false;
    }else{return false;}

};

function validerReponse() {

    var radio = $('input[name="choix"]:checked').val();
    var retour;
    //for (i = 0 ; i < 2 ; i++) {
    if (radio == 0) {
        retour = "etudiant";
    }
    if (radio == 1) {
        retour = "enseignant";
    }
    if (radio == 2) {
        retour = "demonstrateur";
    }
    return retour;
    //}
}
;

function loadXMLDoc(dname) {
    if (window.XMLHttpRequest)
    {
        xhttp = new XMLHttpRequest();
    }
    else
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", dname, false);
    xhttp.send();
    if (xhttp.readyState == 4) {
        var retour = xhttp.responseXML;
    }
    return retour;
}

function verifierUser(codeMS, passW, poste) {

    XML = loadXMLDoc("javascripts/login.xml");
    XMLPoste = XML.getElementsByTagName(poste);
    for (var i = 0; i < XMLPoste.length; i++) {
        var XcodeMS = XMLPoste[i].getAttribute("ms");
        var XpassW = XMLPoste[i].getElementsByTagName("password")[0].childNodes[0].nodeValue;
        if (codeMS == XcodeMS && passW == XpassW) {
            var nom = XMLPoste[i].getElementsByTagName("nom")[0].childNodes[0].nodeValue;
            var prenom = XMLPoste[i].getElementsByTagName("prenom")[0].childNodes[0].nodeValue;
            sessionStorage.setItem('connected', true);
            sessionStorage.setItem('nom', nom);
            sessionStorage.setItem('prenom', prenom);
            sessionStorage.setItem('codeMS', codeMS);
            sessionStorage.setItem('poste', poste);
            return true;
        } 
    }
            alert("Erreur ; Mauvais codeMS/Mot depasse");
            return false;
}
;
