const url = "http://localhost:5000/";
const modal = document.getElementById("myModal");
const myUL = document.getElementById("myUL");
const PurchaseOrderAddress = document.getElementById("PurchaseOrderAddress");
const PurchaseOrderContactPerson = document.getElementById("PurchaseOrderContactPerson");
const PurchaseOrderStatus = document.getElementById("PurchaseOrderStatus");
const closeBtn = document.getElementsByClassName("close")[0];
const table = document.getElementById("table");

let purchaseOrderData;

fetch(url)
.then(response => response.json())
.then((data) => {
    purchaseOrderData = data.mvPurchaseOrders; 
    console.log(purchaseOrderData);

    for (let index = 0; index < purchaseOrderData.length; index++) {
        newElement(myUL,`${purchaseOrderData[index].PurchaseOrderTypeAbbreviation }  -  ${purchaseOrderData[index].PurchaseOrderNo }`, index);
    }
});

function newElement(parent, text, index) {
    var li = document.createElement("li");
    var t = document.createTextNode(text);
    li.appendChild(t);

    parent.appendChild(li);
    li.onclick = function() { showModal(index); };
}

function showModal(index)
{
    modal.style.display = "block";
    PurchaseOrderAddress.innerText = purchaseOrderData[index].PurchaseOrderAddress;
    PurchaseOrderContactPerson.innerText = purchaseOrderData[index].PurchaseOrderContactPerson;
    PurchaseOrderStatus.innerText = purchaseOrderData[index].PurchaseOrderStatus;

    for (let i in table.rows) {
        let row = table.rows[i];
        if(i > 0)
            row.remove();
     }
    

    pod = purchaseOrderData[index].PurchaseOrderDetails;

    for (let index = 0; index < pod.length; index++) { 
        let row = document.createElement("tr");

        let c1 = document.createElement("td");
        c1.innerText = pod[index].PurchaseOrderRowProductSKU;

        let c2 = document.createElement("td");
        c2.innerText = pod[index].PurchaseOrderRowQuantity;

        let c3 = document.createElement("td");
        c3.innerText = pod[index].PurchaseOrderRowUnitPriceWithoutTaxOrDiscount;

        let c4 = document.createElement("td");
        c4.innerText = pod[index].PurchaseOrderRowTotalAmount;

        row.appendChild(c1);
        row.appendChild(c2);
        row.appendChild(c3);
        row.appendChild(c4);
        table.appendChild(row);
    }
}

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}