import { FileType } from '@/lib/store';
import { formatBytes, formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  MoreVertical,
  Star,
  Download,
  Share2,
  Trash2,
  FileText,
  FileImage,
  FileSpreadsheet,
  Presentation,
  FileIcon,
  FileAudio,
  FileVideo,
  File,
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface FileCardProps {
  file: FileType;
  onToggleStarred: (id: string) => void;
  onToggleShared: (id: string) => void;
  onDelete: (id: string) => void;
}

const getFileIcon = (type: string) => {
  if (type.includes('image')) return FileImage;
  if (type.includes('pdf')) return FileText;
  if (type.includes('spreadsheet') || type.includes('excel')) return FileSpreadsheet;
  if (type.includes('presentation') || type.includes('powerpoint')) return Presentation;
  if (type.includes('audio')) return FileAudio;
  if (type.includes('video')) return FileVideo;
  if (type.includes('text') || type.includes('document')) return FileText;
  return File;
};

export const FileCard = ({ file, onToggleStarred, onToggleShared, onDelete }: FileCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const FileTypeIcon = getFileIcon(file.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group relative p-4 hover:shadow-md transition-all">
        <div className="absolute right-2 top-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-600"
            onClick={() => onToggleStarred(file.id)}
          >
            <Star 
              className={`h-5 w-5 ${file.isStarred ? 'fill-yellow-400 text-yellow-400' : 'fill-transparent'}`} 
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreVertical className="h-5 w-5" />
          </Button>

          {showMenu && (
            <div className="absolute right-0 top-10 z-10 w-48 bg-white rounded-md shadow-lg border border-gray-200">
              <div className="py-1">
                <button
                  className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={() => {
                    onToggleShared(file.id);
                    setShowMenu(false);
                  }}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  {file.isShared ? 'Unshare' : 'Share'}
                </button>
                <button
                  className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </button>
                <button
                  className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 flex items-center"
                  onClick={() => {
                    onDelete(file.id);
                    setShowMenu(false);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <div className="bg-gray-100 p-3 rounded-lg mr-4">
            <FileTypeIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <span>{formatBytes(file.size)}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(file.uploadedAt)}</span>
              {file.isShared && (
                <>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <Share2 className="h-3 w-3 mr-1 text-blue-500" />
                    Shared
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}; 