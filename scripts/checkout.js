import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/cart-oop.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';


async function loadPage() { //async makes a function return a promise
    
    await loadProductsFetch(); //write asynchronous code like normal code

    await new Promise((resolve) => {
        loadCart(() => {
            resolve(); 
        });
    });

    /*
        SAVE VALUE IN RESOLVE USING NORMAL ASSIGNMENT OF VARIABLES
        const value = await new Promise((resolve) => {
        loadCart(() => {
            resolve('valueTest'); 
        });
    });
    */

    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();

//Use promise.all to run promises at the same time


/*

Promise.all([
    //Since fetch returns a promise, just load it
    loadProductsFetch(),
    // new Promise((resolve) => {
    //     loadProducts(() => {
    //         resolve('value1'); //parameters inside resolve will be saved in next .then parameter
    //     });
    // }),


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

*/

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
