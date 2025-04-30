import { FolderType, useFileStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  Home,
  Star,
  Share2,
  Clock,
  Trash2,
  Settings,
  Cloud,
  Folder,
  HardDrive,
  ChevronRight,
  ChevronDown,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { formatBytes } from '@/lib/utils';
import { signOut } from 'next-auth/react';

interface SidebarProps {
  view: 'all' | 'starred' | 'shared';
  setView: (view: 'all' | 'starred' | 'shared') => void;
  totalStorage: number;
  usedStorage: number;
  userName: string;
}

export const Sidebar = ({
  view,
  setView,
  totalStorage,
  usedStorage,
  userName,
}: SidebarProps) => {
  const { folders, currentPath, setCurrentPath } = useFileStore();
  const [showFolders, setShowFolders] = useState(true);

  // Filter root-level folders
  const rootFolders = folders.filter((folder) => folder.path === '/');

  // Calculate storage usage
  const storagePercentage = (usedStorage / totalStorage) * 100;
  const usedStorageStr = formatBytes(usedStorage);
  const totalStorageStr = formatBytes(totalStorage);

  return (
    <div className="w-64 bg-white border-r border-apple-gray-100 h-full flex flex-col">
      <div className="p-4 border-b border-apple-gray-100">
        <div className="flex items-center mb-6">
          <Cloud className="h-6 w-6 text-apple-blue mr-2" />
          <h1 className="text-xl font-semibold text-apple-gray-800">FileCloud</h1>
        </div>
        <Button 
          variant="apple" 
          className="w-full"
          onClick={() => document.getElementById('fileUploadInput')?.click()}
        >
          Upload Files
        </Button>
        <input 
          type="file" 
          id="fileUploadInput" 
          multiple 
          className="hidden" 
        />
      </div>

      <div className="p-3 border-b border-apple-gray-100">
        <div className="flex items-center space-x-3 p-2 rounded-apple hover:bg-apple-gray-50">
          <div className="h-8 w-8 bg-apple-blue rounded-full flex items-center justify-center text-white">
            <User className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-apple-gray-800 truncate">{userName}</p>
            <p className="text-xs text-apple-gray-500">Free Account</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          <Button
            variant={view === 'all' && currentPath === '/' ? 'apple' : 'ghost'}
            className="w-full justify-start"
            onClick={() => {
              setView('all');
              setCurrentPath('/');
            }}
          >
            <Home className="h-5 w-5 mr-3" />
            All Files
          </Button>
          <Button
            variant={view === 'starred' ? 'apple' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setView('starred')}
          >
            <Star className="h-5 w-5 mr-3" />
            Starred
          </Button>
          <Button
            variant={view === 'shared' ? 'apple' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setView('shared')}
          >
            <Share2 className="h-5 w-5 mr-3" />
            Shared
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-apple-gray-500"
          >
            <Clock className="h-5 w-5 mr-3" />
            Recent
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-apple-gray-500"
          >
            <Trash2 className="h-5 w-5 mr-3" />
            Trash
          </Button>
        </div>

        <div className="mt-8">
          <div 
            className="flex items-center justify-between mb-2 px-2 py-1 text-sm font-medium text-apple-gray-500 cursor-pointer"
            onClick={() => setShowFolders(!showFolders)}
          >
            <span>Folders</span>
            {showFolders ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
          {showFolders && (
            <div className="space-y-1 ml-2">
              {rootFolders.map((folder) => (
                <FolderItem 
                  key={folder.id} 
                  folder={folder} 
                  currentPath={currentPath}
                  onSelect={() => setCurrentPath(`${folder.path}${folder.name}/`)}
                />
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="p-4 border-t border-apple-gray-100">
        <div className="mb-2 flex justify-between items-center text-sm text-apple-gray-500">
          <span>Storage</span>
          <span>{usedStorageStr} / {totalStorageStr}</span>
        </div>
        <div className="w-full h-2 bg-apple-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-2 rounded-full ${
              storagePercentage > 90
                ? 'bg-red-500'
                : storagePercentage > 70
                ? 'bg-yellow-500'
                : 'bg-apple-blue'
            }`}
            style={{ width: `${storagePercentage}%` }}
          />
        </div>
        <div className="mt-6 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-apple-gray-500"
          >
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-apple-gray-500"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-3" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

interface FolderItemProps {
  folder: FolderType;
  currentPath: string;
  onSelect: () => void;
}

const FolderItem = ({ folder, currentPath, onSelect }: FolderItemProps) => {
  const isActive = currentPath === `${folder.path}${folder.name}/`;
  
  return (
    <div
      className={`pl-2 py-1.5 flex items-center text-sm cursor-pointer rounded-apple-sm ${
        isActive ? 'bg-apple-blue/10 text-apple-blue font-medium' : 'text-apple-gray-700 hover:bg-apple-gray-50'
      }`}
      onClick={onSelect}
    >
      <Folder 
        className={`h-4 w-4 mr-2 ${isActive ? 'text-apple-blue' : 'text-apple-gray-500'}`} 
      />
      <span className="truncate">{folder.name}</span>
    </div>
  );
}; 