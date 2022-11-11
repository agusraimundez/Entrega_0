let enlaceCarrito = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let micarrito = [];
let borro = document.getElementsByName('borrar');
/*
function agregarProducto(prod){
  let producto = localStorage.getItem("prodID");
  let myprod = {
    name: 'Ford',
    currency: 12,
    unitCost: 'Mustang',
    image: 1969,
    count: 1

};
  arrayProducts.push(item.value);
  localStorage.setItem('datos',JSON.stringify(list));
  item.value="";
  showList(list);


}
*/
function cargarCarrito(array) {
  for (let i = 0; i < array.length; i++) {
    micarrito.push(array[i]);

  }
}

function eliminar(posicion) {
  micarrito.splice(posicion, 1);
  localStorage.setItem("carrito", JSON.stringify(micarrito))
  mostrarProducto();
  calculate();
}
function mostrarProducto() {

  let htmlContentToAppend = "";
  for (let i = 0; i < micarrito.length; i++) {
    htmlContentToAppend += `
    
          <tr>
          <th scope="row"><img id="img_size" src="${micarrito[i].images[0]}" style="width: 70px;height:fit-content;"></th>
          <td>${micarrito[i].name}</td>
          <td>${micarrito[i].currency}<span name="costoProd"> ${micarrito[i].cost}</span></td>
          <td><input type="number" name="cantProd" id="cantProd${micarrito[i].id}" min="1" onchange="calculate()" value="1"></td>
          <td><span name="moneda">${micarrito[i].currency}</span> <span name="SubTotales" id="subTotal${micarrito[i].id}" >${micarrito[i].cost}</span></td>
          <td><img src="img/eliminar.png" name="borrar" width=30 class="cursor-active"></td>
          </tr>`
  }
  document.getElementById("listaCarro").innerHTML = htmlContentToAppend;

  for (let i = 0; i < borro.length; i++) {
    borro[i].addEventListener('click', () => {
      eliminar(i);

    })
  }
}

function calculate(){

  let cantidades = document.getElementsByName("cantProd");
  let precios = document.getElementsByName("costoProd");
  let subtotales = document.getElementsByName("SubTotales");
  let envios = document.getElementsByName("envios");
  let monedas = document.getElementsByName("moneda");
  let subt= 0; 
  let costoEnvio =0;

  for (let i = 0; i < cantidades.length; i++) {
   
    subtotales[i].innerHTML = parseFloat(precios[i].innerHTML)* parseFloat(cantidades[i].value);
    if(monedas[i].innerText=="UYU"){
      subt+=subtotales[i].innerText/40;
    }else{
      subt +=parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);
    }
    
    
  }
  for (let opc of envios) {
    if(opc.checked){
      costoEnvio=subt*opc.value;
    }
    let totalisimo = subt + costoEnvio;
  
 // document.getElementById('SubTotales').innerHTML= "$ " +  subt
  document.getElementById('totalPos').innerHTML= "USD " +  subt
  document.getElementById('costoE').innerHTML= "USD" +  costoEnvio
  document.getElementById('totalisimo').innerHTML= "USD" +  totalisimo
  }
  
}



document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(enlaceCarrito).then(function (resultObj) {
    if (resultObj.status === "ok") {
      arrayProducts = resultObj.data.articles;
      cargarCarrito(JSON.parse(localStorage.getItem("carrito")));
      mostrarProducto();
      calculate();
    }
  });

  (function () {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          event.preventDefault()

          form.classList.add('was-validated')
        }, false)
      })
  })()
  document.getElementById('transferenciaBanc').addEventListener('click', () => {
    document.getElementById("numCuenta").disabled = false;
    document.getElementById("numTarjeta").disabled = true;
    document.getElementById("codSeg").disabled = true;
    document.getElementById("vencimiento").disabled = true;
  })
  document.getElementById('tarjetaCredito').addEventListener('click', () => {
    document.getElementById("numTarjeta").disabled = false;
    document.getElementById("codSeg").disabled = false;
    document.getElementById("vencimiento").disabled = false;
    document.getElementById("numCuenta").disabled = true;
  })

  document.getElementById('btnFinalizar').addEventListener('click', () => {
    document.getElementById('select').innerHTML = ""
    if (!document.getElementById('tarjetaCredito').checked && !document.getElementById('transferenciaBanc').checked){
      
        document.getElementById('select').innerHTML += "Debe seleccionar una forma de pago"

    }
    if(document.getElementById('tarjetaCredito').checked||document.getElementById('transferenciaBanc').checked) {
        Swal.fire({
          icon: 'success',
          title: '¡Has comprado con éxito!'
        })
      }
      
  
  })
  
});