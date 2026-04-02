import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroProps {
    onSearch: (term: string) => void;
}

const Hero = ({ onSearch }: HeroProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const textContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (textContentRef.current) {
                gsap.fromTo(textContentRef.current.children,
                    { y: 80, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        stagger: 0.15,
                        ease: "power4.out",
                        delay: 0.4,
                    }
                );
            }

            gsap.to(".scroll-line", {
                scaleY: 1.5,
                opacity: 0.2,
                repeat: -1,
                duration: 1.5,
                ease: "sine.inOut",
                yoyo: true
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-slate-900">
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-[0.7]"
            >
                <source src="/hero-video.mp4" type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

            {/* Main Content Container */}
            <div
                ref={textContentRef}
                className="relative z-20 text-center px-6 max-w-5xl w-full flex flex-col items-center"
            >
                <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
                    YOUR NEW CHAPTER <br />
                </h1>

                <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-medium">
                    Premium properties for those who demand excellence.
                    Discover the art of luxury living.
                </p>

                {/* Liquid Glass Search Bar */}
                <div className="max-w-3xl w-full bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-full flex shadow-2xl mb-12">
                    <input
                        type="text"
                        placeholder="Search by city or property name..."
                        className="flex-grow bg-transparent p-4 pl-8 text-white placeholder:text-gray-300 outline-none"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                    <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/40">
                        Search
                    </button>
                </div>


                <button
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                    className="bg-white text-black font-black px-10 py-4 rounded-full text-lg uppercase tracking-wider cursor-pointer"
                >
                    Get Started
                </button>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                <div className="scroll-line w-[2px] h-16 bg-gradient-to-b from-white to-transparent opacity-50" />
            </div>
        </section>
    );
};

export default Hero;