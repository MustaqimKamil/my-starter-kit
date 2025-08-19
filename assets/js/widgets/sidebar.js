// Sidebar widget logic
export function initSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.querySelector(".sidebar-toggle");
    const mainContent = document.querySelector(".main-content");
    const logoBtn = document.querySelector('.sidebar-logo');

    if (!sidebar || !toggleBtn || !mainContent || !logoBtn) return;

    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        mainContent.classList.toggle("collapsed");
    });

    logoBtn.addEventListener('click', () => {
        if (sidebar.classList.contains('collapsed')) {
            sidebar.classList.remove('collapsed');
        }
        if (mainContent.classList.contains('collapsed')) {
            mainContent.classList.remove('collapsed');
        }
    });
}
