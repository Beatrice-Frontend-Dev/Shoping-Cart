//Linking of html elements to Js
const itemNameInput = document.getElementById("itemname");
const itemPriceInput = document.getElementById("item-price");
const totalItemsDisplay = document.getElementById("total-items");
const totalPriceDisplay = document.getElementById("total-price");
const freeShippingDisplay = document.getElementById("free-shipping");
const messagesDisplay = document.getElementById("message");
const addBtn = document.getElementById("add-btn");
const removeBtn = document.getElementById("remove-btn");

let cartItem = []; //An empty cart of Array for items to pushed and popped

const maxCapacityItem = 7;
let totalPrice = 0.0;
let freeShippingEligible = false;

function updateContent() {
  totalItemsDisplay.textContent = `Total Items : ${cartItem.length}`;
  totalPriceDisplay.textContent = `Total Price: $${totalPrice}`;

  if (freeShippingEligible) {
    freeShippingDisplay.textContent = "You are Eligible for free Shipping";
  } else {
    freeShippingDisplay.textContent = "You are not eligible for free Shipping";
  }
}

// Function to add an item to the empty cart
function addCartItem() {
  const nameItem = itemNameInput.value;
  const priceItem = parseFloat(itemPriceInput.value);

  if (isNaN(priceItem) || priceItem <= 0 || nameItem === "") {
    messagesDisplay.textContent = "Please enter a valid name  item and price.";
    return;
  }

  if (cartItem.length >= maxCapacityItem) {
    messagesDisplay.textContent =
      "Cart is at maximum capacity. Cannot add more items.";
    return;
  }

  cartItem.push({
    name: nameItem,
    price: priceItem,
  });

  totalPrice += priceItem;
  freeShippingEligible = totalPrice > 50.0;

  updateContent();
  messagesDisplay.textContent = `${nameItem} has been added to your cart.`;
}

// Function to remove the last item from the cart that was added
function removeCartItem() {
  if (cartItem.length === 0) {
    messagesDisplay.textContent = "Cart is empty. No items to remove for now.";
    return;
  }

  const removedItem = cartItem.pop();
  totalPrice -= removedItem.price;
  freeShippingEligible = totalPrice > 50;

  updateContent();
  messagesDisplay.textContent = `${removedItem.name} was removed from your cart.`;
}

//Adding Event listeners for buttons

addBtn.addEventListener("click", addCartItem);
removeBtn.addEventListener("click", removeCartItem);
