const params = new URLSearchParams(window.location.search);

const fields = [
    { key: "fname", label: "First Name" },
    { key: "lname", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Mobile Phone" },
    { key: "orgname", label: "Business Name" },
    { key: "timestamp", label: "Submitted On" }
];

const summary = document.querySelector("#summary");

fields.forEach(field => {
    const value = params.get(field.key) || "N/A";

    const dt = document.createElement("dt");
    dt.textContent = field.label;

    const dd = document.createElement("dd");
    dd.textContent = value;

    summary.appendChild(dt);
    summary.appendChild(dd);
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;