//Library imports
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const saltRounds = 10;
const uniqid = require("uniqid");
const mysql = require('mysql');


const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

const con = mysql.createPool    ({
    connectionLimit: 1,
    host: "localhost",
    user: "dev",
    password: "password",
    database:"pastedoc",
    debug: true
});

function test() {
    
    /*let sql = "INSERT INTO users VALUES" +
        "('2', 'Test', 'Test@mail.com', 'password', 'user');";*/
    
    let sql = "SELECT * FROM pastedoc.users";

    con.query(sql, (err, result) => {
        if(err) {
            console.error("Error:" + JSON.stringify(err));
        }
        else{
            console.log(JSON.stringify(result));
        }
    });
};

//test();

function registerUser(req, resp) {

    let rgstrUser = req.body;

    console.log("Data = " + JSON.stringify(rgstrUser));

    console.log(rgstrUser.name);

    //if rgstrUser.name =< 

    genID = uniqid();

    cryptPass = bcrypt.hashSync(rgstrUser.password, saltRounds);


    /*let sql = "INSERT INTO users VALUES" +
        "('" + genID + "', '" + rgstrUser.name + "', '" + rgstrUser.email + "', '" + cryptPass + "','user');";
    
    con.query(sql, (err, result) => {
        if(err) {
            console.error("Error:" + JSON.stringify(err));
        }
        else{
            console.log(JSON.stringify(result));
        }
    });*/
};
function loginUser(req, resp)   {

    let logUser = req.body;

};
function postDoc(req, resp) {

};
function deleteDoc(req, resp)   {

};

app.post('/userSignUp', registerUser);
app.post('/userLogin', loginUser);

app.listen(8080);