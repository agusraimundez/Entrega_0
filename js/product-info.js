let enlaceInfo = PRODUCT_INFO_URL + localStorage.getItem('prodID') + EXT_TYPE;
let enlaceComent = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem('prodID') + EXT_TYPE;
let enlaceProd = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE;
let prodID = localStorage.getItem('prodID');



function mostrarInfo(productInfo) {

    let htmlContentToAppend = "";
    let htmlContent = "";

    htmlContentToAppend += `
        <div id="info-container">
            <div id="product-detail">
            <h1>${productInfo.name}</h1>
            <hr>
            <h3 class="fw-normal text-decoration-underline">Precio:</h3>
            <p>USD ${productInfo.cost}</p>
            <h3 class="fw-normal text-decoration-underline">Descripción:</h3>
            <p>${productInfo.description}</p>
            <h3 class="fw-normal text-decoration-underline">Categoría:</h3>
            <p>${productInfo.category}</p>
            <h3 class="fw-normal text-decoration-underline">Cantidad de vendidos:</h3>
            <p>${productInfo.soldCount}</p>
            </div>
            `
            htmlContent += `
            <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
            <h3>Imágenes ilustrativas</h3>
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="10000">
                <img src="${productInfo.images[0]}" class="d-block w-100">
                <div class="carousel-caption d-none d-md-block">
                </div>
                </div>
                <div class="carousel-item" data-bs-interval="2000">
                <img src="${productInfo.images[1]}" class="d-block w-100">
                <div class="carousel-caption d-none d-md-block">
                </div>
                </div>
                <div class="carousel-item">
                <img src="${productInfo.images[2]}" class="d-block w-100">
                <div class="carousel-caption d-none d-md-block">
                </div>
                </div>
                <div class="carousel-item">
                <img src="${productInfo.images[3]}" class="d-block w-100">
                <div class="carousel-caption d-none d-md-block">
                </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            </div>
`

    document.getElementById("info-container").innerHTML += htmlContentToAppend;
    document.getElementById("image-container").innerHTML += htmlContent;
}

function mostrarComentarios(comentarios) {
    let htmlContentToAppend = "";
    for (let i = 0; i < comentarios.length; i++) {
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

function agregarComentario() {
    let usuario = {}
    let hoy = new Date();
    let fecha = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate() + " " + hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    usuario.user = localStorage.getItem('username');
    usuario.description = document.getElementById('comentar').value;
    usuario.dateTime = fecha;
    usuario.score = document.getElementById('puntaje').value;
    document.getElementById("comments-container").innerHTML +=
        `<TABLE BORDER>
    <TR>
    <TD><b>${usuario.user}</b>-${fecha}-${mostrarEstrellas(usuario.score)}</TD>
    </TR>
    <TR>
    <TD>${usuario.description}</TD>
    </TR></TABLE BORDER>`;
}

function mostrarEstrellas(cant) {
    let estrellas = '';

    for (let i = 1; i <= 5; i++) {
        if (i <= cant) {
            estrellas += '<i class="fas fa-star checked"></i>';
        } else {
            estrellas += '<i class="far fa-star"></i>';
        }

    }

    return estrellas;
}
function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
}

function mostrarRecomendados(arrayProd) {
   
    let htmlContentToAppend = "";
    
        htmlContentToAppend = `
    <h5>Productos relacionados</h5><br>   
    <div class="conteiner product-rel">
        <div class="cursor-active marco" onclick="setProdID(${arrayProd.relatedProducts[0].id})">
        <img  src="${arrayProd.relatedProducts[0].image}" class="size">
        <h5>${arrayProd.relatedProducts[0].name}</h5>
        </div>
        <div class=" cursor-active marco" onclick="setProdID(${arrayProd.relatedProducts[1].id})">
        <img  src="${arrayProd.relatedProducts[1].image} "class="size">
        <h5>${arrayProd.relatedProducts[1].name}</h5>
        </div>
    </div>
    ` 


    document.getElementById("productos-relacionados").innerHTML += htmlContentToAppend;

}


document.addEventListener("DOMContentLoaded", function (e) {
    let usuario = localStorage.getItem('username');
    if (usuario == null) {
        window.location.href = 'login.html';
    } else {
        document.getElementById('usuario').innerHTML = usuario;
    }
    getJSONData(enlaceInfo).then(function (resultObj) {
        if (resultObj.status === "ok") {
            mostrarInfo(resultObj.data);
        }
    });
    getJSONData(enlaceComent).then(function (resultObj) {
        if (resultObj.status === "ok") {
            mostrarComentarios(resultObj.data);
        }
    });
    getJSONData(enlaceInfo).then(function (resultObj) {
        if (resultObj.status === "ok") {
            mostrarRecomendados(resultObj.data);
        }
    });
    document.getElementById('enviar-comentario').addEventListener('click', () => {
        agregarComentario();
    })

});