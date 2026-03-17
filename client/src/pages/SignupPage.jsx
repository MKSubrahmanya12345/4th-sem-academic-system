import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, error, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(name, email, password);
    if (success) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="boxy-card w-full max-w-md">
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">System Enrollment</h1>
        <p className="font-bold text-gray-400 mb-8 uppercase text-xs">Initialize new operator profile and credentials</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase mb-1">Full Name</label>
            <input 
              type="text" 
              className="boxy-input" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="OPERATOR NAME"
              required
            />
          </div>
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
            {loading ? 'Initializing...' : 'Join System'}
          </button>
        </form>

        <div className="mt-6 text-center">
            <p className="text-sm font-bold uppercase">Already have access?</p>
            <Link to="/login" className="text-accent hover:underline font-black uppercase">Switch to Authentication</Link>
        </div>

        <p className="mt-8 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          SYSTEM ACCESS VERSION 1.0.0
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
