import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        ScrollTrigger.refresh();

        let ctx = gsap.context(() => {

            gsap.set(contentRef.current, {
                opacity: 0,
                y: 60,
                filter: "blur(10px)"
            });


            gsap.to(contentRef.current, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: sectionRef.current,

                    start: "top 80%",
                    toggleActions: "play none none none",
                    once: true,

                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen bg-[#0f172a] flex justify-center text-center px-6 overflow-hidden"
        >
            {/* Background Decorative Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            {/* REMOVED opacity-0 from class so GSAP handles the initial state */}
            <div ref={contentRef} className="relative z-10 mt-20 max-w-5xl">
                <h3 className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs mb-6">
                    Our Story
                </h3>

                <h2 className="text-5xl md:text-6xl font-bold text-white mb-10 leading-[0.9] tracking-tighter">
                    WE DON'T JUST <br />
                    FIND HOUSES, <br />
                    WE FIND SANCTUARIES.
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12">
                    <div className="hidden md:block w-px h-24 bg-gradient-to-b from-blue-600 to-transparent" />
                    <p className="text-slate-400 text-lg md:text-2xl leading-relaxed text-center md:text-left max-w-2xl font-light italic">
                        "With over a decade of experience in the luxury market, our mission is to
                        bridge the gap between <span className="text-white">architectural excellence</span> and the
                        people who appreciate it."
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;