"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { formatBytes } from "@/lib/format";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { useFileStore, FileType, FolderType } from "@/lib/store";
import { 
  File, 
  Folder, 
  Star, 
  MoreHorizontal, 
  Download,
  Trash2,
  Share,
  StarOff,
  FileSpreadsheet,
  FileText,
  FileImage,
  FileVideo,
  FileCode,
  FileMusic
} from "lucide-react";

export function FileGrid() {
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const { 
    currentPath, 
    setCurrentPath, 
    toggleStarred, 
    toggleShared, 
    removeFile, 
    removeFolder,
    files,
    folders
  } = useFileStore();
  
  const { toast } = useToast();

  const handleFolderClick = (folder: FolderType) => {
    setCurrentPath(`${folder.path}${folder.name}/`);
  };

  const handleBackClick = () => {
    if (currentPath === "/") return;
    const pathParts = currentPath.split("/").filter(Boolean);
    pathParts.pop();
    const newPath = pathParts.length ? `/${pathParts.join("/")}/` : "/";
    setCurrentPath(newPath);
  };

  // Empty state
  if (folders.length === 0 && files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center p-8">
        <File className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">
          {language === 'en' ? 'No Files Yet' : 'Пока нет файлов'}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {language === 'en' 
            ? 'Upload your first file or create a folder to get started'
            : 'Загрузите ваш первый файл или создайте папку, чтобы начать работу'}
        </p>
        <div className="flex gap-2">
          <Button>
            {language === 'en' ? 'Upload File' : 'Загрузить файл'}
          </Button>
          <Button variant="apple-outline">
            {language === 'en' ? 'Create Folder' : 'Создать папку'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Path navigation */}
      <div className="flex items-center gap-2 text-sm font-medium">
        {currentPath !== "/" && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8"
            onClick={handleBackClick}
          >
            {language === 'en' ? 'Back' : 'Назад'}
          </Button>
        )}
        <div className="text-muted-foreground">
          {currentPath === "/" 
            ? (language === 'en' ? 'Home' : 'Главная') 
            : currentPath}
        </div>
      </div>

      {/* Folders grid */}
      {folders.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">
            {language === 'en' ? 'Folders' : 'Папки'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <FolderItem 
                key={folder.id} 
                folder={folder} 
                language={language}
                onFolderClick={handleFolderClick}
                onDeleteFolder={() => {
                  removeFolder(folder.id);
                  toast({
                    title: language === 'en' ? 'Folder deleted' : 'Папка удалена',
                    description: language === 'en'
                      ? `Folder "${folder.name}" has been deleted.`
                      : `Папка "${folder.name}" была удалена.`,
                  });
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Files grid */}
      {files.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">
            {language === 'en' ? 'Files' : 'Файлы'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {files.map((file) => (
              <FileItem 
                key={file.id} 
                file={file}
                language={language}
                onToggleStar={() => {
                  toggleStarred(file.id);
                  toast({
                    title: file.isStarred 
                      ? (language === 'en' ? 'Removed from Starred' : 'Удалено из избранного')
                      : (language === 'en' ? 'Added to Starred' : 'Добавлено в избранное'),
                    description: language === 'en' 
                      ? `"${file.name}" ${file.isStarred ? "removed from" : "added to"} starred files.`
                      : `"${file.name}" ${file.isStarred ? "удален из" : "добавлен в"} избранное.`,
                  });
                }}
                onToggleShare={() => {
                  toggleShared(file.id);
                  toast({
                    title: file.isShared 
                      ? (language === 'en' ? 'Sharing disabled' : 'Общий доступ отключен')
                      : (language === 'en' ? 'Sharing enabled' : 'Общий доступ включен'),
                    description: language === 'en' 
                      ? `Sharing for "${file.name}" has been ${file.isShared ? "disabled" : "enabled"}.`
                      : `Общий доступ для "${file.name}" был ${file.isShared ? "отключен" : "включен"}.`,
                  });
                }}
                onDelete={() => {
                  removeFile(file.id);
                  toast({
                    title: language === 'en' ? 'File deleted' : 'Файл удален',
                    description: language === 'en'
                      ? `File "${file.name}" has been deleted.`
                      : `Файл "${file.name}" был удален.`,
                  });
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FolderItem({ 
  folder, 
  language,
  onFolderClick, 
  onDeleteFolder 
}: { 
  folder: FolderType;
  language: 'en' | 'ru';
  onFolderClick: (folder: FolderType) => void;
  onDeleteFolder: () => void;
}) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer">
      <CardHeader 
        className="p-4 pb-2"
        onClick={() => onFolderClick(folder)}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Folder className="h-10 w-10 text-blue-500" />
            <div>
              <h4 className="font-medium line-clamp-1">{folder.name}</h4>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                className="text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteFolder();
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Delete' : 'Удалить'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent
        className="p-4 pt-0"
        onClick={() => onFolderClick(folder)}
      >
        <p className="text-sm text-muted-foreground">
          {language === 'en' 
            ? `Created ${formatDistanceToNow(new Date(folder.createdAt), { addSuffix: true })}`
            : `Создано ${formatDistanceToNow(new Date(folder.createdAt), { 
                addSuffix: true, 
                locale: ru 
              })}`
          }
        </p>
      </CardContent>
    </Card>
  );
}

function FileItem({ 
  file,
  language,
  onToggleStar,
  onToggleShare,
  onDelete
}: { 
  file: FileType;
  language: 'en' | 'ru';
  onToggleStar: () => void;
  onToggleShare: () => void;
  onDelete: () => void;
}) {
  const { icon, color } = getFileTypeInfo(file.type);
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {React.cloneElement(icon, { className: `h-10 w-10 ${color}` })}
            <div>
              <h4 className="font-medium line-clamp-1">{file.name}</h4>
              <p className="text-sm text-muted-foreground">
                {formatBytes(file.size)}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onToggleStar}>
                {file.isStarred ? (
                  <>
                    <StarOff className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'Remove star' : 'Убрать из избранного'}
                  </>
                ) : (
                  <>
                    <Star className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'Star file' : 'Добавить в избранное'}
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onToggleShare}>
                <Share className="h-4 w-4 mr-2" />
                {file.isShared 
                  ? (language === 'en' ? 'Disable sharing' : 'Общий доступ отключен') 
                  : (language === 'en' ? 'Share file' : 'Поделиться файлом')}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Download' : 'Скачать'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive"
                onClick={onDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Delete' : 'Удалить'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-2">
        <div className="flex justify-between items-center w-full text-xs text-muted-foreground">
          <span>
            {language === 'en'
              ? formatDistanceToNow(new Date(file.uploadedAt), { addSuffix: true })
              : formatDistanceToNow(new Date(file.uploadedAt), { 
                  addSuffix: true, 
                  locale: ru 
                })
            }
          </span>
          <div className="flex items-center gap-1">
            {file.isStarred && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
            {file.isShared && <Share className="h-3 w-3 text-blue-500" />}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function getFileTypeInfo(fileType: string) {
  let icon = <FileText />;
  let color = "text-gray-500";

  if (fileType.includes("excel") || fileType.includes("spreadsheet")) {
    icon = <FileSpreadsheet />;
    color = "text-green-600";
  } else if (fileType.includes("pdf")) {
    icon = <FileText />;
    color = "text-red-500";
  } else if (fileType.includes("image")) {
    icon = <FileImage />;
    color = "text-purple-500";
  } else if (fileType.includes("video")) {
    icon = <FileVideo />;
    color = "text-blue-500";
  } else if (fileType.includes("audio") || fileType.includes("music")) {
    icon = <FileMusic />;
    color = "text-pink-500";
  } else if (fileType.includes("code") || fileType.includes("json") || fileType.includes("html")) {
    icon = <FileCode />;
    color = "text-yellow-600";
  } else if (fileType.includes("powerpoint") || fileType.includes("presentation")) {
    icon = <File />;
    color = "text-orange-500";
  }

  return { icon, color };
} 