// // export default function Home() {
// //   return (
// //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center flex flex-col items-center">
      
// //       {/* Muted aesthetic badge */}
// //       <div className="inline-block px-4 py-1.5 rounded-full border border-stone-800 bg-stone-900/50 text-stone-400 text-xs font-semibold tracking-widest uppercase mb-8">
// //         Redefining Auto Purchasing in India
// //       </div>

// //       <h1 className="text-5xl md:text-7xl font-extrabold text-stone-100 mb-6 tracking-tighter">
// //         Drive your dream, <br className="hidden md:block" />
// //         {/* Gradient text for the aesthetic pop */}
// //         <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">
// //           together.
// //         </span>
// //       </h1>
      
// //       <p className="text-lg md:text-xl text-stone-400 mb-12 max-w-2xl mx-auto leading-relaxed">
// //         Join local buying pools to unlock massive dealer discounts. Stop negotiating alone and start leveraging collective bargaining power.
// //       </p>
      
// //       <div className="flex flex-col sm:flex-row justify-center gap-5 w-full sm:w-auto">
// //         <button className="bg-amber-600 text-stone-950 px-8 py-4 rounded-sm text-sm font-bold tracking-widest uppercase hover:bg-amber-500 shadow-[0_0_20px_rgba(217,119,6,0.2)] transition-all">
// //           Find a Car Pool
// //         </button>
// //         <button className="bg-stone-900 text-stone-300 px-8 py-4 rounded-sm text-sm font-bold tracking-widest uppercase border border-stone-700 hover:border-stone-500 hover:bg-stone-800 transition-all">
// //           How it Works
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }


// import { useNavigate } from 'react-router-dom';

// export default function Home() {
//   const navigate = useNavigate();

//   const scrollToHowItWorks = () => {
//     document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div className="relative z-10">
//       {/* --- YOUR EXISTING HERO SECTION GOES HERE --- */}
//       <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center text-center px-4">
//         {/* ... (Your existing Redefining Auto header, title, and paragraph) ... */}
        
//         <div className="flex flex-col w-full max-w-md gap-4 mt-8">
//           <button 
//             onClick={() => navigate('/pools')}
//             className="w-full px-8 py-4 font-bold text-black bg-amber-500 rounded-lg hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] uppercase tracking-widest"
//           >
//             Find a Car Pool
//           </button>
//           <button 
//             onClick={scrollToHowItWorks}
//             className="w-full px-8 py-4 font-bold text-stone-300 bg-transparent border border-stone-600 rounded-lg hover:bg-stone-800 hover:text-white transition-all uppercase tracking-widest"
//           >
//             How it Works
//           </button>
//         </div>
//       </div>

//       {/* --- NEW: HOW IT WORKS SECTION --- */}
//       <div id="how-it-works" className="max-w-6xl mx-auto px-4 py-24">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Leverage the power of the crowd.</h2>
//           <p className="text-stone-400 text-lg">Stop negotiating alone. Let dealerships fight for your group's business.</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Step 1 */}
//           <div className="bg-stone-900/50 backdrop-blur-xl border border-stone-700/50 rounded-2xl p-8 text-center shadow-lg">
//             <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
//               <span className="text-2xl font-bold text-amber-500">1</span>
//             </div>
//             <h3 className="text-xl font-bold text-white mb-3">Join a Pool</h3>
//             <p className="text-stone-400">Find the exact make, model, and variant you want to buy. Join local buyers in your city to build volume demand.</p>
//           </div>

//           {/* Step 2 */}
//           <div className="bg-stone-900/50 backdrop-blur-xl border border-stone-700/50 rounded-2xl p-8 text-center shadow-lg">
//             <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
//               <span className="text-2xl font-bold text-amber-500">2</span>
//             </div>
//             <h3 className="text-xl font-bold text-white mb-3">Dealers Compete</h3>
//             <p className="text-stone-400">Verified dealerships review your group's aggregate demand and submit volume discount bids to win the pool.</p>
//           </div>

//           {/* Step 3 */}
//           <div className="bg-stone-900/50 backdrop-blur-xl border border-stone-700/50 rounded-2xl p-8 text-center shadow-lg">
//             <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
//               <span className="text-2xl font-bold text-amber-500">3</span>
//             </div>
//             <h3 className="text-xl font-bold text-white mb-3">Accept & Save</h3>
//             <p className="text-stone-400">Review the offers transparently. Lock in the highest discount, complete the purchase at the dealership, and drive away.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative z-10">
      {/* --- YOUR EXACT ORIGINAL HERO SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center flex flex-col items-center">
        
        {/* Muted aesthetic badge */}
        <div className="inline-block px-4 py-1.5 rounded-full border border-stone-800 bg-stone-900/50 text-stone-400 text-xs font-semibold tracking-widest uppercase mb-8">
          Redefining Auto Purchasing in India
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-stone-100 mb-6 tracking-tighter">
          Drive your dream, <br className="hidden md:block" />
          {/* Gradient text for the aesthetic pop */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">
            together.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-stone-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join local buying pools to unlock massive dealer discounts. Stop negotiating alone and start leveraging collective bargaining power.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-5 w-full sm:w-auto">
          <button 
            onClick={() => navigate('/pools')}
            className="bg-amber-600 text-stone-950 px-8 py-4 rounded-sm text-sm font-bold tracking-widest uppercase hover:bg-amber-500 shadow-[0_0_20px_rgba(217,119,6,0.2)] transition-all"
          >
            Find a Car Pool
          </button>
          <button 
            onClick={scrollToHowItWorks}
            className="bg-stone-900 text-stone-300 px-8 py-4 rounded-sm text-sm font-bold tracking-widest uppercase border border-stone-700 hover:border-stone-500 hover:bg-stone-800 transition-all"
          >
            How it Works
          </button>
        </div>
      </div>

      {/* --- THE NEW HOW IT WORKS SECTION --- */}
      <div id="how-it-works" className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Leverage the power of the crowd.</h2>
          <p className="text-stone-400 text-lg">Stop negotiating alone. Let dealerships fight for your group's business.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-stone-900/50 backdrop-blur-2xl border border-stone-700/50 rounded-xl p-6 shadow-lg shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-amber-500/40 bg-stone-900/50 backdrop-blur-xl border border-stone-700/50 rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
              <span className="text-2xl font-bold text-amber-500">1</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Join a Pool</h3>
            <p className="text-stone-400">Find the exact make, model, and variant you want to buy. Join local buyers in your city to build volume demand.</p>
          </div>

          {/* Step 2 */}
          <div className="bg-stone-900/50 backdrop-blur-2xl border border-stone-700/50 rounded-xl p-6 shadow-lg shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-amber-500/40 bg-stone-900/50 backdrop-blur-xl border border-stone-700/50 rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
              <span className="text-2xl font-bold text-amber-500">2</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Dealers Compete</h3>
            <p className="text-stone-400">Verified dealerships review your group's aggregate demand and submit volume discount bids to win the pool.</p>
          </div>

          {/* Step 3 */}
          <div className="bg-stone-900/50 backdrop-blur-2xl border border-stone-700/50 rounded-xl p-6 shadow-lg shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-amber-500/40 bg-stone-900/50 backdrop-blur-xl border border-stone-700/50 rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
              <span className="text-2xl font-bold text-amber-500">3</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Accept & Save</h3>
            <p className="text-stone-400">Review the offers transparently. Lock in the highest discount, complete the purchase at the dealership, and drive away.</p>
          </div>
        </div>
      </div>
    </div>
  );
}