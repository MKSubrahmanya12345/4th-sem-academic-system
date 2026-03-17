import React, { useEffect, useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import MetricCard from '../components/Shared/MetricCard';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const token = useAuthStore(state => state.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/v1/calculations/sgpa', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [token]);

  return (
    <MainLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-black uppercase tracking-tighter">System Overview</h2>
        <p className="font-bold text-gray-400">REAL-TIME ACADEMIC PERFORMANCE METRICS</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard 
          label="Current SGPA" 
          value={data?.currentSGPA || '0.00'} 
          subtext="BASED ON ATTEMPTED COMPONENTS"
        />
        <MetricCard 
          label="Projected SGPA" 
          value={data?.projectedSGPA || '0.00'} 
          subtext="ESTIMATED FINAL PERFORMANCE"
          color="success"
        />
        <MetricCard 
          label="Maximum SGPA" 
          value={data?.maxSGPA || '0.00'} 
          subtext="LIMIT UNDER OPTIMISTIC CONDITIONS"
          color="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="boxy-card">
          <h3 className="text-lg font-black uppercase mb-4 border-b-2 border-black pb-2">Status Log</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-accent pl-4">
              <p className="text-xs font-bold text-gray-400">12:45 — SYSTEM</p>
              <p className="text-sm font-bold uppercase">All prediction modules online.</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-xs font-bold text-gray-400">10:20 — DATABASE</p>
              <p className="text-sm font-bold uppercase">Marks successfully synchronized.</p>
            </div>
          </div>
        </div>

        <div className="boxy-card bg-black text-white">
          <h3 className="text-lg font-black uppercase mb-4 border-b-2 border-white pb-2">What-If Rapid Input</h3>
          <p className="text-gray-400 text-sm mb-4">TEMPORARY SIMULATION OVERRIDE TEMPLATE</p>
          <div className="space-y-2">
             <div className="h-2 bg-gray-800 w-full mb-1"></div>
             <div className="h-2 bg-gray-800 w-3/4 mb-1"></div>
             <div className="h-2 bg-gray-800 w-5/6 mb-4"></div>
             <button className="bg-white text-black px-4 py-2 text-xs font-black uppercase">Launch Simulation Engine</button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
