import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { Trash2, Building2, DollarSign, Activity } from 'lucide-react';

const AgentDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/properties/my-listings`, {
          headers: { Authorization: `Bearer ${user?.token}` }
        });
        setProperties(data.data);
      } catch (error) {
        console.error("Failed to fetch listings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyProperties();
  }, [user?.token]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Move this property to trash? This action cannot be undone.")) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/properties/${id}`, {
          headers: { Authorization: `Bearer ${user?.token}` }
        });
        setProperties(properties.filter((p: any) => p.id !== id));
      } catch (error) {
        alert("Error deleting property");
      }
    }
  };

  return (
    /* Changed background to a deeper slate to match the dark navbar theme */
    <div className="min-h-screen bg-[#0f172a] p-6 md:p-12 pt-32">
      <div className="max-w-7xl mt-24 mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">Agent Dashboard</h1>
            <p className="text-slate-400 mt-1 font-medium">Manage your sanctuary listings and track performance.</p>
          </div>

        </div>

        {/* Stats Overview - Dark Themed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard icon={<Building2 className="text-blue-400" />} label="Total Listings" value={properties.length} />
          <StatCard icon={<Activity className="text-emerald-400" />} label="Active Status" value={properties.length} />
          <StatCard icon={<DollarSign className="text-purple-400" />} label="Portfolio Value" value={`$${(properties.reduce((acc: any, curr: any) => acc + curr.price, 0) / 1000000).toFixed(1)}M`} />
        </div>

        {/* Table Section - Glassmorphism style to match navbar */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-5 text-xs uppercase tracking-widest font-bold text-slate-400">Property Details</th>
                  <th className="p-5 text-xs uppercase tracking-widest font-bold text-slate-400">Price</th>
                  <th className="p-5 text-xs uppercase tracking-widest font-bold text-slate-400">Status</th>
                  <th className="p-5 text-xs uppercase tracking-widest font-bold text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan={4} className="p-16 text-center text-slate-500 font-medium">Refining your collection...</td></tr>
                ) : properties.length === 0 ? (
                  <tr><td colSpan={4} className="p-16 text-center text-slate-500 font-medium">Your portfolio is currently empty.</td></tr>
                ) : (
                  properties.map((p: any) => (
                    <tr key={p.id} className="group hover:bg-white/[0.03] transition-colors">
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-white/10 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                            <div className="w-full h-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold text-xl">
                              {p.title[0]}
                            </div>
                          </div>
                          <div>
                            <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{p.title}</p>
                            <p className="text-sm text-slate-400">{p.city || 'Luxury Location'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <p className="font-semibold text-slate-200">${p.price.toLocaleString()}</p>
                      </td>
                      <td className="p-5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-tighter">
                          Active
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleDelete(p.id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: any) => (
  /* Stat cards updated to dark mode with subtle borders */
  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-xl flex items-center gap-4">
    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
      {icon}
    </div>
    <div>
      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-black text-white">{value}</p>
    </div>
  </div>
);

export default AgentDashboard;