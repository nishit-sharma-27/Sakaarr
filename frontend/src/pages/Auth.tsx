import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'buyer'
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password } 
        : formData;

      const response = await API.post(endpoint, payload);
      
      localStorage.setItem('token', response.data.access_token);

      if (formData.role === 'dealer' && !isLogin) {
        navigate('/dealer-dashboard');
      } else {
        navigate('/pools');
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      alert('Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-[calc(100vh-5rem)] px-4 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1920&auto=format&fit=crop")' 
        }}
      >
        <div className="absolute inset-0 bg-stone-950/75"></div>
      </div>

      {/* Glassmorphism Container with Hover Lift Effect */}
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-stone-900/50 backdrop-blur-2xl border border-stone-700/50 rounded-xl shadow-2xl shadow-amber-500/30 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-amber-500/50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">
            {isLogin ? 'Welcome Back' : 'Join Sakaar'}
          </h2>
          <p className="text-stone-300 text-sm">
            {isLogin ? 'Enter your credentials to access your account' : 'Create an account to start leveraging collective buying power'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-stone-300 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Nishit Sharma"
                  className="w-full px-4 py-3 bg-stone-950/60 border border-stone-700/50 rounded text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                  required
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-300 mb-1">Account Type</label>
                <select 
                  className="w-full px-4 py-3 bg-stone-950/60 border border-stone-700/50 rounded text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none"
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="buyer">I want to buy a car</option>
                  <option value="dealer">I am a dealer</option>
                </select>
              </div>
            </>
          )}
          
          <div>
            <label className="block text-sm font-medium text-stone-300 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-stone-950/60 border border-stone-700/50 rounded text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              required
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-stone-950/60 border border-stone-700/50 rounded text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              required
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 font-bold text-black bg-amber-500 rounded hover:bg-amber-400 transition-all mt-6 shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] transform hover:-translate-y-0.5"
          >
            {isLogin ? 'Log In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-stone-300 pt-4 border-t border-stone-700/50">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-amber-400 font-semibold hover:text-amber-300 hover:underline transition-colors"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
}