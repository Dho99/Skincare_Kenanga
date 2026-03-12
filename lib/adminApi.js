// lib/adminApi.js
// Helper fetch wrapper yang otomatis menyertakan Authorization JWT header

function getToken() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('admin_token');
    }
    return null;
}

async function adminFetch(url, options = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
        // Token expired/invalid — redirect ke login
        if (typeof window !== 'undefined') {
            localStorage.removeItem('admin_token');
            window.location.href = '/admin/login';
        }
        throw new Error('Unauthorized');
    }

    return response;
}

export const adminApi = {
    // Products
    getProducts: () => adminFetch('/api/products'),
    createProduct: (data) => adminFetch('/api/products', { method: 'POST', body: JSON.stringify(data) }),
    updateProduct: (id, data) => adminFetch(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteProduct: (id) => adminFetch(`/api/products/${id}`, { method: 'DELETE' }),

    // Auth
    login: (credentials) => fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    }),
};
