import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function CreatePool() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    variant: '',
    city: 'Indore', // Defaulting to your local region
    targetSize: 10,
    expectedDiscount: '',
    expiresAt: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sends the form data to your existing NestJS POST /pool endpoint
      await API.post('/pool', {
        ...formData,
        currentSize: 1, // The creator is the first buyer
      });
      alert('Pool created successfully!');
      navigate('/pools'); // Redirect back to the marketplace
    } catch (error) {
      console.error('Failed to create pool:', error);
      alert('Failed to create pool. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 relative z-10">
      <Link to="/pools" className="text-amber-500 hover:text-amber-400 text-sm font-bold tracking-wider uppercase mb-6 inline-block transition-colors">
        &larr; Back to Pools
      </Link>
      
      <div className="bg-stone-900/50 backdrop-blur-2xl border border-stone-700/50 rounded-xl p-6 shadow-lg shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-amber-500/40 bg-stone-900/50 backdrop-blur-2xl border border-stone-700/50 rounded-2xl p-8 shadow-2xl">
        <div className="mb-8 border-b border-stone-700/50 pb-6">
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-wide">Start a New Pool</h1>
          <p className="text-stone-400">Can't find the car you want? Start a new group and invite others to join.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Make (Brand)</label>
              <input required type="text" name="make" placeholder="e.g., Hyundai" value={formData.make} onChange={handleChange} className="w-full px-4 py-3 bg-stone-950/60 border border-stone-700/50 rounded text-white focus:border-amber-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Model</label>
              <input required type="text" name="model" placeholder="e.g., Creta" value={formData.model} onChange={handleChange} className="w-full px-4 py-3 bg-stone-950/60 border border-stone-700/50 rounded text-white focus:border-amber-500 focus:outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Variant / Trim</label>
              <input required type="text" name="variant" placeholder="e.g., SX(O)" value={formData.variant} onChange={handleChange} className="w-full px-4 py-3 bg-stone-950/60 border border-stone-700/50 rounded text-white focus:border-amber-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">City</label>
              <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 bg-stone-950/60 border border-stone-700/50 rounded text-white focus:border-amber-500 focus:outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Target Group Size</label>
              <input required type="number" name="targetSize" min="2" value={formData.targetSize} onChange={handleChange} className="w-full px-4 py-3 bg-stone-950/60 border border-stone-700/50 rounded text-white focus:border-amber-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Campaign End Date</label>
              <input required type="date" name="expiresAt" value={formData.expiresAt} onChange={handleChange} className="w-full px-4 py-3 bg-stone-950/60 border border-stone-700/50 rounded text-white focus:border-amber-500 focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Target Expected Discount</label>
            <input required type="text" name="expectedDiscount" placeholder="e.g., 15% Off MSRP" value={formData.expectedDiscount} onChange={handleChange} className="w-full px-4 py-3 bg-stone-950/60 border border-stone-700/50 rounded text-white focus:border-amber-500 focus:outline-none" />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full px-8 py-4 mt-4 font-bold text-black bg-amber-500 rounded hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] disabled:opacity-50 tracking-widest uppercase"
          >
            {loading ? 'Creating...' : 'Launch Pool'}
          </button>
        </form>
      </div>
    </div>
  );
}