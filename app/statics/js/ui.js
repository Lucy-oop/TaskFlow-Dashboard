
function priorityColor(priority) {
    switch (priority) {
        case "High":
            return "bg-rose-500/10 text-rose-600 dark:text-rose-300 ring-1 ring-inset ring-rose-500/25";
        case "Medium":
            return "bg-amber-500/10 text-amber-600 dark:text-amber-300 ring-1 ring-inset ring-amber-500/25";
        default:
            return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 ring-1 ring-inset ring-emerald-500/25";
    }
}

function createTaskCard(task) {
    return `
    <div class="tf-card relative overflow-hidden rounded-2xl border border-slate-900/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] backdrop-blur-md p-5 shadow-lg shadow-slate-900/5 dark:shadow-black/30 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/10">
        <div class="flex justify-between items-center gap-3">
            <h3 class="font-bold text-lg leading-snug tracking-tight dark:text-white">${task.title}</h3>
            <span class="shrink-0 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wider rounded-full ${priorityColor(task.priority)}">${task.priority}</span>
        </div>
        <p class="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">${task.description ?? ""}</p>
        <p class="mt-5 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">${task.due_date ?? ""}</p>
        <div class="mt-6 flex gap-3">
            <button class="editBtn rounded-lg border border-indigo-500/25 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 px-3.5 py-1.5 text-sm font-medium outline-none transition duration-200 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white hover:shadow-lg hover:shadow-indigo-500/25 focus-visible:ring-4 focus-visible:ring-indigo-500/25 active:scale-95" data-id="${task.id}">Edit</button>
            <button class="deleteBtn rounded-lg border border-rose-500/25 bg-rose-500/10 text-rose-600 dark:text-rose-300 px-3.5 py-1.5 text-sm font-medium outline-none transition duration-200 hover:bg-rose-500 hover:border-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-500/25 focus-visible:ring-4 focus-visible:ring-rose-500/25 active:scale-95" data-id="${task.id}">Delete</button>
        </div>
    </div>`;
}


function showToast(message) {
    const toast = document.querySelector("#toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, 2000);
}