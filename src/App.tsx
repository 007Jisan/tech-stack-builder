import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 1. INTERFACE
interface Tech {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  rating: number;
  difficulty: string;
  badge: string;
}

export default function App() {
  const [technologies, setTechnologies] = useState<Tech[]>([]);
  const [stack, setStack] = useState<Tech[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 2. FETCH DATA
  useEffect(() => {
    const fetchTech = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setTechnologies(data);
      } catch (error) {
        toast.error("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchTech();
  }, []);

  // 3. HANDLERS
  const handleAddToStack = (tech: Tech) => {
    if (stack.some((item) => item.id === tech.id)) {
      toast.warn(`${tech.name} is already in your stack!`);
      return;
    }
    setStack([...stack, tech]);
    toast.success(`${tech.name} added to stack!`);
  };

  const handleRemove = (id: string, name: string) => {
    setStack(stack.filter((item) => item.id !== id));
    toast.info(`Removed ${name} from stack.`);
  };

  const handleRemoveAll = () => {
    setStack([]);
    toast.error("Removed all technologies.");
  };

  // 4. RENDER UI
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <ToastContainer position="bottom-right" autoClose={2000} />

      {/* STICKY NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        {/* Desktop Navbar */}
        <div className="hidden md:flex justify-between items-center py-4 px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img src="/logo-text.png" alt="Dev Stack" className="h-8 object-contain" />
          </div>
          <div className="flex gap-8 font-medium text-slate-600 text-sm items-center">
            {/* Exactly matching the PDF image colors */}
            <a href="#" className="text-pink-600 font-bold">Home</a>
            <a href="#" className="hover:text-black transition-colors">Technologies</a>
            <a href="#" className="hover:text-black transition-colors">Projects</a>
            <a href="#" className="hover:text-black transition-colors">About</a>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-6">
            <button className="font-medium text-slate-600 hover:text-black text-sm transition-colors">Sign In</button>
            <button className="bg-pink-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-700 transition-colors">
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="flex md:hidden justify-between items-center py-3 px-4">
          <button className="p-2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <img src="/logo-text.png" alt="Dev Stack" className="h-6 object-contain" />
          <div className="flex items-center gap-4">
            <button className="font-medium text-slate-600 text-xs">Sign In</button>
            <button className="bg-pink-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-pink-700">Sign Up</button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="py-12 md:py-20 px-4 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Build Your Ideal <br />
            <span className="text-brand-gradient">Development Stack</span>
          </h1>
          <p className="text-gray-500 mb-10 text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Explore frontend, backend, database, and tooling options, 
            compare them side by side, and put together the stack that fits your next project.
          </p>
          <div className="flex justify-center lg:justify-start gap-4 items-center">
            <button className="bg-brand-gradient text-white px-8 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity shadow-md">
              Explore Technologies
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center lg:justify-end">
          <img src="/banner-stack.png" alt="Development Stack 3D" className="w-full max-w-lg object-contain drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500" />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-10">
        
        {/* LEFT COLUMN: 3-Column Technology Grid */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-1">
            Explore the <span className="text-pink-500">Technologies</span>
          </h2>
          <p className="text-gray-500 mb-8 text-sm">Pick one technology per category to build your ideal stack.</p>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <span className="loading loading-spinner loading-lg text-pink-500"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.map((tech) => {
                const isAdded = stack.some((item) => item.id === tech.id);
                
                return (
                  <div key={tech.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center p-2">
                        <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {tech.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{tech.name}</h3>
                    <p className="text-gray-500 text-xs mb-4 line-clamp-3 flex-grow leading-relaxed">
                      {tech.description}
                    </p>
                    <div className="flex justify-between items-center text-[11px] text-gray-500 font-medium mb-5">
                      <span className="bg-gray-100 px-2 py-1 rounded">{tech.category}</span>
                      <span>{tech.difficulty}</span>
                      <span className="flex items-center text-yellow-500 font-bold">⭐ {tech.rating}</span>
                    </div>
                    
                    <button 
                      onClick={() => handleAddToStack(tech)}
                      disabled={isAdded}
                      className={`w-full py-2.5 rounded-md text-sm font-semibold transition-colors mt-auto ${
                        isAdded 
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                        : "bg-black hover:bg-gray-800 text-white"
                      }`}
                    >
                      {isAdded ? "✓ Added to Stack" : "Add to Stack"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Your Stack Sidebar */}
        <div className="w-full lg:w-96 pt-8 lg:pt-0">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xl shadow-gray-200/40 sticky top-24">
            
            <h3 className="text-xl font-bold text-gray-900 mb-1">Your Stack</h3>
            
            {stack.length === 0 ? (
              /* --- EMPTY STATE --- */
              <div>
                <p className="text-gray-400 text-sm mb-6">No technologies selected yet.</p>
                <div className="border-2 border-dashed border-gray-100 rounded-xl py-10 text-center bg-gray-50/50">
                  <p className="text-gray-400 text-sm font-medium">Your stack is empty.</p>
                </div>
              </div>
            ) : (
              /* --- FILLED STATE --- */
              <div>
                <p className="text-gray-400 text-sm mb-6">{stack.length} Technology Selected</p>
                
                <div className="flex flex-col gap-3">
                  {stack.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-white shadow-sm hover:border-gray-200 transition-colors">
                      <div className="flex items-center gap-4">
                        <img src={item.icon} alt={item.name} className="w-8 h-8 object-contain bg-gray-50 p-1 rounded" />
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-gray-800 leading-tight">{item.name}</span>
                          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{item.category}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRemove(item.id, item.name)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 w-8 h-8 flex items-center justify-center rounded-full text-lg transition-colors font-light"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={handleRemoveAll}
                  className="w-full mt-6 bg-white border border-red-500 text-red-500 hover:bg-red-50 py-2.5 rounded-xl text-sm font-bold transition-colors"
                >
                  Remove All
                </button>
              </div>
            )}
            
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-100 mt-24 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          <div className="lg:col-span-2">
            <img src="/logo-text.png" alt="Dev Stack" className="h-8 mb-4 object-contain" />
            <p className="text-gray-500 text-sm mb-6 max-w-sm leading-relaxed">
              Curated tools, technologies, and resources for developers building modern software.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-black font-semibold text-sm">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-blue-500 font-semibold text-sm">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-blue-700 font-semibold text-sm">LinkedIn</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Product</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Technologies</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Projects</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">About</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2026 Dev Stack. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}