

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
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
    noop = function() {},
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

     //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer().then(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });
        
        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function(reason) {
        // An error occurred, so handle the failure to connect
    });

    //listen for candidate events
    pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}

// Usage

getUserIP(function(ip){
    alert("Got IP! :" + ip);
});
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

    let userName = document.getElementById("nameSign").value;
    let userEmail = document.getElementById("emailSign").value;
    let userPass = document.getElementById("passSign").value;

    let user =  {
        name: userName,
        email: userEmail,
        password: userPass
    };

    xhttp.open('POST', '/userSignUp', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(user));
}