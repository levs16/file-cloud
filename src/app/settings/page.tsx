"use client"

import React from 'react';
import { Settings } from 'lucide-react';
import { useTheme } from '@/providers/theme-provider';

export default function SettingsPage() {
  const { getTranslation } = useTheme();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="mb-6">
          <Settings className="h-32 w-32 text-gray-400 dark:text-gray-600 animate-pulse" strokeWidth={1} />
        </div>
        <h1 className="text-2xl font-medium text-gray-600 dark:text-gray-400">
          there is no settings :(
        </h1>
      </div>
    </div>
  );
} 