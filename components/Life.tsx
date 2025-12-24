import React, { useState } from 'react';
import { useContent } from '../lib/store';
import { Editable } from './Editable';

export const Life: React.FC = () => {
  const { content, lang } = useContent();
  const data = content[lang].life;

  const [activeItem, setActiveItem] = useState<string | null>(null);

  const rotations = ['-rotate-3', 'rotate-2', '-rotate-1'];

  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="flex flex-col items-center mb-16">
        <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Life & Interests
        </h3>
        <p className="font-display font-semibold text-klein text-sm tracking-widest uppercase">
          <Editable path="life.slogan" />
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-8 px-4">
        {data.items.map((item, index) => (
          <div 
            key={item.id}
            className={`group relative transition-all duration-500 ease-out cursor-pointer ${
              activeItem === item.id ? 'z-20 scale-110 rotate-0' : `z-10 hover:z-20 hover:scale-105 ${rotations[index % 3]}`
            }`}
            onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
          >
            {/* Polaroid Frame */}
            <div className="bg-white p-4 pb-12 shadow-xl border border-gray-100 w-64 md:w-72 transform origin-top">
              <div className="aspect-square bg-gray-100 mb-4 overflow-hidden transition-all duration-500">
                <Editable 
                    path={`life.items.${index}.image`} 
                    as="img"
                    className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h4 className="font-handwriting font-serif italic text-xl text-gray-800">
                  <Editable path={`life.items.${index}.title`} />
                </h4>
              </div>
            </div>

            {/* Description Tooltip (visible on click/active) */}
            <div 
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-gray-900 text-white p-4 rounded-lg text-sm text-center shadow-lg transition-all duration-300 pointer-events-none ${
                activeItem === item.id ? 'opacity-100 translate-y-0 z-30' : 'opacity-0 -translate-y-4'
              }`}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-900 rotate-45"></div>
              <Editable path={`life.items.${index}.description`} as="textarea" className="text-white bg-transparent border-gray-600 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};