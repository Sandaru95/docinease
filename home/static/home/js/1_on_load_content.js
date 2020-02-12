// ========================================================= ONLOAD CONTENT
// Preloader: Showing and hiding
function onLoadShowPreloader(){
    document.getElementById("onload-preloader").style.display = "block";
    setTimeout(() => {
        // ========================================= PRE SETUPS
        let docInEaseStorageValue = window.localStorage.getItem("docinease");
        // ========================================= ./PRE SETUPS
        // Loading BODY
        document.getElementById("onload-preloader").style.display = "none";
        let mainWrapper = document.getElementById("main-wrapper").style.display = "block";
        // If User first Time > Showing Welcome Message()
        if(!docInEaseStorageValue){
            welcomeMessage();
        };
    }, 500);
    
};

// Welcome message if the user is first time visiting the site
function welcomeMessage(){
    Swal.fire(
        'First Time Visitor',
        'Welcome! Doc In Ease is a platform for converting handwritten documents to PDFs. You upload Your handwritten documents then our AI will output the PDF version of it.',
        'info'
    ).then( () => {
        pop("Use help section for any kinda help", "info", 1500);
    });
};