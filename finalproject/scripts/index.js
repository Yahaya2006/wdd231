const titleElement = document.getElementById("poemTitle");
const authorElement = document.getElementById("poemAuthor");
const excerptElement = document.getElementById("poemExcerpt");
const loadButton = document.getElementById("loadPoemBtn");

let poems = [];
let currentIndex = 0;

function showPoem(index) {
    const poem = poems[index];
    titleElement.textContent = poem.title;
    authorElement.textContent = `by ${poem.author}`;
    excerptElement.textContent = poem.excerpt;
}

async function loadPoems() {
    try {
        const response = await fetch("./data/poems.json");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        poems = await response.json();
        if (poems.length === 0) return;

        showPoem(currentIndex);

        loadButton.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % poems.length;
            showPoem(currentIndex);
        });
    } catch (error) {
        console.error("Impossible de charger les poèmes :", error);
    }
}

loadPoems();

async function loadPoets() {
    const poetsContainer = document.getElementById("notablePoets");

    try {
        const response = await fetch("./data/slampoet.json");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const poets = await response.json();

        poets.slice(0, 3).forEach((poet) => {
            const poetCard = document.createElement("article");
            const name = document.createElement("h3");
            const location = document.createElement("p");
            const description = document.createElement("p");
            const year = document.createElement("p");

            poetCard.classList.add("poet-card");
            name.textContent = poet.name;
            location.textContent = `${poet.city}, ${poet.origin}`;
            description.textContent = poet.known;
            year.textContent = `Period: ${poet.year}`;

            poetCard.append(name, location, description, year);
            poetsContainer.appendChild(poetCard);
        });
    } catch (error) {
        poetsContainer.textContent = "The poets could not be loaded.";
        console.error("Error loading poets:", error);
    }
}

loadPoets();