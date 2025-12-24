import React from 'react';
import { ProjectData } from '../types';
import { X, ArrowRight } from 'lucide-react';
import { Editable } from './Editable';

interface ProjectDrawerProps {
  project: ProjectData | null;
  onClose: () => void;
  projectIndex: number;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({ project, onClose, projectIndex }) => {
  if (!project || projectIndex === -1) return null;

  const basePath = `portfolio.items.${projectIndex}`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Drawer Content */}
      <div className="relative w-full md:w-[85%] lg:w-[70%] max-w-5xl h-full bg-white shadow-2xl overflow-y-auto no-scrollbar animate-slide-in-right">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="fixed top-6 right-6 md:top-8 md:right-8 z-50 p-2 bg-white/80 backdrop-blur rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <X size={24} className="text-gray-600" />
        </button>

        {/* Header Section */}
        <div className="bg-slate-50 px-8 py-16 md:px-16 md:py-20 border-b border-gray-100">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            <Editable path={`${basePath}.title`} />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="border-l-2 border-klein pl-4">
              <span className="block text-gray-400 uppercase tracking-wider text-xs mb-1">Timeline</span>
              <span className="font-semibold text-gray-900">
                <Editable path={`${basePath}.detailHeader.timeline`} />
              </span>
            </div>
            <div className="border-l-2 border-klein pl-4">
              <span className="block text-gray-400 uppercase tracking-wider text-xs mb-1">Role</span>
              <span className="font-semibold text-gray-900">
                <Editable path={`${basePath}.detailHeader.role`} />
              </span>
            </div>
            <div className="border-l-2 border-klein pl-4">
              <span className="block text-gray-400 uppercase tracking-wider text-xs mb-1">Impact</span>
              <span className="font-semibold text-gray-900">
                <Editable path={`${basePath}.detailHeader.impact`} />
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="px-8 py-12 md:px-16 md:py-16 space-y-20">
          
          {/* Challenge - Image removed as requested */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gray-300"></div>
              <h3 className="font-sans font-bold text-xl uppercase tracking-widest text-gray-400">The Challenge</h3>
            </div>
            <div className="text-lg text-gray-700 leading-relaxed">
              <Editable path={`${basePath}.challenge.content`} as="textarea" />
            </div>
          </section>

          {/* Process */}
          <section>
             <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gray-300"></div>
              <h3 className="font-sans font-bold text-xl uppercase tracking-widest text-klein">The Process</h3>
            </div>
            <div className="bg-blue-50/50 rounded-2xl p-8 md:p-10 border border-blue-100">
               <div className="text-lg text-gray-800 leading-relaxed mb-8 max-w-3xl">
                  <Editable path={`${basePath}.process.content`} as="textarea" />
               </div>
               <div className="min-h-[200px]">
                 <Editable 
                    path={`${basePath}.process.image`} 
                    as="img" 
                    className="w-full rounded-lg shadow-md border border-gray-200"
                    zoomable={true}
                 />
               </div>
            </div>
          </section>

          {/* Solution */}
          <section>
             <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-gray-300"></div>
              <h3 className="font-sans font-bold text-xl uppercase tracking-widest text-gray-900">The Solution</h3>
            </div>
            
            <p className="text-2xl font-serif italic text-gray-600 mb-10 border-l-4 border-gray-200 pl-6">
              "<Editable path={`${basePath}.solution.content`} />"
            </p>

            <div className="space-y-12">
              {project.solution.features.map((feature, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1 order-2 md:order-1">
                    <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm min-h-[200px]">
                      <Editable 
                        path={`${basePath}.solution.features.${idx}.image`} 
                        as="img"
                        className="w-full h-auto"
                        zoomable={true}
                        />
                    </div>
                  </div>
                  <div className="flex-1 order-1 md:order-2 space-y-3 pt-4">
                    <h4 className="text-xl font-bold flex items-center gap-2">
                      <span className="text-klein">0{idx + 1}.</span> 
                      <Editable path={`${basePath}.solution.features.${idx}.title`} />
                    </h4>
                    <div className="text-gray-600 leading-relaxed">
                      <Editable path={`${basePath}.solution.features.${idx}.description`} as="textarea" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Footer in Drawer */}
        <div className="bg-gray-50 p-12 text-center border-t border-gray-100">
          <button onClick={onClose} className="inline-flex items-center gap-2 text-klein font-bold hover:gap-3 transition-all">
            Back to Portfolio <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};