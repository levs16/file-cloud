import { Button } from '@/components/ui/button';
import { useFileStore, FileType } from '@/lib/store';
import { ChevronRight, Home, FolderPlus, Upload, Star, Share2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { FileUpload } from './file-upload';
import { formatBytes } from '@/lib/utils';

interface NavigationBarProps {
  view: 'all' | 'starred' | 'shared';
  setView: (view: 'all' | 'starred' | 'shared') => void;
  onFileUpload: (newFile: FileType) => boolean;
  remainingStorage: number;
}

export const NavigationBar = ({ view, setView, onFileUpload, remainingStorage }: NavigationBarProps) => {
  const { currentPath, setCurrentPath, addFolder } = useFileStore();
  const [showUpload, setShowUpload] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const pathSegments = currentPath.split('/').filter(Boolean);
  
  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      toast.error('Please enter a folder name');
      return;
    }

    addFolder({
      id: uuidv4(),
      name: newFolderName.trim(),
      path: currentPath,
      createdAt: new Date(),
    });

    toast.success(`Folder "${newFolderName}" created`);
    setNewFolderName('');
    setShowCreateFolder(false);
  };

  const navigateToPath = (index: number) => {
    const newPath = 
      index === -1 
        ? '/' 
        : `/${pathSegments.slice(0, index + 1).join('/')}/`;
    
    setCurrentPath(newPath);
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center"
          onClick={() => navigateToPath(-1)}
        >
          <Home className="h-4 w-4 mr-1" />
          Home
        </Button>
        
        {pathSegments.map((segment, index) => (
          <div key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-apple-gray-400 mx-1" />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateToPath(index)}
            >
              {segment}
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-between items-center">
        <div className="flex gap-2 mb-2 sm:mb-0">
          <Button
            variant={view === 'all' ? 'apple' : 'apple-outline'}
            size="sm"
            onClick={() => setView('all')}
          >
            All Files
          </Button>
          <Button
            variant={view === 'starred' ? 'apple' : 'apple-outline'}
            size="sm"
            onClick={() => setView('starred')}
          >
            <Star className="h-4 w-4 mr-1" />
            Starred
          </Button>
          <Button
            variant={view === 'shared' ? 'apple' : 'apple-outline'}
            size="sm"
            onClick={() => setView('shared')}
          >
            <Share2 className="h-4 w-4 mr-1" />
            Shared
          </Button>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="apple" 
            size="sm"
            onClick={() => setShowUpload(!showUpload)}
          >
            <Upload className="h-4 w-4 mr-1" />
            Upload
          </Button>
          <Button 
            variant="apple-outline" 
            size="sm"
            onClick={() => setShowCreateFolder(!showCreateFolder)}
          >
            <FolderPlus className="h-4 w-4 mr-1" />
            New Folder
          </Button>
        </div>
      </div>

      {showUpload && (
        <div className="mt-4">
          <div className="text-xs text-apple-gray-500 mb-2">
            Available storage: {formatBytes(remainingStorage)}
          </div>
          <FileUpload onUpload={onFileUpload} />
        </div>
      )}

      {showCreateFolder && (
        <div className="mt-4 p-4 bg-white rounded-apple shadow-apple">
          <h3 className="text-sm font-medium mb-2 text-apple-gray-800">Create New Folder</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Enter folder name"
              className="flex-1 px-3 py-2 border border-apple-gray-200 rounded-apple focus:outline-none focus:ring-2 focus:ring-apple-blue"
            />
            <Button
              variant="apple"
              size="sm"
              onClick={handleCreateFolder}
            >
              Create
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowCreateFolder(false);
                setNewFolderName('');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}; 