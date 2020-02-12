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
// Open Search Box
function openSearchBox(){
    let searchNavBar = document.getElementById("search-nav-bar");
    let navBar = document.getElementById("nav-bar");

    navBar.style.display = 'none';
    searchNavBar.style.display = 'block';
};
// Close Search Box
function closeSearchNavBar(){
    let searchNavBar = document.getElementById("search-nav-bar");
    let navBar = document.getElementById("nav-bar");

    navBar.style.display = 'block';
    searchNavBar.style.display = 'none';
};



































// ============================================================ Top Nav
// Function for Opening Side Nav
function openSideNav(){
    let sideNavTriggerList = document.getElementsByClassName("sidenav-trigger");
    for (let tri of sideNavTriggerList){
        tri.click();
    };
};
// Refresh Page WITHA POPUP
function refreshThePageOrItsItems(){
    // The Update
    updateHwPdfItemList();
    // The Gratification
    pop("Page Refreshed", "success", 1000);
};