import React, { useState, useEffect } from 'react';
import { useContent } from './lib/store';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Portfolio } from './components/Portfolio';
import { Life } from './components/Life';
import { Footer } from './components/Footer';
import { ProjectDrawer } from './components/ProjectDrawer';
import { PenTool, Save, RotateCcw, Download } from 'lucide-react';

export default function App() {
  const { content, lang, isEditing, toggleEditing, resetContent } = useContent();
  
  // We store ID now, so the drawer can look up the "live" data from context
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Derive the selected project object from the current live content
  const selectedProjectIndex = selectedProjectId 
    ? content[lang].portfolio.items.findIndex(p => p.id === selectedProjectId)
    : -1;
  
  const selectedProject = selectedProjectIndex !== -1 
    ? content[lang].portfolio.items[selectedProjectIndex] 
    : null;

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (selectedProjectId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProjectId]);

  const handleExport = () => {
    // Convert content to JSON string
    const dataStr = JSON.stringify(content, null, 2);
    // Create the file content string
    const fileContent = `import { DataStore } from '../types';\n\nexport const DATA: DataStore = ${dataStr};\n`;
    
    // Create a Blob and trigger download
    const blob = new Blob([fileContent], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.ts';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-klein-light selection:text-white ${isEditing ? 'pb-24' : ''}`}>
      <Navbar />
      
      <main>
        <div id="hero">
          <Hero />
        </div>
        
        {/* Reordered: Portfolio is now before Work Experience */}
        <div id="portfolio" className="bg-white">
          <div className="container mx-auto px-6 py-24 md:py-32">
             <Portfolio onSelectProject={(id) => setSelectedProjectId(id)} />
          </div>
        </div>

        <div id="work" className="container mx-auto px-6 py-24 md:py-32">
          <Experience />
        </div>
        
        <div id="life" className="container mx-auto px-6 py-24 md:py-32">
          <Life />
        </div>
      </main>

      <div id="contact">
        <Footer />
      </div>

      {/* Project Slide-over Drawer */}
      <ProjectDrawer 
        project={selectedProject} 
        projectIndex={selectedProjectIndex}
        onClose={() => setSelectedProjectId(null)} 
      />

      {/* Editor Floating Action Controls */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">
        {isEditing && (
          <>
            <button 
              onClick={handleExport}
              className="w-12 h-12 bg-green-600 rounded-full text-white shadow-lg shadow-green-600/30 hover:scale-110 transition-transform flex items-center justify-center tooltip-trigger animate-in fade-in slide-in-from-bottom-4"
              title="Export data.ts"
            >
              <Download size={20} />
            </button>
            <button 
              onClick={resetContent}
              className="w-12 h-12 bg-red-500 rounded-full text-white shadow-lg shadow-red-500/30 hover:scale-110 transition-transform flex items-center justify-center tooltip-trigger animate-in fade-in slide-in-from-bottom-2"
              title="Reset to Default"
            >
              <RotateCcw size={20} />
            </button>
          </>
        )}
        
        <button 
          onClick={toggleEditing}
          className={`w-14 h-14 rounded-full text-white shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center ${
            isEditing 
              ? 'bg-klein shadow-klein/40 ring-4 ring-klein/20 rotate-0' 
              : 'bg-gray-900 rotate-0 hover:bg-black'
          }`}
          title={isEditing ? "Save & Exit" : "Edit Content"}
        >
          {isEditing ? <Save size={24} /> : <PenTool size={24} />}
        </button>
      </div>

      {/* Edit Mode Indicator Banner */}
      {isEditing && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-klein text-white px-6 py-2 rounded-full shadow-lg z-50 font-medium text-sm animate-pulse pointer-events-none">
          Editing Mode Active
        </div>
      )}
    </div>
  );
}