import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { Language, translations } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "en";
    }
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  };

  const value = useMemo(
    () => ({ language, setLanguage: handleSetLanguage, t }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
