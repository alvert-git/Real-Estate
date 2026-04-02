import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, MapPin, Home, DollarSign, Ruler, Bed, Bath, X } from 'lucide-react';

/** * CRITICAL: Reusable Input Component defined OUTSIDE the main component 
 * to prevent losing focus on every keystroke.
 */
const FormInput = ({ label, icon: Icon, value, onChange, ...props }: any) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
      {label}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />}
      <input
        {...props}
        value={value}
        onChange={onChange}
        className={`w-full bg-white/5 border border-white/10 rounded-xl py-3 ${Icon ? 'pl-11' : 'px-4'
          } pr-4 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all`}
      />
    </div>
  </div>
);

const AddProperty = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    city: '',
    bedrooms: '',
    bathrooms: '',
    area_sqft: '',
    type: 'sale',
  });

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Cleanup previews to avoid memory leaks
  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (selectedFiles.length + images.length > 5) {
        return toast.error("Maximum 5 images allowed");
      }
      setImages([...images, ...selectedFiles]);
      const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviews([...previews, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    images.forEach((file) => {
      data.append('images', file);
    });

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/properties`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user?.token}`,
        },
      });
      toast.success('Property listed successfully! 🏠');
      navigate('/agent/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto relative">
        {/* Background Decorative Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mb-10 relative z-10">
          <h2 className="text-4xl font-black text-white tracking-tight">List Your Sanctuary</h2>
          <p className="text-slate-400 mt-2">Provide the details to showcase your premium property to the world.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          {/* Section 1: Basic Info */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Home className="text-blue-400" size={20} />
              <h3 className="text-lg font-bold text-white">Basic Information</h3>
            </div>

            <FormInput
              label="Property Title"
              name="title"
              placeholder="e.g. Skyline Penthouse"
              required
              value={formData.title}
              onChange={handleInputChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Price ($)"
                name="price"
                icon={DollarSign}
                type="number"
                placeholder="0.00"
                required
                value={formData.price}
                onChange={handleInputChange}
              />
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Listing Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-blue-500/50 appearance-none transition-all cursor-pointer"
                  onChange={handleInputChange}
                >
                  <option value="sale" className="bg-[#1e293b]">For Sale</option>
                  <option value="rent" className="bg-[#1e293b]">For Rent</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Location */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="text-blue-400" size={20} />
              <h3 className="text-lg font-bold text-white">Location</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="City"
                name="city"
                placeholder="New York"
                required
                value={formData.city}
                onChange={handleInputChange}
              />
              <FormInput
                label="Address"
                name="address"
                placeholder="123 Luxury Lane"
                required
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Section 3: Details */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <FormInput
                label="Bedrooms"
                name="bedrooms"
                icon={Bed}
                type="number"
                placeholder="0"
                value={formData.bedrooms}
                onChange={handleInputChange}
              />
              <FormInput
                label="Bathrooms"
                name="bathrooms"
                icon={Bath}
                type="number"
                placeholder="0"
                value={formData.bathrooms}
                onChange={handleInputChange}
              />
              <FormInput
                label="Area (sqft)"
                name="area_sqft"
                icon={Ruler}
                type="number"
                className="col-span-2 md:col-span-1"
                placeholder="0"
                value={formData.area_sqft}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                required
                value={formData.description}
                placeholder="Describe the architectural excellence..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-600 focus:border-blue-500/50 outline-none transition-all resize-none"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Section 4: Media */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Camera className="text-blue-400" size={20} />
                <h3 className="text-lg font-bold text-white">Property Gallery</h3>
              </div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-tighter">
                Max 5 Images
              </span>
            </div>

            <div className="group border-2 border-dashed border-white/10 p-10 rounded-2xl flex flex-col items-center justify-center bg-white/[0.02] hover:bg-white/[0.05] hover:border-blue-500/30 transition-all cursor-pointer relative">
              <input
                type="file"
                multiple
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <div className="p-4 bg-blue-500/10 rounded-full text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                <Camera size={32} />
              </div>
              <p className="text-white font-bold">Drop images or click to upload</p>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">JPG, PNG, WEBP</p>
            </div>

            {/* Previews Grid */}
            {previews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {previews.map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl overflow-hidden group border border-white/10"
                  >
                    <img src={url} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600"
                    >
                      <X size={14} />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-2 left-2 bg-blue-600 text-[8px] font-black uppercase tracking-tighter px-2 py-0.5 rounded shadow-lg text-white">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white py-5 rounded-2xl font-black text-xl tracking-tight transition-all active:scale-[0.98] shadow-2xl shadow-blue-500/20"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Publishing Listing...
              </span>
            ) : (
              'Publish Property'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;