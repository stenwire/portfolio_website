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

    let projectItems = [];
    let articleItems = [];

    // --- Fetch Projects and Articles Separately ---
    const fetchItems = async () => {
        try {
            const [projectsResponse, articlesResponse] = await Promise.all([
                fetch('projects.json'),
                fetch('articles.json')
            ]);

            if (!projectsResponse.ok || !articlesResponse.ok) {
                throw new Error(`Failed to load one or both JSON files.`);
            }

            projectItems = await projectsResponse.json();
            articleItems = await articlesResponse.json();

            // Initial render
            filterAndRenderItems(); 
        } catch (error) {
            console.error("Could not fetch items:", error);
            projectGrid.innerHTML = `<p class="no-results-message">Failed to load projects.</p>`;
            articleGrid.innerHTML = `<p class="no-results-message">Failed to load articles.</p>`;
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

            // Determine the detail link
            const isArticle = item.category === 'Article';
            const detailUrl = isArticle ? item.url : `project-detail.html?id=${item.id}`;
            const targetAttr = isArticle ? `target="_blank" rel="noopener noreferrer"` : '';

            itemCard.innerHTML = `
                <div class="card-header">
                    <span class="card-category">${item.category}</span>
                    <span class="kebab-menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                        </svg>
                    </span>
                </div>
                <div class="card-content">
                    <h3>${item.title}</h3>
                </div>
                <div class="card-footer">
                    <a href="${detailUrl}" class="project-link" aria-label="View details for ${item.title}" ${targetAttr}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>
            `;
            gridElement.appendChild(itemCard);
        });
    };


    // --- Filter and Render Logic ---
    const filterAndRenderItems = () => {
        const query = searchInput.value.toLowerCase().trim();

        const filterItems = (items) => {
            return items.filter(item => {
                if (!query) return true;
                const titleMatch = item.title.toLowerCase().includes(query);
                const categoryMatch = item.category.toLowerCase().includes(query);
                const toolsMatch = item.tools?.some(tool => tool.toLowerCase().includes(query));
                return titleMatch || categoryMatch || toolsMatch;
            });
        };

        const filteredProjects = filterItems(projectItems);
        const filteredArticles = filterItems(articleItems);

        renderGrid(filteredProjects, projectGrid, "No projects found.");
        renderGrid(filteredArticles, articleGrid, "No articles found.");

        // Update search result count
        if (searchModal.classList.contains('visible')) {
            const totalCount = filteredProjects.length + filteredArticles.length;
            filterResultsCount.textContent = `${totalCount} item${totalCount !== 1 ? 's' : ''} found.`;
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
