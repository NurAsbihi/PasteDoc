//Library imports
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const bcryp = require('bcrypt')
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
    debug: false
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

    console.log(rgstrUser.name);

    console.log("Data = " + JSON.stringify(rgstrUser));

    console.log(rgstrUser.name);

    

    //let sql = "INSERT INTO users VALUES" +
        //"(' "
};
function loginUser(req, resp)   {

}
function postDoc(req, resp) {

}
function deleteDoc(req, resp)   {

}

app.post('/userSignUp', registerUser);

app.listen(8080);