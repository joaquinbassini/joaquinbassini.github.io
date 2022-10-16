
let urlCart = "https://japceibal.github.io/emercado-api/user_cart/25801.json"

let cart1 = ""
let htmlContentToAppend = ""
let htmlContentToAppend2 = ""


function showCart(cart1) {
    let cartData = cart1.articles[0]

    htmlContentToAppend += `
        <div>
        <br><h4>Artículos a comprar</h4>
        <br> <img src ="${cartData.image}" height="200px">  
        <div >
               
               <br> <h2> Nombre: ${cartData.name} </h2><br>
               <h2> Costo: ${cartData.currency}  ${cartData.unitCost} </h2><br>
               <h2> Cantidad : <input type="number" id="cantidad"
       min="1"  value = "1" onchange="showSubTotal(value)">   </h2><br> `






    document.getElementById("cart").innerHTML = htmlContentToAppend

}

function showSubTotal(value) {

    htmlContentToAppend2 = ""

    console.log(value)
    let cartData = cart1.articles[0]

    if (value != 1) {
        htmlContentToAppend2 += `
       
               <h3> Subtotal: ${cartData.currency} ${(cartData.unitCost) * value}</h3><br>
              `
    } else {
        htmlContentToAppend2 += `
       
               <h3> Subtotal: ${cartData.currency} ${cartData.unitCost}</h3><br>
              `

    }



    document.getElementById("cart1").innerHTML = htmlContentToAppend2
}


document.addEventListener("DOMContentLoaded", function () {
    getJSONData(urlCart).then(resultado => {
        if (resultado.status == "ok") {

            cart1 = resultado.data;

            showCart(cart1);
            showSubTotal(1)

        } else {
            alert("Algo salio mal: " + resultado.data)
        }
    })
});

