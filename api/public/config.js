// API Configuration
const API_CONFIG = {
    baseUrl: 'http://localhost:3000/api',
    timeout: 10000, // 10 seconds
    itemsPerPage: {
        default: 20,
        options: [12, 24, 36, 48]
    },
    latestLimit: {
        default: 10,
        options: [10, 20, 30, 50]
    }
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}
