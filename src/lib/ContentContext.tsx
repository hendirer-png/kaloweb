import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabase';

interface ContentContextType {
  content: Record<string, any>;
  loading: boolean;
  refreshContent: () => Promise<void>;
  getContent: (key: string) => any;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_content')
        .select('section_key, content');

      if (error) throw error;

      const contentMap = (data || []).reduce((acc: any, item: any) => {
        acc[item.section_key] = item.content;
        return acc;
      }, {});

      setContent(contentMap);
    } catch (err) {
      console.error('Error fetching site content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const getContent = (key: string) => {
    return content[key] || null;
  };

  return (
    <ContentContext.Provider value={{ content, loading, refreshContent: fetchContent, getContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
