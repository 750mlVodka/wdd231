const url = "data/members.json";
const cardsContainer = document.querySelector("#cards");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

async function getMembers() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data);
    }   catch (error) {
        console.error("Error loading members", error)
    }
}

function displayMembers(members) {
    cardsContainer.innerHTML = "";

    members.forEach(members => {
        let card = document.createElement("section");
        card.classList.add("card")

        let name = document.createElement("h2");
        name.textContent = members.name;

        let.logo =document.createElement("img");
        logo.setAttribute("src", members.logo)
    });

}