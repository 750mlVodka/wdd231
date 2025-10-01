document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const firstName = params.get("firstName") || "";
    const lastName = params.get("lastName") || "";
    const email = params.get("email") || "";
    const phone = params.get("phone") || "";
    const businessName = params.get("businessName") || "";
    const timestamp = params.get("timestamp") || "";

    const thankYouContainer = document.querySelector("main");

    thankYouContainer.innerHTML = `
    <h1>Thank You for Joining!</h1>
    <p><strong>First Name:</strong> ${firstName}</p>
    <p><strong>Last Name:</strong> ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Business/Organization:</strong> ${businessName}</p>
    <p><strong>Application Date:</strong> ${timestamp}</p>
    `;
});
