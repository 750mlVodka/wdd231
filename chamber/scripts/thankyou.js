document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const dataList = document.getElementById("submittedData");

    if (params.toString().length === 0) {
        dataList.innerHTML = "<li>No form data found.</li>";
        return;
    }

    params.forEach((value, key) => {
        const li = document.createElement("li");
        li.textContent = `${key}: ${value}`;
        dataList.appendChild(li);
    });
});
