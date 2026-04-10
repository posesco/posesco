import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import en from '../locales/en.json';
import es from '../locales/es.json';

type Language = 'en' | 'es';
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => any;
}

const translations: Record<Language, Translations> = { en, es };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Detectar idioma inicial: localStorage -> navegador -> 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'en' || saved === 'es')) return saved;
    
    const browserLang = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en';
    return browserLang === 'es' ? 'es' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => setLanguageState(lang), []);

  // Función t: accede a objetos anidados usando strings tipo "nav.about"
  // Memoizamos t para que su referencia sea estable si el idioma no cambia
  const t = useCallback((path: string): any => {
    const keys = path.split('.');
    let result: any = translations[language];
    
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        return path; // Fallback a la key si no existe
      }
    }
    
    return result;
  }, [language]);

  // Memoizamos el valor del contexto para evitar re-renders innecesarios
  const value = useMemo(() => ({
    language,
    setLanguage,
    t
  }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
