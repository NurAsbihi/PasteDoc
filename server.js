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
            console.log("All Docs Data Requested And Sent To Client");
            // Sends All Docs in table back to client
            resp.send(JSON.stringify(result));
        }
    });
});
app.get('/loadAdminDocs', function (req, resp)  {
    let sql = "SELECT * FROM docs";

    // Executes the SQL query
    con.query(sql, (err, result) => {
        if(err) {
            console.error("Error:" + JSON.stringify(err));
            // Sends error message to client.js so error message is displayed
            resp.send("Error:", err);
        }
        else{
            console.log("Admin Docs Data Requested And Sent To Client");
            // Sends All Docs in table back to client
            resp.send(JSON.stringify(result));
        }
    });
});

app.post('/requestName', function (req, resp)   {
    let userID = req.body.id;

    if (userID) {
        let sql = "SELECT fname FROM users WHERE user_id="+ "'" + userID + "';";

        // Executes the SQL query
        con.query(sql, (err, result) => {
            if(err) {
                console.error("Error:" + JSON.stringify(err));
                // Sends error message to client.js so error message is displayed
                resp.send("Error:", err);
            }
            else{
                let shownName = result[0].fname;
                // Sends All Docs in table back to client
                resp.send(JSON.stringify(shownName));
            }
        });
    }
});
app.post('/loadYourDocs', function (req, resp)  {
    let userID = req.body.id;

    if (userID) {
        let sql = "SELECT * FROM docs WHERE user_id="+ "'" + userID + "';";

        // Executes the SQL query
        con.query(sql, (err, result) => {
            if(err) {
                console.error("Error:" + JSON.stringify(err));
                // Sends error message to client.js so error message is displayed
                resp.send("Error:", err);
            }
            else{
                console.log("User Docs Data Requested And Sent To Client");
                // Sends All Docs in table back to client
                resp.send(JSON.stringify(result));
            }
        });
    }
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

app.post('/userLogin', function (req, resp)   {
    // Grabs the JSON formatted data from the client and applies it to this variable
    let email = req.body.email;
    let pass = req.body.password

    if (email && pass)  {
        con.query("SELECT password FROM users WHERE email ="+ "'" + email +"';",
        (err, result, fields) =>  {
            let hashPass = result[0].password;
            console.log(hashPass);
            // Check if the password entered matches the hashed password
            if (bcrypt.compareSync(pass, hashPass))   {
                con.query("SELECT user_id FROM users WHERE email ="+ "'" + email + "';",
                (err, result) =>    {
                    if (!err)   {
                        let userID = result[0].user_id;
                        console.log(userID);
                        resp.send(JSON.stringify(userID));
                    }
                    else    {
                        console.log("Something went wrong");
                    }
                })
            }
            else    {
                resp.send("error");
            }
            resp.end
        });
    }
    else    {
        resp.send("Empty...");
        resp.end();
    }
});
app.post('/getPerm', function (req, resp)    {
    let userID = req.body.id;

    if (userID) {
        let sql = "SELECT perm FROM users WHERE user_id="+ "'" + userID + "';";

        con.query(sql, (err, result) => {
            if (!err)   {
                console.log(result);
                let perm = result[0].perm;
                console.log(perm);
                resp.send(JSON.stringify(perm));
            }
            else    {
                resp.send("error");
            }
        })
    }
    else    {
        resp.send("error");
    }
});
app.post('/postDoc', function (req, resp) {

    let postDoc = req.body;

    let userID = postDoc.id;
    let creDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // Grabs users IP to assign to that unique user, on localhost it will be ::1 but if this were on a live server
    // It would grab the users unique public IP
    let grabIP = req.connection.remoteAddress || req.socket.remoteAddress || req.headers['x-forwarded-for'];
    // Creates a unique randomly generated DocID
    genID = uniqid();
    // Variable for entering null into DB
    let emptyValue = null;
    // Creates a variable for the SQL input of all the input data after being hashed and generated
    let sql = "INSERT INTO docs VALUES" +
        "('" + genID + "', '" + userID + "', '" + postDoc.title + "', '" + postDoc.author + "', '" + emptyValue + "','" + postDoc.content + "', '" + creDate +"', '" + grabIP + "');"; 
        
    console.log(sql);
    
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

});
app.post('/deleteDoc', function (req, resp)   {

});
// Function to check if an email is taken when user signs up
function inUseCheck(email)  {
    return new Promise ((resolve, reject) =>  {
        // Checks to see if the email already exists in the database
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




app.listen(8080);