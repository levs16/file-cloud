import { FolderType } from '@/lib/store';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Folder, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface FolderCardProps {
  folder: FolderType;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onNavigate: (path: string) => void;
}

export const FolderCard = ({ folder, onEdit, onDelete, onNavigate }: FolderCardProps) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="group relative p-4 cursor-pointer hover:shadow-md transition-all"
        onClick={() => onNavigate(`${folder.path}${folder.name}/`)}
      >
        <div className="absolute right-2 top-2" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <MoreVertical className="h-5 w-5" />
          </Button>

          {showMenu && (
            <div className="absolute right-0 top-10 z-10 w-48 bg-white rounded-md shadow-lg border border-gray-200">
              <div className="py-1">
                <button
                  className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(folder.id);
                    setShowMenu(false);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Rename
                </button>
                <button
                  className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(folder.id);
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
            <Folder className="h-8 w-8 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{folder.name}</p>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <span>{formatDate(folder.createdAt)}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}; 