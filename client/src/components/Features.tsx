import { IoCalendarOutline, IoMedicalOutline, IoBarChartOutline, IoHeartCircleOutline, IoSyncOutline, IoListOutline } from 'react-icons/io5';

const features = [
    {
        icon: <IoListOutline />,
        title: 'Symptom-Based Analysis',
        desc: 'Describe your symptoms — fatigue, bloating, brain fog, low energy — and get targeted dietary fixes backed by clinical rules.',
        tag: 'Core AI',
    },
    {
        icon: <IoCalendarOutline />,
        title: 'Personalised Meal Plans',
        desc: 'Receive a 7-day structured meal plan tuned to your goals, dietary restrictions, and lifestyle in seconds.',
        tag: 'Planning',
    },
    {
        icon: <IoMedicalOutline />,
        title: 'Smart Supplements',
        desc: 'Get evidence-based supplement recommendations with dosages and timing, specific to your deficiencies and goals.',
        tag: 'Supplements',
    },
    {
        icon: <IoBarChartOutline />,
        title: 'Macro & Micro Tracking',
        desc: 'Understand your daily calorie, macronutrient, and micronutrient needs calculated precisely for your body metrics.',
        tag: 'Tracking',
    },
    {
        icon: <IoHeartCircleOutline />,
        title: 'Condition-Aware Guidance',
        desc: 'Whether you have diabetes, hypertension, or IBS, our system adapts all recommendations to your health conditions.',
        tag: 'Medical',
    },
    {
        icon: <IoSyncOutline />,
        title: 'Adaptive Recommendations',
        desc: 'Your plan evolves as you do. Update your progress and the AI recalibrates your entire nutrition strategy instantly.',
        tag: 'Adaptive',
    },
];

const Features = () => {
    return (
        <section id="features" className="py-16 sm:py-28 px-4 sm:px-8 bg-white relative overflow-hidden">
            {/* Subtle background blobs */}
            <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full blur-[120px] pointer-events-none"
                style={{ background: 'rgba(14,165,233,0.06)' }} />
            <div className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full blur-[120px] pointer-events-none"
                style={{ background: 'rgba(6,182,212,0.06)' }} />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-20">
                    <span className="inline-block px-5 py-2 rounded-full border text-sm font-semibold mb-6"
                        style={{ borderColor: 'rgba(14,165,233,0.35)', color: '#0ea5e9', background: 'rgba(14,165,233,0.07)' }}>
                        ⚡ Capabilities
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-4 sm:mb-6">
                        Everything You Need to{' '}
                        <span style={{ background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Thrive
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
                        Nutrix-AI packs a full suite of AI-powered nutrition tools into one clean, intuitive experience.
                    </p>
                </div>

                {/* Feature grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="group relative rounded-[28px] p-8 border transition-all duration-300 hover:-translate-y-2 cursor-default"
                            style={{
                                background: 'white',
                                borderColor: '#e2e8f0',
                                boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(14,165,233,0.4)';
                                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(14,165,233,0.12)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0';
                                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 6px rgba(0,0,0,0.04)';
                            }}>
                            {/* Top accent stripe */}
                            <div className="absolute top-0 left-8 right-8 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)' }} />

                            {/* Icon */}
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-all duration-300 group-hover:scale-110"
                                style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(6,182,212,0.08))', border: '1px solid rgba(14,165,233,0.2)' }}>
                                {f.icon}
                            </div>

                            {/* Tag pill */}
                            <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-4"
                                style={{ background: 'rgba(14,165,233,0.08)', color: '#0ea5e9' }}>
                                {f.tag}
                            </span>

                            <h3 className="text-lg font-bold text-slate-900 mb-3">{f.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>

                            {/* Subtle bottom arrow */}
                            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ color: '#0ea5e9' }}>
                                <span>Learn more</span>
                                <span>→</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats bar */}
                <div className="mt-20 rounded-[28px] p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8"
                    style={{ background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', boxShadow: '0 20px 60px rgba(14,165,233,0.35)' }}>
                    {[
                        { value: '10,000+', label: 'Nutrition Rules' },
                        { value: '50+', label: 'Conditions Covered' },
                        { value: '< 2s', label: 'Response Time' },
                        { value: '100%', label: 'Evidence-Based' },
                    ].map(stat => (
                        <div key={stat.label} className="text-center">
                            <p className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</p>
                            <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
