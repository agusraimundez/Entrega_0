let enlaceInfo = PRODUCT_INFO_URL + localStorage.getItem('prodID') + EXT_TYPE;
let enlaceComent = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem('prodID') + EXT_TYPE;
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

function mostrarComentarios(comentarios){
    let htmlContentToAppend = "";

    for(let i = 0; i < comentarios.length; i++){
        let comment = comentarios[i];

        htmlContentToAppend += `
        <div class="comments-container">
        <TABLE BORDER>
            <TR>
                <TD><b>${comentarios[i].user}</b>-${comentarios[i].dateTime}-${mostrarEstrellas(comentarios[i].score)}</TD>
            </TR>
            <TR>
                <TD>${comentarios[i].description}</TD>
            </TR>
        </TABLE>
         </div>
        `      
        document.getElementById("comments-container").innerHTML = htmlContentToAppend; 
    }
}

function mostrarEstrellas(cant){
    let estrellas='';

    for (let i = 1; i <= 5; i++) {
        if(i<=cant){
            estrellas += '<i class="fas fa-star checked"></i>';
        }else{
            estrellas += '<i class="far fa-star"></i>';
        }
        
    }
    document.getElementById("comments-container").innerHTML += estrellas;
    return estrellas;
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(enlaceInfo).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            mostrarInfo(resultObj.data);
        }
    });
    getJSONData(enlaceComent).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            mostrarComentarios(resultObj.data);
        }
    });
});