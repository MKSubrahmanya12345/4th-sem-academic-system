import { create } from 'zustand';
import axios from 'axios';

// ??$$$ Zustand store for individual marks and real-time updates
export const useMarksStore = create((set, get) => ({
  marks: {}, // Organized by subjectId: [markArray]
  loading: false,

  fetchMarks: async (subjectId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/v1/marks/subject/${subjectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ marks: { ...get().marks, [subjectId]: response.data.data } });
    } catch (err) {
      console.error(err);
    }
  },

  updateMarks: async (subjectId, marksArray) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/v1/marks/bulk', { subjectId, marks: marksArray }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      get().fetchMarks(subjectId);
    } catch (err) {
      console.error(err);
    }
  }
}));
