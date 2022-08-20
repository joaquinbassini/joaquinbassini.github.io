let productArray = [];

function showProductList(array) {
    array = array.products;
    //console.log(array);

    let htmlContentToAppend = ""


    for (let i = 0; i < array.length; i++) {
        let category = array[i];
        //console.log(array.length)
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ category.name + ' - ' + category.currency + ' ' + category.cost + ` </h4> 
                        <p> `+ category.description + `</p> 
                        </div>
                        <small class="text-muted">`+ category.soldCount + ' ' + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `

        document.getElementById("prueba_1").innerHTML = htmlContentToAppend;
    }
}




document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCTS_URL).then(resultado => {
        if (resultado.status == "ok") {
            productArray = resultado.data;
            showProductList(productArray);
        } else {
            alert("Algo salio mal: " + resultado.data)
        }

    })
})





