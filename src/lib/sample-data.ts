import { FileType, FolderType } from './store';
import { v4 as uuidv4 } from 'uuid';

export const sampleFiles: FileType[] = [
  {
    id: uuidv4(),
    name: 'Project Proposal.pdf',
    size: 2500000,
    type: 'application/pdf',
    uploadedAt: new Date('2023-04-15'),
    path: '/',
    isStarred: true,
    isShared: false,
  },
  {
    id: uuidv4(),
    name: 'Budget Spreadsheet.xlsx',
    size: 1200000,
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    uploadedAt: new Date('2023-04-18'),
    path: '/',
    isStarred: false,
    isShared: true,
  },
  {
    id: uuidv4(),
    name: 'Meeting Notes.docx',
    size: 800000,
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    uploadedAt: new Date('2023-04-20'),
    path: '/',
    isStarred: false,
    isShared: false,
  },
  {
    id: uuidv4(),
    name: 'Company Logo.png',
    size: 3500000,
    type: 'image/png',
    uploadedAt: new Date('2023-04-10'),
    path: '/Images',
    isStarred: true,
    isShared: true,
  },
  {
    id: uuidv4(),
    name: 'Presentation.pptx',
    size: 5200000,
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    uploadedAt: new Date('2023-04-25'),
    path: '/',
    isStarred: false,
    isShared: false,
  },
];

export const sampleFolders: FolderType[] = [
  {
    id: uuidv4(),
    name: 'Documents',
    path: '/',
    createdAt: new Date('2023-04-01'),
  },
  {
    id: uuidv4(),
    name: 'Images',
    path: '/',
    createdAt: new Date('2023-04-02'),
  },
  {
    id: uuidv4(),
    name: 'Videos',
    path: '/',
    createdAt: new Date('2023-04-03'),
  },
]; 