// assets/js/main.js
import { initHeader } from './widgets/header.js';
import { initSidebar } from './widgets/sidebar.js';
import { initFooter } from './widgets/footer.js';

// Utility to load external HTML
function loadHTML(containerId, filePath, callback) {
    return fetch(filePath)
        .then(res => {
            if (!res.ok) throw new Error(`Failed to load ${filePath}: ${res.status}`);
            return res.text();
        })
        .then(html => {
            const container = document.getElementById(containerId);
            if (!container) throw new Error(`Container ${containerId} not found`);
            container.innerHTML = html;

            // Wait for next tick to ensure DOM is ready
            return new Promise(resolve => {
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        if (callback) {
                            try {
                                callback();
                            } catch (err) {
                                console.error(`Error initializing ${filePath}:`, err);
                            }
                        }
                        resolve();
                    }, 10);
                });
            });
        })
        .catch(err => {
            console.error("Error loading", filePath, err);
            throw err;
        });
}

// Load widgets sequentially to avoid race conditions
async function initializeApp() {
    try {
        // Load header first and ensure it's fully initialized
        await loadHTML('header-container', 'widgets/header.html', () => initHeader());

        // Load sidebar and footer in parallel
        await Promise.all([
            loadHTML('sidebar-container', 'widgets/sidebar.html', () => initSidebar()),
            loadHTML('footer-container', 'widgets/footer.html', () => initFooter())
        ]);
    } catch (error) {
        console.error('Failed to initialize app:', error);
    }
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
