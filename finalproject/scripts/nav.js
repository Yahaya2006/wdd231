const navButton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

if (navButton && navBar) {
    navButton.addEventListener('click', () => {
        const isOpen = navBar.classList.toggle('show');
        navButton.setAttribute('aria-expanded', String(isOpen));
        navButton.textContent = isOpen ? '✕' : '☰';
    });
}
