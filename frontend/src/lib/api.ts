const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API request failed');
    }

    return response.json();
};

export const dashboardApi = {
    getSummary: () => apiFetch('/dashboard/summary'),
    getPriorityJobs: () => apiFetch('/dashboard/priority-jobs'),
};

export const jobsApi = {
    getAll: (params?: string) => apiFetch(`/jobs${params ? `?${params}` : ''}`),
    updateStatus: (id: string, data: any) => apiFetch(`/jobs/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    }),
};

export const staffApi = {
    getAll: () => apiFetch('/staff'),
    updateStatus: (id: string, status: string) => apiFetch(`/staff/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    }),
};
