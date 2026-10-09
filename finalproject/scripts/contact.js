const joinForm = document.getElementById("joinForm");
const successMessage = document.getElementById("successMessage");
const successText = document.getElementById("successText");
const interestError = document.getElementById("interestError");
const savedSubmission = document.getElementById("savedSubmission");
const resetButton = document.getElementById("resetBtn");
const storageKey = "slamvoicesLastSubmission";

function displaySavedSubmission(submission) {
	savedSubmission.replaceChildren();

	const name = document.createElement("p");
	const email = document.createElement("p");
	const details = document.createElement("p");

	name.textContent = `${submission.firstName} ${submission.lastName}`;
	email.textContent = submission.email;
	details.textContent = `${submission.age} | ${submission.experience} | ${submission.interests.join(", ")}`;

	savedSubmission.append(name, email, details);
}

const previousSubmission = localStorage.getItem(storageKey);
if (previousSubmission) {
	displaySavedSubmission(JSON.parse(previousSubmission));
}

joinForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const interests = [...joinForm.querySelectorAll('input[name="interests"]:checked')]
		.map((checkbox) => checkbox.value);

	if (interests.length === 0) {
		interestError.hidden = false;
		joinForm.querySelector('input[name="interests"]').focus();
		return;
	}

	interestError.hidden = true;

	const submission = {
		firstName: joinForm.elements.firstName.value.trim(),
		lastName: joinForm.elements.lastName.value.trim(),
		email: joinForm.elements.email.value.trim(),
		age: joinForm.elements.age.value,
		experience: joinForm.elements.experience.value,
		interests,
		message: joinForm.elements.message.value.trim()
	};

	localStorage.setItem(storageKey, JSON.stringify(submission));
	successText.textContent = `Thank you, ${submission.firstName}. Your interest has been recorded.`;
	joinForm.hidden = true;
	successMessage.hidden = false;
	displaySavedSubmission(submission);
});

resetButton.addEventListener("click", () => {
	joinForm.reset();
	joinForm.hidden = false;
	successMessage.hidden = true;
	document.getElementById("firstName").focus();
});
