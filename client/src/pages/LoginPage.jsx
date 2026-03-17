import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="boxy-card w-full max-w-md">
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">System Login</h1>
        <p className="font-bold text-gray-400 mb-8 uppercase text-xs">Authorize to access academic control parameters</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase mb-1">Access Email</label>
            <input 
              type="email" 
              className="boxy-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@system.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase mb-1">Control Code</label>
            <input 
              type="password" 
              className="boxy-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-500 text-xs font-bold uppercase">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="boxy-button-primary w-full text-lg font-black uppercase mt-4"
          >
            {loading ? 'Authenticating...' : 'Establish Link'}
          </button>
        </form>

        <div className="mt-6 text-center">
            <p className="text-sm font-bold uppercase">New operator?</p>
            <Link to="/register" className="text-accent hover:underline font-black uppercase">Initialize Enrollment</Link>
        </div>

        <p className="mt-8 text-center text-[10px] font-bold text-gray-400 uppercase">
          Unauthorized access is strictly monitored.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
