export let cart;

loadFromStorage();

export function loadFromStorage(){
    const getItem = JSON.parse(localStorage.getItem('cart'));
    cart = getItem || [
        {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        },
        {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }
    ];
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity){
    
    let matchingItem = cart.find(cartItem => cartItem.productId === productId);

    if(matchingItem){
        matchingItem.quantity += quantity; 
    } else {
        cart.push({
            productId,
            quantity: quantity,
            deliveryOptionId: '1'
        })
    }
    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
    let matchingItem = cart.find(cartItem => cartItem.productId === productId);

    matchingItem.quantity = newQuantity;

    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem = cart.find(cartItem => cartItem.productId === productId);

    if(matchingItem){
        matchingItem.deliveryOptionId = deliveryOptionId;
    }
    saveToStorage();
}

export function loadCart(fun) {
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', () => {
        // console.log(xhr.response); //API displays a text containing 'load cart'
        fun(); 
    });
  
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
  }