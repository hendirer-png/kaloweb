import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X } from 'lucide-react';
import { Input } from './Input';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 flex items-center gap-4">
              <Search className="text-gray-400 shrink-0" size={24} />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for projects, services, or articles..."
                className="text-input text-lg border-none bg-transparent focus:ring-0 px-0"
              />
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 min-h-[300px]">
              {query.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 px-2">Results</p>
                  <div className="text-center py-12 text-gray-400">
                    No results found for "{query}"
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 px-2">Quick Links</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {['Web Development', 'E-commerce', 'Portfolio', 'Contact Us'].map((link) => (
                      <button 
                        key={link}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-left transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <span className="font-semibold text-gray-700">{link}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
