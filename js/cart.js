let enlaceCarrito = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
function mostrarProducto(array){
 
    let htmlContentToAppend = "";
    htmlContentToAppend+=`
    <table class="table">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Nombre</th>
      <th scope="col">Costo</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Subtotal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"><img id="img_size" src="${array.articles[0].image}" style="width: 70px;height:fit-content;"></th>
      <td>${array.articles[0].name}</td>
      <td>${array.articles[0].currency}<p id="costoProd"> ${array.articles[0].unitCost}</p></td>
      <td><input type="number" id="cantProd" min="1" onchange="${updateValue(array.articles[0])}"></td>
      <td>${array.articles[0].currency} <p id="subTotal"></p></td>
    </tr>
  </tbody>
</table>
`

document.getElementById("infoProducto").innerHTML += htmlContentToAppend;

}

function updateValue(array) {
  let cant = 2;
  array.count = cant;
  let subtotal = array.count * array.unitCost;
 document.getElementById("subTotal").innerHTML = subtotal;
}

document.addEventListener("DOMContentLoaded", function (e) {

getJSONData(enlaceCarrito).then(function (resultObj) {
    if (resultObj.status === "ok") {
      mostrarProducto(resultObj.data);
    }
});

});