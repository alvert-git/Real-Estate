import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore'; // 1. Import your auth store
import Hero from '../components/Hero';
import About from '../components/About';
import PropertyList from '../components/PropertyList';
import FAQ from '../components/FAQ';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const { user } = useAuthStore(); // 2. Get the logged-in user

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        // 3. Add Authorization header so the backend knows who is liking what
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/properties`, {
          params: { page, limit: 6, search: searchTerm },
          headers: user?.token ? { Authorization: `Bearer ${user.token}` } : {}
        });

        setProperties(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotalItems(data.pagination.totalItems);
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchProperties();
    }, 300);
    return () => clearTimeout(timer);
  }, [page, searchTerm, user?.token]); // 4. Add user.token to dependencies

  return (
    <div className="relative bg-black">
      {/* ... Hero, About, and PropertyList remain the same ... */}
      <section className="relative z-0">
        <Hero onSearch={setSearchTerm} />
      </section>

      <div className="sticky top-0 z-10 h-screen overflow-hidden">
        <About />
      </div>

      <div className="relative z-20 bg-slate-400 shadow-[0_-50px_100px_rgba(0,0,0,0.4)] min-h-screen">
        <PropertyList
          properties={properties}
          loading={loading}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          totalItems={totalItems}
        />
        <FAQ />
      </div>
    </div>
  );
};

export default Home;