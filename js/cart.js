let enlaceCarrito = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let arrayProducts=[];
function mostrarProducto(array){
 
    let htmlContentToAppend = "";
    
    for (let i = 0; i < array.length; i++) {
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
      <th scope="row"><img id="img_size" src="${array[i].image}" style="width: 70px;height:fit-content;"></th>
      <td>${array[i].name}</td>
      <td>${array[i].currency}<p id="costoProd"> ${array[i].unitCost}</p></td>
      <td><input type="number" id="cantProd" min="1" onchange="updateValue(arrayProducts[${i}])" value="${array[i].count}"></td>
      <td>${array[i].currency} <p id="subTotal" >${array[i].unitCost*array[i].count}</p></td>
    </tr>
  </tbody>
</table>
`
}
document.getElementById("infoProducto").innerHTML = htmlContentToAppend;

}

function updateValue(array){
  let cant = document.getElementById("cantProd").value;
  let subtotal = cant * array.unitCost;
 document.getElementById("subTotal").innerHTML = subtotal;
}

document.addEventListener("DOMContentLoaded", function (e) {

getJSONData(enlaceCarrito).then(function (resultObj) {
    if (resultObj.status === "ok") {
      arrayProducts= resultObj.data.articles;
      mostrarProducto(arrayProducts);
    }
});

});