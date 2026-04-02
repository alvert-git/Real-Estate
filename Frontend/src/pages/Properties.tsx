import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import PropertyList from '../components/PropertyList';
import { Search } from 'lucide-react';

const PropertiesPage = () => {
    const [properties, setProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [displaySearch, setDisplaySearch] = useState(''); // For the input field text
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const { user } = useAuthStore();

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/properties`, {
                params: { page, limit: 9, search: searchTerm },
                headers: user?.token ? { Authorization: `Bearer ${user.token}` } : {}
            });
            setProperties(data.data);
            setTotalPages(data.pagination.totalPages);
            setTotalItems(data.pagination.totalItems);
        } catch (e) {
            console.error("Error fetching properties:", e);
        } finally {
            setLoading(false);
        }
    };

    // Fetch when page or search term changes
    useEffect(() => {
        fetchProperties();
    }, [page, searchTerm, user?.token]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchTerm(displaySearch);
        setPage(1); // Reset to first page on new search
    };

    return (
        <div className="min-h-screen bg-[#0f172a]">
            {/* Search & Header Section */}
            <div className="relative pt-32 pb-12 px-6 bg-gradient-to-b from-black/50 to-transparent">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <div>
                            <p className="text-slate-400 text-lg max-w-md">
                                Browse our curated collection of architectural masterpieces and luxury estates.
                            </p>
                        </div>

                        {/* Luxury Search Bar */}
                        <form
                            onSubmit={handleSearchSubmit}
                            className="relative w-full md:w-[400px] group"
                        >
                            <input
                                type="text"
                                value={displaySearch}
                                onChange={(e) => setDisplaySearch(e.target.value)}
                                placeholder="Search by city or title..."
                                className="w-full bg-white/5 border border-white/10 text-white rounded-full py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
                            />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full transition-colors"
                            >
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>

                    {/* Active Filter Chips (Optional) */}
                    {searchTerm && (
                        <div className="flex items-center gap-3">
                            <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Results for:</span>
                            <button
                                onClick={() => { setSearchTerm(''); setDisplaySearch(''); }}
                                className="bg-blue-600/10 border border-blue-500/20 text-blue-400 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-blue-600/20 transition-colors"
                            >
                                {searchTerm} <span>×</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Reusing your high-quality PropertyList component */}
            <div className="relative z-10">
                <PropertyList
                    properties={properties}
                    loading={loading}
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                    totalItems={totalItems}
                />
            </div>
        </div>
    );
};

// Supporting Icons for the button
const ArrowRight = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);

export default PropertiesPage;