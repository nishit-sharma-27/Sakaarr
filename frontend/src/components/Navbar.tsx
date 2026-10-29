import { Link, useNavigate } from 'react-router-dom';
import { Car } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  // Check if a token exists in local storage
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <nav className="fixed w-[calc(100%-2rem)] max-w-7xl top-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 border border-stone-700/50 rounded-2xl px-6 py-2 shadow-lg shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-amber-500/40">
      <div className="px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between h-12 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <Car className="h-6 w-6 text-amber-500" />
            <span className="text-lg font-extrabold text-stone-100 tracking-widest uppercase">
              Sakaar
            </span>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex gap-6 items-center">
            <Link to="/pools" className="text-stone-400 hover:text-amber-400 text-xs font-bold tracking-widest uppercase transition-colors">
              Pools
            </Link>
            <Link to="/dealer" className="text-stone-400 hover:text-amber-400 text-xs font-bold tracking-widest uppercase transition-colors">
              Dealers
            </Link>
            
            {/* Dynamic Auth Button */}
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="px-4 py-1.5 text-sm font-bold text-black bg-amber-500 rounded hover:bg-amber-400 transition-colors"
              >
                LOG OUT
              </button>
            ) : (
              <Link to="/auth" className="px-4 py-1.5 text-sm font-bold text-black bg-amber-500 rounded hover:bg-amber-400 transition-colors">
                SIGN IN
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}