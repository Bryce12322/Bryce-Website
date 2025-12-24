import React, { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';
import { useContent } from '../lib/store';
import { Editable } from './Editable';

export const Navbar: React.FC = () => {
  const { lang, setLang } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-end items-center gap-8">
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <button onClick={() => scrollTo('portfolio')} className="hover:text-klein transition-colors">
            <Editable path="nav.portfolio" />
          </button>
          <button onClick={() => scrollTo('work')} className="hover:text-klein transition-colors">
            <Editable path="nav.work" />
          </button>
          <button onClick={() => scrollTo('life')} className="hover:text-klein transition-colors">
            <Editable path="nav.life" />
          </button>
          <button onClick={() => scrollTo('contact')} className="hover:text-klein transition-colors">
            <Editable path="nav.contact" />
          </button>
        </div>

        <div className="h-4 w-px bg-gray-300 hidden md:block"></div>

        <button 
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          className="flex items-center gap-2 text-sm font-medium hover:text-klein transition-colors"
        >
          <Globe size={16} />
          {lang === 'zh' ? 'EN' : '中'}
        </button>
      </div>
    </nav>
  );
};