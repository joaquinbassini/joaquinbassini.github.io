document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submit_login").addEventListener("click", function () {
        let usuario = document.getElementById("user").value;
        let contrasena = document.getElementById("password").value;

        if (usuario != "" && contrasena != "") {
            window.location = "front.html"
        }


    })
})