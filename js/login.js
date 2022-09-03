document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submit_login").addEventListener("click", function () {
        let usuario = document.getElementById("user").value;
        let contrasena = document.getElementById("password").value;


        if (usuario != "" && contrasena != "") {
            window.location = "front.html"

        }


    })
})

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submit_login").addEventListener("click", function () {

        let dato_usuario = document.getElementById("user").value;

        let dato_usuario_json = JSON.stringify(dato_usuario);

        localStorage.setItem("dato_usuario", dato_usuario_json);

    })


})



if (localStorage.getItem("dato_usuario")) {
    dato_user = localStorage.getItem("dato_usuario")

    dato_usuario = JSON.parse(dato_user);

    document.getElementById("usershow").innerHTML = "Usuario: " + dato_usuario + ""


}

