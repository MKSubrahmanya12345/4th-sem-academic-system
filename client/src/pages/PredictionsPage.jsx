import React, { useEffect, useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import MetricCard from '../components/Shared/MetricCard';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { useSemesterStore } from '../store/semesterStore';

const PredictionsPage = () => {
  const [predictions, setPredictions] = useState(null);
  const { semesters, fetchSemesters, selectedSemesterId, setSelectedSemester } = useSemesterStore();
  const token = useAuthStore(state => state.token);

  useEffect(() => {
    fetchSemesters();
  }, []);

  useEffect(() => {
    const fetchPredictions = async () => {
      if (!selectedSemesterId) return;
      try {
        const res = await axios.get(`/api/v1/calculations/sgpa?semesterId=${selectedSemesterId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPredictions(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPredictions();
  }, [selectedSemesterId, token]);

  return (
    <MainLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-black uppercase tracking-tighter text-black">Prediction Terminal</h2>
        <p className="font-bold text-gray-400">MULTI-MODAL ACADEMIC PROJECTIONS</p>
      </div>

      <div className="flex gap-4 mb-8">
          {semesters.map(sem => (
            <button 
              key={sem._id} 
              className={`boxy-button text-xs font-black uppercase ${selectedSemesterId === sem._id ? 'bg-accent text-white' : 'bg-white text-black'}`}
              onClick={() => setSelectedSemester(sem._id)}
            >
              {sem.name}
            </button>
          ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-6">
          <MetricCard 
            label="Optimistic Projection" 
            value={predictions?.maxSGPA || '0.00'} 
            subtext="CORE ASSUMPTION: 100% FUTURE PERFORMANCE"
            color="success"
          />
          <div className="boxy-card text-xs font-bold leading-relaxed text-gray-500">
            <h4 className="font-black text-black border-b mb-2 border-dashed">ALGORITHM PARAMETERS</h4>
            <p>Calculates the absolute maximum achievable SGPA assuming every remaining component results in full marks.</p>
          </div>
        </div>

        <div className="space-y-6">
          <MetricCard 
            label="Performance-Based" 
            value={predictions?.projectedSGPA || '0.00'} 
            subtext="CORE ASSUMPTION: CONTINUITY OF TRENDS"
            color="accent"
          />
          <div className="boxy-card text-xs font-bold leading-relaxed text-gray-500">
            <h4 className="font-black text-black border-b mb-2 border-dashed">ALGORITHM PARAMETERS</h4>
            <p>Projects final results based on your current mean performance across all attempted components in this phase.</p>
          </div>
        </div>

        <div className="space-y-6">
          <MetricCard 
            label="Weighted Recency" 
            value={((parseFloat(predictions?.projectedSGPA || 0) + parseFloat(predictions?.currentSGPA || 0)) / 2).toFixed(2)} 
            subtext="CORE ASSUMPTION: RECENT MOMENTUM"
            color="warning"
          />
          <div className="boxy-card text-xs font-bold leading-relaxed text-gray-500">
            <h4 className="font-black text-black border-b mb-2 border-dashed">ALGORITHM PARAMETERS</h4>
            <p>Favors recent evaluation outcomes as more predictive of immediate future performance compared to historical data.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PredictionsPage;
