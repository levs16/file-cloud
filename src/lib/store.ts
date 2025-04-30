import { create } from 'zustand';

export type FileType = {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  path: string;
  isStarred: boolean;
  isShared: boolean;
};

export type FolderType = {
  id: string;
  name: string;
  path: string;
  createdAt: Date;
};

interface FileStore {
  files: FileType[];
  folders: FolderType[];
  currentPath: string;
  setFiles: (files: FileType[]) => void;
  addFile: (file: FileType) => void;
  removeFile: (id: string) => void;
  setFolders: (folders: FolderType[]) => void;
  addFolder: (folder: FolderType) => void;
  removeFolder: (id: string) => void;
  setCurrentPath: (path: string) => void;
  toggleStarred: (id: string) => void;
  toggleShared: (id: string) => void;
}

export const useFileStore = create<FileStore>((set) => ({
  files: [],
  folders: [],
  currentPath: '/',
  setFiles: (files) => set({ files }),
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (id) => set((state) => ({ files: state.files.filter((file) => file.id !== id) })),
  setFolders: (folders) => set({ folders }),
  addFolder: (folder) => set((state) => ({ folders: [...state.folders, folder] })),
  removeFolder: (id) => set((state) => ({ folders: state.folders.filter((folder) => folder.id !== id) })),
  setCurrentPath: (path) => set({ currentPath: path }),
  toggleStarred: (id) => set((state) => ({
    files: state.files.map((file) =>
      file.id === id ? { ...file, isStarred: !file.isStarred } : file
    ),
  })),
  toggleShared: (id) => set((state) => ({
    files: state.files.map((file) =>
      file.id === id ? { ...file, isShared: !file.isShared } : file
    ),
  })),
})); 