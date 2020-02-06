function showRegister() {
    document.getElementById("box-register").style.display = "inline";
    document.getElementById("box-login").style.display = "none";
}

function showLogin() {
    document.getElementById("box-login").style.display = "inline";
    document.getElementById("box-register").style.display = "none";
}

function register(event) {
    event.preventDefault();
    var pseudo = document.getElementById('pseudo').value
    var mdp = document.getElementById('mdp').value
    var mdpcon = document.getElementById('mdpConfir').value
    if (mdp == mdpcon) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(data) {
            if (data.target.readyState == 4 && data.target.status == 200) {
                document.getElementById('mdpConfir').style.border = "none"
                document.getElementById("box-login").style.display = "inline";
                document.getElementById("box-register").style.display = "none";
                document.getElementById('logPseudo').value = pseudo;
                document.getElementById('logMdp').value = mdp;
            }
        };
        xhttp.open("GET", `http://92.222.69.104:80/todo/create/${pseudo}/${mdp}`, true);
        xhttp.send();
    } else {
        document.getElementById('mdp').style.border = "solid 1px red"
        document.getElementById('mdpConfir').style.border = "solid 1px red"
        document.getElementById("box-register-error").style.visibility = "initial"
    }
}

function login(event) {
    event.preventDefault();
    var pseudoLog = document.getElementById('logPseudo').value
    var mdpLog = document.getElementById('logMdp').value
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(data) {
        if (data.target.readyState == 4 && data.target.status == 200) {
            document.getElementById("list").style.display = "inline";
        } else if (data.target.status == 500) {
            document.getElementById("box-login-error").style.visibility = "initial"
            document.getElementById('logMdp').style.border = "solid 1px red"
            document.getElementById('logPseudo').style.border = "solid 1px red"
        }
    };
    xhttp.open("GET", "http://92.222.69.104:80/todo/listes", true);
    xhttp.setRequestHeader("login", pseudoLog);
    xhttp.setRequestHeader("password", mdpLog);
    xhttp.send()
}

function addPraListe(event) {
    var newDiv = document.createElement("TEXTAREA");
    event.target.parentNode.parentNode.children[0].appendChild(newDiv);
    newDiv.setAttribute("class", "liste-input")
    newDiv.addEventListener('keyup', textAreaActu);
    newDiv.focus()
}

function addListe(event) {
    var newListe = document.createElement("div");
    var parentDiv = document.getElementsByClassName("liste-blanche");
    newListe.setAttribute("class", "liste-blanche")
    parentDiv[parentDiv.length - 1].after(newListe);
    newListe.innerHTML = `<div class="liste-article">
    </div>
    <div class="liste-remove" onclick="removeListe(event)">-</div>
    <a onclick="addPraListe(event)">
        <div>+</div>
    </a>`
}

function textAreaActu(event) {
    console.log(event.target.value)
}

function removeListe(event) {
    event.target.parentElement.remove()
        /*if (event.target.parentElement.children[0].children[event.target.parentElement.children[0].children.length - 1])
            event.target.parentElement.children[0].children[event.target.parentElement.children[0].children.length - 1].remove()*/
}

function post(event) {
    var tabTextArea = document.getElementsByClassName('liste-input')

    var request = new XMLHttpRequest();

    request.open('POST', 'http://92.222.69.104/todo/listes');

    request.setRequestHeader('Content-Type', 'application/json');

    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
        }
    };

    /*var body = {

    }*/

    request.send(JSON.stringify(body));
}