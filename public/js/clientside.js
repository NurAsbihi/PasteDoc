window.onload = boot;

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
function checkSession()   {
    let xhttp = new XMLHttpRequest();
    let status = document.getElementById("user-greet");

    if (sessionStorage.sessionUser == undefined)    {
        status.innerHTML += "<button onclick='loginSignupDisplay()'>Log in/Sign-up</button>";
    }
    else    {

        let data =  {
            id: sessionStorage.sessionUser
        }

        xhttp.onreadystatechange = function ()  {
            if (this.readyState == 4 && this.status == 200) {

                status.innerHTML += `<p>Hello, ${JSON.parse(this.responseText)} </p><button onclick="logoutUser()">Logout</button>`;

            }
        }

        // Send user object to server in JSON format
        xhttp.open('POST', '/requestName', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(data));
    }
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
                    p.appendChild(document.createTextNode("Registration successful, lease log in."));
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
function logoutUser()  {
    // Removes user from session logging them out
    sessionStorage.clear();
    location.reload();
}

function postDoc()  {
    let xhttp = new XMLHttpRequest();
    let msg = document.getElementById("doc-create");
    let clean = document.getElementById("error");

    let docTitle = document.getElementById("titleDoc").value;
    let docAuthor = document.getElementById("authDoc").value;
    // Password option here :)
    let docContent = document.getElementById("contentDoc").value;

    if (sessionStorage.sessionUser == undefined)    {
        alert("You need to sign in to Post Docs!");
        return
    }
    else    {
    
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
                        loadAllDocs();
                        loadYourDocs();
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
function loadAllDocs()  {
    let xhttp = new XMLHttpRequest();
    let table = document.getElementById("ad-tbody");

    // add if statement to check if table is full, if full clear it then insert data

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
                    var row = `<tr>
                                    <td>${jsonFormat[i].doc_title}</td>
                                    <td>${jsonFormat[i].author_alias}</td>
                                    <td>${jsonFormat[i].creation_da}</td>
                                    <td class="buttons">
                                        <button class="alt">View</button>
                                        <button class="alt" onclick="shareDoc()">Share</button>
                                    </td>
                               </tr>`;
                    table.innerHTML += row;
                }
            }
        }
    }
    
    xhttp.open('GET', '/loadAllDocs', true);
    xhttp.send();
}
function loadAdminDocs()    {
    let xhttp = new XMLHttpRequest();
    let table = document.getElementById("ap-tbody");

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
                    var row = `<tr>
                                    <td>${jsonFormat[i].doc_title}</td>
                                    <td>${jsonFormat[i].author_alias}</td>
                                    <td>${jsonFormat[i].creation_da}</td>
                                    <td>${jsonFormat[i].ip_address}</td>
                                    <td class="buttons">
                                        <button class="alt" onclick="viewDoc($[i])">View</button>
                                        <button id="deletedoc" class="alt" onclick="deleteDoc($[i])">Delete</button>
                                        <button class="alt">Ban User</button>
                                    </td>
                               </tr>`;
                    table.innerHTML += row;
                }
            }
        }
    }
    xhttp.open('GET', '/loadAdminDocs', true);
    xhttp.send();

}
function loadYourDocs()    {
    let xhttp = new XMLHttpRequest();
    let table = document.getElementById("yd-tbody");

    if (sessionStorage.sessionUser == undefined)    {
        return
    }
    else    {

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
                    let data = this.responseText;
                    let jsonFormat = JSON.parse(data);

                    //console.log(jsonFormat);

                    let tr = document.createElement('tr');

                    for (var i =0; i < jsonFormat.length; i++)  {
                        var row = `<tr>
                                        <td>${jsonFormat[i].doc_title}</td>
                                        <td>${jsonFormat[i].author_alias}</td>
                                        <td>${jsonFormat[i].creation_da}</td>
                                        <td class="buttons">
                                            <button class="alt" onclick="viewDoc($[i])">View</button>
                                            <button class="alt" onclick="shareDoc()">Share</button>
                                            <button id="deletedoc" class="alt" onclick="deleteDoc($[i])">Delete</button>
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
function viewDoc()  {
    /* readonly = "readonly" attribute added to doc */
}
function deleteDoc()    {
    let xhttp = new XMLHttpRequest();

    let docID = document.getElementsById("deletedoc")[index].id;

    console.log(docID);
}
function shareDoc() {
    alert("Not implemented");
}

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

        // if user perm = user show create doc, your docs, and all docs (hide login and admin panel)
        // if user perm = admin show admin panel only

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