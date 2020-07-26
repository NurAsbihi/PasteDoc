//Library imports

const express = require('express');
const fileUpload = require('express-fileupload')
const mysql = require('mysql');


const app = express();

app.use(express.static('public'));

const con = mysql.createPool    ({
    connectionLimit: 1,
    host: "localhost",
    user: "dev",
    password: "password",
    database:"pastedoc",
    debug: true
});

/*function test() {
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

test();*/

function registerUser() {
    
};

app.listen(8080);