import { createContext, useContext, useState, useEffect } from 'react';
import { translations, defaultLanguage } from '../utils/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // localStorage에서 언어 설정 불러오기
    try {
      const savedLanguage = localStorage.getItem('appLanguage');
      return savedLanguage || defaultLanguage;
    } catch (error) {
      console.error('Failed to load language from localStorage:', error);
      return defaultLanguage;
    }
  });

  const [t, setT] = useState(() => translations[language] || translations[defaultLanguage]);

  // 언어 변경 시 번역 업데이트 및 localStorage에 저장
  useEffect(() => {
    try {
      localStorage.setItem('appLanguage', language);
      setT(translations[language] || translations[defaultLanguage]);
    } catch (error) {
      console.error('Failed to save language to localStorage:', error);
    }
  }, [language]);

  // HTML lang 속성 업데이트
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  // 텍스트 번역 함수 (경로 문자열 지원, 예: 'pokedex.title')
  const translate = (path, params = {}) => {
    const keys = path.split('.');
    let value = t;
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        console.warn(`Translation key not found: ${path}`);
        return path; // 키를 찾을 수 없으면 경로 반환
      }
    }
    
    // 문자열이면 {param} 형식 치환
    if (typeof value === 'string') {
      return translateText(value, params);
    }
    
    return value || path;
  };

  // 텍스트 치환 함수
  function translateText(text, params = {}) {
    if (!text) return '';
    
    let result = text;
    Object.keys(params).forEach(key => {
      const regex = new RegExp(`\\{${key}\\}`, 'g');
      result = result.replace(regex, params[key]);
    });
    
    return result;
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}