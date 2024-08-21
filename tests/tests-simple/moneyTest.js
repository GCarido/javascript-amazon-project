import formatCurrency from "../../scripts/utils/money.js";

console.log('test suite: formatCurrency');

console.log('convert cents into dollars in two decimal places');
if (formatCurrency(2095) === '20.95') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('Works with 0');
if (formatCurrency(0) === '0.00') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('rounds a value up to the nearest cent');
if (formatCurrency(2000.5) === '20.01') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('does not round up as value is below .5');
if (formatCurrency(2000.4) === '20.00') {
    console.log('passed');
} else {
    console.log('failed');
}

// 2 types of test cases
// 1. basic test cases = tests if the code is working
// 2. Edge cases

//NOTE: Group of related tests = test suite