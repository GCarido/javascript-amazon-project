const getItem = JSON.parse(localStorage.getItem('cart'));

export let cart = getItem || [];

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {

    //let matchingItem;
    // cart.forEach((cartItem) => {    //NORMALIZING SAMPLE 1
    //     if (productId === cartItem.productId) {
    //         matchingItem = cartItem;
    //     }
    // });

    let matchingItem = cart.find(cartItem => cartItem.productId === productId); //NORMALIZING SAMPLE 2 DESTRUCTURING METHOD

    if (matchingItem) {
        matchingItem.quantity++;
    } else {
        cart.push({
            productId,
            quantity: 1
        });
    }

    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToStorage();
}