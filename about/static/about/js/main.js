// ============================================================ General
// Simple small popup boxes
function pop(message, mode, timeout=3000){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: timeout,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
      
    Toast.fire({
        icon: mode,
        title: message
    });
};




// ============================================================ Top Nav
// Side Nav Trigger Click When...
function openSideNav(){
    let sideNavTriggerList = document.getElementsByClassName("sidenav-trigger");
    for (let tri of sideNavTriggerList){
        tri.click();
    };
};

// Refresh Page
function refreshThePageOrItsItems(){
    // The Gratification
    pop("Page Refreshed", "success", 1000);
};

// ============================================================ CONTENT
// sendMessage
function sendMessage(){
    let messageText = document.getElementById("suggest_message_input");
    $.ajax({
        url: "/about/saveSuggestion/",
        type: "POST",
        data: {
            "suggest_message_input": messageText.value,
            "csrfmiddlewaretoken": document.getElementsByName("csrfmiddlewaretoken")[0].value,
        },
        success: function(response) {
            messageText.value = '';
            pop("Thanks alot for helping us improve this product", "success", 3000);
        },
        error: function(jqXHR, textStatus, errorMessage) {
            console.log(errorMessage); // Optional
        }
    });
};