function ajoutSection() {
    var type = document.getElementById("type");
    var titre = document.getElementById("titre");
    var description = document.getElementById("description");
    var ressource = document.getElementById("ressource");
    if (description.value.length <= 0 || titre.value.length <= 0) {
        alert("veuillez remplir tous les champs");
    } else {
        var dbsection = [];
        dbsection = JSON.parse(localStorage.db);
        if (dbsection.section == null || typeof (dbsection.section) == undefined) {
            dbsection = {"section": []};

        }
        var DB = [];
        DB = dbsection.section;
        var jsonObject = [];
        jsonObject = {
            "type": type.value,
            "titre": titre.value,
            "description": description.value,
            "ressource": ressource.value
        };
        DB.push(jsonObject);
        dbsection.section = DB;
        localStorage.db = ('bd', JSON.stringify(dbsection));
    }
    location.reload();
    return false;
}
function gotosection(i) {
    var dbsection = [];
    dbsection = JSON.parse(localStorage.db);
    var DB = dbsection.section[i];
    var type = DB.type;
    var titre = DB.titre;
    var description = DB.description;
    var ressource = DB.ressource;
    var newHTML = '<table width="600"><tr><td><h3>Information sur ' + type + '</h3></td></tr><tr><td><h4>Titre: ' + titre + '</h4></td></tr><tr><td><h4>Description: ' + description + '</h4></td></td></tr><tr><td><h4>ressource: <a href='+ressource+' target="_blank"> ' + ressource + '</a></h4></td></td></tr></table><form id="login"  method="POST" action="" name ="formulaire"  onsubmit="return effacerSection(' + i + ');"><input type="submit" value="Effacer la section" /></tr></form>';
    document.getElementById("section").innerHTML = newHTML;

}
function effacerSection(index) {
    if(sessionStorage.poste != "demonstrateur" || sessionStorage.poste != "enseignant"){
        alert("Vous ne pouvez pas effacer cette section");
        return false;
    }
    var db = [];
    db = JSON.parse(localStorage.db);
    var dbsection = [];
    dbsection = db.section;
    var temp = {"section": []};
    for (var i = 0; i < dbsection.length; i++) {
        if (i != index.valueOf()) {
            temp.section.push(dbsection[i]);
        }
    }
    dbsection = temp;
    localStorage.db = ('bd', JSON.stringify(dbsection));
    location.reload();
    return false;

}

function success() {
    var conf = confirm("Voulez vous envoyer ce message ?");
    if (conf) {
        alert("Message envoyé");
        location.reload();
    }
}