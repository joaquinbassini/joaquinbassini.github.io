let array_complete = [];
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let array_temporal = [];
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if (aCount < bCount) { return -1; }
            if (aCount > bCount) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }

            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductList(array) {
    let htmlContentToAppend = ""

    let htmlContentToAppend1 = ""

    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let product = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {
            htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name + ' - ' + product.currency + ' ' + product.cost + ` </h4> 
                        <p> `+ product.description + `</p> 
                        </div>
                        <small class="text-muted">`+ product.soldCount + ' ' + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        }

        console.log(array_complete)

        document.getElementById("prueba_1").innerHTML = htmlContentToAppend;

        let categoryname = array_complete.catName

        htmlContentToAppend1 = `Verás aquí todos los productos de la categoría ` + categoryname


        document.getElementById("name_category").innerHTML = htmlContentToAppend1

    }

}

let idlink = localStorage.getItem("catID")
console.log(idlink)

let Real_URL = "https://japceibal.github.io/emercado-api/cats_products/" + idlink + ".json"


function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showProductList();
}

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(Real_URL).then(resultado => {
        if (resultado.status == "ok") {
            array_complete = resultado.data;
            array_temporal = resultado.data;
            currentCategoriesArray = array_temporal.products
            showProductList(currentCategoriesArray);

        } else {
            alert("Algo salio mal: " + resultado.data)
        }

    })

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductList();
    });
});






