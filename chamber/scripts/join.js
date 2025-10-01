document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("timestamp");
    timestampField.value = new Date().toISOString();
});

const modals = document.querySelectorAll(".modal");
const openBtns = document.querySelectorAll(".info-btn");
const closeBtns = document.querySelectorAll(".close");

// Open modal
openBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const modalId = btn.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = "block";
    });
});

// Close modal
closeBtns.forEach(close => {
    close.addEventListener("click", () => {
        const modal = close.closest(".modal");
        modal.style.display = "none";
    });
});

// Close modal
window.addEventListener("click", (e) => {
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
