function addToCart(btn, itemName) {
    const cartAddButtons = document.getElementsByClassName("cartaddbtn");
    const cartByeButtons = document.getElementsByClassName("cartbyebtn");

    let index = 0;
    for (let addbtn of cartAddButtons) {
        if (addbtn == btn) {
            break;
        }
        else {
            index++;
        }
    }

    cartAddButtons[index].hidden = true;
    cartByeButtons[index].hidden = false;

    const quantityButtons = document.getElementsByClassName("btn-group me-2");

    quantityButtons[index].style.display = "none";

    var cartItemCounter = document.getElementById('cart-item-count');
    var counter = cartItemCounter.innerHTML;
    var quantityField = document.getElementsByClassName("btn btn-outline-secondary");
    var addMe = quantityField[index].innerHTML;
    counter = parseInt(counter) + parseInt(addMe);
    cartItemCounter.innerHTML = counter;

    var itemAdded = document.getElementById('toastItemName');
    itemAdded.innerHTML = itemName;

    var toastLiveExample = document.getElementById('liveToast');
    var toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
}

function remove(btn, itemName) {
    const cartAddButtons = document.getElementsByClassName("cartaddbtn");
    const cartByeButtons = document.getElementsByClassName("cartbyebtn");

    let index = 0;
    for (let byebtn of cartByeButtons) {
        if (byebtn == btn) {
            break;
        }
        else {
            index++;
        }
    }

    cartAddButtons[index].hidden = false;
    cartByeButtons[index].hidden = true;

    const quantityButtons = document.getElementsByClassName("btn-group me-2");

    quantityButtons[index].removeAttribute('style');

    var cartItemCounter = document.getElementById('cart-item-count');
    var counter = cartItemCounter.innerHTML;
    var quantityField = document.getElementsByClassName("btn btn-outline-secondary");
    var addMe = quantityField[index].innerHTML;
    counter = parseInt(counter) - parseInt(addMe);
    cartItemCounter.innerHTML = counter;

    var itemDeleted = document.getElementById('toastItemNameDel');
    itemDeleted.innerHTML = itemName;

    var toastLiveExampleDel = document.getElementById('liveToastDel');
    var toast = new bootstrap.Toast(toastLiveExampleDel);
    toast.show();
}

function focusHere(card) {
    card.className = "card h-100 hover-zoom-sm border-info border-3";
}

function focusAway(card) {
    card.className = "card h-100 hover-zoom-sm border-secondary border-1";
}

function updateQuantity(form) {
    const formsInPage = document.getElementsByClassName("dropdown-menu dropdown-menu-center p-2");

    let index = 0;
    for (let pageForm of formsInPage) {
        if (pageForm.contains(form)) {
            break;
        }
        else {
            index++;
        }
    }

    const newQuantity = parseInt(formsInPage[index][0].value);
    const originalQuantity = formsInPage[index].parentElement.children[0];
    if (newQuantity >= 0 && newQuantity <= 100) {
        originalQuantity.innerHTML = newQuantity;
        return false;
    }
    else {
        return false;
    }
    
}

function incrementMe(upButton) {
    const quantityButton = upButton.previousElementSibling.children[0];
    const currentValue = parseInt(quantityButton.innerHTML)+1;
    if (currentValue <= 100) {
        quantityButton.innerHTML = currentValue;
    }
}

function decrementMe(downButton) {
    const quantityButton = downButton.nextElementSibling.children[0];
    const currentValue = parseInt(quantityButton.innerHTML)-1;
    if (currentValue >= 0) {
        quantityButton.innerHTML = currentValue;
    }
}