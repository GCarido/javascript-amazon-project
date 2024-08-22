import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
// import '../data/cart-oop.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';
import { loadCart } from '../data/cart.js';


//Use promise.all to run promises at the same time

Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('value1'); //parameters inside resolve will be saved in next .then parameter
        });
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })

]).then((values) => {
    console.log(values); //TEST to promises: (2) ['value1', undefined]
    renderOrderSummary();
    renderPaymentSummary();
});


/*
new Promise((resolve) => {

    loadProducts(() => {
        resolve('value1'); //parameters inside resolve will be saved in next .then parameter
    });
}).then((value) => {
    console.log(value); //to test it
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/


// loadProducts(() => { //USE PROMISE INSTEAD OF CALLBACKS: PROBLEM: NESTING
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     });
// });
