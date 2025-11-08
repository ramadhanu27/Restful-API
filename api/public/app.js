const API_BASE_URL = 'http://localhost:3000/api';

// Tab Management
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });

    // Show selected tab
    const selectedTab = document.getElementById(`${tabName}-tab`);
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
    }

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-indigo-100', 'text-indigo-700', 'font-semibold');
    });
    event.target.closest('.nav-btn').classList.add('bg-indigo-100', 'text-indigo-700', 'font-semibold');

    // Load data based on tab
    if (tabName === 'latest') {
        loadLatest();
    } else if (tabName === 'all') {
        loadAllManhwa(1);
    }
}

// Show/Hide Loading
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

// Load Latest Manhwa
async function loadLatest() {
    const limit = document.getElementById('latest-limit').value;
    const resultsDiv = document.getElementById('latest-results');
    
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/manhwa/latest?limit=${limit}`);
        const data = await response.json();
        
        if (data.success) {
            resultsDiv.innerHTML = renderManhwaGrid(data.data);
        } else {
            resultsDiv.innerHTML = `<div class="text-center text-red-500 py-8">Error: ${data.error}</div>`;
        }
    } catch (error) {
        resultsDiv.innerHTML = `<div class="text-center text-red-500 py-8">Error loading data: ${error.message}</div>`;
    }
    hideLoading();
}

// Load All Manhwa with Pagination
async function loadAllManhwa(page = 1) {
    const limit = document.getElementById('all-limit').value;
    const resultsDiv = document.getElementById('all-results');
    const paginationDiv = document.getElementById('pagination');
    
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/manhwa?page=${page}&limit=${limit}`);
        const data = await response.json();
        
        if (data.success) {
            resultsDiv.innerHTML = renderManhwaGrid(data.data);
            paginationDiv.innerHTML = renderPagination(data.pagination);
        } else {
            resultsDiv.innerHTML = `<div class="text-center text-red-500 py-8">Error: ${data.error}</div>`;
        }
    } catch (error) {
        resultsDiv.innerHTML = `<div class="text-center text-red-500 py-8">Error loading data: ${error.message}</div>`;
    }
    hideLoading();
}

// Search Manhwa
async function searchManhwa() {
    const query = document.getElementById('search-input').value.trim();
    const resultsDiv = document.getElementById('search-results');
    
    if (!query) {
        resultsDiv.innerHTML = `<div class="text-center text-gray-500 py-8">Please enter a search query</div>`;
        return;
    }
    
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.success) {
            if (data.count === 0) {
                resultsDiv.innerHTML = `<div class="text-center text-gray-500 py-8">No results found for "${query}"</div>`;
            } else {
                resultsDiv.innerHTML = `
                    <div class="mb-4 text-gray-600">
                        Found <span class="font-bold text-indigo-600">${data.count}</span> results for "<span class="font-semibold">${query}</span>"
                    </div>
                    ${renderManhwaGrid(data.data)}
                `;
            }
        } else {
            resultsDiv.innerHTML = `<div class="text-center text-red-500 py-8">Error: ${data.error}</div>`;
        }
    } catch (error) {
        resultsDiv.innerHTML = `<div class="text-center text-red-500 py-8">Error searching: ${error.message}</div>`;
    }
    hideLoading();
}

function handleSearchEnter(event) {
    if (event.key === 'Enter') {
        searchManhwa();
    }
}

// Render Manhwa Grid
function renderManhwaGrid(manhwaList) {
    if (!manhwaList || manhwaList.length === 0) {
        return '<div class="text-center text-gray-500 py-8">No data available</div>';
    }

    return `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            ${manhwaList.map(manhwa => `
                <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer" onclick="showDetail('${manhwa.id || manhwa.title}')">
                    <div class="aspect-[3/4] bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                        ${manhwa.coverImage ? 
                            `<img src="${manhwa.coverImage}" alt="${manhwa.title}" class="w-full h-full object-cover">` :
                            `<i class="fas fa-book text-6xl text-indigo-300"></i>`
                        }
                    </div>
                    <div class="p-4">
                        <h3 class="font-bold text-lg mb-2 line-clamp-2" title="${manhwa.title}">${manhwa.title}</h3>
                        ${manhwa.rating ? `
                            <div class="flex items-center mb-2">
                                <i class="fas fa-star text-yellow-400"></i>
                                <span class="ml-1 font-semibold">${manhwa.rating}</span>
                            </div>
                        ` : ''}
                        ${manhwa.genres && manhwa.genres.length > 0 ? `
                            <div class="flex flex-wrap gap-1 mb-2">
                                ${manhwa.genres.slice(0, 3).map(genre => `
                                    <span class="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">${genre}</span>
                                `).join('')}
                                ${manhwa.genres.length > 3 ? `<span class="text-xs text-gray-500">+${manhwa.genres.length - 3}</span>` : ''}
                            </div>
                        ` : ''}
                        ${manhwa.lastUpdate ? `
                            <p class="text-xs text-gray-500">
                                <i class="far fa-clock"></i> ${new Date(manhwa.lastUpdate).toLocaleDateString('id-ID')}
                            </p>
                        ` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Render Pagination
function renderPagination(pagination) {
    if (!pagination || pagination.totalPages <= 1) return '';

    const { page, totalPages } = pagination;
    let pages = [];

    // Always show first page
    pages.push(1);

    // Show pages around current page
    for (let i = Math.max(2, page - 2); i <= Math.min(totalPages - 1, page + 2); i++) {
        pages.push(i);
    }

    // Always show last page
    if (totalPages > 1) pages.push(totalPages);

    // Remove duplicates and sort
    pages = [...new Set(pages)].sort((a, b) => a - b);

    return `
        <div class="flex justify-center items-center gap-2 flex-wrap">
            ${page > 1 ? `
                <button onclick="loadAllManhwa(${page - 1})" class="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
                    <i class="fas fa-chevron-left"></i> Previous
                </button>
            ` : ''}
            
            ${pages.map((p, idx) => {
                const showEllipsis = idx > 0 && p - pages[idx - 1] > 1;
                return `
                    ${showEllipsis ? '<span class="px-2">...</span>' : ''}
                    <button 
                        onclick="loadAllManhwa(${p})" 
                        class="px-4 py-2 rounded-lg ${p === page ? 'bg-indigo-600 text-white' : 'bg-white border hover:bg-gray-50'}"
                    >
                        ${p}
                    </button>
                `;
            }).join('')}
            
            ${page < totalPages ? `
                <button onclick="loadAllManhwa(${page + 1})" class="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
                    Next <i class="fas fa-chevron-right"></i>
                </button>
            ` : ''}
        </div>
    `;
}

// Show Detail Modal
async function showDetail(id) {
    const modal = document.getElementById('detail-modal');
    const content = document.getElementById('detail-content');
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    content.innerHTML = '<div class="text-center py-12"><i class="fas fa-spinner fa-spin text-4xl text-indigo-600"></i></div>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/manhwa/${encodeURIComponent(id)}`);
        const data = await response.json();
        
        if (data.success) {
            const manhwa = data.data;
            content.innerHTML = `
                <div class="grid md:grid-cols-3 gap-6">
                    <div class="md:col-span-1">
                        <div class="aspect-[3/4] bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                            ${manhwa.coverImage ? 
                                `<img src="${manhwa.coverImage}" alt="${manhwa.title}" class="w-full h-full object-cover rounded-lg">` :
                                `<i class="fas fa-book text-8xl text-indigo-300"></i>`
                            }
                        </div>
                    </div>
                    <div class="md:col-span-2">
                        <h2 class="text-3xl font-bold mb-2">${manhwa.title}</h2>
                        ${manhwa.alternativeTitle ? `<p class="text-gray-600 mb-4">${manhwa.alternativeTitle}</p>` : ''}
                        
                        ${manhwa.rating ? `
                            <div class="flex items-center mb-4">
                                <i class="fas fa-star text-yellow-400 text-xl"></i>
                                <span class="ml-2 text-2xl font-bold">${manhwa.rating}</span>
                                <span class="ml-2 text-gray-500">/10</span>
                            </div>
                        ` : ''}
                        
                        ${manhwa.status ? `<p class="mb-2"><span class="font-semibold">Status:</span> ${manhwa.status}</p>` : ''}
                        ${manhwa.type ? `<p class="mb-2"><span class="font-semibold">Type:</span> ${manhwa.type}</p>` : ''}
                        ${manhwa.author ? `<p class="mb-2"><span class="font-semibold">Author:</span> ${manhwa.author}</p>` : ''}
                        
                        ${manhwa.genres && manhwa.genres.length > 0 ? `
                            <div class="mb-4">
                                <span class="font-semibold">Genres:</span>
                                <div class="flex flex-wrap gap-2 mt-2">
                                    ${manhwa.genres.map(genre => `
                                        <span class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">${genre}</span>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${manhwa.synopsis ? `
                            <div class="mb-4">
                                <h4 class="font-semibold mb-2">Synopsis:</h4>
                                <p class="text-gray-700 leading-relaxed">${manhwa.synopsis}</p>
                            </div>
                        ` : ''}
                        
                        ${manhwa.lastUpdate ? `
                            <p class="text-sm text-gray-500">
                                <i class="far fa-clock"></i> Last Update: ${new Date(manhwa.lastUpdate).toLocaleString('id-ID')}
                            </p>
                        ` : ''}
                        
                        ${manhwa.url ? `
                            <div class="mt-6">
                                <a href="${manhwa.url}" target="_blank" class="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                                    <i class="fas fa-external-link-alt"></i> View on Komiku
                                </a>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        } else {
            content.innerHTML = `<div class="text-center text-red-500 py-8">Error: ${data.error}</div>`;
        }
    } catch (error) {
        content.innerHTML = `<div class="text-center text-red-500 py-8">Error loading detail: ${error.message}</div>`;
    }
}

function closeModal() {
    const modal = document.getElementById('detail-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Close modal when clicking outside
document.getElementById('detail-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Initialize - Load latest on page load
window.addEventListener('DOMContentLoaded', () => {
    loadLatest();
});
