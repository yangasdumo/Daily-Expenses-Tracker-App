const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const Routes1 = require('./daily-expenses');


const app = express();
app.use(flash());


//database
const pgp = require('pg-promise')();

const local_database_url = 'postgres://postgres:codex123@localhost:5432/thedaily';
const connectionString = process.env.DATABASE_URL || local_database_url;

const config = {
    connectionString
}

if (process.env.NODE_ENV == "production") {
    config.ssl = {
        rejectUnauthorized: false
    }
}

app.use(session({
    secret: 'this is my longest string that is used to test my registration with routes app for browser',
    resave: false,
    saveUninitialized: true
}));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const db = pgp(config)

const Routes = Routes1(db)

app.get('/', function (req, res) {
    res.render("index", {
    });
});


// app.post('/expenses',function(req,res){

//     res.render('trackers')
// });



app.get('/sign',function(req,res){

    res.render('sign_up');
});


app.post('/sign',async function(req,res){
    let name = req.body.username
    let surname = req.body.usersurname
    let email = req.body.useremail

    if (name && surname && email){
        await Routes.adduser(name,surname,email)
        req.flash('message', "Welcome to the Trackers App !!")
    }else{
        console.log('zompo')
    }
    res.redirect('/')
});


app.post('/log',async function(req,res){

    let name = req.body.username
    let email = req.body.useremail

   let emails = email.toUpperCase()
    name.toUpperCase()
    var check = await Routes.checknames(emails)
    req.flash('message', "Welcome to the Trackers App !!")
    if(check){
        res.redirect("back")
    }else
    res.redirect('/expenses')
});

app.post('/expenses',async function(req,res){
    
     let getamount = req.body.amount
     let getdate = req.body.expense_date
     let getcatagory =req.body.catagory
     
    //  console.log(req.body)
    //  console.log('tso')

     if(getamount && getdate && getcatagory ){
         await Routes.insertExpense(getcatagory, getamount,getdate,)
         req.flash('message', "Your Expense has been added !!")
     }else{
         console.log('')
     }
    res.render('expenses')
});



app.get('/expenses',async function(req,res){

    res.render('expenses')
});

app.get('/trackers', async function(req,res){
 
    let getexpense = await Routes. getData()
    console.log(getexpense)
    res.render ('trackers',{getexpense})
});


app.get('/trackers'),async function(re,res){
       await Routes.removeData()
       req.flash('message', "All Data Has Been Cleared !!")
    res.redirect('/trackers')
}

const PORT = process.env.PORT || 2400;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
