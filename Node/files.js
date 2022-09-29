const fs = require('fs');//built in

//reading files
// fs.readFile('./docs/blog1.txt', (err, data) => {
//     if (err)
//         console.log(err);
//     console.log(data);//gives data as buffer
//     console.log(data.toString());
// });//readfile is assincronous and takes some time to do, but it doesnt halt the program, so... run the code to know
// //it has a call back fn...

// console.log('Hello');


// //writing files
// fs.writeFile('./docs/blog1.txt', 'Hell no Vlack Fang', () => {
//     console.log('file was written');
// });
// fs.writeFile('./docs/blog21.txt', 'Hell no Vlack Fang', () => {
//     console.log('file was written');
// });//it will create a file for us if it doesnt exist


//directories
// if (!fs.existsSync('./assets'))
// {
//     fs.mkdir('./assets', (err) => {
//         if (err)
//             console.log(err);
//         console.log('folder created');
//     });    
// }
// else {
//     fs.rmdir('./assets', (err) => {
//         if (err)
//             console.log(err);
//         console.log('folder deleted');
//     })
// }

//deleting files
if (fs.existsSync('./docs/deleteme.txt')) {
    fs.unlink('./docs/deleteme.txt', (err) => {
        if (err)
            console.log(err);
        console.log('file deleted');
    })
}


