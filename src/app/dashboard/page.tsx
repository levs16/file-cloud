"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useFileStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Settings,
  LogOut,
  Upload,
  FolderPlus,
  MoreVertical,
  Star,
  File,
  Folder,
  Download,
  Trash,
  Share,
  StarOff,
  User
} from 'lucide-react';
import { format } from 'date-fns';
import { ru, fr, de, es } from 'date-fns/locale';
import LanguageThemeSelector from '@/components/language-theme-selector';
import { useTheme } from '@/providers/theme-provider';

export default function DashboardPage() {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const router = useRouter();
  const { 
    files, 
    folders,
    toggleStarred,
    toggleShared,
    removeFile,
    removeFolder
  } = useFileStore();
  
  const { language, getTranslation } = useTheme();

  // Locales for date formatting
  const dateLocales: Record<string, any> = {
    en: undefined,
    ru: ru,
    fr: fr,
    de: de,
    es: es,
    zh: undefined, // Add Chinese locale (currently using default)
    ja: undefined  // Add Japanese locale (currently using default)
  };
  
  // Protect route - redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);
  
  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg bg-blue-200 dark:bg-blue-800 mb-4"></div>
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  // Format file size for display
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format date based on selected language
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'PP', { locale: dateLocales[language] });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 backdrop-blur-md bg-white/90 dark:bg-gray-800/90">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="h-9 w-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
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
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">PersonalCloud</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageThemeSelector />

            <Link href="/settings">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>{getTranslation('settings')}</span>
              </Button>
            </Link>

            <Link href="/api/auth/signout">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>{getTranslation('logout')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {getTranslation('myFiles')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 flex items-center">
              <User className="h-4 w-4 mr-2" />
              {session?.user?.name || 'User'}
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span>{getTranslation('uploadFile')}</span>
            </Button>
            <Button variant="apple-outline" className="flex items-center gap-2">
              <FolderPlus className="h-4 w-4" />
              <span>{getTranslation('newFolder')}</span>
            </Button>
          </div>
        </div>

        {/* Folders Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            {getTranslation('folders')}
          </h2>
          
          {folders.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {folders.map((folder) => (
                <Card key={folder.id} className="overflow-hidden hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700">
                  <CardContent className="p-0">
                    <div className="flex items-center p-4">
                      <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                        <Folder className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {folder.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {formatDate(folder.createdAt)}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => {
                              removeFolder(folder.id);
                              toast({
                                title: getTranslation('folderDeleted'),
                                description: getTranslation('folderDeletedDesc'),
                              });
                            }}
                            className="text-red-500 dark:text-red-400"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            {getTranslation('delete')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
              <Folder className="h-10 w-10 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                {getTranslation('noFolders')}
              </p>
            </div>
          )}
        </section>

        {/* Files Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            {getTranslation('files')}
          </h2>
          
          {files.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {files.map((file) => (
                <Card key={file.id} className="overflow-hidden hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700">
                  <CardContent className="p-0">
                    <div className="flex items-center p-4">
                      <div className="h-10 w-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mr-3 relative">
                        <File className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                        {file.isStarred && (
                          <div className="absolute -top-1 -right-1">
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {file.name}
                        </h3>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatFileSize(file.size)}
                          </span>
                          <span className="text-gray-300 dark:text-gray-600">•</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(file.uploadedAt)}
                          </span>
                          {file.isShared && (
                            <>
                              <span className="text-gray-300 dark:text-gray-600">•</span>
                              <span className="text-xs text-blue-500 dark:text-blue-400 flex items-center">
                                <Share className="h-3 w-3 mr-1" />
                                Shared
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            {getTranslation('download')}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              toggleStarred(file.id);
                              toast({
                                title: file.isStarred 
                                  ? getTranslation('fileUnstarred')
                                  : getTranslation('fileStarred'),
                                description: file.isStarred
                                  ? getTranslation('fileUnstarredDesc')
                                  : getTranslation('fileStarredDesc'),
                              });
                            }}
                          >
                            {file.isStarred ? (
                              <>
                                <StarOff className="h-4 w-4 mr-2" />
                                {getTranslation('unstar')}
                              </>
                            ) : (
                              <>
                                <Star className="h-4 w-4 mr-2" />
                                {getTranslation('star')}
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              toggleShared(file.id);
                              toast({
                                title: file.isShared 
                                  ? getTranslation('fileUnshared')
                                  : getTranslation('fileShared'),
                                description: file.isShared
                                  ? getTranslation('fileUnsharedDesc')
                                  : getTranslation('fileSharedDesc'),
                              });
                            }}
                          >
                            <Share className="h-4 w-4 mr-2" />
                            {getTranslation('share')}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => {
                              removeFile(file.id);
                              toast({
                                title: getTranslation('fileDeleted'),
                                description: getTranslation('fileDeletedDesc'),
                              });
                            }}
                            className="text-red-500 dark:text-red-400"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            {getTranslation('delete')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
              <File className="h-10 w-10 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                {getTranslation('noFiles')}
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
} 