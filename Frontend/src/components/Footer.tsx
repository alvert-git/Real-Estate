

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer

      className="relative z-50 bg-slate-950 text-white pt-24 pb-12 overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      <div className="footer-content max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-black tracking-tighter mb-6">
              SANCTUARY<span className="text-blue-500">.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Redefining luxury real estate through architectural excellence and curated living experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-slate-500 mb-6">Navigation</h4>
            <ul className="space-y-4 text-slate-300">
              <li><Link to="/properties" className="hover:text-blue-500 transition-colors">Properties</Link></li>
              <li><Link to="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="hover:text-blue-500 transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-blue-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-slate-500 mb-6">Offices</h4>
            <ul className="space-y-4 text-slate-300">
              <li>Downtown Dubai, UAE</li>
              <li>Beverly Hills, CA</li>
              <li>Mayfair, London</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-slate-500 mb-6">Newsletter</h4>
            <p className="text-sm text-slate-400 mb-4">Get exclusive early access to new listings.</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
              />
              <button className="bg-white text-black font-bold py-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © 2026 Sanctuary Real Estate. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
          >
            BACK TO TOP
            <div className="p-2 border border-slate-800 rounded-full group-hover:bg-slate-800 transition-all">
              <ArrowUp size={16} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;