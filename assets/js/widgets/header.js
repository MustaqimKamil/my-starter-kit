// Header widget logic
export function initHeader() {
    const header = document.getElementById('header');
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.getElementById('sidebar-header-toggle');
    const sidebarCloseBtn = document.getElementById('sidebar-toggle-close');
    const overlay = document.getElementById('sidebar-overlay');
    const themeBtn = document.getElementById('theme-toggle');

    if (!toggle || !sidebar) return;

    // --- Mobile sidebar open/close
    const openSidebar = () => {
        sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    };

    const closeSidebar = () => {
        sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restore scroll
    };

    const toggleSidebar = () => {
        if (sidebar.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    };

    // Header toggle button click
    toggle.addEventListener('click', toggleSidebar);

    // Sidebar close button click
    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', closeSidebar);
    }

    // Overlay click to close sidebar
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // Close sidebar on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

    // --- Shrink on scroll
    const onScroll = () => {
        if (window.scrollY > 8) header.classList.add('is-scrolled');
        else header.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // --- Theme toggle (optional)
    const THEME_KEY = 'msk-theme';
    const applyTheme = (mode) => {
        document.body.classList.toggle('theme-dark', mode === 'dark');
    };
    // init from storage or OS
    const stored = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    applyTheme(stored ?? (prefersDark ? 'dark' : 'light'));

    themeBtn?.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('theme-dark');
        localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
        // swap icon
        themeBtn.innerHTML = isDark ? '<i class="ri-moon-line"></i>' : '<i class="ri-sun-line"></i>';
    });
}
