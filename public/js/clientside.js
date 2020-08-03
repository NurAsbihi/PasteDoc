// As soon as window loads website run the boot function
window.onload = boot;

// Function run as soon as page is loaded
// Creates variables that grab the HTML sections Div IDs so they can be hidden/shown
function boot() {
    createDoc = document.getElementById("createDoc");
    yourDocs = document.getElementById("yourDocs");
    allDocs = document.getElementById("allDocs");
    adminPanel = document.getElementById("adminPanel");
    loginSignup = document.getElementById("loginSignup");
    viewDoc = document.getElementById("display-doc");
    checkSession();
    loadAllDocs();
    home();
}
// Function to check is SessionStorage has a logged in user saved
function checkSession()   {
    let xhttp = new XMLHttpRequest();
    let status = document.getElementById("user-greet");
    // If user is not signed in changed header button to say log in
    if (sessionStorage.sessionUser == undefined)    {
        status.innerHTML += "<button onclick='loginSignupDisplay()'>Log in/Sign-up</button>";
    }
    // If user is logged in display welcome message with the users name and show logout button
    else    {

        // Creates an object that will be sent in JSON to server
        let data =  {
            id: sessionStorage.sessionUser
        }

        xhttp.onreadystatechange = function ()  {
            // If response from server is received do the following
            if (this.readyState == 4 && this.status == 200) {
                // Show users Name and show logout button
                status.innerHTML += `<p>Hello, ${JSON.parse(this.responseText)} </p><button onclick="logoutUser()">Logout</button>`;
            }
        }

        // Send user object to server in JSON format
        xhttp.open('POST', '/requestName', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(data));
    }
}
// Function for user registration
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

    // If input fields are empty
    if (userName == "" || userEmail == "" || userPass == "")   {
        // Display this error message
        let errText = document.createTextNode("Ensure you've filled in all fields");
        
        // If error message is already showing
        if (document.contains(clean))   {
            // Remove error message and display again (prevents stacking)
            clean.parentNode.removeChild(clean);
            errLine.appendChild(errText);
        }
        else    {
            // If there isn't already an error message show error message
            errLine.appendChild(errText);
        }
    }
    // Check if Name input field is letters
    else if (lettersOnly.test(userName) == false)   {
        // If not show this error message
        let errText = document.createTextNode("Only use letters for your name");

        if (document.contains(clean))   {
            clean.parentNode.removeChild(clean);
            errLine.appendChild(errText);
        }
        else    {
            errLine.appendChild(errText);
        }
    }
    // Check character length of Name input
    else if (userName.length > 50)  {
        // If it's longer than 50 characters display this error message
        let errText = document.createTextNode("Names cannot be longer than 50 characters");
        
        if (document.contains(clean))   {
            clean.parentNode.removeChild(clean);
            errLine.appendChild(errText);
        }
        else    {
            errLine.appendChild(errText);
        }
    }
    // Check if email matches my Email Regular Expression (email@email.com)
    else if (emailRegX.test(userEmail) == false)    {
        // If not display this error message
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
                    // Create div element and p element for styling and containing success/error message
                    let status = document.createElement("div");
                    status.setAttribute("id", "alert-box");
                    let p = document.createElement("p");

                    // Insert Text into P element then wrap with Div element
                    p.appendChild(document.createTextNode("Registration successful, lease log in."));
                    status.appendChild(p);

                    // Place status Div element above everything within Sign-Up Div
                    msg.insertBefore(status, msg.childNodes[0]);
                }
                else    {
                    // Create div element and p element for styling and containing success/error message
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
// Function for user logins
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

    // If input fields are empty
    if (userEmail == "" || userPass == "")   {
        // Display this error message
        let errText = document.createTextNode("Ensure you've filled in all fields");

        // If error message is already showing
        if (document.contains(clean))   {
            // Remove error message and display again (prevents stacking)
            clean.parentNode.removeChild(clean);
            errLine.appendChild(errText);
        }
        else    {
            // If there isn't already an error message show error message
            errLine.appendChild(errText);
        }
    }
    // If email input doesn't match Regular Expression for emails
    else if (emailRegX.test(userEmail) == false)    {
        // Display this error message
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
                if (xhttp.responseText == "error")  {
                    let status = document.createElement("div");
                    status.setAttribute("id", "alert-box");
                    let p = document.createElement("p");

                    // Insert Text into P element then wrap with Div element
                    p.appendChild(document.createTextNode("Incorrect Email or Password"));
                    status.appendChild(p);

                    // Place status Div element above everything within Sign-Up Div
                    msg.insertBefore(status, msg.childNodes[0]);
                }
                else    {
                    let status = document.createElement("div");
                    status.setAttribute("id", "alert-box");
                    let p = document.createElement("p");

                    // Insert Text into P element then wrap with Div element
                    p.appendChild(document.createTextNode("Logging in..."));
                    status.appendChild(p);

                    // Place status Div element above everything within Sign-Up Div
                    msg.insertBefore(status, msg.childNodes[0]);
                    sessionStorage.sessionUser = JSON.parse(this.responseText);
                    
                    location.reload();
                }
            }
        }

        // Send user object to server in JSON format
        xhttp.open('POST', '/userLogin', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(user));
    }
}
// Function logs out users by clearing the sessionStorage containing their uswe_id, and refreshed the webpage
function logoutUser()  {
    // Removes user from session logging them out
    sessionStorage.clear();
    location.reload();
}
// Function uploads text documents along with the user_id from sessionStorage
function postDoc()  {
    let xhttp = new XMLHttpRequest();
    let msg = document.getElementById("doc-create");
    let clean = document.getElementById("error");

    // Grabbing inputs from Sign Up fields
    let docTitle = document.getElementById("titleDoc").value;
    let docAuthor = document.getElementById("authDoc").value;
    let docPass = document.getElementById("passDoc").value
    let docContent = document.getElementById("contentDoc").value;

    // If sessionStorage is empty (because user isn't logged in)
    if (sessionStorage.sessionUser == undefined)    {
        // Display alert error message and stop function
        alert("You need to sign in to Post Docs!");
        return
    }
    else    {
    
        let errLine = msg.appendChild(document.createElement('p'));
        errLine.setAttribute("id", "error");
        errLine.style.cssText = "color: red;";

        // Ensure all fields apart from password input are not blank
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
        else if (docTitle.length > 80) {
            let errText = document.createTextNode("Doc Titles can be no longer than 80 characters!");

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
                id: sessionStorage.sessionUser,
                title: docTitle,
                author: docAuthor,
                password: docPass,
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
                        loadAllDocs();
                        loadYourDocs();
                        location.reload();
                    }
                    else    {
                        let status = document.createElement("div");
                        status.setAttribute("id", "alert-box");
                        let p = document.createElement("p");
        
                        // Insert Text into P element then wrap with Div element
                        p.appendChild(document.createTextNode("Something went wrong..."));
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
}
// Funciton requests doc data for the all docs section on the website
function loadAllDocs()  {
    let xhttp = new XMLHttpRequest();
    let table = document.getElementById("ad-tbody");
    // Resets/Clears the previous loaded docs
    table.innerHTML="";

    // add if statement to check if table is full, if full clear it then insert data

    xhttp.onreadystatechange = function()   {
        if (this.readyState == 4 && this.status == 200)    {
            console.log("Howdy:", this.responseText);
            
            if (xhttp.responseText == "error")  {
                alert("Something went wrong when fetching the data, check console");
                console.log(this.responseText);
            }
            else    {

                // Covert JSON to JS Object
                let data = this.responseText;
                let jsonFormat = JSON.parse(data);

                let tr = document.createElement('tr');
                // For each JSON doc create a new table row and loop through until the end
                for (var i =0; i < jsonFormat.length; i++)  {
                    // HTML Formatted Doc Data Shown On Site
                    var row = `<tr>
                                    <td>${jsonFormat[i].doc_title}</td>
                                    <td>${jsonFormat[i].author_alias}</td>
                                    <td>${jsonFormat[i].creation_da}</td>
                                    <td class="buttons">
                                        <button id="${jsonFormat[i].doc_id}" class="alt" onclick="openDoc(this.id);">View</button>
                                        <button class="alt" onclick="shareDoc()">Share</button>
                                    </td>
                               </tr>`;
                    table.innerHTML += row;
                }
            }
        }
    }
    // Sends a GET Request for the doc table data specified
    xhttp.open('GET', '/loadAllDocs', true);
    xhttp.send();
}
// Function to request all docs for admin panel section
function loadAdminDocs()    {
    let xhttp = new XMLHttpRequest();
    let table = document.getElementById("ap-tbody");
    // Resets/Clears the previous loaded docs
    table.innerHTML="";

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

                let tr = document.createElement('tr');

                for (var i =0; i < jsonFormat.length; i++)  {
                    // HTML Formatted Doc Data Shown On Site
                    var row = `<tr>
                                    <td>${jsonFormat[i].doc_title}</td>
                                    <td>${jsonFormat[i].author_alias}</td>
                                    <td>${jsonFormat[i].creation_da}</td>
                                    <td>${jsonFormat[i].ip_address}</td>
                                    <td class="buttons">
                                        <button id="${jsonFormat[i].doc_id}" class="alt" onclick="openDoc(this.id);">View</button>
                                        <button id="${jsonFormat[i].doc_id}" class="alt" onclick="deleteDoc(this.id);">Delete</button>
                                        <button id="${jsonFormat[i].user_id}" class="alt" onclick="shareDoc()">Ban User</button>
                                    </td>
                               </tr>`;
                    table.innerHTML += row;
                }
            }
        }
    }
    // Sends a GET Request for the doc table data specified
    xhttp.open('GET', '/loadAdminDocs', true);
    xhttp.send();

}
// Function sends the sessionStorage.sessionUser which is the logged in users ID and requests all documents created by that user to display in the all docs section
function loadYourDocs()    {
    let xhttp = new XMLHttpRequest();
    let table = document.getElementById("yd-tbody");
    // Resets/Clears the previous loaded docs
    table.innerHTML="";

    // If user is not logged in do not execute this function
    if (sessionStorage.sessionUser == undefined)    {
        return
    }
    else    {

        // Creating an Object with the sessionUser (user_id)
        let data =  {
            id: sessionStorage.sessionUser
        }

        xhttp.onreadystatechange = function()   {
            if (this.readyState == 4 && this.status == 200)    {
                console.log("Howdy:", this.responseText);
                
                if (xhttp.responseText == "error")  {
                    alert("Something went wrong when fetching the data, check console");
                    console.log(this.responseText);
                }
                else    {
                    // Parsing the JSON to a JavaScript Object
                    let data = this.responseText;
                    let jsonFormat = JSON.parse(data);

                    let tr = document.createElement('tr');

                    for (var i =0; i < jsonFormat.length; i++)  {
                        var row = `<tr>
                                        <td>${jsonFormat[i].doc_title}</td>
                                        <td>${jsonFormat[i].author_alias}</td>
                                        <td>${jsonFormat[i].creation_da}</td>
                                        <td class="buttons">
                                            <button id="${jsonFormat[i].doc_id}" class="alt" onclick="openDoc(this.id);">View</button>
                                            <button class="alt" onclick="shareDoc()">Share</button>
                                            <button id="${jsonFormat[i].doc_id}" class="alt" onclick="deleteDoc(this.id);">Delete</button>
                                        </td>
                                </tr>`;
                        table.innerHTML += row;
                    }
                }
            }
        }
        // Send user object to server in JSON format
        xhttp.open('POST', '/loadYourDocs', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(data));
    }
}
// Function opens the specified document
function openDoc(id)  {
    let xhttp = new XMLHttpRequest();
    let docID = id;
    let div = document.getElementById("display-doc");
    // Resets/Clears the previous loaded document
    div.innerHTML="";

    // Create Object For JSON
    let data =  {
        id: docID
    }

    viewDoc.style.display = "block";

    xhttp.onreadystatechange = function ()  {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "error")   {
                alert("Something went wrong!");
            }
            else    {
                // Covert JSON to JS Object
                let data = this.responseText;
                let jsonFormat = JSON.parse(data);

                // HTML Formatted Doc Data Shown On Site
                let doc = `<div class="line-flow">
                            <h1>${jsonFormat[0].doc_title}</h1>
                            <div class="doc-information">
                                <div class="doc-author">
                                    <p>By: ${jsonFormat[0].author_alias}</p>
                                </div>
                                <div class="doc-date">
                                    <p>Date Created: ${jsonFormat[0].creation_da}</p>
                                </div>
                                <div class="share-button">
                                    <button class="alt" onclick="shareDoc()">Share</button>
                                </div>
                            </div>
                            </div>
                            <div class="display-doc inner-wrapper">
                                <textarea name="doc-paste" readonly="readonly">${jsonFormat[0].doc_content}</textarea>
                            </div>`;

                div.innerHTML += doc;

            }
        }
    }

    xhttp.open('POST', '/openDoc', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(data));
}
// Function deletes the specified document
function deleteDoc(id)    {
    let xhttp = new XMLHttpRequest();
    let docID = id;

    // Create Object For JSON
    let data =  {
        id: docID
    }

    xhttp.onreadystatechange = function ()  {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "success") {
                alert("Doc was successfully deleted");
                location.reload();
            }
            else    {
                alert(this.statusText);
            }
        }
    }

    // Send user object to server in JSON format
    xhttp.open('POST', '/deleteDoc', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(data));
}
// Function could not be achieved because I couldn't create pages for each doc (due to requirements)
// So the function just acts as an alert to inform you that it wasn't implimented
function shareDoc() {
    alert("Not implemented");
}
// This function determines what sections will be shown depending on whether user is logged in and what their permission is
function home() {
    let xhttp = new XMLHttpRequest();

    // if sessionStorage unidentified show All Docs and login/signup

    if (sessionStorage.sessionUser  == undefined)   {
        allDocs.style.display = "block";
        loginSignup.style.display = "none";
        viewDoc.style.display = "none";
        createDoc.style.display = "none"
        yourDocs.style.display = "none";
        adminPanel.style.display = "none";
    }
    else    {
        // Convert data into an object
        let data = {
            id: sessionStorage.sessionUser
        }

        // if user permission = user show create doc, your docs, and all docs (hide login and admin panel)
        // if user permission = admin show admin panel only

        xhttp.onreadystatechange = function ()  {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                let jsonFormat = JSON.parse(this.responseText);
                if  (jsonFormat == "user")   {
                    loadYourDocs();
                    createDoc.style.display = "block";
                    allDocs.style.display = "block";
                    yourDocs.style.display = "block";
                    adminPanel.style.display = "none";
                    viewDoc.style.display = "none";
                    loginSignup.style.display = "none";
                }
                else if (jsonFormat == "admin")  {
                    loadAdminDocs();
                    loadYourDocs();
                    adminPanel.style.display = "block";
                    createDoc.style.display = "none"
                    allDocs.style.display = "none";
                    yourDocs.style.display = "none";
                    loginSignup.style.display = "none";
                    viewDoc.style.display = "none";
                }
            }
        }
        // Send user object to server in JSON format
        xhttp.open('POST', '/getPerm', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(data));
    }
}


// Displaying And Hiding Elements Functions
// These are used to redirect the user to different page sections

function createDocDisplay()    {
    createDoc.style.display = "block";
    allDocs.style.display = "none";
    loginSignup.style.display = "none";
    yourDocs.style.display = "none";
    adminPanel.style.display = "none";
    viewDoc.style.display = "none";
};
function yourDocsDisplay() {
    yourDocs.style.display = "block";
    createDoc.style.display = "none";
    allDocs.style.display = "none";
    adminPanel.style.display = "none";
    viewDoc.style.display = "none";
    loginSignup.style.display = "none";
}
function allDocsDisplay() {
    allDocs.style.display = "block";
    createDoc.style.display = "none";
    yourDocs.style.display = "none";
    loginSignup.style.display = "none";
    adminPanel.style.display = "none";
    viewDoc.style.display = "none";
}
function loginSignupDisplay()  {
    loginSignup.style.display = "block";
    createDoc.style.display = "none"
    allDocs.style.display = "none";
    yourDocs.style.display = "none";
    adminPanel.style.display = "none";
    viewDoc.style.display = "none";
}