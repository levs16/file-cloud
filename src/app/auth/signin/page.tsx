'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/providers/theme-provider';
import LanguageThemeSelector from '@/components/language-theme-selector';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { language, getTranslation } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(`Attempting to sign in with username: ${username}`);
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      console.log('Sign in result:', result);

      if (result?.error) {
        console.error('Authentication error:', result.error);
        toast({
          title: getTranslation('authError'),
          description: getTranslation('invalidCredentials')
        });
      } else {
        toast({
          title: getTranslation('welcome'),
          description: getTranslation('signedInSuccess')
        });
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: getTranslation('error'),
        description: getTranslation('signInError')
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4">
        <LanguageThemeSelector variant="minimal" />
      </div>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-apple-blue to-indigo-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-apple-gray-800 dark:text-white">
            {getTranslation('signInTitle')}
          </h2>
          <p className="mt-2 text-apple-gray-500 dark:text-gray-400">
            {getTranslation('signInSubtitle')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-apple-gray-700 dark:text-gray-300 mb-1">
                  {getTranslation('username')}
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-apple-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-apple-blue dark:bg-gray-700 dark:text-white"
                  placeholder={getTranslation('usernamePrompt')}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-apple-gray-700 dark:text-gray-300 mb-1">
                  {getTranslation('password')}
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-apple-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-apple-blue dark:bg-gray-700 dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="mt-8">
              <Button
                type="submit"
                variant="apple"
                className="w-full py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? getTranslation('signingIn') : getTranslation('signIn')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 