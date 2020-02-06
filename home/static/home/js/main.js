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
// Simple function for pushing items to local storage
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
function resetHwUploaderSection(){
    let hwUploaderSection = document.getElementById('hw_upload_section');
    hwUploaderSection.innerHTML = hwUploadSectionTemplate;
};
// Update PDF item list
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
        let tempView = '<h6>No Saved Docs Found</h6>';
        document.getElementById("saved-documents-section").innerHTML = tempView;
    };
};updateHwPdfItemList();
// Update PDF item list With given array
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
};updateHwPdfItemList();
// Function for deleting items
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










// ============================================================== SEARCH NAV
function searchingSubmission(){
    let searchInputVal = document.getElementById('search').value;
    console.log(searchInputVal);
    // Array for storing filtered items
    let filteredList = [];
    // Getting the array
    let pdfItemList = (window.localStorage.getItem('docinease')) ? JSON.parse(window.localStorage.getItem('docinease')) : '';
    // Filtering array without selected item
    pdfItemList.filter((e) => {
        if(e.generated_name.includes(searchInputVal)){
            filteredList.push(e);
        };
    });
    // Rerendering the view
    updateHwPdfItemListWithArray(filteredList);
};
function closeSearchNavBar(){
    let searchNavBar = document.getElementById("search-nav-bar");
    let navBar = document.getElementById("nav-bar");

    navBar.style.display = 'block';
    searchNavBar.style.display = 'none';
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
    // The Update
    updateHwPdfItemList();
    // The Gratification
    pop("Page Refreshed", "success", 1000);
};
// Open Search Box
function openSearchBox(){
    let searchNavBar = document.getElementById("search-nav-bar");
    let navBar = document.getElementById("nav-bar");

    navBar.style.display = 'none';
    searchNavBar.style.display = 'block';
};
// ========================================================= ONLOAD
// Preloader: Showing and hiding
function beforeLoadShowPreloader(){
    document.getElementById("sanda-preloader").style.display = "block";
    setTimeout(() => {
        // ========================================= PRE SETUPS
        let docInEaseStorageValue = window.localStorage.getItem("docinease");
        // ========================================= ./PRE SETUPS
        // Loading BODY
        document.getElementById("sanda-preloader").style.display = "none";
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
// =================================================================
// ======================== HW File Upload
function clickOnHwFileInput(){
    // References
    let hwUploadInput = document.getElementById("hw_upload_input");
    let hwUploadThumbnail = document.getElementById("hw_upload_thumbnail");
    let hwUploadH6 = document.getElementById("hw_upload_h6");
    let hwUploadClownBtn = document.getElementById("hw_upload_clown_btn");
    let hwOpenEditorBtn = document.getElementById("hw_editor_open_btn");
    
    // Showing window
    // Opening File select Box 
    hwUploadInput.click();

    // File Selected --
    hwUploadInput.addEventListener("change", () => {
        // 1.Step = Hiding The Upload Sentence
        hwUploadH6.style.display = "none";
        // 2.Step = Setting the selected image thumbnail
        console.log("a image is selected!");
        let reader = new FileReader();

        reader.onload = function (e) {
            // Setting thumbnail image to true
            hwUploadThumbnail.style.display = "block";
            // Setting the thumbnail
            hwUploadThumbnail.src = e.target.result;
            // Small Gratification popup for saying the image is selected
            pop("Handwritten Image was selected", "info", 1500);
        };
        reader.readAsDataURL(hwUploadInput.files[0]);
        // 3.Step = Hiding Upload | Showing Next
        hwUploadClownBtn.style.display = "none";
        hwOpenEditorBtn.style.display = "inline-block";
    });
};

function SaveHwFileEdit(item_pk){
    console.log(`posted item pk is ${item_pk}`);
    console.log(`posted text is ${document.getElementById("hw_editor_content_editor").innerText}`);

    let csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].innerText;
    
    $.ajax({
        type: 'POST',
        url: '/home/updateHwFileByPostedText/',
        data: {
            "posted_item_pk": item_pk,
            "posted_item_edited_text": document.getElementById("hw_editor_content_editor").innerHTML,
            'csrfmiddlewaretoken': $("input[name='csrfmiddlewaretoken']").val()
        },
        success: function (response) {
            console.log("got here!");
            pushToDIEStorage(JSON.parse(response));
            resetHwUploaderSection();
            updateHwPdfItemList();
            pop("Item Saved!", "success", 1000);
        }
    });
};













































// ======================================================= Editor
// General
function encodeTextForUseWithEditor(text_passed){
    let tempPara = ``;
    let id = 1;
    let lastPushedId = 0;
    let temp_sentence = '';
    for(let word of text_passed.split(' ')){
        // Adding words to temp sentence until | IT READY TO PUSH
        temp_sentence += `${word} `;
        id++;
        if(id % 10 == 0){
            tempPara += `<span class="text-span-${id}">${temp_sentence}</span> `;
            // Setting last pushed ID
            lastPushedId = id;
            // Resetting the temp sentence
            temp_sentence = '';
        };
    };  
    // If something remain in temp sentence after pushes | PUSHING THEM ALSO
    if(temp_sentence.length > 1){
        tempPara += `<span class="text-span-${++lastPushedId}">${temp_sentence}</span> `;
    };
    return tempPara;
};
// Variable holding current selected text
let currentSelectedText;

function hwEditorClickSubmission(){
    // On click to hand written UPDATING | current selected text

    // References 
    let hwEditorContentEditor = document.getElementById('hw_editor_content_editor');
    
    currentSelectedText = {"text": window.getSelection().toString(), "parent": window.getSelection().anchorNode.parentElement};
};

function hwFileUploadOpenWithEditor(){
    // Gratification
    pop("Opening Editor with text", "info", 2000);
    // ******************************** GETTING TEXTSs
    // References
    let hwUploadInput = document.getElementById("hw_upload_input");
    let csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0];
    let hwUploadForm = document.getElementById("hw_upload_form");

    let fd = new FormData(hwUploadForm);

    // So Posted
    // showing preloader until success,
    // Hiding uploading section
    showOrHidePreloaderAndUploading(false, true);
    let returnedText;
    $.ajax({
        url: "/home/returnHwFileText/",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(response) {
            showOrHidePreloaderAndUploading(true, false);
            resetHwUploaderSection();
            returnedText = JSON.parse(response);
            continueToEditor(returnedText['returned_text'], returnedText['item_pk']);
        },
        error: function(jqXHR, textStatus, errorMessage) {
            console.log(errorMessage); // Optional
        }
    });
    // ******************************** OPEN EDITOR WITH THAT TEXT
    function continueToEditor(passed_text, item_pk){
        let body = document.body;
        body.innerHTML = `
            <div class="card z-depth-3" id="hw_editor">
                <div id="hw_editor_top">   
                    <p>Document Editor</p>
                    <button class="btn red right waves-effect waves-light" onclick="closeEditor()"><i class="material-icons">close</i></button>
                </div>
                <div class="hw_editor_content">
                    <div contenteditable="true" id="hw_editor_content_editor">
                        ${encodeTextForUseWithEditor(passed_text)}
                    </div>
                </div>
                <div id="hw_editor_btns">
                    <!-- ================== Font Size -->
                    <input type="number" id="font-size-input">
                    <!-- ================== Color Operations -->
                    <button class="btn waves-effect right hw_editor_option_btn" id="hwEditorColorButton" onclick="clickOnHwEditorColorPicker()"><i class="material-icons">format_color_fill</i></button>
                    <input type="color" style="display: none;" id="hwEditorColorInput">
                    <!-- ================== Text Operations -->
                    <!-- Bold -->
                    <button class="btn blue white-text waves-effect right hw_editor_option_btn" onclick="hwEditorBold()"><i class="material-icons">format_bold</i></button>
                    <!-- Underline -->
                    <button class="btn blue white-text waves-effect right hw_editor_option_btn" onclick="hwEditorUnderline()"><i class="material-icons">format_underlined</i></button>
                    <!-- Strikethrough -->
                    <button class="btn blue white-text waves-effect right hw_editor_option_btn" onclick="hwEditorStrike()"><i class="material-icons">format_strikethrough</i></button>

                    <!-- ================== Text Indent -->
                    <!-- Text Indent -->
                    <button class="btn blue white-text waves-effect right hw_editor_option_btn" onclick="hwTextIndent()"><i class="material-icons">format_indent_increase</i></button>

                    <!-- Format Italic -->
                    <button class="btn blue white-text waves-effect right hw_editor_option_btn" onclick="hwTextItalic()"><i class="material-icons">format_italic</i></button>

                    <!-- ================== Alignment -->
                    <!-- Align left -->
                    <button class="btn blue white-text waves-effect right hw_editor_option_btn" onclick="hwTextAlignLeft()"><i class="material-icons">format_align_left</i></button>
                    <!-- Align Center -->
                    <button class="btn blue white-text waves-effect right hw_editor_option_btn" onclick="hwTextAlignCenter()"><i class="material-icons">format_align_center</i></button>
                    <!-- Align Right -->
                    <button class="btn blue white-text waves-effect right hw_editor_option_btn" onclick="hwTextAlignRight()"><i class="material-icons">format_align_right</i></button>

                    <!-- ================== Item Lists -->
                    <!-- Item UnOrdered List -->
                    <button class="btn blue white-text waves-effect right hw_editor_option_btn" onclick="hwListUnordered()"><i class="material-icons">format_list_bulleted</i></button>
                    <!-- ================== Font family -->
                    <div class="input-field col s12">
                        <select>
                            <option value="" disabled selected>Choose your option</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                        </select>
                        <label>Materialize Select</label>
                    </div>

                    <!-- ================== Save -->
                    <!-- Save Button -->
                    <button id="hw_editor_save_btn" class="btn blue white-text waves-effect right" onclick="SaveHwFileEdit(${item_pk})"><i class="material-icons">save</i> Save</button>
                </div>
            </div>
        ` + body.innerHTML;

        // Adding event listener for new inputs
        document.getElementById('hw_editor_content_editor').addEventListener('keydown', hwEditorInputSubmission);
        // Adding event listener for text selection
        document.getElementById("hw_editor_content_editor").addEventListener("click", hwEditorClickSubmission);
    };
};

function closeEditor(){
    document.getElementById("hw_editor").style.display = 'none';
};

function hwEditorInputSubmission(){
    // References 
    let hwEditorContentEditor = document.getElementById('hw_editor_content_editor');
    console.log(hwEditorContentEditor.innerHTML);
    // hwEditorContentEditor.innerHTML = encodeTextForUseWithEditor(hwEditorContentEditor.innerHTML);
};
/* ==================== Editor Options */

/* Bold */
function hwEditorBold(){
    console.log("bolding");
    // References
    let hwEditor = document.getElementById("hw_editor_content_editor");
    let hwEditorSelectedSpanText = currentSelectedText.parent.innerHTML;

    let tempHtml = ``;

    if(hwEditorSelectedSpanText.includes(`<b>${currentSelectedText.text}</b>`)){
        // If selected text already bold
        // Replacing with non bold version
        tempHtml = currentSelectedText.parent.innerHTML.replace(`<b>${currentSelectedText.text}</b>`, currentSelectedText.text);
    }else{
        // If selected text is not bold
        // Replacing with bolded text
        tempHtml = currentSelectedText.parent.innerHTML.replace(currentSelectedText.text, `<b>${currentSelectedText.text}</b>`);
    };
    console.log(tempHtml);
    currentSelectedText.parent.innerHTML = tempHtml;
};
/* Underline */
function hwEditorUnderline(){
    console.log("underline");
    // References
    let hwEditor = document.getElementById("hw_editor_content_editor");
    let hwEditorSelectedSpanText = currentSelectedText.parent.innerHTML;

    let tempHtml = ``;

    if(hwEditorSelectedSpanText.includes(`<s_underline>${currentSelectedText.text}</s_underline>`)){
        // If selected text already bold
        // Replacing with non bold version
        tempHtml = currentSelectedText.parent.innerHTML.replace(`<s_underline>${currentSelectedText.text}</s_underline>`, currentSelectedText.text);
    }else{
        // If selected text is not bold
        // Replacing with bolded text
        tempHtml = currentSelectedText.parent.innerHTML.replace(currentSelectedText.text, `<s_underline>${currentSelectedText.text}</s_underline>`);
    };
    console.log(tempHtml);
    currentSelectedText.parent.innerHTML = tempHtml;
};
/* Strike Through */
function hwEditorStrike(){
    console.log("striking through");
    // References
    let hwEditor = document.getElementById("hw_editor_content_editor");
    let hwEditorSelectedSpanText = currentSelectedText.parent.innerHTML;

    let tempHtml = ``;

    if(hwEditorSelectedSpanText.includes(`<s_strike>${currentSelectedText.text}</s_strike>`)){
        // If selected text already bold
        // Replacing with non bold version
        tempHtml = currentSelectedText.parent.innerHTML.replace(`<s_strike>${currentSelectedText.text}</s_strike>`, currentSelectedText.text);
    }else{
        // If selected text is not bold
        // Replacing with bolded text
        tempHtml = currentSelectedText.parent.innerHTML.replace(currentSelectedText.text, `<s_strike>${currentSelectedText.text}</s_strike>`);
    };
    console.log(tempHtml);
    currentSelectedText.parent.innerHTML = tempHtml;
};
/* Text Indent */
function hwTextIndent(){
    console.log("text indent");
    // References
    let hwEditor = document.getElementById("hw_editor_content_editor");
    let hwEditorSelectedSpanText = currentSelectedText.parent.innerHTML;

    let tempHtml = ``;

    if(hwEditorSelectedSpanText.includes(`<s_indent>${currentSelectedText.text}</s_indent>`)){
        // If selected text already bold
        // Replacing with non bold version
        tempHtml = currentSelectedText.parent.innerHTML.replace(`<s_indent>${currentSelectedText.text}</s_indent>`, currentSelectedText.text);
    }else{
        // If selected text is not bold
        // Replacing with bolded text
        tempHtml = currentSelectedText.parent.innerHTML.replace(currentSelectedText.text, `<s_indent>${currentSelectedText.text}</s_indent>`);
    };
    console.log(tempHtml);
    currentSelectedText.parent.innerHTML = tempHtml;
};
/* Text Italic */
function hwTextItalic(){
    console.log("text italic");
    // References
    let hwEditor = document.getElementById("hw_editor_content_editor");
    let hwEditorSelectedSpanText = currentSelectedText.parent.innerHTML;

    let tempHtml = ``;

    if(hwEditorSelectedSpanText.includes(`<s_italic>${currentSelectedText.text}</s_italic>`)){
        // If selected text already bold
        // Replacing with non bold version
        tempHtml = currentSelectedText.parent.innerHTML.replace(`<s_italic>${currentSelectedText.text}</s_italic>`, currentSelectedText.text);
    }else{
        // If selected text is not bold
        // Replacing with bolded text
        tempHtml = currentSelectedText.parent.innerHTML.replace(currentSelectedText.text, `<s_italic>${currentSelectedText.text}</s_italic>`);
    };
    console.log(tempHtml);
    currentSelectedText.parent.innerHTML = tempHtml;
};
/* Align Left */
function hwTextAlignLeft(){
    console.log("align left");
    // References
    let hwEditor = document.getElementById("hw_editor_content_editor");
    let hwEditorSelectedSpanText = currentSelectedText.parent.innerHTML;

    let tempHtml = ``;

    if(hwEditorSelectedSpanText.includes(`<s_align_left>${currentSelectedText.text}</s_align_left>`)){
        // If selected text already bold
        // Replacing with non bold version
        tempHtml = currentSelectedText.parent.innerHTML.replace(`<s_align_left>${currentSelectedText.text}</s_align_left>`, currentSelectedText.text);
    }else{
        // If selected text is not bold
        // Replacing with bolded text
        tempHtml = currentSelectedText.parent.innerHTML.replace(currentSelectedText.text, `<s_align_left>${currentSelectedText.text}</s_align_left>`);
    };
    console.log(tempHtml);
    currentSelectedText.parent.innerHTML = tempHtml;
};
/* Align Center */
function hwTextAlignCenter(){
    console.log("align center");
    // References
    let hwEditor = document.getElementById("hw_editor_content_editor");
    let hwEditorSelectedSpanText = currentSelectedText.parent.innerHTML;

    let tempHtml = ``;

    if(hwEditorSelectedSpanText.includes(`<s_align_center>${currentSelectedText.text}</s_align_center>`)){
        // If selected text already bold
        // Replacing with non bold version
        tempHtml = currentSelectedText.parent.innerHTML.replace(`<s_align_center>${currentSelectedText.text}</s_align_center>`, currentSelectedText.text);
    }else{
        // If selected text is not bold
        // Replacing with bolded text
        tempHtml = currentSelectedText.parent.innerHTML.replace(currentSelectedText.text, `<s_align_center>${currentSelectedText.text}</s_align_center>`);
    };
    console.log(tempHtml);
    currentSelectedText.parent.innerHTML = tempHtml;
};
/* Align Right */
function hwTextAlignRight(){
    console.log("align right");
    // References
    let hwEditor = document.getElementById("hw_editor_content_editor");
    let hwEditorSelectedSpanText = currentSelectedText.parent.innerHTML;

    let tempHtml = ``;

    if(hwEditorSelectedSpanText.includes(`<s_align_right>${currentSelectedText.text}</s_align_right>`)){
        // If selected text already bold
        // Replacing with non bold version
        tempHtml = currentSelectedText.parent.innerHTML.replace(`<s_align_right>${currentSelectedText.text}</s_align_right>`, currentSelectedText.text);
    }else{
        // If selected text is not bold
        // Replacing with bolded text
        tempHtml = currentSelectedText.parent.innerHTML.replace(currentSelectedText.text, `<s_align_right>${currentSelectedText.text}</s_align_right>`);
    };
    console.log(tempHtml);
    currentSelectedText.parent.innerHTML = tempHtml;
};
/* Unordered List */
function hwListUnordered(){
    console.log("align right");
    // References
    let hwEditor = document.getElementById("hw_editor_content_editor");
    let hwEditorSelectedSpanText = currentSelectedText.parent.innerHTML;

    let tempHtml = ``;

    if(hwEditorSelectedSpanText.includes(`<s_list_un>${currentSelectedText.text}</s_list_un>`)){
        // If selected text already bold
        // Replacing with non bold version
        tempHtml = currentSelectedText.parent.innerHTML.replace(`<s_list_un>${currentSelectedText.text}</s_list_un>`, currentSelectedText.text);
    }else{
        // If selected text is not bold
        // Replacing with bolded text
        tempHtml = currentSelectedText.parent.innerHTML.replace(currentSelectedText.text, `<s_list_un>${currentSelectedText.text}</s_list_un>`);
    };
    console.log(tempHtml);
    currentSelectedText.parent.innerHTML = tempHtml;
};
/* ============================================================= */
// ====================================== COLOR operations
function clickOnHwEditorColorPicker(){
    // References 
    let colorInput = document.getElementById("hwEditorColorInput");
    let colorChoosingCrownButton = document.getElementById("hwEditorColorButton");

    colorInput.click();

    colorInput.addEventListener("change", () => {
        console.log("changed!");
        colorChoosingCrownButton.style.backgroundColor = `${colorInput.value}`;
    });

    // Setting colors to the current text
    setColorToSelectedText(colorInput.value);

};
function setColorToSelectedText(color_value){
    console.log("setting colors");
    // References
    let hwEditor = document.getElementById("hw_editor_content_editor");
    let hwEditorSelectedSpanText = currentSelectedText.parent.innerHTML;

    let tempHtml = ``;

    if(hwEditorSelectedSpanText.includes(`<span style="color: ${color_value}">${currentSelectedText.text}</span>`)){
        // If selected text already bold
        // Replacing with non bold version
        tempHtml = currentSelectedText.parent.innerHTML.replace(`<span style="color: ${color_value}">${currentSelectedText.text}</span>`, currentSelectedText.text);
    }else{
        // If selected text is not bold
        // Replacing with bolded text
        tempHtml = currentSelectedText.parent.innerHTML.replace(currentSelectedText.text, `<span style="color: ${color_value}">${currentSelectedText.text}</span>`);
    };
    console.log(tempHtml);
    currentSelectedText.parent.innerHTML = tempHtml;
};