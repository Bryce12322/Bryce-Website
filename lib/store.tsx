import React, { createContext, useContext, useState, useEffect } from 'react';
import { DATA } from './data';
import { DataStore, Language } from '../types';

interface ContentContextType {
  content: DataStore;
  isEditing: boolean;
  toggleEditing: () => void;
  updateContent: (path: string, value: any) => void;
  resetContent: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  saveError: string | null;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Helper to get nested value
export const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((prev, curr) => (prev ? prev[curr] : null), obj);
};

// Helper to update nested object by string path (e.g., "zh.hero.name")
const setNestedValue = (obj: any, path: string, value: any) => {
  const newObj = JSON.parse(JSON.stringify(obj)); // Deep clone
  const keys = path.split('.');
  let current = newObj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }
  
  current[keys[keys.length - 1]] = value;
  return newObj;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage or fallback to static DATA
  const [content, setContent] = useState<DataStore>(() => {
    try {
      const saved = localStorage.getItem('bryce_portfolio_content');
      return saved ? JSON.parse(saved) : DATA;
    } catch (e) {
      console.error("Failed to load content", e);
      return DATA;
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [lang, setLang] = useState<Language>('zh');
  const [saveError, setSaveError] = useState<string | null>(null);

  // Persist to local storage whenever content changes
  useEffect(() => {
    try {
      localStorage.setItem('bryce_portfolio_content', JSON.stringify(content));
      setSaveError(null);
    } catch (e: any) {
      console.error("Storage failed", e);
      if (e.name === 'QuotaExceededError') {
        setSaveError("Storage full! Image might be too large.");
        alert("Warning: Storage full. The last change (likely a large image) could not be saved to browser storage. Please reset or use smaller images.");
      }
    }
  }, [content]);

  const updateContent = (path: string, value: any) => {
    setContent(prev => setNestedValue(prev, path, value));
  };

  const toggleEditing = () => setIsEditing(!isEditing);

  const resetContent = () => {
    if (window.confirm('Are you sure you want to reset all changes to default?')) {
      setContent(DATA);
      try {
        localStorage.removeItem('bryce_portfolio_content');
        setSaveError(null);
      } catch (e) {
        console.error("Failed to clear storage", e);
      }
    }
  };

  return (
    <ContentContext.Provider value={{ content, isEditing, toggleEditing, updateContent, resetContent, lang, setLang, saveError }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within a ContentProvider');
  return context;
};