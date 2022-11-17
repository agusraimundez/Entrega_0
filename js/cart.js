let enlaceCarrito = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let micarrito = [];
let borro = document.getElementsByName('borrar');


//Recorre los elementos del carrito y los muestra en una tabla
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

//Carga los elementos ddel array a carrito del localStorage
function cargarCarrito(array) {
  for (let i = 0; i < array.length; i++) {
    micarrito.push(array[i]);

  }
}

//Elimina el elemento cuya posicion le pase y actualiza el carrito
function eliminar(posicion) {
  micarrito.splice(posicion, 1);
  localStorage.setItem("carrito", JSON.stringify(micarrito))
  mostrarProducto();
  calculate();
}

//Desabilita los input correspondientes
function desabilitar() {
  if (document.getElementById('tarjetaCredito').checked) {
    document.getElementById("numTarjeta").disabled = false;
    document.getElementById("codSeg").disabled = false;
    document.getElementById("vencimiento").disabled = false;
    document.getElementById("numCuenta").disabled = true;
  }
  if (document.getElementById('transferenciaBanc').checked) {
    document.getElementById("numCuenta").disabled = false;
    document.getElementById("numTarjeta").disabled = true;
    document.getElementById("codSeg").disabled = true;
    document.getElementById("vencimiento").disabled = true;
  }
}
//Calcula subtotales y costo de envio
function calculate() {

  let cantidades = document.getElementsByName("cantProd");
  let precios = document.getElementsByName("costoProd");
  let subtotales = document.getElementsByName("SubTotales");
  let envios = document.getElementsByName("envios");
  let monedas = document.getElementsByName("moneda");
  let subt = 0;
  let costoEnvio = 0;

  for (let i = 0; i < cantidades.length; i++) {

    subtotales[i].innerHTML = parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);
    if (monedas[i].innerText == "UYU") {
      subt += subtotales[i].innerText / 40;
    } else {
      subt += parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);
    }


  }
  for (let opc of envios) {
    if (opc.checked) {
      costoEnvio = subt * opc.value;
    }
    let totalisimo = subt + costoEnvio;

    document.getElementById('totalPos').innerHTML = "USD " + subt.toFixed(2)
    document.getElementById('costoE').innerHTML = "USD" + costoEnvio.toFixed(2)
    document.getElementById('totalisimo').innerHTML = "USD" + totalisimo.toFixed(2)
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
  document.getElementById("usuario").innerHTML= localStorage.getItem("username");
  //Validaciones
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
          if (!document.getElementById('tarjetaCredito').checked && !document.getElementById('transferenciaBanc').checked) {
            document.getElementById('selectPago').innerHTML = `Debe seleccionar una forma de pago.`

          } else {
            document.getElementById('selectPago').innerHTML = ""

            if (document.getElementById('tarjetaCredito').checked) {// si eligio tarjeta de credito
              if ((document.getElementById("numTarjeta").value != "") && (document.getElementById("codSeg").value != "") && (document.getElementById("vencimiento").value != "")) {// checkeo que no esten vacios los campos
                Swal.fire({
                  icon: 'success',
                  title: 'Has comprado con exito!'
                })
              } else {
                document.getElementById('selectPago').innerHTML = `Debe seleccionar una forma de pago.`
              }
            } else if (document.getElementById('transferenciaBanc').checked) {// si eligio transferencia
              if (document.getElementById("numCuenta").value != "") {//checkeo que no este vacio el campo

                Swal.fire({
                  icon: 'success',
                  title: 'Has comprado con exito!'
                })
              } else {
                document.getElementById('selectPago').innerHTML = `Debe seleccionar una forma de pago.`
              }
            }
          }
          event.preventDefault()
          form.classList.add('was-validated')

        }, false)
      })
  })()


});