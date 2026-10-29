import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

interface Pool {
  _id: string;
  make: string;
  model: string;
  variant: string;
  city: string;
  currentSize: number;
  targetSize: number;
  expectedDiscount: string;
  expiresAt: string;
}

export default function Pools() {
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const response = await API.get('/pool');
        setPools(response.data);
      } catch (error) {
        console.error('Failed to fetch pools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPools();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-5rem)] text-amber-500 font-bold tracking-widest uppercase">Loading pools...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
      
      {/* NEW HEADER WITH CREATE POOL BUTTON */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 border-b border-stone-700/50 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-wide">Active Car Pools</h1>
          <p className="text-stone-400">Join an existing pool to leverage collective buying power.</p>
        </div>
        
        <Link 
          to="/create-pool"
          className="px-6 py-3 font-bold text-black bg-amber-500 rounded hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] uppercase tracking-wider text-sm whitespace-nowrap"
        >
          + Start a Pool
        </Link>
      </div>
      
      {pools.length === 0 ? (
        <div className="bg-stone-900/50 backdrop-blur-2xl border border-stone-700/50 rounded-xl p-8 text-center shadow-lg">
          <p className="text-stone-300 font-medium">No active pools found. Be the first to start one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pools.map((pool) => (
            <div 
              key={pool._id} 
              className="bg-stone-900/50 backdrop-blur-2xl border border-stone-700/50 rounded-xl p-6 flex flex-col shadow-lg shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-amber-500/40"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{pool.make} {pool.model}</h2>
                  <p className="text-stone-300">{pool.variant}</p>
                </div>
                <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded border border-amber-500/30 font-semibold uppercase tracking-wider">
                  {pool.city}
                </span>
              </div>
              
              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-400">Target Discount:</span>
                  <span className="text-green-400 font-bold">{pool.expectedDiscount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-400">Buyers Joined:</span>
                  <span className="text-white font-medium">{pool.currentSize} / {pool.targetSize}</span>
                </div>
                <div className="w-full bg-stone-950/60 rounded-full h-2 border border-stone-700/50">
                  <div 
                    className="bg-amber-500 h-2 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" 
                    style={{ width: `${Math.min((pool.currentSize / pool.targetSize) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <Link 
                to={`/pools/${pool._id}`}
                className="w-full text-center py-3 bg-stone-950/60 border border-stone-700/50 hover:bg-stone-800 text-white rounded transition-colors font-semibold uppercase tracking-wider text-sm"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}