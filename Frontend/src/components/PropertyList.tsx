import { useLayoutEffect, useRef } from "react";
import PropertyCard from "./PropertyCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PropertyList = ({ properties, loading, page, totalPages, setPage, totalItems }: any) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (loading || properties.length === 0) return;

    const ctx = gsap.context(() => {
      // Animating the GRID itself
      gsap.fromTo(gridRef.current!,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Staggered cards
      gsap.fromTo(gridRef.current!.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }, gridRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [loading, properties]);

  if (loading)
    return (
      /* Loading state updated to Dark Luxury */
      <div className="h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
          <div className="animate-pulse text-slate-500 font-bold text-sm uppercase tracking-[0.3em]">
            Curating Collection
          </div>
        </div>
      </div>
    );

  return (
    /* Background changed to Deep Navy */
    <main className="relative z-20 min-h-screen bg-[#0f172a] pb-20 overflow-hidden">

      {/* Subtle Background Glow to separate sections */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="flex justify-between items-end mb-16 border-b border-white/5 pb-8">
          <div>
            <h3 className="text-blue-500 font-bold uppercase tracking-[0.2em] text-xs mb-2">
              Available Sanctuaries
            </h3>
            <h2 className="text-5xl font-black text-white tracking-tight">
              Featured Listings
            </h2>
          </div>

          <div className="text-right">
            <span className="text-4xl font-black text-white">
              {totalItems}
            </span>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">
              Refined Results
            </p>
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {properties.map((p: any, index: number) => (
            <PropertyCard key={p.id} property={p} index={index} />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-6 relative z-20">
            <button
              disabled={page === 1}
              onClick={() => {
                setPage(page - 1);
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }); // specific scroll if desired
              }}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white font-bold tracking-widest text-sm hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              PREVIOUS
            </button>
            <span className="text-slate-400 font-bold text-sm">
              PAGE {page} OF {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => {
                setPage(page + 1);
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-blue-600 border border-blue-500 rounded-full text-white font-bold tracking-widest text-sm hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/20"
            >
              NEXT
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default PropertyList;