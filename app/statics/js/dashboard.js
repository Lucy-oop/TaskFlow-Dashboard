// Global Dashboard Elements
const newTaskBtn = document.querySelector("#newTaskBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const darkModeBtn = document.querySelector("#darkMode");
const logoutBtn = document.querySelector("#logoutBtn");

// Dark Mode Toggle
function renderThemeIcon() {
    // Show the theme the button switches *to*, not the one already applied.
    const isDark = document.body.classList.contains("dark");
    darkModeBtn.textContent = isDark ? "☀️" : "🌙";
    darkModeBtn.setAttribute("aria-label", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
}

if (darkModeBtn) {
    renderThemeIcon();

    darkModeBtn.onclick = () => {
        document.body.classList.toggle("dark");
        renderThemeIcon();
    };
}

// Logout Handler
logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
});

// Open New Task Modal
newTaskBtn?.addEventListener("click", () => {
    editingTaskId = null;
    document.querySelector("#taskForm")?.reset();
    showModal("New Task");
});

// Close Task Modal
cancelBtn?.addEventListener("click", hideModal);