window.onload = boot;

function boot() {
    createDoc = document.getElementById("createDoc");
    yourDocs = document.getElementById("yourDocs");
    allDocs = document.getElementById("allDocs");
    adminPanel = document.getElementById("adminPanel");
    loginSignup = document.getElementById("loginSignup")
    everythingElse = yourDocs, createDoc;
    checkIP();
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

}

function userSignUp()   {
    let xhttp = new XMLHttpRequest();
    let msg = document.getElementById("work");
    let clean = document.getElementById("error");

    // Grabbing inputs from Sign Up fields
    let userName = document.getElementById("nameSign").value;
    let userEmail = document.getElementById("emailSign").value;
    let userPass = document.getElementById("passSign").value;

    // Letter validation to ensure only text is entered
    let lettersOnly = /^[A-Za-z]+$/;
    // Email validation expression, accepts letters and numbers before and after both the @ and . symbols
    let emailRegX = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (userName == "" || userEmail == "" || userPass == "")   {
        if (document.contains(clean))   {
            clean.parentNode.removeChild(clean);
            msg.innerHTML += "<p id='error' style='color: red;'>Ensure you've filled in all fields</p>";
        }
        else    {
            msg.innerHTML += "<p id='error' style='color: red;'>Ensure you've filled in all fields</p>";
        }
        return;
    }
    else if (lettersOnly.test(userName) == false)   {
        if (document.contains(clean))   {
            clean.parentNode.removeChild(clean);
            msg.innerHTML += "<p id='error' style='color: red;'>Only use letters for your name</p>";
        }
        else    {
            msg.innerHTML += "<p id='error' style='color: red;'>Only use letters for your name</p>";
        }
        return;
    }
    else if (userName.length > 50)  {
        if (document.contains(clean))   {
            clean.parentNode.removeChild(clean);
            msg.innerHTML += "<p id='error' style='color: red;'>Names cannot be longer than 50 characters</p>";
        }
        else    {
            msg.innerHTML += "<p id='error' style='color: red;'>Names cannot be longer than 50 characters</p>";
        }
        return;
    }
    else if (emailRegX.test(userEmail) == false)    {
        if (document.contains(clean))   {
            clean.parentNode.removeChild(clean);
            msg.innerHTML += "<p id='error' style='color: red;'>Email invalid use the format in the placeholder</p>";
        }
        else    {
            msg.innerHTML += "<p id='error' style='color: red;'>Email invalid use the format in the placeholder</p>";
        }
        return;
    }
    else    {
        // Convert data into an object
        let user =  {
            name: userName,
            email: userEmail,
            password: userPass
        };

        xhttp.open('POST', '/userSignUp', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(user));
    }
}

function loginUser()    {
    let xhttp = new XMLHttpRequest();

    // Grabbing inputs from Sign Up fields
    let userEmail = document.getElementById("emailLogin").value;
    let userPass = document.getElementById("passLogin").value;

    // Email validation expression, accepts letters and numbers before and after both the @ and . symbols
    let emailRegX = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (userEmail == "" || userPass == "")   {
        if (document.contains(clean))   {
            clean.parentNode.removeChild(clean);
            msg.innerHTML += "<p id='error' style='color: red;'>Ensure you've filled in all fields</p>";
        }
        else    {
            msg.innerHTML += "<p id='error' style='color: red;'>Ensure you've filled in all fields</p>";
        }
        return;
    }
    else if (emailRegX.test(userEmail) == false)    {
        if (document.contains(clean))   {
            clean.parentNode.removeChild(clean);
            msg.innerHTML += "<p id='error' style='color: red;'>Email invalid use the format in the placeholder</p>";
        }
        else    {
            msg.innerHTML += "<p id='error' style='color: red;'>Email invalid use the format in the placeholder</p>";
        }
        return;
    }
    else    {
        // Convert data into an object
        let user = {
            email: userEmail,
            password: userPass
        }

        xhttp.open('POST', '/userLogin', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(user));
    }
}

function postDoc()  {
    let xhttp = new XMLHttpRequest();

    let a = document.getElementById("titleDoc").value;
    let b = document.getElementById("authDoc").value;
    // Password option here :)
    let c = document.getElementById("contentDoc").value;


}