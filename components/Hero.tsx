import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Editable } from './Editable';
import { useContent } from '../lib/store';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-20">
      
      {/* Avatar Image */}
      <div className="mb-10 relative group">
        <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 scale-110"></div>
        <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
            <Editable 
                path="hero.image" 
                as="img" 
                className="w-full h-full object-cover" 
            />
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-4 max-w-2xl mx-auto z-10 w-full">
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#1A1A1A] leading-tight flex justify-center">
          <Editable path="hero.name" />
        </h1>
        <h2 className="font-display text-2xl md:text-3xl text-gray-500 font-medium flex justify-center">
          <Editable path="hero.title" />
        </h2>
        <p className="text-gray-400 font-sans tracking-widest uppercase text-sm mt-2 flex justify-center">
           <Editable path="hero.subtitle" />
        </p>
      </div>

      {/* CTA Button */}
      <div className="mt-16 animate-bounce">
        <button 
          onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-klein transition-colors group"
        >
          <span className="text-xs tracking-widest">
            <Editable path="hero.cta" />
          </span>
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm group-hover:border-klein group-hover:shadow-md transition-all">
            <ArrowDown size={16} className="group-hover:text-klein" />
          </div>
        </button>
      </div>
    </section>
  );
};