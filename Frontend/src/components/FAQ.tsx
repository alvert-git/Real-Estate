import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react'; // Optional: for consistent iconography

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: "What makes Sanctuary different from other luxury agencies?",
    answer: "At Sanctuary, we don't just sell properties; we curate lifestyles. We have exclusive access to off-market listings, provide unparalleled personalized service, and have a deep understanding of architectural history and interior design."
  },
  {
    question: "How do I schedule a private viewing?",
    answer: "You can schedule a private viewing by contacting one of our dedicated agents directly through their profile pages, or by reaching out to our concierge service via email. We arrange viewings around your schedule."
  },
  {
    question: "What areas do you currently serve?",
    answer: "Our primary areas of operation include Downtown Dubai, Beverly Hills, and Mayfair, London. However, our global network allows us to source exceptional properties in almost any high-end market worldwide."
  },
  {
    question: "Do you handle property management for international buyers?",
    answer: "Yes, we offer comprehensive, white-glove property management services specifically tailored for international buyers. From staffing to seasonal maintenance, your sanctuary is perfectly maintained."
  },
  {
    question: "Can I list my property exclusively with Sanctuary?",
    answer: "Absolutely. We specialize in exclusive listings. Your property is marketed using the highest quality cinematic video, immersive 3D tours, and targeted outreach to our private network."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      if (listRef.current) {
        gsap.fromTo(listRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    /* Changed background to deep navy with section shadow */
    <div ref={sectionRef} className="min-h-screen bg-[#0f172a] pt-32 pb-24 px-6 relative overflow-hidden">

      {/* Decorative Glows */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div ref={headerRef} className="text-center mb-20">
          <h3 className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs mb-4">
            Concierge FAQ
          </h3>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            FREQUENTLY ASKED
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-light">
            Everything you need to know about navigating the luxury real estate market with Sanctuary.
          </p>
        </div>

        <div ref={listRef} className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                /* Liquid Glass effect for the accordion items */
                className={`
                  border transition-all duration-500 rounded-2xl overflow-hidden
                  ${isOpen
                    ? 'bg-white/10 border-white/20 shadow-2xl shadow-blue-900/20'
                    : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/[0.07]'}
                `}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left px-8 py-7 flex justify-between items-center focus:outline-none group"
                >
                  <span className={`
                    font-bold text-lg md:text-xl transition-all duration-300
                    ${isOpen ? 'text-white translate-x-1' : 'text-slate-300 group-hover:text-white'}
                  `}>
                    {faq.question}
                  </span>
                  <div className={`
                    flex-shrink-0 ml-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                    ${isOpen ? 'bg-blue-600 rotate-180 shadow-lg shadow-blue-500/40' : 'bg-white/5'}
                  `}>
                    <ChevronDown size={20} className={isOpen ? 'text-white' : 'text-slate-500'} />
                  </div>
                </button>

                <div
                  className={`
                    px-8 transition-all duration-500 ease-in-out
                    ${isOpen ? 'max-h-[400px] pb-8 opacity-100' : 'max-h-0 opacity-0'}
                  `}
                >
                  <div className="pt-2 border-t border-white/10 mt-2">
                    <p className="text-slate-400 text-lg leading-relaxed pt-6 font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;