var sum = 0;

function showCart() {
    const cartBody = document.getElementById("cart-body");

    var cartItems = Cookies.get('items');

    if (cartItems == undefined) { 
        document.getElementById("empty-message").hidden = false;
        document.getElementById("cart-body").hidden = true;
        return;
    }

    document.getElementById("empty-message").hidden = true;
    document.getElementById("cart-body").hidden = false;
    var cartItemList = cartItems.split("|");

    removeElementsByClass("cart-item");
    document.getElementById("subtotalMoney").innerText = "0.00";
    document.getElementById("totalMoney").innerText = "0.00";
    cartItemList.reverse().forEach(addItems);

    document.getElementById("example-cart-row").hidden = true;

    sum = 0;
    cartItemList.forEach(findTotalQuantity);

    document.getElementById("cart-item-count").innerText = sum;

    if (window.location.pathname.substring(0,9) == "/Products") {
        if (Cookies.get("items") != undefined) {
            Cookies.get("items").split("|").forEach(hideAddBtns);
        }
    }

    if (window.location.pathname.substring(0, 18) == "/Shopping/Checkout") {
        if (Cookies.get("items") != undefined) {
            removeElementsByClass("checkout-item");
            document.getElementById("subtotalMoneyCO").innerText = "0.00";
            document.getElementById("totalMoneyCO").innerText = "0.00";
            cartItemList.forEach(addItemsCO);
            document.getElementById("example-cart-rowCO").hidden = true;
        } 
    }
}

function hideAddBtns(item) {
    //html/body / div / main / div[1] / div / div[3] / div / div[2] / h5
    //html/body / div / main / div[1] / div / div[3] / div / div[3] / div[2] / button[1]
    document.getElementById(item + " Quantity").parentElement.parentElement.style.display = "none";
    document.getElementById(item + " Quantity").parentElement.parentElement.nextElementSibling.children[0].hidden = true;
    document.getElementById(item + " Quantity").parentElement.parentElement.nextElementSibling.children[1].hidden = false;
    document.getElementById(item + " Quantity").parentElement.parentElement.nextElementSibling.children[2].hidden = false;
}


function findTotalQuantity(item) {
    var q = Cookies.get(item);
    sum += parseInt(q);
}

function addItems(item) {
    document.getElementById("example-cart-row").hidden = false;

    let rowExample = document.getElementById("example-cart-row");

    let newRow = rowExample.cloneNode(true);

    newRow.setAttribute("class", "row cart-item");
    newRow.removeAttribute("id");
    newRow.children[0].innerHTML = item + " x " + Cookies.get(item);
    renderPrice(item, newRow, Cookies.get(item));
    newRow.children[1].innerHTML = "$0.00";
    newRow.children[1].style = "text-align:end;";

    rowExample.parentNode.insertBefore(newRow, rowExample.nextSibling);
}

function addItemsCO(item) {
    document.getElementById("example-cart-rowCO").hidden = false;

    let rowExample = document.getElementById("example-cart-rowCO");

    let newRow = rowExample.cloneNode(true);

    newRow.setAttribute("class", "row checkout-item");
    newRow.removeAttribute("id");
    newRow.children[0].innerHTML = item + " x " + Cookies.get(item);
    renderPriceCO(item, newRow, Cookies.get(item));
    newRow.children[1].innerHTML = "$0.00";
    newRow.children[1].style = "text-align:end;";

    rowExample.parentNode.insertBefore(newRow, rowExample.nextSibling);
}

function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

async function getPrice(itemToBePriced) {
    let url = "/api/Items/" + itemToBePriced;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderPrice(itemToBePriced, itemRow, quant) {
    let itemInfo = await getPrice(itemToBePriced);
    let cost = itemInfo['cost'];
    let price = cost * quant;

    itemRow.children[1].innerHTML = "$" + price.toFixed(2);

    const subtot = parseFloat(document.getElementById("subtotalMoney").innerText);
    var newsub = subtot + parseFloat(price);
    document.getElementById("subtotalMoney").innerText = newsub.toFixed(2);

    var tot = newsub * 1.07;
    document.getElementById("totalMoney").innerText = tot.toFixed(2);
}

async function renderPriceCO(itemToBePriced, itemRow, quant) {
    let itemInfo = await getPrice(itemToBePriced);
    let cost = itemInfo['cost'];
    let price = cost * quant;

    itemRow.children[1].innerHTML = "$" + price.toFixed(2);

    const subtot = parseFloat(document.getElementById("subtotalMoneyCO").innerText);
    var newsub = subtot + parseFloat(price);
    document.getElementById("subtotalMoneyCO").innerText = newsub.toFixed(2);

    var tot = newsub * 1.07;
    document.getElementById("totalMoneyCO").innerText = tot.toFixed(2);
}
