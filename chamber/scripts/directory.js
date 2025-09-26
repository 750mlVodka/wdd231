const url = "data/members.json";
const cardsContainer = document.querySelector("#cards");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

async function getMembers() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function displayMembers(members) {
    cardsContainer.innerHTML = "";

    members.forEach((member) => {
        let card = document.createElement("section");
        card.classList.add("card");

        let name = document.createElement("h2");
        name.textContent = member.name;

        let logo = document.createElement("img");
        logo.setAttribute("src", `https://avatar.iran.liara.run/public/boy?username=${member.name}`);
        logo.setAttribute("alt", `${member.name} logo`);
        logo.setAttribute("loading", "lazy");

        let address = document.createElement("p");
        address.textContent = `${member.address}`;

        let phone = document.createElement("p");
        phone.textContent = `${member.phone}`;

        let website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";

        let membership = document.createElement("p");
        membership.textContent = `Membership Level: ${member.membership}`;

        card.appendChild(name);
        card.appendChild(logo);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);

        cardsContainer.appendChild(card);
    });
}

gridBtn.addEventListener("click", () => {
    cardsContainer.classList.add("grid");
    cardsContainer.classList.remove("list");
});

listBtn.addEventListener("click", () => {
    cardsContainer.classList.add("list");
    cardsContainer.classList.remove("grid");
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

const lastModifiedParagraph = document.getElementById('lastModified');
if (lastModifiedParagraph) {
    lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;
}

getMembers();
