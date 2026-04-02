import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import PropertyCard from '../components/PropertyCard';
import toast from 'react-hot-toast';
import { Search } from 'lucide-react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  const fetchFavorites = async () => {
    if (!user?.token) return;
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/favorites/my-list`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      // Added a small check to force property.isFavorite to true 
      // since everything in this list is by definition a favorite
      const enrichedData = response.data.data.map((p: any) => ({ ...p, isFavorite: true }));
      setFavorites(enrichedData);
    } catch (error: any) {
      toast.error("Could not load your collection");
    } finally {
      setLoading(false);
    }
  };

  // Combined UseEffect
  useEffect(() => {
    if (user?.token) {
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
          <div className="animate-pulse text-slate-500 font-bold text-sm uppercase tracking-[0.3em]">
            Accessing Vault
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="relative z-20 min-h-screen bg-[#0f172a] pb-20 overflow-hidden">

      {/* Signature Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/5 pb-8 gap-6">
          <div>
            <h3 className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs mb-2">
              Personal Curation
            </h3>
            <h2 className="text-5xl font-black text-white tracking-tight flex items-center gap-4">
              My Favorites
            </h2>
          </div>

          <div className="text-left md:text-right">
            <span className="text-4xl font-black text-white">
              {favorites.length}
            </span>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">
              Saved Sanctuaries
            </p>
          </div>
        </div>

        {/* Content Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {favorites.map((property: any, index: number) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
                // Ensure the card knows to refresh this list if unliked
                onAction={fetchFavorites}
              />
            ))}
          </div>
        ) : (
          /* Empty State - Luxury Glassmorphism */
          <div className="relative group p-20 rounded-[3rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 text-slate-400 group-hover:text-blue-400 transition-colors">
                <Search size={32} />
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">Your collection is empty</h2>
              <p className="text-slate-500 max-w-md mx-auto mb-10 leading-relaxed font-light">
                Discover exceptional architectural marvels and secure your favorite listings for private review.
              </p>

              <a
                href="/"
                className="group/btn relative px-10 py-4 bg-white text-[#0f172a] rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95 shadow-xl shadow-white/5"
              >
                Explore Listings
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Favorites;