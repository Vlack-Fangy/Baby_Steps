// const xyz = require('./people');//without exporting anything from people, xyz is just an hollow object, and this statement just runs the code of people( no items of people can be accessed). Where as if I export some shit, then xyz is not empty and it will run the code .

// console.log(xyz);

// console.log(xyz.public,xyz.ages);


// // console.log(people);

//----------------------------

// const { public } = require('./people');//directly adds the value to our global object as an attribute

// console.log(public);

// // console.log(ages);

//---------------------------------

const os = require('os');

console.log(os.platform(), os.homedir(),os.type());