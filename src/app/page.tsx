'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/theme-provider';
import LanguageThemeSelector from '@/components/language-theme-selector';
import { ChevronRight, Cloud, Lock, Globe, Zap, Monitor, ArrowRight, Settings } from 'lucide-react';

export default function Home() {
  const { getTranslation, language, setLanguage } = useTheme();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md dark:bg-gray-900/80 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Cloud
              className="h-8 w-8 text-apple-blue mr-2"
              strokeWidth={1.5}
            />
            <h1 className="text-xl font-medium text-apple-gray-800 dark:text-white">PersonalCloud</h1>
          </div>
          <div className="flex items-center space-x-6">
            <LanguageThemeSelector />
            <Link href="/auth/signin">
              <Button variant="apple" size="sm">
                {getTranslation('signIn')}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-apple-gray-50 dark:from-gray-900 dark:to-gray-800 py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <span className="inline-block px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-apple-blue dark:text-blue-400 font-medium text-sm mb-6">
                🔒 {getTranslation('secureStorage')}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-apple-gray-800 dark:text-white leading-tight mb-6">
                {getTranslation('personalSecure')}
                <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-apple-blue to-indigo-500 dark:from-blue-400 dark:to-indigo-400">{getTranslation('cloudStorage')}</span>
              </h1>
              <p className="text-lg text-apple-gray-600 dark:text-gray-300 mb-10 max-w-lg">
                {getTranslation('heroDescription')}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/auth/signin">
                  <Button variant="apple" size="lg" className="px-8 group relative overflow-hidden">
                    <span className="relative z-10">
                      {getTranslation('accessFiles')}
                      <ArrowRight className="ml-2 h-4 w-4 inline group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-apple-blue to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="apple-outline" size="lg" className="px-8 group">
                    {getTranslation('learnMore')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg h-[420px]">
                <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-apple-blue/20 to-indigo-500/20 rounded-3xl border border-apple-blue/20 dark:border-blue-500/30 transform -rotate-2" />
                <div className="absolute -top-2 -left-2 w-full h-full bg-gradient-to-br from-apple-blue/10 to-indigo-500/10 rounded-3xl border border-apple-blue/10 dark:border-blue-500/20 transform rotate-1" />
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-apple-lg overflow-hidden w-full h-full flex items-center justify-center backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
                  <Cloud
                    className="h-32 w-32 text-apple-blue dark:text-blue-400"
                    strokeWidth={1.5}
                  />
                  <div className="absolute bottom-8 left-0 right-0 px-6">
                    <div className="p-3 bg-apple-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="h-2 bg-blue-200 dark:bg-blue-700 rounded-full w-full mb-2.5">
                        <div className="h-full bg-gradient-to-r from-apple-blue to-indigo-500 rounded-full w-[65%]"></div>
                      </div>
                      <div className="flex justify-between items-center text-xs text-apple-gray-500 dark:text-gray-400">
                        <span>32.5 GB</span>
                        <span>50 GB</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -right-12 -bottom-12 w-24 h-24 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute -left-8 -top-8 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-3xl opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-white opacity-50 dark:from-blue-900/20 dark:via-gray-900 dark:to-gray-900"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-apple-gray-800 dark:text-white mb-4">
              {getTranslation('featuresTitle')}
            </h2>
            <p className="mt-4 text-xl text-apple-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {getTranslation('featuresSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="relative group">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-apple-blue/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 transition-all group-hover:shadow-apple-md border border-gray-100 dark:border-gray-700 hover:border-apple-blue/20 dark:hover:border-blue-500/30">
                <div className="p-3 bg-apple-blue/10 dark:bg-blue-500/20 rounded-2xl inline-block mb-5 group-hover:scale-110 transition-transform">
                  <Lock className="h-6 w-6 text-apple-blue dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-apple-gray-800 dark:text-white mb-3">
                  {getTranslation('secureAccessTitle')}
                </h3>
                <p className="text-apple-gray-600 dark:text-gray-300">
                  {getTranslation('secureAccessDesc')}
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative group">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 transition-all group-hover:shadow-apple-md border border-gray-100 dark:border-gray-700 hover:border-green-500/20 dark:hover:border-green-500/30">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl inline-block mb-5 group-hover:scale-110 transition-transform">
                  <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-apple-gray-800 dark:text-white mb-3">
                  {getTranslation('multiLanguageTitle')}
                </h3>
                <p className="text-apple-gray-600 dark:text-gray-300">
                  {getTranslation('multiLanguageDesc')}
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative group">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 transition-all group-hover:shadow-apple-md border border-gray-100 dark:border-gray-700 hover:border-indigo-500/20 dark:hover:border-indigo-500/30">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl inline-block mb-5 group-hover:scale-110 transition-transform">
                  <Monitor className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-apple-gray-800 dark:text-white mb-3">
                  {getTranslation('themesTitle')}
                </h3>
                <p className="text-apple-gray-600 dark:text-gray-300">
                  {getTranslation('themesDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-apple-gray-900 text-apple-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="border-t border-apple-gray-800 pt-8 flex justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Cloud className="h-6 w-6 text-apple-blue mr-2" strokeWidth={1.5} />
              <span className="text-white font-medium">PersonalCloud</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="https://twitter.com/kanyewest" className="text-apple-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
              </Link>
              <Link href="https://www.instagram.com/kanyewest" className="text-apple-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.668-.069 4.948-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </Link>
              <Link href="https://github.com/microsoft" className="text-apple-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
              </Link>
            </div>
            <div className="ml-4">
              <p className="text-sm">© {new Date().getFullYear()} PersonalCloud. {getTranslation('allRightsReserved')}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
