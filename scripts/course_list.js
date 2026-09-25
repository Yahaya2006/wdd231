// ---------------------------------------------------
// 1. La liste des cours (les données)
// ---------------------------------------------------
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web...',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient...',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes...',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// ---------------------------------------------------
// 2. On récupère les éléments HTML dont on a besoin
// ---------------------------------------------------
const courseListContainer = document.getElementById('coursesList');
const creditsContainer = document.getElementById('credits');
const filterButtons = document.querySelectorAll('[data-filter]');
const courseDetails = document.getElementById('course-details');

// ---------------------------------------------------
// 3. Fonction qui affiche la liste des cours
// ---------------------------------------------------
function displayCourses(filter) {
    // Si aucun filtre n'est donné, on affiche "all" par défaut
    if (filter === undefined) {
        filter = 'all';
    }

    // On vide le contenu actuel de la liste
    courseListContainer.innerHTML = '';

    // On garde en mémoire le total de crédits
    let totalCredits = 0;

    // On met à jour quel bouton de filtre est actif
    for (let i = 0; i < filterButtons.length; i++) {
        const button = filterButtons[i];
        if (button.dataset.filter === filter) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    }

    // On parcourt chaque cours un par un (boucle simple)
    for (let i = 0; i < courses.length; i++) {
        const course = courses[i];

        // Si on filtre et que ce cours ne correspond pas, on passe au suivant
        if (filter !== 'all' && course.subject !== filter) {
            continue;
        }

        // On additionne les crédits de ce cours
        totalCredits = totalCredits + course.credits;

        // On crée un élément HTML pour ce cours
        const courseDiv = document.createElement('article');
        courseDiv.classList.add('course');
        if (course.completed) {
            courseDiv.classList.add('completed');
        }
        courseDiv.dataset.number = course.number;
        courseDiv.innerHTML = `<p>${course.subject} ${course.number}: ${course.title}</p>`;

        // Quand on clique sur ce cours, on affiche ses détails
        courseDiv.addEventListener('click', () => {
            displayCourseDetails(course);
        });

        // On ajoute ce cours dans la liste affichée à l'écran
        courseListContainer.appendChild(courseDiv);
    }

    // On affiche le total des crédits
    creditsContainer.textContent = totalCredits;
}

// ---------------------------------------------------
// 4. Fonction qui affiche les détails d'UN cours
// ---------------------------------------------------
function displayCourseDetails(course) {
    courseDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;

    courseDetails.showModal();

    document.getElementById('closeModal').addEventListener('click', () => {
        courseDetails.close();
    });
}

// ---------------------------------------------------
// 5. Quand on clique sur un bouton de filtre, on réaffiche la liste
// ---------------------------------------------------
for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener('click', () => {
        displayCourses(filterButtons[i].dataset.filter);
    });
}

// ---------------------------------------------------
// 6. On affiche la liste des cours dès le chargement de la page
// ---------------------------------------------------
displayCourses();