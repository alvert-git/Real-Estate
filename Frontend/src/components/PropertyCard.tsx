import { ArrowUpRight, Heart, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore'; // Ensure this path matches your Auth Provider

const PropertyCard = ({ property, index, onAction }: { property: any, index: number, onAction?: () => void }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [isFavorite, setIsFavorite] = useState(property.isFavorite || false);

  const displayIndex = (index + 1).toString().padStart(2, '0');

  const imageUrl = property.thumbnail
  ? property.thumbnail.startsWith('http') 
    ? property.thumbnail                             
    : `${import.meta.env.VITE_BACKEND_URL}${property.thumbnail}` 
  : '/property.jpg';


  useEffect(() => {
    setIsFavorite(property.isFavorite || false);
  }, [property.id, property.isFavorite]);
  // 2. Navigation logic
  const handleCardClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate("#");
    }
  };

  // 3. Favorite toggle logic
  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      navigate('/login');
      return;
    }

    try {

      setIsFavorite(!isFavorite);


      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/favorites/${property.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`
          },
          withCredentials: true
        }
      );
      if (onAction) {
        onAction();
      }
    } catch (error) {

      setIsFavorite(!isFavorite);
      console.error("Favorite toggle failed:", error);
    }
  };
  return (
    <div
      onClick={handleCardClick}
      className="group relative w-full h-[500px] overflow-hidden rounded-[2.5rem] bg-slate-200 cursor-pointer shadow-sm transition-all duration-500 hover:shadow-xl"
    >
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={property.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Top Section */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
          <MapPin size={14} className="text-white" />
          <span className="text-xs font-semibold text-white uppercase tracking-wider">
            {property.city || "Luxury District"}
          </span>
        </div>

        {/* Heart Button Container */}
        <button
          onClick={handleFavoriteToggle}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 transform active:scale-90 ${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-black hover:bg-slate-100'
            }`}
        >
          <Heart
            size={20}
            fill={isFavorite ? "currentColor" : "none"}
            className={isFavorite ? "animate-pulse" : ""}
          />
        </button>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-8 left-8 right-8 text-white">
        <span className="block text-2xl font-black mb-2 opacity-80">{displayIndex}</span>

        <h3 className="text-3xl font-bold leading-tight mb-4 group-hover:underline decoration-blue-500">
          {property.title} <br />
          <span className="text-lg font-medium opacity-90 leading-normal">
            in {property.address}
          </span>
        </h3>

        <div className="flex items-center gap-6 pt-4 border-t border-white/20">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest opacity-60">Price</span>
            <span className="text-lg font-bold">${parseFloat(property.price).toLocaleString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest opacity-60">Area</span>
            <span className="text-lg font-bold">{property.area_sqft} sqft</span>
          </div>

          {/* Decorative Arrow */}
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight size={24} className="text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;