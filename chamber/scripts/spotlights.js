async function getSpotlightMembers() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();
        const eligible = data.companies.filter(company => company.membership === 2 || company.membership === 3);
        const chosen = pickRandom(eligible, 3);
        displaySpotlights(chosen);
    } catch (error) {
        console.error("Error loading spotlight members:", error);
    }
}

function pickRandom(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

const membershipLabels = { 2: "Silver", 3: "Gold" };

function displaySpotlights(companies) {
    const container = document.querySelector("#spotlightContainer");
    container.innerHTML = "";

    companies.forEach(company => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card", `level-${company.membership}`);

        const description = company.address || company.tagline || "Community business member";
        const imageSource = company.image?.startsWith("http") ? company.image : `images/${company.image}`;

        card.innerHTML = `
            <img src="${imageSource}" alt="${company.name} logo" loading="lazy">
            <h3>${company.name}</h3>
            <p>${description}</p>
            <p>${company.phone}</p>
            <p><a href="${company.url}" target="_blank" rel="noopener noreferrer">${company.url}</a></p>
            <span class="badge">${membershipLabels[company.membership]}</span>
        `;

        container.appendChild(card);
    });
}

getSpotlightMembers();