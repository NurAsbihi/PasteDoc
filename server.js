//Library imports
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const saltRounds = 10;
const uniqid = require("uniqid");
const mysql = require('mysql');
const { check, validationResult } = require('express-validator');


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
//app.get('/loadAllDocs');
app.get('/loadAllDocs', function (req, resp)    {
    let sql = "SELECT * FROM docs";

    // Executes the SQL query
    con.query(sql, (err, result) => {
        if(err) {
            console.error("Error:" + JSON.stringify(err));
            // Sends error message to client.js so error message is displayed
            resp.send("Error:", err);
        }
        else{
            console.log(JSON.stringify(result));
            // Sends All Docs in table back to client
            resp.send(JSON.stringify(result));
        }
    });
});
app.post('/userSignUp', [
    // Express-Validator Check if email is in use in DB
    // Use function inUseCheck
    check('email').custom( async email =>  {
        const value = await inUseCheck(email);
        if (value)  {
            throw new Error('Email in use');
        };
    })
],  function (req, resp, next)  {
        const errors = validationResult(req);
        if (!errors.isEmpty())  {
            console.log("Email was already in use");
            return resp.send("error");
        }
        else    {
            // Grabs the JSON formatted data from the client and applies it to this variable
            let rgstrUser = req.body;
            // Grabs users IP to assign to that unique user, on localhost it will be ::1 but if this were on a live server
            // It would grab the users unique public IP
            let grabIP = req.connection.remoteAddress || req.socket.remoteAddress || req.headers['x-forwarded-for'];
            // Creates a unique randomly generated UserID
            genID = uniqid();
            // Hashes the input password
            cryptPass = bcrypt.hashSync(rgstrUser.password, saltRounds);
            // Variable for entering null into DB
            let emptyValue = null;
            // Creates a variable for the SQL input of all the input data after being hashed and generated
            let sql = "INSERT INTO users VALUES" +
                "('" + genID + "', '" + rgstrUser.name + "', '" + rgstrUser.email + "', '" + cryptPass + "','user', '" + emptyValue +"', '" + grabIP + "');";

            console.log("Performing SQL Action:", sql);

            // Executes the SQL query
            con.query(sql, (err, result) => {
                if(err) {
                    console.error("Error:" + JSON.stringify(err));
                    // Sends error message to client.js so error message is displayed
                    resp.send("error")
                }
                else{
                    console.log(JSON.stringify(result));
                    // Sends success message to client.js so success message is displayed
                    resp.send("success");
                }
            });
        }
});

app.post('/userLogin', loginUser);
function loginUser(req, resp)   {

    let logUser = req.body;

};

app.post('/postDoc',);
function postDoc(req, resp) {

};

function inUseCheck(email)  {
    return new Promise ((resolve, reject) =>  {
        con.query('SELECT COUNT (*) AS total FROM users WHERE email=?', [email], function (err, results, fields)    {
            if (!err)   {
                return resolve(results[0].total > 0);
            }
            else    {
               return reject(new Error('Something went wrong'));
            }
        });
    });
}

/*function registerUser(req, resp) {

    // Grabs the JSON formatted data from the client
    let rgstrUser = req.body;

    // Grabs users IP to assign to that unique user, on localhost it will be ::1 but if this were on a live server
    // It would grab the users unique public IP
    let grabIP = req.connection.remoteAddress || req.socket.remoteAddress || req.headers['x-forwarded-for'];

    console.log("Data = " + JSON.stringify(rgstrUser));

    console.log(rgstrUser.name);

    //if rgstrUser.name =< 

    genID = uniqid();

    cryptPass = bcrypt.hashSync(rgstrUser.password, saltRounds);

    console.log(rgstrUser);

    check.rgstrUser.email
        .exist()
        .custom(async rgstrUser.email => {
            const value = await isMentionNameInUse(mentionName);
            if (value) {
                throw new Error('Mention name is already exists!!!');
                console.log("it worked?")
            }
        });

    let sql = "INSERT INTO users VALUES" +
        "('" + genID + "', '" + rgstrUser.name + "', '" + rgstrUser.email + "', '" + cryptPass + "','user', 'nah', '" + grabIP + "');";
    
    con.query(sql, (err, result) => {
        if(err) {
            console.error("Error:" + JSON.stringify(err));
            resp.send("error")
        }
        else{
            console.log(JSON.stringify(result));
            resp.send("success");
        }
    });
};*/


function deleteDoc(req, resp)   {

};




app.listen(8080);