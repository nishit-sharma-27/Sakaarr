import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  participants?: string[];
}

interface Bid {
  _id: string;
  dealerId: string;
  offerDetails: string;
  createdAt: string;
}

export default function PoolDetail() {
  const { id } = useParams<{ id: string }>();
  const [pool, setPool] = useState<Pool | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const poolRes = await API.get(`/pool/${id}`);
        setPool(poolRes.data);
        
        // Also fetch the bids for this pool
        const bidsRes = await API.get(`/bid/pool/${id}`);
        setBids(bidsRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleJoinPool = async () => {
    setIsJoining(true);
    try {
      await API.post(`/pool/${id}/join`);
      setPool(prev => prev ? { ...prev, currentSize: prev.currentSize + 1 } : prev);
      alert('Successfully joined the pool!');
    } catch (error: any) {
      console.error('Failed to join pool:', error);
      alert(error.response?.data?.message || 'Could not join the pool.');
    } finally {
      setIsJoining(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-5rem)] text-amber-500 font-bold tracking-widest uppercase">Loading details...</div>;
  }

  if (!pool) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-5rem)] relative z-10">
        <h2 className="text-2xl font-bold text-white mb-4">Pool not found</h2>
        <Link to="/pools" className="text-amber-500 hover:text-amber-400 font-bold uppercase tracking-widest">
          &larr; Return to Pools
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
      <Link to="/pools" className="text-amber-500 hover:text-amber-400 text-sm font-bold tracking-wider uppercase mb-6 inline-block transition-colors">
        &larr; Back to Pools
      </Link>
      
      {/* Main Glassmorphism Container */}
      <div className="bg-stone-900/50 backdrop-blur-2xl border border-stone-700/50 rounded-xl p-6 shadow-lg shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-amber-500/40 bg-stone-900/50 backdrop-blur-2xl border border-stone-700/50 rounded-2xl p-8 shadow-2xl mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-stone-700/50">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2">{pool.make} {pool.model}</h1>
            <p className="text-xl text-stone-300">{pool.variant}</p>
          </div>
          <div className="mt-4 md:mt-0 md:text-right">
            <span className="inline-block bg-amber-500/20 text-amber-400 text-sm px-3 py-1 rounded border border-amber-500/30 font-semibold mb-2 uppercase tracking-wide">
              {pool.city}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-4 border border-stone-700/50 bg-stone-950/40 p-6 rounded-xl shadow-inner">
            <h3 className="text-stone-400 text-sm font-bold uppercase tracking-wider">Target Discount</h3>
            <p className="text-3xl font-bold text-green-400">{pool.expectedDiscount}</p>
          </div>
          
          <div className="space-y-4 border border-stone-700/50 bg-stone-950/40 p-6 rounded-xl shadow-inner">
            <h3 className="text-stone-400 text-sm font-bold uppercase tracking-wider">Group Progress</h3>
            <div className="flex justify-between items-end mb-2">
              <span className="text-3xl font-bold text-white">{pool.currentSize}</span>
              <span className="text-stone-400">of {pool.targetSize} buyers</span>
            </div>
            <div className="w-full bg-stone-900 rounded-full h-2.5 border border-stone-700/50">
              <div 
                className="bg-amber-500 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min((pool.currentSize / pool.targetSize) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="text-center pt-6">
          <button 
            onClick={handleJoinPool}
            disabled={isJoining || pool.currentSize >= pool.targetSize}
            className="w-full md:w-2/3 px-8 py-4 font-bold text-black bg-amber-500 rounded-xl hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] disabled:opacity-50 text-lg tracking-wide"
          >
            {isJoining ? 'JOINING...' : pool.currentSize >= pool.targetSize ? 'POOL FULL' : 'JOIN THIS POOL'}
          </button>
        </div>
      </div>

      {/* NEW: Dealer Bids Section */}
      <div className="bg-stone-900/50 backdrop-blur-2xl border border-stone-700/50 rounded-xl p-6 shadow-lg shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-amber-500/40 bg-stone-900/50 backdrop-blur-2xl border border-stone-700/50 rounded-2xl p-8 shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-6">Dealer Offers</h3>
        
        {bids.length === 0 ? (
          <p className="text-stone-400 text-center py-6">No dealers have submitted bids for this pool yet.</p>
        ) : (
          <div className="space-y-4">
            {bids.map((bid) => (
              <div key={bid._id} className="border border-stone-700/50 bg-stone-950/60 p-6 rounded-xl flex justify-between items-center transition-all hover:border-amber-500/50 hover:bg-stone-900">
                <div>
                  <p className="text-amber-400 font-bold text-lg mb-1">{bid.offerDetails}</p>
                  <p className="text-stone-500 text-xs uppercase tracking-wider">
                    Submitted: {new Date(bid.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button className="px-4 py-2 bg-stone-800 text-stone-200 text-sm font-bold rounded border border-stone-600 hover:bg-stone-700 transition-colors">
                  Accept Offer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}