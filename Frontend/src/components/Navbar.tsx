import { useEffect, useRef, useState } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";

import gsap from "gsap";

import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [isScrolled, setIsScrolled] = useState(false);
  

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial Liquid Entrance

      gsap.fromTo(
        containerRef.current,

        { y: -100, opacity: 0, scale: 0.9 },

        {
          y: 0,

          opacity: 1,

          scale: 1,

          duration: 1.2,

          ease: "elastic.out(1, 0.8)",

          delay: 0.2,
        },
      );
    });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Toggle Glass Intensity

      setIsScrolled(currentScrollY > 20);

      // Hide/Show Logic

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling Down -> Hide

        gsap.to(containerRef.current, {
          y: -120,
          duration: 0.2,
          ease: "power2.in",
        });
      } else {
        // Scrolling Up -> Show

        gsap.to(containerRef.current, {
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      ctx.revert();

      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();

    navigate("/login");

    toast.success("Logged out successfully");
  };

  if(isScrolled){
    console.log("")
  }

  return (
    <header className="fixed top-0 w-full z-[100] flex justify-center p-6 pointer-events-none">
      <div ref={containerRef} className="w-full max-w-7xl pointer-events-auto">
        <nav
          className={`

            flex justify-between items-center px-8 py-3

           

          `}
        >
          {/* Logo Section */}

          <Link to="/" className="group flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-gray-200">
              Real Estate
            </span>
          </Link>

          {/* Navigation Links */}

          <div className="flex items-center gap-5">
            <Link
              to="/"
              className={`nav-link text-gray-200 ${location.pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>

            {/* Role: AGENT */}

            {user?.role === "agent" && (
              <>
                <Link
                  to="/agent/dashboard"
                  className={`nav-link text-gray-200 ${location.pathname === "/agent/dashboard" ? "active" : ""}`}
                >
                  My Listings
                </Link>

                <Link
                  to="/agent/add-property"
                  className="

    ml-2 px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-sm font-bold shadow-xl transition-all duration-300

    hover:bg-white/20 hover:border-white/40

    active:scale-95

    inline-flex items-center gap-1

  "
                >
                  <span className="text-lg">+</span>

                  <span>Add Property</span>
                </Link>
              </>
            )}

            {/* Role: USER (Buyer) */}

            {user?.role === "user" && (
              <>
                <Link
                  to="/favorites"
                  className={`nav-link text-gray-200 ${location.pathname === "/favorites" ? "active" : ""}`}
                >
                  My Favorites
                </Link>

                <Link
                  to="/properties"
                  className={`nav-link text-gray-200 ${location.pathname === "/properties" ? "active" : ""}`}
                >
                  Properties
                </Link>
              </>
            )}

            {/* Divider */}

            <div className="mx-4 w-[1px] h-6 bg-slate-300/50" />

            {/* Auth Section */}

            {user ? (
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2.5 rounded-full shadow-lg">
                {/* User Info Section - Note text-white/80 instead of Slate */}

                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[10px] uppercase tracking-widest text-white/80 font-bold leading-none">
                    Logged in as
                  </span>

                  <span className="text-sm font-bold text-white">
                    {user.name}
                  </span>
                </div>

                {/* Separator Line */}

                <div className="hidden md:block w-px h-6 bg-white/20" />

                {/* Logout Button - Removed hover:bg-red-50 */}

                <button
                  onClick={handleLogout}
                  className="p-2 text-white/70 hover:text-red-400 rounded-full transition-colors active:scale-95"
                  title="Logout"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>

                    <polyline points="16 17 21 12 16 7"></polyline>

                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-5 py-2 text-sm font-bold text-gray-200 hover:scale-102 transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-6 py-2 relative overflow-hidden rounded-full text-sm font-bold text-white transition-all

             bg-white/10 backdrop-blur-md border border-white/20

             hover:bg-white/20 hover:border-white/40 hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      <style>{`

        .nav-link {

          @apply px-4 py-2 rounded-full text-sm font-bold text-slate-500 transition-all duration-300 hover:text-slate-900 hover:bg-white/50;

        }

        .nav-link.active {

          @apply text-blue-600 bg-white shadow-sm;

        }

      `}</style>
    </header>
  );
};

export default Navbar;
