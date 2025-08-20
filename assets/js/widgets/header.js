// Header widget logic
export function initHeader() {
    // Wait for elements to be available with retry logic
    const waitForElements = (retries = 10) => {
        const header = document.getElementById('header');
        const toggle = document.getElementById('sidebar-header-toggle');
        const overlay = document.getElementById('sidebar-overlay');
        const themeBtn = document.getElementById('theme-toggle');

        if (!header || !toggle) {
            if (retries > 0) {
                setTimeout(() => waitForElements(retries - 1), 100);
                return;
            } else {
                return;
            }
        }

        // Elements are ready, proceed with initialization
        initializeHeaderLogic(header, toggle, overlay, themeBtn);
    };

    waitForElements();
}

function initializeHeaderLogic(header, toggle, overlay, themeBtn) {
    // Wait for sidebar to be available (it might load after header)
    const waitForSidebar = (retries = 20) => {
        const sidebar = document.querySelector('.sidebar');
        const sidebarCloseBtn = document.getElementById('sidebar-toggle-close');

        if (!sidebar) {
            if (retries > 0) {
                setTimeout(() => waitForSidebar(retries - 1), 50);
                return;
            } else {
                return;
            }
        }

        setupMobileToggle(sidebar, toggle, overlay, sidebarCloseBtn);
    };

    waitForSidebar();
    setupScrollBehavior(header);
    setupThemeToggle(themeBtn);
}

function setupMobileToggle(sidebar, toggle, overlay, sidebarCloseBtn) {

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

    const toggleSidebar = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (sidebar.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    };

    // Remove any existing listeners to prevent duplicates
    const newToggle = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(newToggle, toggle);

    // Header toggle button click
    newToggle.addEventListener('click', toggleSidebar);

    // Sidebar close button click
    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', closeSidebar);
    }

    // Overlay click to close sidebar
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // Close sidebar on Escape key (only add once)
    const escapeHandler = (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    };

    // Remove existing escape listeners
    window.removeEventListener('keydown', escapeHandler);
    window.addEventListener('keydown', escapeHandler);
}

function setupScrollBehavior(header) {
    // --- Shrink on scroll
    const onScroll = () => {
        if (window.scrollY > 8) header.classList.add('is-scrolled');
        else header.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

function setupThemeToggle(themeBtn) {
    if (!themeBtn) return;

    // --- Theme toggle (optional)
    const THEME_KEY = 'msk-theme';
    const applyTheme = (mode) => {
        document.body.classList.toggle('theme-dark', mode === 'dark');
    };
    // init from storage or OS
    const stored = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    applyTheme(stored ?? (prefersDark ? 'dark' : 'light'));

    themeBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('theme-dark');
        localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
        // swap icon
        themeBtn.innerHTML = isDark ? '<i class="ri-moon-line"></i>' : '<i class="ri-sun-line"></i>';
    });
}
