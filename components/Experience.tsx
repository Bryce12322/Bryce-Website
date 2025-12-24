import React from 'react';
import { useContent } from '../lib/store';
import { Editable } from './Editable';

export const Experience: React.FC = () => {
  const { content, lang } = useContent();
  const data = content[lang].experience;

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="font-serif text-3xl md:text-4xl font-bold mb-16 text-center">
        <Editable path="experience.title" />
      </h3>

      <div className="relative border-l border-gray-200 ml-4 md:ml-6 space-y-16">
        {data.items.map((item, index) => (
          <div key={index} className="relative pl-8 md:pl-12 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] top-2 w-[11px] h-[11px] bg-white border-2 border-gray-300 rounded-full group-hover:border-klein group-hover:scale-125 transition-all duration-300"></div>

            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
              <h4 className="text-xl font-bold text-gray-900 group-hover:text-klein transition-colors w-full md:w-auto">
                <Editable path={`experience.items.${index}.company`} />
              </h4>
              <span className="text-sm font-medium text-gray-400 font-mono mt-1 md:mt-0">
                <Editable path={`experience.items.${index}.period`} />
              </span>
            </div>
            
            <p className="text-lg font-medium text-gray-700 mb-3">
                <Editable path={`experience.items.${index}.role`} />
            </p>
            
            <div className="text-gray-500 leading-relaxed text-sm md:text-base">
              <Editable path={`experience.items.${index}.description`} as="textarea" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};