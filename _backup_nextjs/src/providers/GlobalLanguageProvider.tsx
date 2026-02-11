/**
 * Global Language Provider - Nubeware
 * Maneja el estado multi-idioma para toda la plataforma.
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { globalTranslations, Language } from '../utils/globalTranslations';
import { translations as ragTranslations } from '../services/rag/utils/translations';

// Combinamos las traducciones para que estén disponibles globalmente
const allTranslations = {
    en: { ...globalTranslations.en, ...ragTranslations.en },
    es: { ...globalTranslations.es, ...ragTranslations.es }
};

export type Translations = typeof allTranslations.en;

interface LanguageContextType {
    language: Language;
    t: Translations;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function GlobalLanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en'); // Default English

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('nubeware-language', lang);
            } catch (e) {
                console.error('Error saving language to localStorage:', e);
            }
            document.documentElement.lang = lang;
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const savedLang = localStorage.getItem('nubeware-language') as Language;
                if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
                    setLanguageState(savedLang);
                    document.documentElement.lang = savedLang;
                } else {
                    document.documentElement.lang = 'en';
                }
            } catch (e) {
                console.error('Error reading language from localStorage:', e);
                document.documentElement.lang = 'en';
            }
        }
    }, []);

    const value = {
        language,
        t: (allTranslations[language] || allTranslations.en) as Translations,
        setLanguage
    };

    return (
        <LanguageContext.Provider value={value}>
            <div>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export function useGlobalTranslation() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useGlobalTranslation must be used within a GlobalLanguageProvider');
    }
    return context;
}
