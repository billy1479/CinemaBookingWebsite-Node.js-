// function for changing pages will go here
// will need to manipulate CSS - thats it

// functions for dropdowns will go here in order to open them - check w3schools for dropdown code

// This is for changing the tabs on the main page
function changeTab(tabName) {
    tabs = document.getElementsByClassName('page');
    for (i=0;i<tabs.length;i++) {
        tabs[i].style.display = 'none';   
    }
    document.getElementById(tabName).style.display = 'block';
}
