import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pools from './pages/Pools';
import PoolDetail from './pages/PoolDetail';
import DealerDashboard from './pages/DealerDashboard';
import Auth from './pages/Auth';
import CreatePool from './pages/CreatePool';

export default function App() {
  return (
    <Router>
      {/* Global Background Image */}
      <div 
        className="min-h-screen text-stone-200 font-sans selection:bg-amber-900 selection:text-white relative bg-cover bg-center bg-fixed bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1920&auto=format&fit=crop")' 
        }}
      >
        {/* Global Dark Tint Overlay */}
        <div className="absolute inset-0 bg-stone-950/80 z-0 fixed pointer-events-none"></div>

        {/* All App Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Home />} />
              <Route path="/pools" element={<Pools />} />
              <Route path="/pools/:id" element={<PoolDetail />} />
              <Route path="/dealer" element={<DealerDashboard />} />
              <Route path="/create-pool" element={<CreatePool />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}