// A lot of element to get here
const modal = document.getElementById("myModal");
const myUL = document.getElementById("myUL");
const PurchaseOrderAddress = document.getElementById("PurchaseOrderAddress");
const PurchaseOrderContactPerson = document.getElementById("PurchaseOrderContactPerson");
const PurchaseOrderStatus = document.getElementById("PurchaseOrderStatus");
const table = document.getElementById("table");

const url = "http://localhost:5000/"; // local server id

let purchaseOrderData;

fetch(url) // fetch data from url
  .then(response => response.json())
  .then((data) => {
    purchaseOrderData = data.mvPurchaseOrders;
    console.log(purchaseOrderData);
    // add elements to  main list
    for (let index = 0; index < purchaseOrderData.length; index++) {
      newElement(myUL, `${purchaseOrderData[index].PurchaseOrderTypeAbbreviation}  -  ${purchaseOrderData[index].PurchaseOrderNo}`, index);
    }
  });

/// gets a parent text and item index. Creates item and an onClick event 
function newElement(parent, text, index) {
  var li = document.createElement("li");
  var t = document.createTextNode(text);
  li.appendChild(t);

  parent.appendChild(li);
  li.onclick = function () { showModal(index); };
}

//Shows modal, clean table rows other than first row, create new rows and columns with PurchaseOrderDetails
function showModal(index) {
  modal.style.display = "block";
  PurchaseOrderAddress.innerText = purchaseOrderData[index].PurchaseOrderAddress;
  PurchaseOrderContactPerson.innerText = purchaseOrderData[index].PurchaseOrderContactPerson;
  PurchaseOrderStatus.innerText = purchaseOrderData[index].PurchaseOrderStatus;

  // delete all rows except first
  for (let i in table.rows) {
    let row = table.rows[i];
    if (i > 0)
      row.remove();
  }


  pod = purchaseOrderData[index].PurchaseOrderDetails; // for simplicity

  for (let index = 0; index < pod.length; index++) {
    // create row
    let row = document.createElement("tr");
    // create and append columns
    row.appendChild(CreateNewColumn(pod[index].PurchaseOrderRowProductSKU));
    row.appendChild(CreateNewColumn(pod[index].PurchaseOrderRowQuantity));
    row.appendChild(CreateNewColumn(pod[index].PurchaseOrderRowUnitPriceWithoutTaxOrDiscount));
    row.appendChild(CreateNewColumn(pod[index].PurchaseOrderRowTotalAmount));
    // append row
    table.appendChild(row);
  }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function CreateNewColumn(text) {
  let c = document.createElement("td");
  c.innerText = text;
  return c;
}