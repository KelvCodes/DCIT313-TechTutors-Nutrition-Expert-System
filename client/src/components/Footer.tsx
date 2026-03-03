const Footer = () => {
    return (
        <footer className="bg-[#1a202c] text-white px-6 sm:px-8 pt-10 sm:pt-12 pb-4 mt-auto">
            <div className="max-w-6xl mx-auto flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row flex-wrap justify-between gap-8">
                    <div className="w-full sm:max-w-[300px]">
                        <span className="text-xl font-bold text-sea-blue-light mb-3 sm:mb-4 block">Nutrix-AI</span>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Empowering your health journey with rule-based nutritional intelligence and personalized symptom support.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3 sm:mb-4 text-slate-200">Quick Links</h4>
                        <ul className="flex flex-col gap-2">
                            {['Privacy Policy', 'Terms of Service', 'Contact Support'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-sm text-slate-400 transition-colors hover:text-sea-blue-light">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-700 pt-6 text-center text-[10px] sm:text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Nutrix-AI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
