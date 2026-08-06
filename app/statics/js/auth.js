const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerform");

loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
        const data = await apiRequest("/users/login", "POST", { email, password });

        if (data && data.access_token) {
            localStorage.setItem("token", data.access_token);
            window.location.href = "/dashboard";
        } else {
            alert(data?.detail || "Invalid login credentials");
        }
    } catch (err) {
        console.error("Login Error:", err);
        alert("Something went wrong. Please try again.");
    }
});

registerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;

    try {
        const data = await apiRequest("/users/register", "POST", { username, email, password });

        // /users/register returns the created user, not a token, so hand off to login.
        if (data && data.id) {
            alert("Account created. Please log in.");
            window.location.href = "/login";
        } else {
            alert(data?.detail || "Registration failed. Please check your details.");
        }
    } catch (err) {
        console.error("Register Error:", err);
        alert("Something went wrong. Please try again.");
    }
});