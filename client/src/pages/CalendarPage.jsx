import React, { useEffect, useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const token = useAuthStore(state => state.token);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Fetch manual events
        const eventRes = await axios.get('/api/v1/events', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const manualEvents = eventRes.data.data.map(ev => ({
          id: ev._id,
          title: ev.title,
          start: ev.date,
          backgroundColor: ev.type === 'exam' ? '#EF4444' : ev.type === 'deadline' ? '#F59E0B' : '#3B82F6',
          borderColor: '#000000',
          textColor: '#FFFFFF',
        }));

        // Fetch subjects to extract component dates
        const semesterRes = await axios.get('/api/v1/semesters', {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        const subjectEvents = [];
        semesterRes.data.data.forEach(sem => {
            sem.subjects.forEach(sub => {
                sub.components.forEach(comp => {
                    if (comp.date) {
                        subjectEvents.push({
                            title: `[${sub.name}] ${comp.name}`,
                            start: comp.date,
                            backgroundColor: comp.isDone ? '#10B981' : '#6366F1', // Green if done, Indigo if pending
                            borderColor: '#000000',
                            textColor: '#FFFFFF'
                        });
                    }
                });
            });
        });

        setEvents([...manualEvents, ...subjectEvents]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, [token]);

  return (
    <MainLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-black uppercase tracking-tighter text-black">Academic Calendar</h2>
        <p className="font-bold text-gray-400">CHRONOLOGICAL DISCIPLINE & DEADLINES</p>
      </div>

      <div className="boxy-card p-6 bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <style>{`
          .fc .fc-button-primary {
            background-color: white !important;
            border: 2px solid black !important;
            color: black !important;
            border-radius: 0 !important;
            font-weight: 900 !important;
            text-transform: uppercase !important;
            box-shadow: 2px 2px 0px 0px rgba(0,0,0,1) !important;
            padding: 4px 12px !important;
          }
          .fc .fc-button-primary:hover {
            transform: translate(1px, 1px) !important;
            box-shadow: 1px 1px 0px 0px rgba(0,0,0,1) !important;
          }
          .fc .fc-toolbar-title {
            font-weight: 900 !important;
            text-transform: uppercase !important;
            letter-spacing: -0.05em !important;
          }
          .fc td, .fc th {
            border: 1px solid #e5e7eb !important;
          }
          .fc-theme-standard .fc-scrollgrid {
            border: 2px solid black !important;
          }
        `}</style>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
          }}
          height="auto"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-500 border-2 border-black p-4 flex items-center justify-between text-white font-black uppercase">
             <span>Critical Exams</span>
             <span className="text-xs bg-black px-2 py-1">PHASE 4</span>
          </div>
          <div className="bg-orange-500 border-2 border-black p-4 flex items-center justify-between text-white font-black uppercase">
             <span>Deadlines</span>
             <span className="text-xs bg-black px-2 py-1">PHASE 3</span>
          </div>
          <div className="bg-accent border-2 border-black p-4 flex items-center justify-between text-white font-black uppercase">
             <span>Lectures</span>
             <span className="text-xs bg-black px-2 py-1">ROUTINE</span>
          </div>
      </div>
    </MainLayout>
  );
};

export default CalendarPage;
