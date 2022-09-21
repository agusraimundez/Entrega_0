let enlace = PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE;
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentCategoriesArray = productsArray;
    }

    currentCategoriesArray = sortProducts(currentSortCriteria, currentCategoriesArray);
    listar(currentCategoriesArray);

   
}

function listar(currentCategoriesArray){
    let htmlContentToAppend = "";

    for(let i = 0; i < currentCategoriesArray.length; i++){
        let products = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))){

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action pointer" onclick="setProdID(${products.id})">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ products.name + "-" + products.currency + "-" + products.cost +`</h4> 
                        <p> `+ products.description +`</p> 
                        </div>
                        <small class="text-muted">` + products.soldCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        }
        
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }
}
function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
}

function search(array){

    let quest = document.getElementById('search').value;
    let arrayFilter = currentCategoriesArray.filter(currentCategoriesArray => {
        return (currentCategoriesArray.name.toLowerCase().indexOf(quest.toLowerCase()) > -1) || (currentCategoriesArray.description.toLowerCase().indexOf(quest.toLowerCase()) > -1);
    })
    listar(arrayFilter);
}

/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en productsArray.
-Por último, se llama a listaAutos() pasándole por parámetro productsArray.

*/

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(enlace).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            currentCategoriesArray = resultObj.data.products;
            listar(currentCategoriesArray);
        }
    });
    
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME);
        currentSortCriteria=ORDER_ASC_BY_NAME;
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_NAME);
        currentSortCriteria=ORDER_DESC_BY_NAME;
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
        currentSortCriteria=ORDER_BY_PROD_COUNT;
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        listar(currentCategoriesArray);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;
        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }
        listar(currentCategoriesArray);

    });

    document.getElementById('search').addEventListener('keyup', ()=>{
        search(currentCategoriesArray);
    })
});