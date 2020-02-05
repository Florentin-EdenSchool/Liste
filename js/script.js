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
                console.log("Inscrit")
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
            console.log(data)
            console.log("Juste")
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