
// =================================================================
// ======================== HW File Upload

// Selecting a HW image and setting it's thumbnail
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

function SaveHWFileChangesWithPk(item_pk, is_during_upload){
    if(is_during_upload){
        console.log(`posted item pk is ${item_pk}`);
        console.log(`posted text is ${document.getElementById("hw_editor_content_editor").innerHTML}`);

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
    }else{

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
                // Filtering items
                let filteredList = [];
                JSON.parse(window.localStorage.getItem("docinease")).forEach((e) => {
                    if(e.item_pk != JSON.parse(response).item_pk){
                        filteredList.push(e);
                    }else{
                        filteredList.push(JSON.parse(response));
                    };
                });
                window.localStorage.setItem("docinease", JSON.stringify(filteredList));

                pop("Item Saved!", "success", 1000);
            }
        });
    };
};