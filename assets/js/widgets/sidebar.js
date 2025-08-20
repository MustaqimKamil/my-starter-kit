// Sidebar widget logic
export function initSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.querySelector(".sidebar-toggle-close");
    const mainContent = document.querySelector(".main-content");
    const logoBtn = document.querySelector('.sidebar-toggle-open');

    if (!sidebar || !toggleBtn || !mainContent || !logoBtn) return;

    // Desktop collapse/expand functionality
    const toggleCollapse = () => {
        sidebar.classList.toggle("collapsed");
        mainContent.classList.toggle("collapsed");
    };

    const expandSidebar = () => {
        sidebar.classList.remove('collapsed');
        mainContent.classList.remove('collapsed');
    };

    // Close button - for desktop collapse and mobile close
    toggleBtn.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            // Mobile: close the sidebar completely
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // Desktop: toggle collapse
            toggleCollapse();
        }
    });

    // Logo button - expand on desktop
    logoBtn.addEventListener('click', () => {
        if (window.innerWidth > 768) {
            expandSidebar();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            // Desktop: remove mobile active class and restore scroll
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // Mobile: remove desktop collapsed state
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('collapsed');
        }
    });
}
