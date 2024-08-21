function Cart(localStorageKey) { //Pascal Case for generating objects
    const cart = {
        cartItems: undefined,
    
        loadFromStorage() {
            const getItem = JSON.parse(localStorage.getItem(localStorageKey));
            this.cartItems = getItem || [
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
        },
    
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
    
        addToCart(productId) {
    
            let matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);
        
            if (matchingItem) {
                matchingItem.quantity++;
            } else {
                this.cartItems.push({
                    productId,
                    quantity: 1,
                    deliveryOptionId: '1'
                })
            }
        
            this.saveToStorage();
        },
    
        removeFromCart(productId) {
            const newCart = [];
        
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId !== productId) {
                    newCart.push(cartItem);
                }
            });
    
            this.cartItems = newCart;
            this.saveToStorage();
        },
    
        updateQuantity(productId, newQuantity) {
            let matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);
        
            matchingItem.quantity = newQuantity;
        
            this.saveToStorage();
        },
    
       updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);
        
            if (matchingItem) {
                matchingItem.deliveryOptionId = deliveryOptionId;
            }
            this.saveToStorage();
        }
    };

    return cart;
}


const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();



businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);




