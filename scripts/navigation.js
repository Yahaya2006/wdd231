const navbutton = document.querySelector('#ham-btn');
const navBar = document.getElementById("nav-bar");

const currentYear = new Date().getFullYear();
document.getElementById("current-year").textContent = currentYear;

const lastModified = document.getElementById("last-modified");
lastModified.textContent = document.lastModified;

navbutton.addEventListener('click', () => {
     navbutton.classList.toggle('show');
     navBar.classList.toggle('show');
});