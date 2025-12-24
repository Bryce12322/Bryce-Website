import React, { useState, useEffect, useRef } from 'react';
import { useContent, getNestedValue } from '../lib/store';
import { Upload, Loader2, X } from 'lucide-react';

interface EditableProps {
  path: string; // The specific path in the JSON (relative to lang), e.g., "hero.title"
  as?: 'input' | 'textarea' | 'img';
  className?: string;
  placeholder?: string;
  alt?: string;
  zoomable?: boolean; // Enable lightbox on click
}

export const Editable: React.FC<EditableProps> = ({ 
  path, 
  as = 'input', 
  className = '', 
  placeholder,
  alt,
  zoomable = false
}) => {
  const { content, lang, isEditing, updateContent } = useContent();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Construct full path including language
  const fullPath = `${lang}.${path}`;
  const value = getNestedValue(content, fullPath) || '';

  const [localValue, setLocalValue] = useState(value);

  // Sync local state when external content changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleBlur = () => {
    updateContent(fullPath, localValue);
  };

  // --- Image Handling ---
  if (as === 'img') {
    const handleOverlayClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
        fileInputRef.current.click();
      }
    };

    const handleImageClick = (e: React.MouseEvent) => {
      if (isEditing) return; // Editing overlay handles clicks in edit mode
      
      if (zoomable) {
        e.stopPropagation();
        setIsZoomed(true);
      }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        try {
          setIsProcessing(true);
          
          // Original quality read - No compression
          const reader = new FileReader();
          reader.onload = (event) => {
             const result = event.target?.result as string;
             // Update BOTH languages for images so they stay in sync
             updateContent(`zh.${path}`, result);
             updateContent(`en.${path}`, result);
             setIsProcessing(false);
          };
          reader.readAsDataURL(file);

        } catch (error) {
          console.error("Image processing failed", error);
          alert("Failed to process image. Please try a different file.");
          setIsProcessing(false);
        }
      }
    };

    return (
      <>
        <div 
          className={`relative inline-block group ${className} ${zoomable && !isEditing ? 'cursor-zoom-in' : ''}`}
          onClick={handleImageClick}
        >
           <img 
              src={value} 
              alt={alt || 'Editable image'} 
              className="w-full h-full object-cover rounded-[inherit]" 
           />
           
           {isEditing && (
             <>
               <div 
                 onClick={!isProcessing ? handleOverlayClick : undefined}
                 className="absolute inset-0 bg-black/40 border-2 border-dashed border-klein flex items-center justify-center cursor-pointer transition-all z-20 backdrop-blur-[1px] rounded-[inherit] opacity-0 group-hover:opacity-100"
               >
                 <div className="bg-white px-3 py-2 rounded-full shadow-lg flex items-center gap-2 transform hover:scale-105 transition-transform pointer-events-none">
                   {isProcessing ? (
                      <>
                        <Loader2 size={16} className="text-klein animate-spin" />
                        <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wide">Processing...</span>
                      </>
                   ) : (
                      <>
                        <Upload size={16} className="text-klein" />
                        <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wide">Change Photo</span>
                      </>
                   )}
                 </div>
               </div>
               <input 
                 type="file" 
                 ref={fileInputRef} 
                 onChange={handleFileChange} 
                 className="hidden" 
                 accept="image/png, image/jpeg, image/jpg, image/webp"
               />
             </>
           )}
        </div>

        {/* Zoom Lightbox */}
        {isZoomed && (
          <div 
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-200"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(false);
            }}
          >
            <div className="relative max-w-[90vw] max-h-[90vh]">
              <img 
                src={value} 
                alt={alt} 
                className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl" 
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(false);
                }}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // --- Text Handling (Read Mode) ---
  if (!isEditing) {
    if (as === 'textarea') {
      return <span className={`whitespace-pre-line ${className}`}>{value}</span>;
    }
    return <span className={className}>{value}</span>;
  }

  // --- Text Handling (Edit Mode) ---
  const commonInputClasses = `bg-blue-50/50 border border-dashed border-klein/40 focus:border-klein focus:ring-1 focus:ring-klein outline-none px-1 rounded transition-all text-gray-900 ${className}`;

  if (as === 'textarea') {
    return (
      <textarea
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        className={`${commonInputClasses} min-h-[1.5em] resize-y w-full`}
        placeholder={placeholder}
        onClick={(e) => e.stopPropagation()} 
      />
    );
  }

  return (
    <input
      type="text"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={handleBlur}
      // Adapt width to content length: ~1ch per character + padding buffer
      style={{ width: `calc(${Math.max(2, localValue.length)}ch + 2rem)` }}
      className={`${commonInputClasses} min-w-[3ch] max-w-full`}
      placeholder={placeholder}
      onClick={(e) => e.stopPropagation()}
    />
  );
};