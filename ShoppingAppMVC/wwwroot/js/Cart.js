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
    cartItemList.reverse().forEach(addItems);

    document.getElementById("example-cart-row").hidden = true;

    document.getElementById("cart-item-count").innerText = cartItemList.length;
}

function addItems(item) {
    document.getElementById("example-cart-row").hidden = false;

    let rowExample = document.getElementById("example-cart-row");

    let newRow = rowExample.cloneNode(true);

    newRow.setAttribute("class", "row cart-item");
    newRow.removeAttribute("id");
    newRow.children[0].innerHTML = item + " x " + Cookies.get(item);
    //get item price from database

    newRow.children[1].innerHTML = "$3.99";
    newRow.children[1].style = "text-align:end;";

    rowExample.parentNode.insertBefore(newRow, rowExample.nextSibling);
}

function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}