let enlaceInfo = PRODUCT_INFO_URL + localStorage.getItem('prodID') + EXT_TYPE;
let info_container = document.getElementById("info-container");


function mostrarInfo(productInfo){
    let htmlContentToAppend = "";

        htmlContentToAppend += `
        <div id="info-container">
        <h1>${productInfo.name}</h1>
        <hr>
        <h3>Precio</h3>
        <p>${productInfo.cost}</p>
        <h3>Descripción</h3>
        <p>${productInfo.description}</p>
        <h3>Categoría</h3>
        <p>${productInfo.category}</p>
        <h3>Cantidad de vendidos</h3>
        <p>${productInfo.soldCount}</p>
        <h3>Imágenes ilustrativas</h3>
        <div id="img-grid">
        <img src="${productInfo.images[0]}">
        <img src="${productInfo.images[1]}">
        <img src="${productInfo.images[2]}">
        <img src="${productInfo.images[3]}">
        </div>
      </div>
        `
        
    document.getElementById("info-container").innerHTML = htmlContentToAppend; 
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(enlaceInfo).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            mostrarInfo(resultObj.data);
        }
    });
});