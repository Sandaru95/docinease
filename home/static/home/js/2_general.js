// ============================================================ General






// Simple small popup boxes
// Usage: User Pass a Message and a Mode then A sweet alert will be appeared
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
















// () FOR pushing items to Local Storage
// Usage:
//      We pass the item {generated_name, item_pk} to ()
//      Then that item will be added to the Local Storage

function pushToDIEStorage(item){
    // localStorage['docinease'];

    // if localStorage['docinease'] is empty
    if(!localStorage.getItem("docinease")){
        console.log("Doc in ease local storage status: Empty");
        storagePulledList = [];
        storagePulledList.unshift(item);
        // Pushing it to the local storage
        localStorage.setItem("docinease", JSON.stringify(storagePulledList));
    }
    // if localStorage['docinease'] is full
    if(localStorage.getItem("docinease")){
        if(localStorage.getItem("docinease").length > 0){
            console.log("Doc in ease local storage status: Full");
            let storagePulledList = JSON.parse(localStorage.getItem("docinease"));
            storagePulledList.unshift(item);
            // Pushing it to the local storage
            localStorage.setItem("docinease", JSON.stringify(storagePulledList));
        };
    };
};










// Show or hide "Uploading...Please Wait" Preloader
// A General But HW File uploading section exclusive function
// Usage:
//      Whether preloader will show or wheather upload section should shows
function showOrHidePreloaderAndUploading(gonna_hide_preloader, gonna_hide_upload_section){

    // Preloader hiding or not
    if(gonna_hide_preloader){
        document.getElementById("hw_upload_preloader_section").style.display = "none";
    }else{
        document.getElementById("hw_upload_preloader_section").style.display = "block";
    };

    // Upload section hiding or not
    if(gonna_hide_upload_section){
        document.getElementById("hw_upload_section").style.display = "none";
    }else{
        document.getElementById("hw_upload_section").style.display = "block";
    };
};


// Reset uploader things like that with ()
// Usage:
//      Reset the HW file uploading section with new RAW HTML
function resetHwUploaderSection(){
    let hwUploaderSection = document.getElementById('hw_upload_section');
    hwUploaderSection.innerHTML = hwUploadSectionTemplate;
};


// Update PDF item list
// Usage:
//      Update The User View By Items In Local Storage
function updateHwPdfItemList(){
    // References
    let savedDocsSection = document.getElementById('saved-documents-section');


    let pdfItemList = (window.localStorage.getItem('docinease')) ? JSON.parse(window.localStorage.getItem('docinease')) : '';

    if(pdfItemList.length > 0){
        console.log("No Items: Full");
        let tempView = '';
        for(item of pdfItemList){
            tempView += `
                <div class="col s12 m4 l3 card pdf-hw-item">
                    <div class="card-image center-align a-pdf-item">
                        <img src="/static/home/img/pdf_icon.png">
                        <span class="card-title grey-text text-darken-4">${item.generated_name}</span>
                    </div>
                    <div class="card-action center-align">
                        <button href="#!" onclick="hwFileUploadOpenWithEditor(false, ${item.item_pk})" class="btn grey lighten-3 grey-text text-darken-3 waves-effect"><i class="material-icons">mode_edit</i></button>
                        <a href="/media${item.returning_path}" target="_blank" class="btn grey lighten-3 grey-text text-darken-3 waves-effect"><i class="material-icons">file_download</i></a>
                        <button onclick="deleteHwPdfItem(${item.item_pk})" class="btn grey lighten-3 grey-text text-darken-3 waves-effect"><i class="material-icons">delete</i></button>
                    </div>
                </div>   
            `;

        };
        document.getElementById("saved-documents-section").innerHTML = tempView;
    }else{
        console.log("No Items: Empty");
        let tempView = '<h6>No Saved Docs Found</h6>';
        document.getElementById("saved-documents-section").innerHTML = tempView;
    };
};
// Onload We are updating the view
updateHwPdfItemList();


// Update PDF item list With given array
// Usage:
//      Update user view by given filtered array rather than local storage
function updateHwPdfItemListWithArray(array){
    // References
    let savedDocsSection = document.getElementById('saved-documents-section');

    let pdfItemList = array;

    if(pdfItemList){
        console.log("No Items: Full");
        let tempView = '';
        for(item of pdfItemList){
            tempView += `
                <div class="col s12 m4 l3 card pdf-hw-item">
                    <div class="card-image center-align a-pdf-item">
                        <img src="/static/home/img/pdf_icon.png">
                        <span class="card-title grey-text text-darken-4">${item.generated_name}</span>
                    </div>
                    <div class="card-action center-align">
                        <a href="/media${item.returning_path}" target="_blank" class="btn grey lighten-3 grey-text text-darken-3 waves-effect"><i class="material-icons">file_download</i></a>
                        <a href="/media${item.returning_path}" target="_blank" class="btn grey lighten-3 grey-text text-darken-3 hide-on-med-and-down waves-effect"><i class="material-icons">print</i></a>
                        <button onclick="deleteHwPdfItem(${item.item_pk})" class="btn grey lighten-3 grey-text text-darken-3 waves-effect"><i class="material-icons">delete</i></button>
                    </div>
                </div>   
            `;

        };
        document.getElementById("saved-documents-section").innerHTML = tempView;
    }else{
        console.log("No Items: Empty");
        savedDocsSection.innerHTML = '<h6>No Saved Docs Found</h6>';
    };
};


// Function for deleting items
// Usage:
//      Delete the selected item by it's pk
function deleteHwPdfItem(selected_item_pk){
    // Array for storing filtered items
    let filteredList = [];
    // Getting the array
    let pdfItemList = (window.localStorage.getItem('docinease')) ? JSON.parse(window.localStorage.getItem('docinease')) : '';
    // Filtering array without selected item
    pdfItemList.filter((e) => {
        if(e.item_pk != selected_item_pk){
            filteredList.push(e);
        };
    });
    // Upading the List
    window.localStorage.setItem('docinease', JSON.stringify(filteredList));
    // Rerendering the view
    updateHwPdfItemList();
    if(is_in_popbox){
        document.body.click();
    };
};
// ============================================================ ./General