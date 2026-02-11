/**
 * Contexto de Idioma para el Módulo RAG
 * Permite cambiar entre Inglés y Español
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language, Translations } from '../utils/translations';

interface LanguageContextType {
    language: Language;
    t: Translations;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    // Iniciamos en inglés como pidió el usuario
    const [language, setLanguageState] = useState<Language>('en');

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('rag-language', lang);
    };

    useEffect(() => {
        const savedLang = localStorage.getItem('rag-language') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
            setLanguageState(savedLang);
        }
    }, []);

    const value = {
        language,
        t: translations[language],
        setLanguage
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
}
