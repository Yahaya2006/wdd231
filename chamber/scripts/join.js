// Set the hidden timestamp field when the form loads
document.querySelector("#timestamp").value = new Date().toString();

// Open a modal when its "Learn more" button is clicked
document.querySelectorAll(".modal-btn").forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal");
        document.querySelector(`#${modalId}`).showModal();
    });
});

// Close a modal when its "Close" button is clicked
document.querySelectorAll(".close-modal").forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});
