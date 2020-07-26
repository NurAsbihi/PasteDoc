console.log('Proof of concept')

function home() {
    yourDocs.style.display = "none";
}

function createDoc()    {
    yourDocs.style.display = "none";
    allDocs.style.display = "none";
};
function yourDocs() {
    yourDocs.style.display = "block";
    createDoc.style.display = "none";
    allDocs.style.display = "none";
}

home();