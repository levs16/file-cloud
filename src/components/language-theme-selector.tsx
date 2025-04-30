'use client';

import { useTheme } from "@/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Laptop } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import ReactCountryFlag from "react-country-flag";
import { FC } from "react";

// Map language codes to country codes for flags
const languageToCountry: Record<string, string> = {
  en: 'US',
  ru: 'RU',
  fr: 'FR',
  de: 'DE',
  es: 'ES',
  zh: 'CN',
  ja: 'JP'
};

// Map language codes to language names
const languageNames: Record<string, string> = {
  en: 'english',
  ru: 'russian',
  fr: 'french',
  de: 'german',
  es: 'spanish',
  zh: 'chinese',
  ja: 'japanese'
};

interface LanguageThemeSelectorProps {
  variant?: 'default' | 'minimal';
}

const LanguageThemeSelector: FC<LanguageThemeSelectorProps> = ({ variant = 'default' }) => {
  const { language, theme, setLanguage, setTheme, getTranslation } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2 rounded-full px-2.5 text-apple-gray-800 dark:text-white hover:bg-apple-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 relative overflow-hidden rounded-sm">
                <ReactCountryFlag
                  countryCode={languageToCountry[language]}
                  svg
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                  title={language.toUpperCase()}
                />
              </div>
              <span className="text-sm font-medium">
                {getTranslation(languageNames[language])}
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-56 rounded-xl p-2 border border-apple-gray-200 shadow-lg bg-white/95 backdrop-blur-sm dark:bg-gray-800/95 dark:border-gray-700"
        >
          {(['en', 'ru', 'fr', 'de', 'es', 'zh', 'ja'] as const).map((lang) => (
            <DropdownMenuItem
              key={lang}
              onClick={() => setLanguage(lang)}
              className="flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer hover:bg-apple-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
            >
              <div className="w-5 h-5 relative overflow-hidden rounded-sm">
                <ReactCountryFlag
                  countryCode={languageToCountry[lang]}
                  svg
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                  title={lang.toUpperCase()}
                />
              </div>
              <span className={`${language === lang ? "font-medium" : ""} text-apple-gray-800 dark:text-white`}>
                {getTranslation(languageNames[lang])}
              </span>
              {language === lang && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-apple-blue dark:bg-blue-400" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2 rounded-full px-2.5 text-apple-gray-800 dark:text-white hover:bg-apple-gray-100 dark:hover:bg-gray-700"
          >
            {theme === 'light' ? (
              <Sun className="h-4 w-4" />
            ) : theme === 'dark' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Laptop className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-48 rounded-xl p-2 border border-apple-gray-200 shadow-lg bg-white/95 backdrop-blur-sm dark:bg-gray-800/95 dark:border-gray-700"
        >
          <DropdownMenuItem 
            onClick={() => setTheme('light')} 
            className="flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer hover:bg-apple-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
          >
            <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/30 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors">
              <Sun className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-apple-gray-800 dark:text-white">{getTranslation('light')}</span>
            {theme === 'light' && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-apple-blue dark:bg-blue-400" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme('dark')} 
            className="flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer hover:bg-apple-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
          >
            <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50 transition-colors">
              <Moon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-apple-gray-800 dark:text-white">{getTranslation('dark')}</span>
            {theme === 'dark' && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-apple-blue dark:bg-blue-400" />
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1.5 border-apple-gray-200 dark:border-gray-700" />
          <DropdownMenuItem 
            onClick={() => setTheme('system')} 
            className="flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer hover:bg-apple-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
          >
            <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
              <Laptop className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </div>
            <span className="text-apple-gray-800 dark:text-white">{getTranslation('system')}</span>
            {theme === 'system' && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-apple-blue dark:bg-blue-400" />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageThemeSelector; 