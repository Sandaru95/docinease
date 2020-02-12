// ================================================ General
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



































/* ================================================= Open Editor With Selected Img */
function hwFileUploadOpenWithEditor(is_during_uploading, passed_pk=0){
    if(is_during_uploading){
        // ========================================================================================
        //                                    DURING UPLOADING PROCESS



        // Gratification
        pop("Opening Text with Editor", "info", 2000);
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
            url: "/home/saveHwFileReturnText/",
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
                    <div id="hw_editor_text_modifiers" class="card-action row center-align">
                        <!-- ================== Font Size -->
                        <div class="col s2">
                            <select id="hw_editor_font_size_select" onchange="fontSizeChangeSubmission(this)">
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="12">12</option>
                                <option value="14" selected>14</option>
                                <option value="16">16</option>
                                <option value="18">18</option>
                                <option value="20">20</option>
                                <option value="22">22</option>
                                <option value="24">24</option>
                                <option value="26">26</option>
                                <option value="28">28</option>
                                <option value="30">30</option>
                                <option value="32">32</option>
                                <option value="34">34</option>
                                <option value="36">36</option>
                                <option value="38">38</option>
                                <option value="40">40</option>
                                <option value="42">42</option>
                                <option value="44">44</option>
                                <option value="46">46</option>
                                <option value="48">48</option>
                                <option value="50">50</option>
                                <option value="52">52</option>
                                <option value="54">54</option>
                                <option value="56">56</option>
                                <option value="58">58</option>
                                <option value="60">60</option>
                                <option value="72">72</option>
                            </select>
                        </div>
                        <!-- ================== Font Family -->
                        <div class="col s4">
                            <select id="hw_editor_font_family_select" onchange="fontFamilyChangeSubmission(this)">
                                <option value="'Georgia'">Georgia</option>
                                <option value="'serif'">Serif</option>
                                <option value="'Palatino Linotype'">Palatino Linotype</option>
                                <option value="'Book Antiqua'">Book Antiqua</option>
                                <option value="'Palatino'">Palatino</option>
                                <option value="'Times New Roman'">Times New Roman</option>
                                <option value="'Times'">Times</option>
                                <option value="'Arial'">Arial</option>
                                <option value="'Helvetica'">Helvetica</option>
                                <option value="'Arial Black'">Arial Black</option>
                                <option value="'Gadget'">Gadget</option>
                                <option value="'Comic Sans MS'">Comic Sans MS</option>
                                <option value="'cursive'">Cursive</option>
                                <option value="'Impact'">Impact</option>
                                <option value="'Charcoal'">Charcoal</option>
                                <option value="'Lucida Sans Unicode'">Lucida Sans Unicode</option>
                                <option value="'Lucida Grande'">Lucida Grande</option>
                                <option value="'Tahoma'">Tahoma</option>
                                <option value="'Geneva'">Geneva</option>
                                <option value="'Trebuchet MS'">Trebuchet MS</option>
                                <option value="'Helvetica'">Helvetica</option>
                                <option value="'Verdana'">Verdana</option>
                                <option value="'Courier New'">Courier New</option>
                                <option value="'Courier'">Courier</option>
                                <option value="'Lucida Console'">Lucida Console</option>
                                <option value="'Monaco'">Monaco</option>
                            </select>
                        </div>
                    </div>
                    <div id="hw_editor_btns" class="card-action">
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
                        <!-- ================== Save -->
                        <!-- Save Button -->
                        <button id="hw_editor_save_btn" class="btn blue white-text waves-effect right" onclick="SaveHWFileChangesWithPk(${item_pk}, true)"><i class="material-icons">save</i> Save</button>
                    </div>
                </div>
            ` + body.innerHTML;

            // Adding event listener for new inputs
            document.getElementById('hw_editor_content_editor').addEventListener('keydown', hwEditorInputSubmission);
            // Adding event listener for text selection
            document.getElementById("hw_editor_content_editor").addEventListener("click", hwEditorClickSubmission);
        };
    }else{
        // ========================================================================================
        //                                    NORMALLY OPENING A SAVED

        // Gratification
        pop("Opening Item In Editing Mode", "info", 2000);
        // ******************************** GETTING TEXTSs
        // References
        let csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0];
        $.ajax({
            url: "/home/returnTextOfAnyHwFile/",
            type: "POST",
            data: {
                "posted_pk": passed_pk,
                "csrfmiddlewaretoken": csrfToken.value,
            },
            success: function(response) {
                console.log(`Returned Text ${JSON.parse(response)}`);
                continueToEditor(JSON.parse(response), passed_pk);
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
                            ${passed_text}
                        </div>
                    </div>
                    <div id="hw_editor_text_modifiers" class="card-action row center-align">
                        <!-- ================== Font Size -->
                        <div class="col s2">
                            <select id="hw_editor_font_size_select" onchange="fontSizeChangeSubmission(this)">
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="12">12</option>
                                <option value="14" selected>14</option>
                                <option value="16">16</option>
                                <option value="18">18</option>
                                <option value="20">20</option>
                                <option value="22">22</option>
                                <option value="24">24</option>
                                <option value="26">26</option>
                                <option value="28">28</option>
                                <option value="30">30</option>
                                <option value="32">32</option>
                                <option value="34">34</option>
                                <option value="36">36</option>
                                <option value="38">38</option>
                                <option value="40">40</option>
                                <option value="42">42</option>
                                <option value="44">44</option>
                                <option value="46">46</option>
                                <option value="48">48</option>
                                <option value="50">50</option>
                                <option value="52">52</option>
                                <option value="54">54</option>
                                <option value="56">56</option>
                                <option value="58">58</option>
                                <option value="60">60</option>
                                <option value="72">72</option>
                            </select>
                        </div>
                        <!-- ================== Font Family -->
                        <div class="col s4">
                            <select id="hw_editor_font_family_select" onchange="fontFamilyChangeSubmission(this)">
                                <option value="'Georgia'">Georgia</option>
                                <option value="'serif'">Serif</option>
                                <option value="'Palatino Linotype'">Palatino Linotype</option>
                                <option value="'Book Antiqua'">Book Antiqua</option>
                                <option value="'Palatino'">Palatino</option>
                                <option value="'Times New Roman'">Times New Roman</option>
                                <option value="'Times'">Times</option>
                                <option value="'Arial'">Arial</option>
                                <option value="'Helvetica'">Helvetica</option>
                                <option value="'Arial Black'">Arial Black</option>
                                <option value="'Gadget'">Gadget</option>
                                <option value="'Comic Sans MS'">Comic Sans MS</option>
                                <option value="'cursive'">Cursive</option>
                                <option value="'Impact'">Impact</option>
                                <option value="'Charcoal'">Charcoal</option>
                                <option value="'Lucida Sans Unicode'">Lucida Sans Unicode</option>
                                <option value="'Lucida Grande'">Lucida Grande</option>
                                <option value="'Tahoma'">Tahoma</option>
                                <option value="'Geneva'">Geneva</option>
                                <option value="'Trebuchet MS'">Trebuchet MS</option>
                                <option value="'Helvetica'">Helvetica</option>
                                <option value="'Verdana'">Verdana</option>
                                <option value="'Courier New'">Courier New</option>
                                <option value="'Courier'">Courier</option>
                                <option value="'Lucida Console'">Lucida Console</option>
                                <option value="'Monaco'">Monaco</option>
                            </select>
                        </div>
                    </div>
                    <div id="hw_editor_btns" class="card-action">
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
                        <!-- ================== Update -->
                        <!-- Update The Item Button -->
                        <button id="hw_editor_save_btn" class="btn blue white-text waves-effect right" onclick="SaveHWFileChangesWithPk(${item_pk}, false)">Update</button>
                    </div>
                </div>
            ` + body.innerHTML;
            // Adding event listener for new inputs
            document.getElementById('hw_editor_content_editor').addEventListener('keydown', hwEditorInputSubmission);
            // Adding event listener for text selection
            document.getElementById("hw_editor_content_editor").addEventListener("click", hwEditorClickSubmission);
        };
    };
};
// Close Editor 
function closeEditor(){
    document.getElementById("hw_editor").style.display = 'none';
};

/* ======================================================= */
// CURRENT TEXT && CURRENT MOUSE POSITION && CURRENT MOSE SELECTION
// Variable holding current selected text
let currentSelectedText;

// Submission of a Click On HW Editor
function hwEditorClickSubmission(){
    // On click to hand written UPDATING | current selected text

    // References 
    let hwEditorContentEditor = document.getElementById('hw_editor_content_editor');
    
    currentSelectedText = {"text": window.getSelection().toString(), "parent": window.getSelection().anchorNode.parentElement};
};

function hwEditorInputSubmission(){
    // References 
    let hwEditorContentEditor = document.getElementById('hw_editor_content_editor');
    console.log(hwEditorContentEditor.innerHTML);
    // hwEditorContentEditor.innerHTML = encodeTextForUseWithEditor(hwEditorContentEditor.innerHTML);
};



/* ====================================================== */
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
// =============================================== Font Value Modifiers
// Font Size
function fontSizeChangeSubmission(relavant_select){
    console.log("Changing Font Size");

    // References
    let hwEditor = document.getElementById("hw_editor_content_editor");
    let hwEditorSelectedSpanText = currentSelectedText.parent.innerHTML;

    let tempHtml = ``;

    // Style which we gonna append
    let appendingThing = `<span style="font-size: ${relavant_select.value}px !important;">`;

    if(hwEditorSelectedSpanText.includes(`${appendingThing}${currentSelectedText.text}</span>`)){
        // If selected text already bold
        // Replacing with non bold version
        tempHtml = currentSelectedText.parent.innerHTML.replace(`${appendingThing}${currentSelectedText.text}</span>`, currentSelectedText.text);
    }else{
        // If selected text is not bold
        // Replacing with bolded text
        tempHtml = currentSelectedText.parent.innerHTML.replace(currentSelectedText.text, `${appendingThing}${currentSelectedText.text}</span>`);
    };
    console.log(tempHtml);
    currentSelectedText.parent.innerHTML = tempHtml;
};
// Font Size
function fontSizeChangeSubmission(relavant_select){
    console.log("Changing Font Size");

    // References
    let hwEditor = document.getElementById("hw_editor_content_editor");
    let hwEditorSelectedSpanText = currentSelectedText.parent.innerHTML;

    let tempHtml = ``;

    // Style which we gonna append
    let appendingThing = `<span style="font-size: ${relavant_select.value}px !important;">`;

    if(hwEditorSelectedSpanText.includes(`${appendingThing}${currentSelectedText.text}</span>`)){
        // If selected text already bold
        // Replacing with non bold version
        tempHtml = currentSelectedText.parent.innerHTML.replace(`${appendingThing}${currentSelectedText.text}</span>`, currentSelectedText.text);
    }else{
        // If selected text is not bold
        // Replacing with bolded text
        tempHtml = currentSelectedText.parent.innerHTML.replace(currentSelectedText.text, `${appendingThing}${currentSelectedText.text}</span>`);
    };
    console.log(tempHtml);
    currentSelectedText.parent.innerHTML = tempHtml;
};
// Font Family
function fontFamilyChangeSubmission(relavant_select){
    console.log("Changing Font Family");

    // References
    let hwEditor = document.getElementById("hw_editor_content_editor");
    let hwEditorSelectedSpanText = currentSelectedText.parent.innerHTML;

    let tempHtml = ``;

    // Accurate match which we gonna look for
    let regExFormat = `<span style="font-family: '\w+';">${currentSelectedText.text}<\/span>`;
    let findingMatch = new RegExp(regExFormat, 'g');

    // Style which we gonna replace current style by
    let appendingThing = `<span style="font-family: ${relavant_select.value};">`;

    console.log(`testing for: ${findingMatch}`);
    console.log(`hwEditorSelectedSpanText has selected text: ${currentSelectedText.text}`);
    console.log(`hwEditorSelectedSpanText has have a match: ${findingMatch.test(hwEditorSelectedSpanText)}`);

    // Way FOR NORMAL TEXT without Font FAMILY
    if(hwEditorSelectedSpanText.includes(currentSelectedText.text) && !findingMatch.test(hwEditorSelectedSpanText)){
        // Replacing normal text with NEW FONT FAMILY
        tempHtml = currentSelectedText.parent.innerHTML.replace(currentSelectedText.text, `${appendingThing}${currentSelectedText.text}</span>`);  
    }else if(hwEditorSelectedSpanText.includes(currentSelectedText.text) && findingMatch.test(hwEditorSelectedSpanText)){
        // Replacing current font span with  NEW FONT FAMILY
        tempHtml = currentSelectedText.parent.innerHTML.replace(findingMatch, `${appendingThing}${currentSelectedText.text}</span>`);
    };

    currentSelectedText.parent.innerHTML = tempHtml;
};  