import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  TrendingUp, 
  Target, 
  Calendar, 
  BarChart3, 
  Settings,
  LogOut 
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Sidebar = () => {
  const logout = useAuthStore(state => state.logout);

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/subjects', icon: BookOpen, label: 'Subjects' },
    { to: '/predictions', icon: TrendingUp, label: 'Predictions' },
    { to: '/target-planner', icon: Target, label: 'Target Planner' },
    { to: '/calendar', icon: Calendar, label: 'Calendar' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 h-screen border-r-2 border-black flex flex-col bg-white shrink-0 sticky top-0">
      <div className="p-6 border-b-2 border-black">
        <h1 className="text-xl font-black uppercase tracking-tighter">Academic Control</h1>
        <p className="text-[10px] font-bold text-gray-400 mt-1">V1.0.0 — SYSTEM ACTIVE</p>
      </div>

      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center gap-3 px-6 py-4 border-y border-transparent transition-all
              ${isActive 
                ? 'bg-accent text-white border-black font-bold' 
                : 'hover:bg-gray-100 text-black'}
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} strokeWidth={isActive ? 3 : 2} />
                <span className="uppercase text-sm tracking-widest">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t-2 border-black">
        <button 
          onClick={logout}
          className="boxy-button w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50"
        >
          <LogOut size={18} />
          <span className="font-bold uppercase text-xs">Shutdown System</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
