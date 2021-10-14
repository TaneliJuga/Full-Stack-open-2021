var express = require("express");
var app = express();
var bodyParser = require('body-parser'); // Create application/x-www-form-urlencoded parser (for POST)
//var urlencodedParser = bodyParser.urlencoded({ extended: false });
var url = require('url');
var mysql = require('mysql');
var util = require('util'); // for async calls
const secrets = require('./config/secrets');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // for reading JSON

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

var insertedId; // global variable for SQL-updates

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "example_db"
});
// node native promisify
const query = util.promisify(conn.query).bind(conn); // is bind needed?

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
});

app.post("/api/user", urlencodedParser, function (req, res) {

    const authHeader = req.get('Authorization');
    const token = authHeader && authHeader.split(' ')[1]
    //console.log("authHeader: ", authHeader);
    console.log("token: "+token);

    //console.log("body: %j", req.body);
    var jsonObj = req.body;
    
    // make updates to the database
    const {email, password} = jsonObj;
    //console.log("secrets.jwtSecret ", secrets.jwtSecret);
    if (email && password) { // is  a location place already present?
        const accessToken = jwt.sign({name: email}, secrets.jwtSecret,
        {expiresIn: "1h"});

        res.status(200).json({accessToken: accessToken});

        // var sql = "INSERT INTO user (email, password, create_time)"
        //     + " VALUES ( ?, ?, ?)";
        // (async () => {  // IIFE (Immediately Invoked Function Expression)
        //     try {
        //         const hashedPassword = await bcrypt.hash(password, saltRounds);
        //         const date = new Date().toISOString();
        //         const result = await query(sql, [email, hashedPassword, date]);
        //         res.status(200).json({accessToken: accessToken});
        //     } catch (err) {
        //         console.log("Insertion into some (2) table was unsuccessful!" + err);
        //         //res.status(400).send("POST was not succesful " + err);
        //         res.status(200).json({accessToken: accessToken});
        //     }

        // })()
    }else{
        res.status(400).end('no email/password');
    }
});

app.get('/api/user', function(req, res){
    const authHeader = req.get('Authorization');
    const token = authHeader && authHeader.split(' ')[1]

    console.log("token: "+token);
    console.log("authHeader: ", authHeader);
    res.end("get api/user");
})

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
