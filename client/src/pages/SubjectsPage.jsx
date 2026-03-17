import React, { useEffect, useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { useSemesterStore } from '../store/semesterStore';
import { useMarksStore } from '../store/marksStore';
import { Plus, ChevronDown, ChevronUp, Trash2, X, PlusCircle, Calendar as CalendarIcon, CheckCircle2, Circle, Edit3 } from 'lucide-react';

// ??$$$ Modal for adding/editing a subject with dynamic components
const SubjectModal = ({ semesterId, subject, onClose }) => {
  const { addSubject, updateSubject } = useSemesterStore();
  const [name, setName] = useState(subject?.name || '');
  const [credits, setCredits] = useState(subject?.credits || 3);
  const [components, setComponents] = useState(subject?.components || [
    { name: 'MSE-1', maxMarks: 50, weight: 0.25, isDone: false },
    { name: 'SEE', maxMarks: 100, weight: 0.50, isDone: false }
  ]);

  const addComponent = () => {
    setComponents([...components, { name: '', maxMarks: 100, weight: 0.1, isDone: false }]);
  };

  const removeComponent = (index) => {
    setComponents(components.filter((_, i) => i !== index));
  };

  const updateComponent = (index, field, value) => {
    const updated = [...components];
    updated[index][field] = field === 'name' ? value : (field === 'isDone' ? value : (parseFloat(value) || 0));
    setComponents(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalWeight = components.reduce((acc, c) => acc + c.weight, 0);
    if (Math.abs(totalWeight - 1.0) > 0.001) {
      if (!confirm(`Total weight is ${totalWeight.toFixed(2)}, not 1.00. Proportional scaling will be applied. Proceed?`)) return;
    }
    
    if (subject) {
      updateSubject(subject._id, { name, credits, components });
    } else {
      addSubject(semesterId, { name, credits, components });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="boxy-card w-full max-w-2xl bg-white max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-4">
          <h2 className="text-2xl font-black uppercase tracking-tighter">{subject ? 'Edit Subject' : 'Initialise New Subject'}</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black uppercase mb-1 block">Subject Name</label>
              <input 
                className="boxy-input" required value={name} onChange={e => setName(e.target.value)}
                placeholder="e.g., Computer Networks"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase mb-1 block">Credits</label>
              <input 
                className="boxy-input" type="number" required value={credits} onChange={e => setCredits(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-4">
              <label className="text-xs font-black uppercase mb-1 block">Evaluation Mark Scheme</label>
              <button type="button" onClick={addComponent} className="text-accent flex items-center gap-1 text-[10px] font-black uppercase hover:underline">
                <PlusCircle size={14} /> Add Task/Component
              </button>
            </div>
            
            <div className="space-y-3">
              {components.map((comp, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input 
                    className="boxy-input flex-[2] text-sm" placeholder="Name" 
                    value={comp.name} onChange={e => updateComponent(idx, 'name', e.target.value)} required
                  />
                  <input 
                    className="boxy-input flex-1 text-sm" type="number" placeholder="Max" 
                    value={comp.maxMarks} onChange={e => updateComponent(idx, 'maxMarks', e.target.value)} required
                  />
                  <input 
                    className="boxy-input flex-1 text-sm" type="number" step="0.01" placeholder="Weight" 
                    value={comp.weight} onChange={e => updateComponent(idx, 'weight', e.target.value)} required
                  />
                  <button type="button" onClick={() => removeComponent(idx)} className="text-red-500"><Trash2 size={18} /></button>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="boxy-button-primary w-full text-lg font-black uppercase tracking-widest pt-3 pb-3">
            {subject ? 'Update Subject Matrix' : 'Deploy Subject Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

const SubjectsPage = () => {
  const { semesters, fetchSemesters, addSemester, updateSubject, deleteSubject } = useSemesterStore();
  const { marks, fetchMarks, updateMarks } = useMarksStore();
  const [openSemester, setOpenSemester] = useState(null);
  const [newSemName, setNewSemName] = useState('');
  const [modalData, setModalData] = useState(null); // { semesterId, subject }

  useEffect(() => {
    fetchSemesters();
  }, []);

  const handleToggle = (id) => {
    setOpenSemester(openSemester === id ? null : id);
    const sem = semesters.find(s => s._id === id);
    if (sem) {
      sem.subjects.forEach(sub => fetchMarks(sub._id));
    }
  };

  const handleSaveMarks = (subjectId, subjectMarks) => {
    updateMarks(subjectId, subjectMarks);
  };

  const toggleComponentDone = (subject, componentName) => {
    const updatedComponents = subject.components.map(c => 
      c.name === componentName ? { ...c, isDone: !c.isDone } : c
    );
    updateSubject(subject._id, { components: updatedComponents });
  };

  const updateComponentDate = (subject, componentName, date) => {
    const updatedComponents = subject.components.map(c => 
      c.name === componentName ? { ...c, date } : c
    );
    updateSubject(subject._id, { components: updatedComponents });
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Academic Structure</h2>
          <p className="font-bold text-gray-400 uppercase text-xs">Full CRUD Interface for Subjects & Components</p>
        </div>
        <div className="flex gap-2">
            <input 
              className="boxy-input py-1 text-sm w-48" 
              placeholder="SEMESTER NAME" 
              value={newSemName}
              onChange={(e) => setNewSemName(e.target.value)}
            />
            <button className="boxy-button-primary py-1 flex items-center gap-2" onClick={() => { if(newSemName) { addSemester(newSemName); setNewSemName(''); }}}>
              <Plus size={16} /> <span className="text-xs font-black">INITIALIZE</span>
            </button>
        </div>
      </div>

      <div className="space-y-4">
        {semesters.map(sem => (
          <div key={sem._id} className="boxy-card p-0 overflow-hidden">
            <div 
              className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer border-b-2 border-black"
              onClick={() => handleToggle(sem._id)}
            >
              <h3 className="font-black uppercase tracking-widest">{sem.name}</h3>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase">{sem.subjects?.length || 0} Subjects Active</span>
                {openSemester === sem._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>

            {openSemester === sem._id && (
              <div className="p-6 space-y-8 bg-white">
                {!sem.subjects || sem.subjects.length === 0 ? (
                  <p className="text-xs font-bold text-gray-400 text-center uppercase py-8 border-2 border-dashed border-gray-200">No subjects initialized in this sector.</p>
                ) : (
                  sem.subjects.map(sub => (
                    <div key={sub._id} className="border-2 border-black">
                      <div className="flex justify-between items-center p-3 bg-gray-100 border-b-2 border-black">
                        <div className="flex items-center gap-3">
                            <h4 className="font-black uppercase">{sub.name}</h4>
                            <span className="text-[10px] bg-black text-white px-2 py-0.5 font-bold uppercase">{sub.credits} Credits</span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setModalData({ semesterId: sem._id, subject: sub })} className="text-blue-600 hover:scale-110 transition-transform"><Edit3 size={18} /></button>
                            <button onClick={() => deleteSubject(sub._id)} className="text-red-600 hover:scale-110 transition-transform"><Trash2 size={18} /></button>
                        </div>
                      </div>
                      
                      <table className="boxy-table text-[11px] w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="w-10">STATUS</th>
                            <th>COMPONENT</th>
                            <th>MAX</th>
                            <th>WEIGHT</th>
                            <th>DATE</th>
                            <th className="w-24">OBTAINED</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sub.components?.map(comp => {
                            const currentMark = marks[sub._id]?.find(m => m.componentName === comp.name)?.obtainedMarks || 0;
                            return (
                              <tr key={comp.name} className={comp.isDone ? 'bg-green-50' : ''}>
                                <td className="text-center p-0">
                                    <button 
                                        onClick={() => toggleComponentDone(sub, comp.name)}
                                        className={`w-full h-full flex items-center justify-center py-2 ${comp.isDone ? 'text-green-600' : 'text-gray-300'}`}
                                    >
                                        {comp.isDone ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                                    </button>
                                </td>
                                <td className="font-bold uppercase">{comp.name}</td>
                                <td>{comp.maxMarks}</td>
                                <td>{(comp.weight * 100).toFixed(0)}%</td>
                                <td className="p-0 relative">
                                    <div className="flex items-center h-full">
                                        <CalendarIcon size={14} className="ml-2 text-gray-400 absolute pointer-events-none" />
                                        <input 
                                            type="date" 
                                            className="w-full h-full bg-transparent pl-8 pr-2 py-2 appearance-none focus:outline-none focus:ring-1 focus:ring-black"
                                            value={comp.date ? new Date(comp.date).toISOString().split('T')[0] : ''}
                                            onChange={(e) => updateComponentDate(sub, comp.name, e.target.value)}
                                        />
                                    </div>
                                </td>
                                <td className="p-0">
                                  <input 
                                    className="w-full h-full bg-transparent p-2 focus:bg-accent focus:text-white font-black text-center"
                                    type="number"
                                    defaultValue={currentMark}
                                    onBlur={(e) => {
                                      const newVal = parseFloat(e.target.value);
                                      if (!isNaN(newVal)) {
                                          const subjectMarks = [...(marks[sub._id] || [])];
                                          const existingIdx = subjectMarks.findIndex(m => m.componentName === comp.name);
                                          if (existingIdx > -1) subjectMarks[existingIdx].obtainedMarks = newVal;
                                          else subjectMarks.push({ componentName: comp.name, obtainedMarks: newVal });
                                          handleSaveMarks(sub._id, subjectMarks);
                                      }
                                    }}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ))
                )}
                <button 
                  onClick={() => setModalData({ semesterId: sem._id, subject: null })}
                  className="w-full border-2 border-dashed border-gray-400 py-4 text-sm font-black uppercase text-gray-400 hover:border-black hover:text-black transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={20} /> Add New Subject Profile
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {modalData && (
        <SubjectModal 
          semesterId={modalData.semesterId} 
          subject={modalData.subject}
          onClose={() => setModalData(null)} 
        />
      )}
    </MainLayout>
  );
};

export default SubjectsPage;
