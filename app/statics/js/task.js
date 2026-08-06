// Task Selectors
const taskContainer = document.querySelector("#taskList");
const searchInput = document.querySelector("#searchInput");
const priorityFilter = document.querySelector("#priorityFilter");
const sortSelect = document.querySelector("#sort");
const loading = document.querySelector("#loading");
const emptyState = document.querySelector("#empty");

// Form Inputs & Modal
const modal = document.querySelector("#taskModal");
const form = document.querySelector("#taskForm");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const priorityInput = document.querySelector("#priority");
const dueDateInput = document.querySelector("#dueDate");

// State Management
let allTasks = [];
let editingTaskId = null;

// Modal Helpers
function showModal(title) {
    document.querySelector("#modalTitle").textContent = title;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function hideModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

// Render Tasks to DOM
function renderTasks(tasks) {
    taskContainer.innerHTML = "";

    if (!Array.isArray(tasks) || tasks.length === 0) {
        emptyState?.classList.remove("hidden");
        return;
    }

    emptyState?.classList.add("hidden");
    taskContainer.innerHTML = tasks.map(task => createTaskCard(task)).join("");
}

// Filter and Sort Tasks
function applyFilters() {
    const keyword = searchInput?.value.toLowerCase() || "";
    const selectedPriority = priorityFilter?.value || "";

    const filtered = allTasks.filter(task => {
        const matchesSearch = task.title?.toLowerCase().includes(keyword) || 
                              (task.description && task.description.toLowerCase().includes(keyword));
        const matchesPriority = selectedPriority === "" || task.priority === selectedPriority;
        return matchesSearch && matchesPriority;
    });

    if ((sortSelect?.value || "due") === "newest") {
        // No created_at on the Task model, so id order is the only recency signal.
        filtered.sort((a, b) => b.id - a.id);
    } else {
        filtered.sort((a, b) => {
            const aDue = a.due_date ? new Date(a.due_date).getTime() : NaN;
            const bDue = b.due_date ? new Date(b.due_date).getTime() : NaN;

            // Tasks without a usable due date sink to the bottom instead of
            // scrambling the order with NaN comparisons.
            if (Number.isNaN(aDue) && Number.isNaN(bDue)) return 0;
            if (Number.isNaN(aDue)) return 1;
            if (Number.isNaN(bDue)) return -1;

            return aDue - bDue;
        });
    }

    renderTasks(filtered);
}

// READ: Fetch & Display Tasks
async function loadTasks() {
    loading?.classList.remove("hidden");
    emptyState?.classList.add("hidden");
    taskContainer.innerHTML = "";

    const response = await apiRequest("/tasks", "GET", null, true);
    loading?.classList.add("hidden");

    allTasks = Array.isArray(response) ? response : (response?.tasks || response?.data || []);

    if (!Array.isArray(allTasks)) {
        console.error("Expected array but received:", response);
        taskContainer.innerHTML = `<p class="col-span-full text-center text-sm text-slate-500 dark:text-slate-400 py-10">Failed to load tasks.</p>`;
        return;
    }

    applyFilters();
}

// CREATE / UPDATE: Submit Form
form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const taskData = {
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        priority: priorityInput.value,
        due_date: dueDateInput.value
    };

    if (editingTaskId) {
        await apiRequest(`/tasks/${editingTaskId}`, "PUT", taskData, true);
        showToast("Task updated successfully!");
    } else {
        await apiRequest("/tasks", "POST", taskData, true);
        showToast("Task created successfully!");
    }

    hideModal();
    loadTasks();
});

// EDIT / DELETE: Action Delegation
document.addEventListener("click", async (e) => {
    // --- EDIT ---
    const editBtn = e.target.closest(".editBtn");
    if (editBtn) {
        const id = editBtn.dataset.id;
        const task = await apiRequest(`/tasks/${id}`, "GET", null, true);

        if (!task) return;

        editingTaskId = id;
        titleInput.value = task.title || "";
        descriptionInput.value = task.description || "";
        priorityInput.value = task.priority || "Medium";
        dueDateInput.value = task.due_date || "";

        showModal("Edit Task");
        return;
    }

    // --- DELETE ---
    const deleteBtn = e.target.closest(".deleteBtn");
    if (deleteBtn) {
        const id = deleteBtn.dataset.id;
        if (!confirm("Delete this task?")) return;

        await apiRequest(`/tasks/${id}`, "DELETE", null, true);
        showToast("Task deleted!");
        loadTasks();
    }
});

// Search & Filter Listeners
searchInput?.addEventListener("input", applyFilters);
priorityFilter?.addEventListener("change", applyFilters);
sortSelect?.addEventListener("change", applyFilters);

// Initial Fetch on Load
document.addEventListener("DOMContentLoaded", loadTasks);