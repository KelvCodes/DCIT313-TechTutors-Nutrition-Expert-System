import { IoGitBranchOutline, IoFlashOutline, IoPersonOutline, IoLockClosedOutline } from 'react-icons/io5';

const messages = [
    {
        role: 'user',
        text: "I've been feeling fatigued after my morning runs. Any dietary suggestions?",
        time: '10:02 AM'
    },
    {
        role: 'ai',
        text: "Based on your activity level, try increasing complex carbs pre-run—oatmeal with blueberries is excellent. Also, add magnesium-rich foods like spinach or pumpkin seeds to your daily meals!",
        time: '10:02 AM'
    },
    {
        role: 'user',
        text: "What about post-run recovery?",
        time: '10:03 AM'
    },
    {
        role: 'ai',
        text: "Focus on a 3:1 carb-to-protein ratio. Greek yogurt with honey and granola, or a banana + whey protein smoothie will replenish glycogen and repair muscle tissue efficiently.",
        time: '10:03 AM'
    }
];

const ChatDemo = () => {
    return (
        <section id="about" className="py-16 sm:py-24 px-0 sm:px-8">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                {/* ── Left Column: About Text ── */}
                <div className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left px-4 sm:px-0">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-sea-blue/10 border border-sea-blue/20 text-sea-blue font-semibold text-sm">
                        ✨ About Nutrix-AI
                    </span>

                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                        Meet Your Personal <br />
                        <span className="bg-gradient-sea bg-clip-text text-transparent">
                            Nutrition Expert
                        </span>
                    </h2>

                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                        Nutrix-AI is a rule-based expert system that analyses your symptoms,
                        lifestyle, and goals to deliver precise, clinically-informed dietary
                        guidance — instantly and for free.
                    </p>

                    {/* Trust badges */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {[
                            { icon: <IoGitBranchOutline />, title: 'Rule-Based Logic', desc: 'Scientifically grounded inference engine' },
                            { icon: <IoFlashOutline />, title: 'Instant Advice', desc: 'No waiting — answers in seconds' },
                            { icon: <IoPersonOutline />, title: 'Personalised', desc: 'Tailored to your unique profile' },
                            { icon: <IoLockClosedOutline />, title: 'Private & Secure', desc: 'Your data stays yours' },
                        ].map(({ icon, title, desc }) => (
                            <div key={title} className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-left">
                                <span className="text-2xl sm:text-3xl mb-3 block text-sea-blue">{icon}</span>
                                <p className="font-bold text-slate-900 text-xs sm:text-sm">{title}</p>
                                <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Eye-catching CTA */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 justify-center lg:justify-start">
                        <button className="relative overflow-hidden bg-gradient-sea text-white px-7 py-3.5 sm:px-8 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-sea-blue/40 hover:-translate-y-1 transition-all group">
                            <span className="relative z-10">Try It Now — It's Free</span>
                            <span className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300 skew-x-[-20deg]" />
                        </button>
                        <button className="flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 rounded-2xl font-semibold text-sea-blue border-2 border-sea-blue/20 bg-white hover:bg-sea-blue/5 transition-all">
                            <span>Learn More</span>
                            <span className="text-lg">→</span>
                        </button>
                    </div>
                </div>

                {/* ── Right Column: Chat UI ── */}
                <div className="flex-1 w-full relative">
                    {/* Glow */}
                    <div className="absolute -inset-4 sm:-inset-6 bg-gradient-sea rounded-[40px] blur-3xl opacity-10 pointer-events-none" />

                    {/* Chat window */}
                    <div className="relative bg-white/40 backdrop-blur-2xl border-y sm:border border-white/40 rounded-none sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col">

                        {/* Header bar */}
                        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/20 bg-white/20 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-sea flex items-center justify-center text-white font-black shadow-md text-sm">N</div>
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">Nutrix Expert AI</p>
                                    <p className="text-[10px] text-sea-blue font-semibold uppercase tracking-wider">● Online</p>
                                </div>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4 sm:gap-5">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                                    style={{ animation: `fade-in-up 0.6s ease-out ${idx * 0.18}s both` }}
                                >
                                    <div className={`max-w-[88%] sm:max-w-[82%] px-4 sm:px-5 py-3 sm:py-3.5 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                        ? 'bg-sea-blue text-white rounded-tr-none'
                                        : 'bg-white/70 backdrop-blur-md border border-white text-slate-800 rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                                </div>
                            ))}

                            {/* Typing dots */}
                            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/30 backdrop-blur-sm border border-white/40 rounded-full w-fit">
                                {[0, 0.2, 0.4].map((d, i) => (
                                    <span key={i} className="w-1.5 h-1.5 bg-sea-blue rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />
                                ))}
                            </div>
                        </div>

                        {/* Input mockup */}
                        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white/10 border-t border-white/20">
                            <div className="flex items-center gap-3 bg-white/50 backdrop-blur-md border border-white rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3">
                                <span className="text-slate-400 flex-1 text-xs sm:text-sm select-none">Ask your nutrition question…</span>
                                <button className="bg-gradient-sea text-white p-2 rounded-xl cursor-not-allowed opacity-80" tabIndex={-1}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChatDemo;
