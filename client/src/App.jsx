import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SubjectsPage from './pages/SubjectsPage';
import PredictionsPage from './pages/PredictionsPage';
import TargetPlannerPage from './pages/TargetPlannerPage';
import CalendarPage from './pages/CalendarPage';

const PlaceholderPage = ({ title }) => (
  <div className="flex h-screen items-center justify-center font-black uppercase text-2xl">
    {title} - UNDER CONSTRUCTION
  </div>
);

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/subjects" element={<PrivateRoute><SubjectsPage /></PrivateRoute>} />
        <Route path="/predictions" element={<PrivateRoute><PredictionsPage /></PrivateRoute>} />
        <Route path="/target-planner" element={<PrivateRoute><TargetPlannerPage /></PrivateRoute>} />
        <Route path="/calendar" element={<PrivateRoute><CalendarPage /></PrivateRoute>} />
        <Route path="/analytics" element={<PrivateRoute><PlaceholderPage title="Analytics" /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><PlaceholderPage title="Settings" /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
