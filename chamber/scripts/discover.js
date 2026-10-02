import { discoverItems } from "../data/discover.mjs";

const grid = document.querySelector("#discover-grid");

discoverItems.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
            <img src="images/${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <p class="fact" hidden>${item.fact}</p>
        <button type="button" class="learn-more">Learn more</button>
    `;

    card.querySelector(".learn-more").addEventListener("click", (event) => {
        const fact = card.querySelector(".fact");
        const isHidden = fact.hidden;
        fact.hidden = !isHidden;
        event.target.textContent = isHidden ? "Show less" : "Learn more" ;
    });

    grid.appendChild(card);
})

//last visit

const visitMessage = document.querySelector("#visit-message");
const now = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

let message;

if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
} else {
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysSince = Math.floor((now - Number(lastVisit)) / msPerDay);

     if (daysSince < 1) {
        message = "Back so soon! Awesome!";
    } else if (daysSince === 1) {
        message = "You last visited 1 day ago.";
    } else {
        message = `You last visited ${daysSince} days ago.`;
    }
}

localStorage.setItem("lastVisit", now.toString());
visitMessage.textContent = message;