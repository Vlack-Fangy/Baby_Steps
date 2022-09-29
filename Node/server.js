//Leacture 1
// const http = require('http');

// const server = http.createServer((request,response) => {//it gets called everytime stuff gets called to the server
//     console.log('request made');
// });

// server.listen(3000, 'localhost', () => {
//     console.log('listenning for request on port 3000')
// });//port number

//lecture 2

// const http = require('http');

// const server = http.createServer((request,response) => {//it gets called everytime stuff gets called to the server
//     console.log(request.url, request.method, request.timeOut);

//     //ste header content type
//     response.setHeader('Content-type', 'text/html');

//     response.write('hello, Vlack Fang');
//     response.write('<p>hello, Master Vlack Fang</p>');
//     response.end();//acts as something like a messanger
// });

// server.listen(3000, 'localhost', () => {
//     console.log('listenning for request on port 3000')
// });//port number

const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((request,response) => {//it gets called everytime stuff gets called to the server
    // console.log(request.url, request.method, request.timeOut);

    //lodash
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('Hello');
    });

    greet();
    greet();

    //ste header content type
    response.setHeader('Content-type', 'text/html');

    let path = './views/';

    switch (request.url)
    {
        case '/about-me':
            path += '404.html';//why the fk is this not making a difference?- dbt 1
            response.statusCode = 200;
            break;
        case '/':
            path += 'index.html';
            response.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            response.statusCode = 200;
            break;
        case '/about-blah':
            path += 'about.html';
            response.statusCode = 301;
            response.setHeader('Location', '/about');
            response.end();
            break;
            
        default:
            path += '404.html';
            response.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err)
        {
            console.log(err);
            response.end();
            }
        
        else 
        {
            
            response.end(data);
            }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('listenning for request on port 3000')
});//port number
