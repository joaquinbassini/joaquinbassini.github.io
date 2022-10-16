let productLink = localStorage.getItem("productID")

console.log(productLink)
let dato_json = []
let array_comments = ""

let RealProduct_URL = "https://japceibal.github.io/emercado-api/products/" + productLink + ".json"

let RealComment_URL = "https://japceibal.github.io/emercado-api/products_comments/" + productLink + ".json"

function showProduct(dato_json) {
    let htmlContentToAppend = ""

    let htmlContentToAppend2 = ""

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
               
               
               
              

            </div>
        </div>
      `
    let imagenes = dato_json.images

    htmlContentToAppend2 += `<h3> Imágenes ilustrativas </h2><br>`

    for (let i = 0; i < (imagenes).length; i++) {
        htmlContentToAppend2 += `
        <div>        
            <img src ="${dato_json.images[i]}" height="200px">   
        </div>
            `

    }



    document.getElementById("productinfo").innerHTML = htmlContentToAppend + htmlContentToAppend2

}


function showComments(array_comments) {
    let htmlContentToAppend3 = ""
    let largo1 = array_comments.length


    for (let i = 0; i < largo1; i++) {
        console.log(i)
        htmlContentToAppend3 += `
        <div>
           <br> 
        <div>
               <ul>
                 <li>${array_comments[i].user}</li>
                 <li>${array_comments[i].dateTime}</li>
                 <li>${mostrarEstrellas(array_comments[i].score)}</li>
                 <li>${array_comments[i].description}</li>
               </ul>
              
               
        
            </div>
        </div>
      `
    }

    document.getElementById("commentsinfo").innerHTML = htmlContentToAppend3


}

function mostrarEstrellas(score) {
    let star = ""

    for (i = 1; i <= 5; i++) {
        console.log(score)

        if (i <= score) {
            star += `<span class= "fa fa-star checked"></span>`
        }


    }
    return star

}

function showRelated(dato_json) {

    let htmlContentToAppend4 = ""
    let largo2 = (dato_json.relatedProducts).length

    htmlContentToAppend4 += `<h3> Productos Relacionados </h2><br>`

    for (i = 0; i < largo2; i++) {
        htmlContentToAppend4 += `
        
              <ul onclick="setProductID(${dato_json.relatedProducts[i].id})">
                <p>${dato_json.relatedProducts[i].name}</li>   
                <p><img src ="${dato_json.relatedProducts[i].image}" height="200px"></li>
                 
                 
               </ul>
        
        
        `
    }

    document.getElementById("related").innerHTML = htmlContentToAppend4

}

function setProductID(id) {
    let idproduct = localStorage.setItem("productID", id);
    window.location = "product-info.html"
}


document.addEventListener("DOMContentLoaded", function () {
    getJSONData(RealProduct_URL).then(resultado => {
        if (resultado.status == "ok") {

            dato_json = resultado.data;

            showProduct(dato_json);
            showRelated(dato_json);

        } else {
            alert("Algo salio mal: " + resultado.data)
        }
    })

    getJSONData(RealComment_URL).then(resultado => {
        if (resultado.status == "ok") {

            array_comments = resultado.data;

            showComments(array_comments);

        } else {
            alert("Algo salio mal: " + resultado.data)
        }
    })


});







