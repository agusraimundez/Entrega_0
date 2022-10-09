let enlaceCarrito = "https://japceibal.github.io/emercado-api/user_cart/25801.json";


function mostrarProducto(array){

    let htmlContentToAppend = "";
    let subTotal;
    subTotal=(array.articles[0].unitCost)*(array.articles[0].count);
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
      <td>${array.articles[0].currency} ${array.articles[0].unitCost}</td>
      <td><input type="number" id="cant_prod" value="${array.articles[0].count}"min="1"></td>
      <td>${array.articles[0].currency} ${subTotal}</td>
    </tr>
  </tbody>
</table>`

document.getElementById("infoProducto").innerHTML += htmlContentToAppend;
}


document.addEventListener("DOMContentLoaded", function (e) {

getJSONData(enlaceCarrito).then(function (resultObj) {
    if (resultObj.status === "ok") {
        mostrarProducto(resultObj.data);
    }
});

});