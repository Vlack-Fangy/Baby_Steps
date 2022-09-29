const exp = require('express');

//express app
const app = exp();

//register view engine
app.set('view-engine', 'ejs');//ejs view engine
//app.set('views', 'myviews');instead of views(default), it will look for html in my view, but we dont need to go that way


//listen to request
const server = app.listen(3000);

// app.get('/', (req, res) => {
//     res.send('<p>Home page</p>');      //the adv is that it automatically sets the header without our inference
// });

// app.get('/about', (req, res) => {
//     res.send('<p>About page</p>');      //the adv is that it automatically sets the header without our inference
// });

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname });
});

app.get('/about-clan', (req, res) => {
    res.redirect('/about');
});


app.use((req, res) => {
    res.sendFile('/views/404.html', { root: __dirname });
});//works coz its the last, this express works in a up down order in an if-else manner