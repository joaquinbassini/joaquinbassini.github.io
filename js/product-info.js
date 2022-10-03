let productLink = localStorage.getItem("productID")
console.log(productLink)

let dato_json = []

let RealProduct_URL = "https://japceibal.github.io/emercado-api/products/" + productLink + ".json"

function showProduct(dato_json) {
    let htmlContentToAppend = ""

    htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
               <h2> ${dato_json.name} </h2><br>
               <h3> Precio </h2><br>
               <h5> ${dato_json.currency}  ${dato_json.cost}   </h5><br>
               <h3> Descripcion </h2><br>
               <h5> ${dato_json.description} </h2><br>
               <h3> Categoria </h2><br>
               <h5> ${dato_json.category} </h2><br>
               <h3> Cantidad de vendidos </h2><br>
               <h5> ${dato_json.soldCount} </h2><br>
               <h3> Imágenes ilustrativas </h2><br>
               
               
              

            </div>
        </div>
        `


    document.getElementById("productinfo").innerHTML = htmlContentToAppend;

}


document.addEventListener("DOMContentLoaded", function () {
    getJSONData(RealProduct_URL).then(resultado => {
        if (resultado.status == "ok") {

            dato_json = resultado.data;

            showProduct(dato_json);

        } else {
            alert("Algo salio mal: " + resultado.data)
        }
    })


});







