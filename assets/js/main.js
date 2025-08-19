// assets/js/main.js
import { initHeader } from './widgets/header.js';
import { initSidebar } from './widgets/sidebar.js';
import { initFooter } from './widgets/footer.js';

// Utility to load external HTML
function loadHTML(containerId, filePath, callback) {
    fetch(filePath)
        .then(res => res.text())
        .then(html => {
            document.getElementById(containerId).innerHTML = html;
            if (callback) callback();
        })
        .catch(err => console.error("Error loading", filePath, err));
}

// Use correct relative paths for your folder
loadHTML('header-container', 'widgets/header.html', () => initHeader());
loadHTML('sidebar-container', 'widgets/sidebar.html', () => initSidebar());
loadHTML('footer-container', 'widgets/footer.html', () => initFooter());
