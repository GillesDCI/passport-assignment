const express = require('express');
const mongoose = require('mongoose')
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');

require('dotenv').config();


const app = express();

//configure passport
const initializePassport = require('./passport-config');
initializePassport(passport);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))


app.use(express.static(__dirname + '/public'));
app.use(flash());
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false, //should we resave our session variables if nothing is changed
    saveUninitialized:false //do you want to save empty value in session if there is no value
}))

app.use(passport.initialize());
app.use(passport.session());

// const setUpPassport = require('./setuppassport');
// setUpPassport();




const userRoutes = require('./routes/userRoutes')
const homeRoutes = require('./routes/homeRoutes')




mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
,{
   useNewUrlParser:true, 
   useUnifiedTopology:true
})
.then(() => {console.log("we are connected to the database.")})
.catch((error) => { console.log('an error occurred while connecting ot the db', error)})


app.use('/', homeRoutes);
app.use('/user', userRoutes);



app.listen(3000, () => {
    console.log("the webserver is running on port 3000");
})