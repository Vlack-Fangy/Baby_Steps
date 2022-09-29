const fs = require('fs');

// const readStream = fs.createReadStream('./docs/blog2.txt');

const readStream = fs.createReadStream('./docs/blog2.txt',{encoding:'utf8'});//to directly change the type of simple buffer to string before passing it here, or the program, i.e. like a watch guard, that pours water on all the invited sodiums

const writeStream = fs.createWriteStream('./docs/blog4.txt');

// readStream.on('data', (chunk) => {
//     console.log(chunk);
//     console.log('---------');

//     writeStream.write('\n $$$$$$$$$$$$$$$$$$$$$$$$\n');
//     writeStream.write(chunk);
// });//on is like an event handler, so when a block of data enters through a stream, it will run it and stop. Then when the next block enter through r=the stream, it will repeat the process again

//but is there a way to directly link so that the read buffer directly goes as a write buffer, without us as an intermediate, idont know, but there is another method to do the same as above--

// fs.readFile('./docs/blog2.txt', (data, err) => {
//     if (err)
//         console.log(err);
//     console.log(data);
// });

//piping
readStream.pipe(writeStream);//i think its the same as the above method