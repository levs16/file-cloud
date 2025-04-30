import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface FileType {
  id: string;
  name: string;
  size: number;
  type: string;
  path: string;
  isStarred: boolean;
  isShared: boolean;
  uploadedAt: string;
}

export interface FolderType {
  id: string;
  name: string;
  path: string;
  createdAt: string;
}

interface FileStore {
  files: FileType[];
  folders: FolderType[];
  currentPath: string;
  recentFiles: FileType[];
  starredFiles: FileType[];
  
  // Actions
  setCurrentPath: (path: string) => void;
  addFile: (file: Omit<FileType, 'id' | 'path' | 'isStarred' | 'isShared' | 'uploadedAt'>) => void;
  addFolder: (folder: Omit<FolderType, 'id' | 'path' | 'createdAt'>) => void;
  toggleStarFile: (id: string) => void;
  toggleShareFile: (id: string) => void;
  deleteFile: (id: string) => void;
  deleteFolder: (id: string) => void;
  
  // Computed
  getCurrentFiles: () => FileType[];
  getCurrentFolders: () => FolderType[];
}

export const useFileStore = create<FileStore>((set, get) => ({
  files: [
    {
      id: 'file-1',
      name: 'Family Budget 2023.xlsx',
      size: 2500000,
      type: 'application/excel',
      path: '/',
      isStarred: true,
      isShared: false,
      uploadedAt: new Date(2023, 5, 15).toISOString(),
    },
    {
      id: 'file-2',
      name: 'Home Renovation Plans.pdf',
      size: 5200000,
      type: 'application/pdf',
      path: '/',
      isStarred: false,
      isShared: false,
      uploadedAt: new Date(2023, 6, 22).toISOString(),
    },
    {
      id: 'file-3',
      name: 'Summer Vacation.jpg',
      size: 1800000,
      type: 'image/jpeg',
      path: '/Photos/',
      isStarred: true,
      isShared: false,
      uploadedAt: new Date(2023, 4, 10).toISOString(),
    },
    {
      id: 'file-4',
      name: 'Important Documents.pdf',
      size: 3700000,
      type: 'application/pdf',
      path: '/Documents/',
      isStarred: true,
      isShared: false,
      uploadedAt: new Date(2023, 7, 5).toISOString(),
    },
    {
      id: 'file-5',
      name: 'Birthday Party.mp4',
      size: 28000000,
      type: 'video/mp4',
      path: '/Videos/',
      isStarred: false,
      isShared: false,
      uploadedAt: new Date(2023, 8, 12).toISOString(),
    },
  ],
  
  folders: [
    {
      id: 'folder-1',
      name: 'Documents',
      path: '/',
      createdAt: new Date(2023, 3, 10).toISOString(),
    },
    {
      id: 'folder-2',
      name: 'Photos',
      path: '/',
      createdAt: new Date(2023, 3, 15).toISOString(),
    },
    {
      id: 'folder-3',
      name: 'Videos',
      path: '/',
      createdAt: new Date(2023, 4, 5).toISOString(),
    },
    {
      id: 'folder-4',
      name: 'Taxes',
      path: '/Documents/',
      createdAt: new Date(2023, 5, 20).toISOString(),
    },
    {
      id: 'folder-5',
      name: 'Family',
      path: '/Photos/',
      createdAt: new Date(2023, 6, 12).toISOString(),
    },
  ],
  
  currentPath: '/',
  recentFiles: [],
  starredFiles: [],
  
  setCurrentPath: (path) => set({ currentPath: path }),
  
  addFile: (file) => set((state) => {
    const newFile: FileType = {
      id: uuidv4(),
      path: state.currentPath,
      isStarred: false,
      isShared: false,
      uploadedAt: new Date().toISOString(),
      ...file,
    };
    
    return { 
      files: [...state.files, newFile],
      recentFiles: [newFile, ...state.recentFiles.slice(0, 4)]
    };
  }),
  
  addFolder: (folder) => set((state) => {
    const newFolder: FolderType = {
      id: uuidv4(),
      path: state.currentPath,
      createdAt: new Date().toISOString(),
      ...folder,
    };
    
    return { folders: [...state.folders, newFolder] };
  }),
  
  toggleStarFile: (id) => set((state) => {
    const files = state.files.map((file) => {
      if (file.id === id) {
        return { ...file, isStarred: !file.isStarred };
      }
      return file;
    });
    
    return { files };
  }),
  
  toggleShareFile: (id) => set((state) => {
    const files = state.files.map((file) => {
      if (file.id === id) {
        return { ...file, isShared: !file.isShared };
      }
      return file;
    });
    
    return { files };
  }),
  
  deleteFile: (id) => set((state) => ({
    files: state.files.filter((file) => file.id !== id),
    recentFiles: state.recentFiles.filter((file) => file.id !== id),
  })),
  
  deleteFolder: (id) => set((state) => {
    const folderToDelete = state.folders.find((folder) => folder.id === id);
    
    if (!folderToDelete) return state;
    
    const folderPath = `${folderToDelete.path}${folderToDelete.name}/`;
    
    // Remove all files in this folder and subfolders
    const updatedFiles = state.files.filter(
      (file) => !file.path.startsWith(folderPath)
    );
    
    // Remove all subfolders
    const updatedFolders = state.folders.filter(
      (folder) => !folder.path.startsWith(folderPath) && folder.id !== id
    );
    
    return {
      files: updatedFiles,
      folders: updatedFolders,
    };
  }),
  
  getCurrentFiles: () => {
    const currentPath = get().currentPath;
    return get().files.filter((file) => file.path === currentPath);
  },
  
  getCurrentFolders: () => {
    const currentPath = get().currentPath;
    return get().folders.filter((folder) => folder.path === currentPath);
  },
})); 