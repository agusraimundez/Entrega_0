let enlaceInfo = PRODUCT_INFO_URL + localStorage.getItem('prodID') + EXT_TYPE;
let enlaceComent = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem('prodID') + EXT_TYPE;
let enlaceProd = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE;
let prodID =localStorage.getItem('prodID');


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
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img src="${productInfo.images[0]}" class="d-block w-100">
                </div>
                <div class="carousel-item">
                <img src="${productInfo.images[1]}" class="d-block w-100">
                </div>
                <div class="carousel-item">
                <img src="${productInfo.images[2]}" class="d-block w-100">
                </div>
                <div class="carousel-item">
                <img src="${productInfo.images[3]}" class="d-block w-100">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>    
    </div>
        `
        
    document.getElementById("info-container").innerHTML = htmlContentToAppend; 
}

function mostrarComentarios(comentarios){
    let htmlContentToAppend = "";

    for(let i = 0; i < comentarios.length; i++){
        let comment = comentarios[i];

        htmlContentToAppend = `
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
        document.getElementById("comments-container").innerHTML += htmlContentToAppend; 
    }
}

function agregarComentario(){
    let usuario={}
    let hoy = new Date ();
    let fecha = hoy.getFullYear() + "-" + (hoy.getMonth()+1) + "-" + hoy.getDate() + " " + hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    usuario.user = localStorage.getItem('username');
    usuario.description =document.getElementById('comentar').value;
    usuario.dateTime=fecha;
    usuario.score=document.getElementById('puntaje').value;
    document.getElementById("comments-container").innerHTML += 
    `<TABLE BORDER>
    <TR>
    <TD><b>${usuario.user}</b>-${fecha}-${mostrarEstrellas(usuario.score)}</TD>
    </TR>
    <TR>
    <TD>${usuario.description}</TD>
    </TR></TABLE BORDER>`; 
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
    
    return estrellas;
}
function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
}

function mostrarRecomendados(arrayProd){
    
    let arrayProducts=arrayProd.products;
    let htmlContentToAppend = "";
    for (let i = 0; i < arrayProd.products.length; i++) {
        if(arrayProd.products[i].id==prodID){
            arrayProducts.splice(i,1);
        }      
    }
    
    htmlContentToAppend = `
    <h5>Productos relacionados</h5><br>   
    <div class="conteiner product-rel">
        <div class="cursor-active marco" onclick="setProdID(${arrayProducts[1].id})">
        <img  src="${arrayProducts[1].image}" class="size">
        <h5>${arrayProducts[1].name}</h5>
        </div>
        <div class=" cursor-active marco" onclick="setProdID(${arrayProducts[2].id})">
        <img  src="${arrayProducts[2].image} "class="size">
        <h5>${arrayProducts[2].name}</h5>
        </div>
    </div>
    `

    document.getElementById("productos-relacionados").innerHTML += htmlContentToAppend;
    
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
    getJSONData(enlaceProd).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            mostrarRecomendados(resultObj.data);
        }
    });
    document.getElementById('enviar-comentario').addEventListener('click', ()=>{
        agregarComentario();
    })
    
});