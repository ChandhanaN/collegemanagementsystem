const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const path = require('path');
const cookieparser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash-messages');
// const sec = require('./setup/myurl').secret;

//bringing all routes
const comp = require('./routes/computer_emp');

const app = express();

//middleware (bodyparser configuration)
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//session
app.use(session({cookie:{maxAge:3600},
    secret:'mystrongsec',
    resave:false,
    saveUninitialized:false
}));

//flash config
app.use(flash());

//passport configuration
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieparser());

require('./strategies/jsonstrategy')(passport);


//mongodb configuration
const db = require('./setup/myurl').mongoURL;

//Attempt to connect to db
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected successfully..!!'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5050;
app.get('/test', function(req, res){
    console.log('test');
    return res.json({ok:'ok'});
});

//setting up views
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use('/', comp);
app.use('/', express.static(__dirname + '/public'));
app.listen(port, () => console.log(`app is running at: ${port}`));