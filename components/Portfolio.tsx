import React from 'react';
import { ArrowRight, Monitor, Smartphone } from 'lucide-react';
import { useContent } from '../lib/store';
import { Editable } from './Editable';

interface PortfolioProps {
  onSelectProject: (id: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject }) => {
  const { content, lang } = useContent();
  const data = content[lang].portfolio;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-16 text-center">
        <span className="text-klein font-bold tracking-wider uppercase text-sm mb-2 block">
          <Editable path="portfolio.subtitle" />
        </span>
        <h3 className="font-serif text-3xl md:text-5xl font-bold text-gray-900">
          <Editable path="portfolio.title" />
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {data.items.map((project, index) => (
          <div 
            key={project.id}
            onClick={() => onSelectProject(project.id)}
            className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-300 ease-out"
          >
            {/* Visual Area */}
            <div className="h-64 md:h-72 bg-slate-50 relative flex items-center justify-center p-8 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-white opacity-50"></div>
               
               {/* Mockup Frame Concept */}
               <div className={`relative z-10 shadow-lg transition-transform duration-500 group-hover:scale-105 ${
                 project.type === 'mobile' 
                   ? 'w-[140px] aspect-[9/19.5] rounded-[2rem] border-4 border-gray-800 bg-gray-900' 
                   : 'w-[90%] aspect-[16/10] rounded-lg border-b-[16px] border-x-[4px] border-t-[4px] border-gray-800 bg-gray-900'
               }`}>
                 <Editable 
                    path={`portfolio.items.${index}.thumbnail`} 
                    as="img" 
                    className="w-full h-full object-cover rounded-[inherit] opacity-90"
                 />
               </div>

               {/* Icon Overlay */}
               <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-sm text-gray-400">
                 {project.type === 'mobile' ? <Smartphone size={16} /> : <Monitor size={16} />}
               </div>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8 flex flex-col flex-grow relative">
              <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-klein transition-colors">
                <Editable path={`portfolio.items.${index}.title`} />
              </h4>
              <div className="text-gray-500 text-sm leading-relaxed flex-grow mb-6">
                <Editable path={`portfolio.items.${index}.shortDescription`} as="textarea" className="line-clamp-3" />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold bg-blue-50 text-blue-600 px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-8 right-8 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-klein">
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};