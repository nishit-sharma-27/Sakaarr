import { useState, useEffect } from 'react';
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
}

export default function DealerDashboard() {
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [bidAmounts, setBidAmounts] = useState<Record<string, string>>({});

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

  const handleBidSubmit = async (poolId: string) => {
    const amount = bidAmounts[poolId];
    if (!amount) return alert('Please enter a discount percentage or flat amount.');

    try {
      await API.post('/bid', { poolId, offerDetails: amount });
      alert(`Bid of "${amount}" submitted successfully! Buyers will be notified.`);
      setBidAmounts(prev => ({ ...prev, [poolId]: '' }));
    } catch (error: any) {
      console.error('Failed to submit bid:', error);
      // CHANGED: Now it will show "Access Denied: You do not have the correct permissions..." 
      // instead of the generic failure message.
      alert(error.response?.data?.message || 'Failed to submit bid. Please try again.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-5rem)] text-amber-500 font-bold tracking-widest uppercase">Loading Active Leads...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
      <div className="mb-10 border-b border-stone-700/50 pb-6">
        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-wide">Dealer Command Center</h1>
        <p className="text-stone-400">Review aggregated buyer demand and submit competitive volume bids to win the pool.</p>
      </div>

      {pools.length === 0 ? (
        <div className="bg-stone-900/50 backdrop-blur-2xl border border-stone-700/50 rounded-xl p-8 text-center shadow-lg">
          <p className="text-stone-300 font-medium">No active buyer pools at the moment.</p>
        </div>
      ) : (
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8">
          {pools.map((pool) => (
            <div 
              key={pool._id} 
              className="bg-stone-900/50 backdrop-blur-2xl border border-stone-700/50 rounded-xl p-6 shadow-lg shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-amber-500/40 bg-stone-900/50 backdrop-blur-2xl border border-stone-700/50 rounded-xl p-6 flex flex-col shadow-lg shadow-amber-500/20 transition-all duration-300 hover:shadow-amber-500/40"
            >
              <div className="flex justify-between items-start mb-6 pb-6 border-b border-stone-700/50">
                <div>
                  <h2 className="text-2xl font-bold text-white">{pool.make} {pool.model}</h2>
                  <p className="text-stone-300 mb-2">{pool.variant}</p>
                  <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded border border-amber-500/30 font-semibold uppercase tracking-wider">
                    {pool.city}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-stone-400 uppercase tracking-wider font-bold mb-1">Demand Level</p>
                  <p className="text-2xl font-bold text-white">
                    {pool.currentSize} <span className="text-sm text-stone-400 font-normal">/ {pool.targetSize} buyers</span>
                  </p>
                </div>
              </div>

              <div className="flex-grow space-y-4 mb-6">
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider font-bold mb-1">Target Expected by Buyers</p>
                  <p className="text-green-400 font-semibold text-lg">{pool.expectedDiscount}</p>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-stone-700/50 flex gap-4">
                <input
                  type="text"
                  placeholder="e.g., 15% Off MSRP + Free Insurance"
                  value={bidAmounts[pool._id] || ''}
                  onChange={(e) => setBidAmounts({ ...bidAmounts, [pool._id]: e.target.value })}
                  className="flex-grow px-4 py-3 bg-stone-950/60 border border-stone-700/50 rounded text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                />
                <button 
                  onClick={() => handleBidSubmit(pool._id)}
                  className="px-6 py-3 font-bold text-black bg-amber-500 rounded hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] transform hover:-translate-y-0.5 whitespace-nowrap"
                >
                  Submit Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}