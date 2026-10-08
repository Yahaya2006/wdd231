const navButton = document.getElementById("ham-btn");
const navBar = document.getElementById("nav-bar");

navButton.addEventListener("click", () =>{
    navButton.classList.toggle('open');
    navBar.classList.toggle('open');
})
