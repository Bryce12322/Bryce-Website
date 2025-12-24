import React from 'react';
import { Editable } from './Editable';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-8">
          <Editable path="footer.message" />
        </h2>
        
        <div className="flex justify-center mb-12">
          <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow group">
            <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded-lg mb-2 relative overflow-hidden">
                <Editable 
                  path="footer.qrcode" 
                  as="img" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  zoomable={true}
                />
            </div>
            <span className="text-xs font-mono text-gray-400 block uppercase tracking-wider">WeChat</span>
          </div>
        </div>

        <div className="text-gray-400 text-sm font-medium">
          <Editable path="footer.copyright" />
        </div>
      </div>
    </footer>
  );
};