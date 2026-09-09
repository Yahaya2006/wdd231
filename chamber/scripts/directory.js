// -------------------------------------------
// Step 5: Load member data with fetch + async/await
// -------------------------------------------

const membershipLabels = {
  1: "Member",
  2: "Silver",
  3: "Gold"
};

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data.companies);
  } catch (error) {
    console.error("Error loading member data:", error);
  }
}

function displayMembers(companies) {
  const container = document.querySelector("#memberContainer");
  container.innerHTML = "";

  companies.forEach((company) => {
    const card = document.createElement("div");
    card.classList.add("member-card");
    card.classList.add(`level-${company.membership}`);
    const imageSource = company.image.startsWith("http")
      ? company.image
      : `images/${company.image}`;

    card.innerHTML = `
      <img src="${imageSource}" alt="${company.name}" width="400" height="225" ${companies.indexOf(company) === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async">
      <h2>${company.name}</h2>
      <p class="tagline">${company.tagline}</p>
      <p>${company.address}</p>
      <p>${company.phone}</p>
      <p><a href="${company.url}" target="_blank" rel="noopener noreferrer">${company.url}</a></p>
      <span class="badge">${membershipLabels[company.membership]}</span>
    `;

    container.appendChild(card);
  });
}

// -------------------------------------------
// Step 5.4: Grid / List toggle
// -------------------------------------------

const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");
const container = document.querySelector("#memberContainer");

gridBtn.addEventListener("click", () => {
  container.classList.remove("list-view");
  container.classList.add("grid-view");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
  gridBtn.setAttribute("aria-pressed", "true");
  listBtn.setAttribute("aria-pressed", "false");
});

listBtn.addEventListener("click", () => {
  container.classList.remove("grid-view");
  container.classList.add("list-view");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
  listBtn.setAttribute("aria-pressed", "true");
  gridBtn.setAttribute("aria-pressed", "false");
});

// -------------------------------------------
// Run
// -------------------------------------------

getMembers();
