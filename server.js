const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT||3000;
var app = express();

hbs.registerPartials(__dirname+ '/views/partials')
app.set('view engine','hbs');

// app.use((req,res,next)=>{
//     res.render('maintainence.hbs',{
//         pageTitle:"Under Maintainence",
//     });
// });

app.use(express.static(__dirname + '/public'));


app.use((req,res,next)=>{
    var now = new Date().toString();
    var log =`${now}: ${req.method} ${req.url}`;
    console.log("Log:",log);
    fs.appendFile(__dirname+'/log/server.log',log+'\n',(err)=>{
        if(err){
            console.log(err);
        }
    });
    next();
});

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
     res.render('home.hbs',{
        pageTitle:"Home Page",
        welcomeMessage:"Hello Express!!!"
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:"Aboutaaa Page",
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:"Problem in rendering the page"
    });
})

app.listen(port,()=>{
    console.log(`Server is up and running on port ${port}`);
});