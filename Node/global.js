//console.log(global);

/*global.setTimeout(() => {
    console.log('in Time out');
}, 3000);Working*/

/*setTimeout(() => {
    console.log('in Time out');
    clearInterval(a);//does this stop every int setInterval? What do i do if I want to be specific?
}, 3000);

const a = setInterval(() => {
    console.log('Mari');
}, 1000);
*/

// console.log(__dirname);
// console.log(__filename);

// // console.log(document.querySelector); This shows an error coz document is not in the global selector but the windows selector, i.e. not the obj running globally in our node.js program, but in windows object whose name suggests it all...

console
