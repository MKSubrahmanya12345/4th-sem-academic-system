import React, { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import MetricCard from '../components/Shared/MetricCard';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { useSemesterStore } from '../store/semesterStore';

const TargetPlannerPage = () => {
  const { semesters, selectedSemesterId, setSelectedSemester } = useSemesterStore();
  const [targetSgpa, setTargetSgpa] = useState(8.0);
  const [targetSubject, setTargetSubject] = useState('');
  const [targetSubPercentage, setTargetSubPercentage] = useState(85);
  const [plannerResult, setPlannerResult] = useState(null);
  const token = useAuthStore(state => state.token);

  const calculateTarget = async () => {
    if (!targetSubject) return;
    try {
      const res = await axios.post('/api/v1/calculations/target-planner', {
        subjectId: targetSubject,
        targetPercentage: targetSubPercentage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlannerResult(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const selectedSem = semesters.find(s => s._id === selectedSemesterId);

  return (
    <MainLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-black uppercase tracking-tighter text-black">Target Optimization</h2>
        <p className="font-bold text-gray-400">STRATEGIC RESOURCE ALLOCATION & SOLVER</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="boxy-card">
          <h3 className="text-xl font-black uppercase mb-6 border-b-2 border-black pb-2">Solver Parameters</h3>
          <div className="space-y-6">
            <div>
              <label className="text-xs font-black uppercase block mb-2">Target SGPA (Global)</label>
              <div className="flex gap-4 items-center">
                <input 
                  type="range" min="0" max="10" step="0.1" 
                  className="flex-1 accent-black"
                  value={targetSgpa} 
                  onChange={(e) => setTargetSgpa(e.target.value)}
                />
                <span className="text-2xl font-black w-12">{targetSgpa}</span>
              </div>
            </div>

            <div className="border-t-2 border-dashed border-black pt-6">
              <label className="text-xs font-black uppercase block mb-2">Subject Optimization Focus</label>
              <select 
                className="boxy-input mb-4" 
                value={targetSubject} 
                onChange={(e) => setTargetSubject(e.target.value)}
              >
                <option value="">SELECT SUBJECT...</option>
                {selectedSem?.subjects.map(sub => (
                  <option key={sub._id} value={sub._id}>{sub.name}</option>
                ))}
              </select>

              <label className="text-xs font-black uppercase block mb-2">Target Subject Percentage</label>
              <div className="flex gap-4 items-center mb-6">
                <input 
                  type="range" min="0" max="100" step="1" 
                  className="flex-1 accent-black"
                  value={targetSubPercentage} 
                  onChange={(e) => setTargetSubPercentage(e.target.value)}
                />
                <span className="text-2xl font-black w-14 text-right">{targetSubPercentage}%</span>
              </div>

              <button 
                className="boxy-button-primary w-full text-lg font-black uppercase" 
                onClick={calculateTarget}
                disabled={!targetSubject}
              >
                Execute Solver
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {plannerResult ? (
            <>
              <MetricCard 
                label="Feasibility Status" 
                value={plannerResult.possible ? "EXECUTE" : "ABORT"} 
                subtext={plannerResult.possible ? "TARGET REMAINS ACHIEVABLE" : "TARGET BEYOND MATHEMATICAL LIMITS"}
                color={plannerResult.possible ? "success" : "danger"}
              />
              <div className="boxy-card">
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4 border-b border-dashed pb-2">REQUIRED PERFORMANCE</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold text-gray-400 uppercase">Mean Required Mark (Future)</span>
                    <span className="text-2xl font-black">{plannerResult.requiredAvg.toFixed(2)}%</span>
                  </div>
                  <div className="h-4 bg-gray-100 border-2 border-black">
                     <div 
                       className={`h-full ${plannerResult.possible ? 'bg-green-500' : 'bg-red-500'}`} 
                       style={{ width: `${Math.min(100, plannerResult.requiredAvg)}%` }}
                     ></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="boxy-card flex flex-col items-center justify-center py-24 text-gray-300">
               <span className="font-black text-4xl mb-4 italic opacity-10 uppercase tracking-tighter">Awaiting input</span>
               <p className="text-[10px] uppercase font-bold tracking-widest">Select target parameters to initiate Solver engine.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default TargetPlannerPage;
