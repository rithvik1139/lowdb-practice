const express = require('express');
const app = express();
const low = require('lowdb');
const fs = require('lowdb/adapters/FileSync');
const adapter = new fs('db.json');
const db = low(adapter);

// To allow Cross-Origin Resource Sharing:
const cors = require('cors');
app.use(cors());

// initialize the data store
db.defaults({ users: [] }).write();

// serve static files from public directory
app.use(express.static('public'));

// Data Parser: used to parse POST data (form)
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET route: return all users
app.get('/data', function(req,res){
    res.send(db.get('users').value());
});

// POST route TEST
app.post('/test', function(req,res){
    console.log(req.body.username, req.body.password);
    res.send(req.body.username + " " + req.body.password);
});

app.post('/add', function(req,res){
    var user = {
        'name' : req.body.name,
        'dob'  : req.body.dob,
        'email' : req.body.email,
        'username' : req.body.username,
        'password' : req.body.password,
        'phone' : req.body.phone,
        'streetaddress' : req.body.streetaddress,
        'citystatezip' : req.body.citystatezip,
        'latitude' : req.body.latitude,
        'longititude' : req.body.longitude,
        'avatar' : req.body.avatar
    }
    db.get('users').push(user).write();
    console.log(db.get('users').value());
    res.send(db.get('users').value());
});

// LISTEN: start server and listen for requests
app.listen(3000, function(){
    console.log('Running on port 3000!');
});