const exp = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');

const app = exp();

//connect to Mongodb
const dbuRI = 'mongodb+srv://Vlack_Fang:piYGP4WBrd8NXG3f@cluster0.ktcbrj1.mongodb.net/Node-tuts?retryWrites=true&w=majority';

mongoose.connect(dbuRI, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
}).then((result) => {
    console.log('Man, Didnt we just make an propose to the URL from MongoDB?')
    const server = app.listen(3000);
    console.log('Know it Bitches, Ur Dad got a Sexy DataBase now');

}).catch((err)=>console.log(err));

app.set('view engine', 'ejs');



//middleware and static files- by static, we mean the css and images we are gonna make public
app.use(exp.static('public_stuff'));
app.use(exp.urlencoded({ extended: true }));

app.use(morgan('dev'));

//mangoose and mango sandbox routes




app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about',{title:'About'});
});

//Blog routes
app.use(blogRoutes);

app.get('/about-clan', (req, res) => {
    res.redirect('/about',{title:'dfacfas'});
});



app.use((req, res) => {
    res.status(404).render('404',{title:'404'});
});