document.addEventListener('DOMContentLoaded', () => {
    // Grid containers
    const projectGrid = document.getElementById('project-grid');
    const articleGrid = document.getElementById('article-grid');
    
    // Search elements
    const searchBtn = document.getElementById('search-btn');
    const searchModal = document.getElementById('search-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const searchInput = document.getElementById('search-input');
    const filterResultsCount = document.getElementById('filter-results-count');
    const navMenuBtn = document.getElementById('nav-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    let allItems = [];

    // --- Fetch and Render All Items ---
    const fetchItems = async () => {
        try {
            const response = await fetch('projects.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            allItems = await response.json();
            // Initial render
            filterAndRenderItems(); 
        } catch (error) {
            console.error("Could not fetch items:", error);
            projectGrid.innerHTML = `<p class="no-results-message">Failed to load content.</p>`;
            articleGrid.innerHTML = '';
        }
    };

    // --- Generic Renderer for a grid ---
    const renderGrid = (items, gridElement, emptyMessage) => {
        gridElement.innerHTML = '';
        if (items.length === 0) {
            gridElement.innerHTML = `<p class="no-results-message">${emptyMessage}</p>`;
            return;
        }

        items.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'project-card';
            // Use the markdownFile for the detail page link
            const detailUrl = `project-detail.html?id=${item.id}`;

            itemCard.innerHTML = `
                <div class="card-header">
                    <span class="card-category">${item.category}</span>
                    <span class="kebab-menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                    </span>
                </div>
                <div class="card-content">
                    <h3>${item.title}</h3>
                </div>
                <div class="card-footer">
                    <a href="${detailUrl}" class="project-link" aria-label="View details for ${item.title}">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </a>
                </div>
            `;
            gridElement.appendChild(itemCard);
        });
    };

    // --- Filter and Render Logic ---
    const filterAndRenderItems = () => {
        const query = searchInput.value.toLowerCase().trim();

        const filteredItems = allItems.filter(item => {
            if (!query) return true; // Show all if query is empty
            const titleMatch = item.title.toLowerCase().includes(query);
            const categoryMatch = item.category.toLowerCase().includes(query);
            const toolsMatch = item.tools.some(tool => tool.toLowerCase().includes(query));
            return titleMatch || categoryMatch || toolsMatch;
        });

        // Separate filtered items into projects and articles
        const projects = filteredItems.filter(item => item.category === 'Project');
        const articles = filteredItems.filter(item => item.category === 'Article');

        renderGrid(projects, projectGrid, "No projects found.");
        renderGrid(articles, articleGrid, "No articles found.");
        
        // Update search result count in modal
        if (searchModal.classList.contains('visible')) {
            const count = filteredItems.length;
            filterResultsCount.textContent = `${count} item${count !== 1 ? 's' : ''} found.`;
        }
    };

    // --- Navigation Menu Controls ---
    const toggleNavMenu = (event) => {
        // Stop the click from bubbling up to the document
        event.stopPropagation(); 
        const isVisible = navMenu.classList.toggle('visible');
        navMenuBtn.setAttribute('aria-expanded', isVisible);
    };

    const closeNavMenu = () => {
        if (navMenu.classList.contains('visible')) {
            navMenu.classList.remove('visible');
            navMenuBtn.setAttribute('aria-expanded', 'false');
        }
    };

    // Open/close menu on button click
    navMenuBtn.addEventListener('click', toggleNavMenu);

    // Close menu if user clicks anywhere else on the page
    document.addEventListener('click', closeNavMenu);

    // Handle clicks on menu items
    navMenu.addEventListener('click', (event) => {
        // Check if a link was clicked
        if (event.target.tagName === 'A') {
            event.preventDefault(); // Prevent instant jump
            const targetId = event.target.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Close the menu after clicking a link
            closeNavMenu();
        }
    });
    
    // --- Modal Controls ---
    const openSearchModal = () => { searchModal.classList.add('visible'); searchInput.focus(); filterResultsCount.textContent = ''; };
    const closeSearchModal = () => searchModal.classList.remove('visible');

    // --- Event Listeners ---
    searchBtn.addEventListener('click', openSearchModal);
    closeModalBtn.addEventListener('click', closeSearchModal);
    searchModal.addEventListener('click', (e) => { if (e.target === searchModal) closeSearchModal(); });
    searchInput.addEventListener('input', filterAndRenderItems);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && searchModal.classList.contains('visible')) closeSearchModal(); });

    // --- Initialize ---
    fetchItems();
});
