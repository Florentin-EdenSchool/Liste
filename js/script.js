noteNumber = 1;
numberList = [];
var code;

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
    var bar = document.getElementById('bar')
    var mdpl = mdp.length;
    if (mdpl >= 6) {
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
            document.getElementById("box-register-error").innerHTML = 'Les mots de passe ne correspondent pas corrècte'
        }
    } else if (mdpl < 6) {
        document.getElementById("box-register-error").innerHTML = 'Le mot de passe est trop cours (6 caracter min)'
    }
}

function login(event) {
    event.preventDefault();
    var pseudoLog = document.getElementById('logPseudo').value
    var mdpLog = document.getElementById('logMdp').value
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(data) {


        if (data.target.readyState == 4 && data.target.status == 200) {
            code = JSON.parse(this.response);
            document.getElementById("liste").style.display = "inline";
            document.getElementById("box-login").style.display = "none";
            var secondResponse = JSON.parse(this.response);
            for (let i = 0; i < secondResponse.todoListes.length; i++) {
                var newListe = document.createElement("div");
                var parentDiv = document.getElementsByClassName("liste-blanche");
                newListe.setAttribute("class", "liste-blanche")
                parentDiv[parentDiv.length - 1].after(newListe);
                newListe.innerHTML += `<div class="liste-article">
                <input class="liste-article-title" onkeyup="textInputActu(event)"></input>
                </div>
                <div class="liste-remove" onclick="removeListe(event)">-</div>
                <a onclick="addPraListe(event)">
                    <div>+</div>
                </a>`
                var theElement = document.getElementsByClassName("liste-article-title")
                theElement[i].value = secondResponse.todoListes[i].name
                for (let y = 0; y < secondResponse.todoListes[i].name.length; y++) {
                    if (secondResponse.todoListes[i].elements[y] != undefined) {
                        var texteEme
                        var newDiv = document.createElement("TEXTAREA");
                        if (noteNumber == 1) texteEme = "ère"
                        else texteEme = "ème"
                        newDiv.placeholder = "Tu peux écrire ici, " + noteNumber + texteEme + " note ajoutée";
                        newListe.children[0].appendChild(newDiv);
                        newDiv.setAttribute("class", "liste-input")
                        newDiv.addEventListener('keyup', textAreaActu);
                        newDiv.focus()
                        newDiv.value = secondResponse.todoListes[i].elements[y]
                        var veryNewDiv = document.createElement("DIV");
                        veryNewDiv.setAttribute("class", "liste-input-remove")
                        veryNewDiv.addEventListener('click', removeInput);
                        newListe.children[0].appendChild(veryNewDiv)
                        veryNewDiv.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`
                        noteNumber += 1
                    }
                }
            }
        } else if (data.target.status == 500) {
            document.getElementById("box-login-error").innerHTML = "Les identifiants n'existent pas"
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
    var texteEme
    var newDiv = document.createElement("TEXTAREA");
    if (noteNumber == 1) texteEme = "ère"
    else texteEme = "ème"
    newDiv.placeholder = "Tu peux écrire ici, " + noteNumber + texteEme + " note ajoutée";
    event.target.parentNode.parentNode.children[0].appendChild(newDiv);
    newDiv.setAttribute("class", "liste-input")
    newDiv.addEventListener('keyup', textAreaActu);
    newDiv.focus()
    var veryNewDiv = document.createElement("DIV");
    veryNewDiv.setAttribute("class", "liste-input-remove")
    veryNewDiv.addEventListener('click', removeInput);
    event.target.parentNode.parentNode.children[0].appendChild(veryNewDiv)
    veryNewDiv.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`
    noteNumber += 1
    var element = document.getElementsByClassName("liste-article-title")
    for (let i = 0; i < element.length; i++) {
        if (element[i].value == code.todoListes[i].name)
            code.todoListes[i].elements.push(event.target.value)
    }
}

function addListe(event) {
    var newListe = document.createElement("div");
    var parentDiv = document.getElementsByClassName("liste-blanche");
    newListe.setAttribute("class", "liste-blanche")
    parentDiv[parentDiv.length - 1].after(newListe);
    newListe.innerHTML = `<div class="liste-article">
    <input class="liste-article-title" onkeyup="textInputActu(event)"></input>
    </div>
    <div class="liste-remove" onclick="removeListe(event)">-</div>
    <a onclick="addPraListe(event)">
        <div>+</div>
    </a>`

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://92.222.69.104:80/todo/listes", true);
    xhttp.setRequestHeader("content-type", "application/json; charset=utf-8");

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            //console.log(this.responseText);
        }
    };
    code.todoListes.push({ name: "", elements: [] })

    var body = code

    xhttp.send(JSON.stringify(body));
}

function textAreaActu(event) {
    post(event)
}

function textInputActu(event) {
    post(event)
}

function appMdp(event) {
    var mdp = document.getElementById('mdp').value
    var bar = document.getElementById('bar')
    var mdpl = mdp.length;
    if (mdpl <= 5) {
        bar.setAttribute('class', 'bg-danger')
        bar.style.width = '25' + '%'
    } else if (mdpl >= 6 && mdpl <= 7) {
        bar.setAttribute('class', 'bg-warning')
        bar.style.width = '50' + '%'
    } else if (mdpl >= 8 && mdpl <= 10) {
        bar.setAttribute('class', 'bg-primary')
        bar.style.width = '75' + '%'
    } else if (mdpl >= 11 && mdpl <= 13) {
        bar.setAttribute('class', 'bg-success')
        bar.style.width = '100' + '%'
    }
}

function removeListe(event) {
    event.target.parentElement.remove()
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://92.222.69.104:80/todo/listes", true);
    xhttp.setRequestHeader("content-type", "application/json; charset=utf-8");

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            //console.log(this.responseText);
        }
    };

    var index = code.todoListes.indexOf(event.target)
    code.todoListes.splice(index, 1)

    var body = code

    xhttp.send(JSON.stringify(body));
}

function removeInput(event) {
    var textArea = document.getElementsByClassName("liste-input")
    if (event.target.previousSibling) {

        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://92.222.69.104:80/todo/listes", true);
        xhttp.setRequestHeader("content-type", "application/json; charset=utf-8");

        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                //console.log(this.responseText);
            }
        };

        var element = document.getElementsByClassName("liste-article-title")
        for (let i = 0; i < element.length; i++) {
            var index = code.todoListes[i].elements.indexOf(event.target.previousSibling.value)
            code.todoListes[i].elements.splice(index, 1)
        }

        var body = code

        xhttp.send(JSON.stringify(body));

        event.target.previousSibling.remove();
        event.target.remove();
        noteNumber -= 1
        var texteEme
        for (let i = 1; i < textArea.length + 1; i++) {
            if (i == 1) texteEme = "ère"
            else texteEme = "ème"
            textArea[i - 1].placeholder = "Tu peux écrire, " + i + texteEme + " note ajoutée";
        }
    }
}

function post(event) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://92.222.69.104:80/todo/listes", true);
    xhttp.setRequestHeader("content-type", "application/json; charset=utf-8");

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            //console.log(this.responseText);
        }
    };

    var element = document.getElementsByClassName("liste-article-title")
    for (let i = 0; i < element.length; i++) {
        code.todoListes[i].name = element[i].value;
    }

    var element = document.getElementsByClassName("liste-article-title")
    for (let i = 0; i < element.length; i++) {
        var input = document.getElementsByClassName("liste-input")
        for (let y = 0; y < input.length; y++) {
            if (input[y].value.length >= 5) {
                if (input[y].value == event.target.value) {
                    code.todoListes[i].elements[y] = input[y].value
                    break;
                }
            }
        }
    }


    console.log(code)

    var body = code

    xhttp.send(JSON.stringify(body));
}