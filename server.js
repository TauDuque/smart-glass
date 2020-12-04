const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const Signin = require('./controllers/Signin');
const Profile = require('./controllers/Profile');
const Image = require('./controllers/Image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '5@0p4ul0',
      database : 'smart-glass'
    }
});

db.select('*').from('users');


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/signin', (req, res) => {Signin.handleSignIn(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, db)});
app.get('/profile/:id', (req, res) => {Profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => {Image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {Image.handleApiCall(req, res)});

app.listen(3000, () => {
    console.log('app is running');
})