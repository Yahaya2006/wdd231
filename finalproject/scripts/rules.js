const rulesGrid = document.getElementById("rulesGrid");
const fullPoetsGrid = document.getElementById("fullPoetsGrid");
const filteredPoetsGrid = document.getElementById("filteredPoetsGrid");
const filterBar = document.getElementById("filterBar");

let allPoets = [];

async function loadRules() {
	try {
		const response = await fetch("./data/rules.json");
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const rules = await response.json();

		rules.forEach((rule) => {
			const card = document.createElement("article");
			const title = document.createElement("h3");
			const description = document.createElement("p");

			card.classList.add("rule-card");
			title.textContent = rule.title;
			description.textContent = rule.description;
			card.append(title, description);
			rulesGrid.appendChild(card);
		});
	} catch (error) {
		rulesGrid.textContent = "The rules could not be loaded.";
		console.error("Error loading rules:", error);
	}
}

function createPoetCard(poet) {
	const card = document.createElement("article");
	const name = document.createElement("h3");
	const location = document.createElement("p");
	const description = document.createElement("p");
	const year = document.createElement("p");

	card.classList.add("famous-poet-card");
	name.textContent = poet.name;
	location.textContent = `${poet.city}, ${poet.origin}`;
	description.textContent = poet.known;
	year.textContent = `Active: ${poet.year}`;

	card.append(name, location, description, year);
	return card;
}

function displayPoets(poets, grid) {
	grid.replaceChildren();

	poets.forEach((poet) => {
		grid.appendChild(createPoetCard(poet));
	});
}

function showPoetsFrom(origin) {
	if (origin === "all") {
		displayPoets(allPoets, filteredPoetsGrid);
		return;
	}

	const matchingPoets = allPoets.filter((poet) => poet.origin === origin);
	displayPoets(matchingPoets, filteredPoetsGrid);
}

function createFilterButtons() {
	const origins = ["All"];

	allPoets.forEach((poet) => {
		if (!origins.includes(poet.origin)) {
			origins.push(poet.origin);
		}
	});

	origins.forEach((originName, index) => {
		const button = document.createElement("button");
		const origin = index === 0 ? "all" : originName;

		button.classList.add("filter-button");
		button.textContent = originName;
		button.setAttribute("aria-pressed", String(index === 0));
		button.addEventListener("click", () => {
			filterBar.querySelectorAll("button").forEach((filterButton) => {
				filterButton.setAttribute("aria-pressed", String(filterButton === button));
			});
			showPoetsFrom(origin);
		});

		filterBar.appendChild(button);
	});
}

async function loadPoets() {
	try {
		const response = await fetch("./data/slampoet.json");
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		allPoets = await response.json();
		displayPoets(allPoets, fullPoetsGrid);
		createFilterButtons();
		showPoetsFrom("all");
	} catch (error) {
		fullPoetsGrid.textContent = "The poets could not be loaded.";
		filteredPoetsGrid.textContent = "The poet filters are unavailable.";
		console.error("Error loading poets:", error);
	}
}

loadRules();
loadPoets();
