import { create } from 'zustand';
import axios from 'axios';

// ??$$$ Zustand store for semester and subject management
export const useSemesterStore = create((set, get) => ({
  semesters: [],
  selectedSemesterId: null,
  loading: false,
  error: null,

  fetchSemesters: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/v1/semesters', {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ semesters: response.data.data, loading: false });
      
      if (response.data.data.length > 0 && !get().selectedSemesterId) {
        set({ selectedSemesterId: response.data.data[0]._id });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      set({ error: 'Failed to fetch semesters', loading: false });
    }
  },

  setSelectedSemester: (id) => set({ selectedSemesterId: id }),

  addSemester: async (name) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/v1/semesters', { name }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ semesters: [...get().semesters, response.data.data] });
    } catch (err) {
      console.error(err);
    }
  },

  addSubject: async (semesterId, subjectData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/v1/subjects', { ...subjectData, semesterId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      get().fetchSemesters();
    } catch (err) {
      console.error(err);
    }
  },

  updateSubject: async (subjectId, subjectData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/v1/subjects/${subjectId}`, subjectData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      get().fetchSemesters();
    } catch (err) {
      console.error(err);
    }
  },

  deleteSubject: async (subjectId) => {
    try {
      if (!confirm('Are you sure you want to delete this subject?')) return;
      const token = localStorage.getItem('token');
      await axios.delete(`/api/v1/subjects/${subjectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      get().fetchSemesters();
    } catch (err) {
      console.error(err);
    }
  }
}));
