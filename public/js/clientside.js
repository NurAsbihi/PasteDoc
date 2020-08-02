window.onload = boot;

function boot() {
    //loadAllDocs();
    createDoc = document.getElementById("createDoc");
    yourDocs = document.getElementById("yourDocs");
    allDocs = document.getElementById("allDocs");
    adminPanel = document.getElementById("adminPanel");
    loginSignup = document.getElementById("loginSignup")
    everythingElse = yourDocs, createDoc;
    checkIP();
}

function userSignUp()   {
    let xhttp = new XMLHttpRequest();
    let msg = document.getElementById("sign-up");
    let clean = document.getElementById("error");

    // Grabbing inputs from Sign Up fields
    let userName = document.getElementById("nameSign").value;
    let userEmail = document.getElementById("emailSign").value;
    let userPass = document.getElementById("passSign").value;

    // Letter validation to ensure only text is entered
    let lettersOnly = /^[A-Za-z]+$/;
    // Email validation expression, accepts letters and numbers before and after both the @ and . symbols
    let emailRegX = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    // Adds a P element to the sign-up box with an id of "error" and color of the text to red
    let errLine = msg.appendChild(document.createElement('p'));
    errLine.setAttribute("id", "error");
    errLine.style.cssText = "color: red;";

    if (userName == "" || userEmail == "" || userPass == "")   {
        let errText = document.createTextNode("Ensure you've filled in all fields");
        
        if (document.contains(clean))   {
            clean.parentNode.removeChild(clean);
            errLine.appendChild(errText);
        }
        else    {
            errLine.appendChild(errText);
        }
    }
    else if (lettersOnly.test(userName) == false)   {
        let errText = document.createTextNode("Only use letters for your name");

        if (document.contains(clean))   {
            clean.parentNode.removeChild(clean);
            errLine.appendChild(errText);
        }
        else    {
            errLine.appendChild(errText);
        }
    }
    else if (userName.length > 50)  {
        let errText = document.createTextNode("Names cannot be longer than 50 characters");
        
        if (document.contains(clean))   {
            clean.parentNode.removeChild(clean);
            errLine.appendChild(errText);
        }
        else    {
            errLine.appendChild(errText);
        }
    }
    else if (emailRegX.test(userEmail) == false)    {
        let errText = document.createTextNode("Email invalid use the format in the placeholder");

        if (document.contains(clean))   {
            clean.parentNode.removeChild(clean);
            errLine.appendChild(errText);
        }
        else    {
            errLine.appendChild(errText);
        }
    }
    else    {
        // Convert data into an object
        let user =  {
            name: userName,
            email: userEmail,
            password: userPass
        };

        xhttp.onreadystatechange = function ()  {
            if (this.readyState == 4 && this.status == 200) {
                if (xhttp.responseText == "success")    {
                    let status = document.createElement("div");
                    status.setAttribute("id", "alert-box");
                    let p = document.createElement("p");

                    // Insert Text into P element then wrap with Div element
                    p.appendChild(document.createTextNode("Registration Successful, Logging in..."));
                    status.appendChild(p);

                    // Place status Div element above everything within Sign-Up Div
                    msg.insertBefore(status, msg.childNodes[0]);
                }
                else    {
                    let status = document.createElement("div");
                    status.setAttribute("id", "alert-box");
                    let p = document.createElement("p");

                    // Insert Text into P element then wrap with Div element
                    p.appendChild(document.createTextNode("That Email is already in use"));
                    status.appendChild(p);

                    // Place status Div element above everything within Sign-Up Div
                    msg.insertBefore(status, msg.childNodes[0]);
                }
            }
        }

        // Send user object to server in JSON format
        xhttp.open('POST', '/userSignUp', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(user));
    }
}

function loginUser()    {
    let xhttp = new XMLHttpRequest();
    let msg = document.getElementById("login");
    let clean = document.getElementById("error");

    // Grabbing inputs from Sign Up fields
    let userEmail = document.getElementById("emailLogin").value;
    let userPass = document.getElementById("passLogin").value;

    // Email validation expression, accepts letters and numbers before and after both the @ and . symbols
    let emailRegX = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    // Adds a P element to the sign-up box with an id of "error" and color of the text to red
    let errLine = msg.appendChild(document.createElement('p'));
    errLine.setAttribute("id", "error");
    errLine.style.cssText = "color: red;";

    if (userEmail == "" || userPass == "")   {
        let errText = document.createTextNode("Ensure you've filled in all fields");

        if (document.contains(clean))   {
            clean.parentNode.removeChild(clean);
            errLine.appendChild(errText);
        }
        else    {
            errLine.appendChild(errText);
        }
    }
    else if (emailRegX.test(userEmail) == false)    {
        let errText = document.createTextNode("Email invalid use the format in the placeholder");

        if (document.contains(clean))   {
            clean.parentNode.removeChild(clean);
            errLine.appendChild(errText);
        }
        else    {
            errLine.appendChild(errText);
        }
    }
    else    {
        // Convert data into an object
        let user = {
            email: userEmail,
            password: userPass
        }

        xhttp.onreadystatechange = function ()  {
            if (this.readyState == 4 && this.status == 200) {
                if (xhttp.responseText == "success")    {
                    let status = document.createElement("div");
                    status.setAttribute("id", "alert-box");
                    let p = document.createElement("p");

                    // Insert Text into P element then wrap with Div element
                    p.appendChild(document.createTextNode("Logging in..."));
                    status.appendChild(p);

                    // Place status Div element above everything within Sign-Up Div
                    msg.insertBefore(status, msg.childNodes[0]);
                }
                else    {
                    let status = document.createElement("div");
                    status.setAttribute("id", "alert-box");
                    let p = document.createElement("p");

                    // Insert Text into P element then wrap with Div element
                    p.appendChild(document.createTextNode("Incorrect Email or Password"));
                    status.appendChild(p);

                    // Place status Div element above everything within Sign-Up Div
                    msg.insertBefore(status, msg.childNodes[0]);
                }
            }
        }

        // Send user object to server in JSON format
        xhttp.open('POST', '/userLogin', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(user));
    }
}

function postDoc()  {
    let xhttp = new XMLHttpRequest();
    let msg = document.getElementById("doc-create");
    let clean = document.getElementById("error");

    let docTitle = document.getElementById("titleDoc").value;
    let docAuthor = document.getElementById("authDoc").value;
    // Password option here :)
    let docContent = document.getElementById("contentDoc").value;

    /* setTimeout(
        errorstuff, 2000
    );*/

    /* readonly = "readonly" attribute added to doc */
    let errLine = msg.appendChild(document.createElement('p'));
    errLine.setAttribute("id", "error");
    errLine.style.cssText = "color: red;";

    if (docTitle == "" || docAuthor == "" || docContent == "")   {
        let errText = document.createTextNode("Ensure you've filled in all fields");

        if (document.contains(clean))   {
            clean.parentNode.removeChild(clean);
            errLine.appendChild(errText);
        }
        else    {
            errLine.appendChild(errText);
        }
    }
    else    {
        // Convert data into an object
        let doc = {
            title: docTitle,
            author: docAuthor,
            //password: docPass,
            content: docContent
        }

        xhttp.onreadystatechange = function ()  {
            if (this.readyState == 4 && this.status == 200) {
                if (xhttp.responseText == "success")    {
                    let status = document.createElement("div");
                    status.setAttribute("id", "alert-box");
                    let p = document.createElement("p");
    
                    // Insert Text into P element then wrap with Div element
                    p.appendChild(document.createTextNode("Doc uploaded!"));
                    status.appendChild(p);
    
                    // Place status Div element above everything within Sign-Up Div
                    msg.insertBefore(status, msg.childNodes[0]);
                }
                else    {
                    let status = document.createElement("div");
                    status.setAttribute("id", "alert-box");
                    let p = document.createElement("p");
    
                    // Insert Text into P element then wrap with Div element
                    p.appendChild(document.createTextNode("That Email is already in use"));
                    status.appendChild(p);
    
                    // Place status Div element above everything within Sign-Up Div
                    msg.insertBefore(status, msg.childNodes[0]);
                }
            }
        }

        // Send doc object to server in JSON format
        xhttp.open('POST', '/postDoc', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(doc));
    }
}
function loadAllDocs()  {
    let xhttp = new XMLHttpRequest();
    let table = document.getElementById("ad-tbody");

    xhttp.onreadystatechange = function()   {
        if (this.readyState == 4 && this.status == 200)    {
            console.log("Howdy:", this.responseText);
            
            if (xhttp.responseText == "error")  {
                alert("Something went wrong when fetching the data, check console");
                console.log(this.responseText);
            }
            else    {
                let data = this.responseText;
                let jsonFormat = JSON.parse(data);

                //console.log(jsonFormat);

                let tr = document.createElement('tr');

                for (var i = 0; i < jsonFormat.length; i++) {
                    tr = document.createElement('tr');
                    row = jsonFormat[i];
                    //for (var j = 0, j < jsonFormat)
                }
            }
        }
    }
    
    xhttp.open('GET', '/loadAllDocs', true);
    xhttp.send();
}
function viewDoc()  {

}
function deleteDoc()    {

}
function shareDoc() {
    
}

function createDocDisplay()    {
    createDoc.style.display = "block";
    yourDocs.style.display = "none";
    allDocs.style.display = "none";
};
function yourDocsDisplay() {
    yourDocs.style.display = "block";
    createDoc.style.display = "none";
    allDocs.style.display = "none";
}
function allDocsDisplay() {
    allDocs.style.display = "block";
    createDoc.style.display = "none";
    yourDocs.style.display = "none";
}
function grabIP()   {

}

function checkIP()  {
    //if IP banned show pop up saying banned and show screen blank

    //else checkStatus()
    everythingElse.style.display = "block";
}
function checkStatus()  {
    //if user signed in - show all create docs - your docs - all docs 
    //change nav bar to say sign out
    
    //if admin signed in - only show admin panel
    //change nav bar to say sign out

    //else show loggedOut()
    loggedOut();
}

function loggedOut() {
    allDocs.style.display = "block";
    createDoc.style.display = "none";
    yourDocs.style.display = "none";
}

function loginSignupDisplay()  {
    loginSignup.style.display = "block";
    createDoc.style.display = "none"
    allDocs.style.display = "none";
    yourDocs.style.display = "none";
    adminPanel.style.display = "none";
}