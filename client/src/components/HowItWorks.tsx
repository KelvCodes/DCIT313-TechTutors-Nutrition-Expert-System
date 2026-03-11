import { IoChatbubbleEllipsesOutline, IoBulbOutline, IoDocumentTextOutline, IoTrendingUpOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const steps = [
    {
        number: '01',
        icon: <IoChatbubbleEllipsesOutline />,
        title: 'Tell Us About Yourself',
        desc: "Share your health goals, lifestyle, and any symptoms you're experiencing. No jargon — just a friendly conversation.",
    },
    {
        number: '02',
        icon: <IoBulbOutline />,
        title: 'AI Analyses Your Profile',
        desc: 'Our rule-based expert engine cross-references your inputs with thousands of clinical nutrition rules to understand your unique needs.',
    },
    {
        number: '03',
        icon: <IoDocumentTextOutline />,
        title: 'Get Your Personalised Plan',
        desc: 'Receive a structured, actionable meal plan and supplement suggestions tailored to your body — ready to use immediately.',
    },
    {
        number: '04',
        icon: <IoTrendingUpOutline />,
        title: 'Track & Refine',
        desc: 'As you progress, update your profile and the AI refines its recommendations to keep you on the optimal path to better health.',
    },
];

const HowItWorks = () => {
    const navigate = useNavigate();

    return (
        <section id="how-it-works" className="py-16 sm:py-28 px-4 sm:px-8 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0a1628 0%, #0c2a4a 50%, #0d3b6e 100%)' }}>
            {/* Large centered glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)' }} />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Section header */}
                <div className="text-center mb-12 sm:mb-20">
                    <span className="inline-block px-5 py-2 rounded-full border text-sm font-semibold mb-6"
                        style={{ borderColor: 'rgba(14,165,233,0.4)', color: '#38bdf8', background: 'rgba(14,165,233,0.08)' }}>
                        🗺️ Your Journey
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 sm:mb-6">
                        How It{' '}
                        <span style={{ background: 'linear-gradient(90deg, #38bdf8, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Works
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: '#93c5fd' }}>
                        Four simple steps from where you are today to the healthiest version of yourself.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Central vertical line */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-px top-14 bottom-14 w-[2px]"
                        style={{ background: 'linear-gradient(to bottom, rgba(14,165,233,0.6), rgba(34,211,238,0.3), rgba(14,165,233,0.6))' }} />

                    <div className="flex flex-col gap-4">
                        {steps.map((step, idx) => {
                            const isEven = idx % 2 === 0;
                            return (
                                <div key={step.number} className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-0 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                                    {/* Card — full width on mobile, half on desktop */}
                                    <div className={`w-full md:w-[calc(50%-3.5rem)] group cursor-default ${isEven ? 'md:pr-10 text-left' : 'md:pl-10 text-left md:text-right'}`}>
                                        <div className="rounded-[20px] sm:rounded-[24px] p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1"
                                            style={{
                                                background: 'rgba(14,165,233,0.06)',
                                                border: '1px solid rgba(14,165,233,0.18)',
                                                backdropFilter: 'blur(12px)',
                                            }}
                                            onMouseEnter={e => {
                                                (e.currentTarget as HTMLDivElement).style.background = 'rgba(14,165,233,0.12)';
                                                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(14,165,233,0.4)';
                                                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 40px rgba(14,165,233,0.12)';
                                            }}
                                            onMouseLeave={e => {
                                                (e.currentTarget as HTMLDivElement).style.background = 'rgba(14,165,233,0.06)';
                                                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(14,165,233,0.18)';
                                                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                                            }}>
                                            <div className={`flex items-start gap-3 sm:gap-4 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                                                {/* Icon box */}
                                                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-lg"
                                                    style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.3), rgba(6,182,212,0.2))', border: '1px solid rgba(14,165,233,0.3)' }}>
                                                    {step.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[10px] sm:text-xs font-black tracking-[0.2em] mb-1.5 uppercase" style={{ color: '#38bdf8' }}>
                                                        Step {step.number}
                                                    </p>
                                                    <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2">{step.title}</h3>
                                                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{step.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Arm connecting card to the centre dot (desktop only) */}
                                        <div className={`hidden md:block absolute top-1/2 -translate-y-px h-px w-10 ${isEven ? 'right-0' : 'left-0'}`}
                                            style={{ background: 'linear-gradient(90deg, rgba(14,165,233,0.6), rgba(14,165,233,0.1))' }} />
                                    </div>

                                    {/* Centre node — hidden on mobile, replaced by a simple line */}
                                    <div className="relative z-20 flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-black text-white text-sm shadow-xl shadow-sky-500/30"
                                        style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', border: '4px solid #0a1628' }}>
                                        {idx + 1}
                                    </div>

                                    {/* Desktop spacer */}
                                    <div className="hidden md:block md:w-[calc(50%-3.5rem)]" />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-24 text-center">
                    <p className="mb-6 text-lg" style={{ color: '#93c5fd' }}>Ready to transform your nutrition?</p>
                    <button 
                        onClick={() => navigate('/consult')}
                        className="text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all hover:-translate-y-1"
                        style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', boxShadow: '0 8px 32px rgba(14,165,233,0.4)' }}>
                        Get Started — It's Free ✨
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
