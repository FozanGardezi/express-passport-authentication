
const express = require('express');
const Sequelize =  require('sequelize');
const bodyParser = require('body-parser');
const routes =  require('./routes/user');
const db = require('./config/database');
var cors = require('cors');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var pg = require('pg');
require("dotenv").config();

const port = 8000


const app = new express();
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.listen(port, () => console.log(`notes-app listening on port ${port}!`));

app.use(express.json()) // for parsing application/json

// routes middleware
app.use('/users', routes );

passport.serializeUser(function(user, done) {
    done(null, {id: user.id, email: user.email, role: user.role});
  });
  
passport.deserializeUser(function(user, done) {
done(null, {id: user.id, email: user.email, role: user.role});
});

db
    .authenticate()
    .then(() => {
        console.log('Connection has been established');
    })
    .catch(err => {
        console.error('Unable to connect the database:', err);
    })

