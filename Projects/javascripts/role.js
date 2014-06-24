
function newrole() {
    var formatCodeMS, formatMotDePasse, codeMS, passW, nom, prenom, role;
    formatMotDePasse = new RegExp("^[a-zA-Z]{4}[0-9]{5}$", "g");
    formatCodeMS = new RegExp("^[a-zA-Z]{2}[0-9]{6}$", "g");


    codeMS = document.getElementById("codeMS");
    passW = document.getElementById("passW");
    nom = document.getElementById("nom");
    prenom = document.getElementById("prenom");
    role = $('input[name="role"]:checked').val()

    if (codeMS.value === "") {
        verifChamp(document.formulaire.codeMS, true);
        alert("Le champ code MS doit être rempli.");
        return false;
    } else {
        verifChamp(document.formulaire.codeMS, false);
    }

    if (nom.value === "") {
        verifChamp(document.formulaire.nom, true);
        alert("Le champ nom doit être rempli.");
        return false;
    } else {
        verifChamp(document.formulaire.nom, false);
    }

    if (prenom.value === "") {
        verifChamp(document.formulaire.prenom, true);
        alert("Le champ prenom doit être rempli.");
        return false;
    } else {
        verifChamp(document.formulaire.prenom, false);
    }

    if (passW.value === "") {
        verifChamp(document.formulaire.passW, true);
        alert("Le champ mot de passe doit être rempli.");
        return false;
    } else {
        verifChamp(document.formulaire.passW, false);
    }


    if (!formatCodeMS.test(codeMS.value)) {
        verifChamp(document.formulaire.codeMS, true);
        alert("Le champ code MS doit être composé de 2 lettres suivies de 6 chiffres.");
        return false;
    } else {
        verifChamp(document.formulaire.codeMS, false);
    }


    if (!formatMotDePasse.test(passW.value)) {
        verifChamp(document.formulaire.passW, true);
        alert("Le champ mot de passe doit être composé de 4 lettres suivies de 5 chiffres.");
        return false;
    } else {
        verifChamp(document.formulaire.passW, false);
    }
    if (!codeMSexist(codeMS.value, role)) {
        nouveaurole(nom, prenom, codeMS, passW, role);
        location.reload();
        alert("nouveau " + role + " ajouté!");
        return false;
    }
    return false;
}

verifChamp = function(champ, erreur) {
    if (erreur) {
        champ.style.backgroundColor = "#FF0000";
        return false;
    } else {
        champ.style.backgroundColor = "#FFFFFF";
        return true;
    }
};

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

function codeMSexist(codeMS, role) {
    XML = loadXMLDoc("javascripts/login.xml");
    XMLde = XML.getElementsByTagName("demonstrateur");
    XMLet = XML.getElementsByTagName("etudiant");
    for (var i = 0; i < XMLde.length; i++) {
        var XcodeMS = XMLde[i].getAttribute("ms");
        if (XcodeMS == codeMS) {
            alert("le code MS : " + codeMS + " existe déjà");
        }
    }
    for (var i = 0; i < XMLet.length; i++) {
        var XcodeMS = XMLet[i].getAttribute("ms");
        if (XcodeMS == codeMS) {
            alert("le code MS : " + codeMS + " existe déjà");
        }
    }

}

function  nouveaurole(nom, prenom, codeMS, passW, role) {
    var dbrole = [];
    dbrole = JSON.parse(localStorage.role);
    if (dbrole.role == null || typeof (dbrole.role) == undefined) {
        dbrole = {"role": []};

    }
    var DB = [];
    DB = dbrole.role;
    var jsonObject = [];
    jsonObject = {
        "nom": nom.value,
        "prenom": prenom.value,
        "codeMS": codeMS.value,
        "password": passW.value,
        "role": role
    };
    DB.push(jsonObject);
    dbrole.role = DB;
    localStorage.role = ('role', JSON.stringify(dbrole));
}