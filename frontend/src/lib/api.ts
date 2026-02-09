import axios from 'axios';

// Axios is already configured with BaseURL and Headers in AuthContext
// We just need to use it here.

export const clientsApi = {
    getAll: async () => {
        const res = await axios.get('/client/all');
        return res.data;
    },
    create: async (data: any) => {
        const res = await axios.post('/client', data);
        return res.data;
    },
    update: async (id: string, data: any) => {
        const res = await axios.put(`/client/${id}`, data);
        return res.data;
    },
    delete: async (id: string) => {
        const res = await axios.delete(`/client/${id}`);
        return res.data;
    },
};


export const dashboardApi = {
    getSummary: async () => {
        const res = await axios.get('/dashboard/summary');
        return res.data;
    },
    getPriorityJobs: async () => {
        const res = await axios.get('/dashboard/priority-jobs');
        return res.data;
    },
};

export const jobsApi = {
    getAll: async (params?: string) => {
        const res = await axios.get(`/jobs${params ? `?${params}` : ''}`);
        return res.data;
    },
    create: async (data: any) => {
        const res = await axios.post('/jobs', data);
        return res.data;
    },
    update: async (id: string, data: any) => {
        const res = await axios.put(`/jobs/${id}`, data);
        return res.data;
    },
    delete: async (id: string) => {
        const res = await axios.delete(`/jobs/${id}`);
        return res.data;
    },
    updateStatus: async (id: string, data: any) => {
        const res = await axios.patch(`/jobs/${id}/status`, data);
        return res.data;
    },
};

export const staffApi = {
    getAll: async () => {
        const res = await axios.get('/staff');
        return res.data;
    },
    create: async (data: any) => {
        const res = await axios.post('/staff', data);
        return res.data;
    },
    update: async (id: string, data: any) => {
        const res = await axios.put(`/staff/${id}`, data);
        return res.data;
    },
    delete: async (id: string) => {
        const res = await axios.delete(`/staff/${id}`);
        return res.data;
    },
    updateStatus: async (id: string, status: string) => {
        const res = await axios.patch(`/staff/${id}/status`, { status });
        return res.data;
    },
};
