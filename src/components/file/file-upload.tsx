import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CloudUpload, X, Loader2 } from 'lucide-react';
import { useFileStore, FileType } from '@/lib/store';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

interface FileUploadProps {
  onUpload: (newFile: FileType) => boolean;
}

export const FileUpload = ({ onUpload }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const { currentPath } = useFileStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const uploadFiles = async () => {
        setIsUploading(true);
        const initialProgress = acceptedFiles.reduce<Record<string, number>>(
          (acc, file) => {
            acc[file.name] = 0;
            return acc;
          },
          {}
        );
        setUploadProgress(initialProgress);

        try {
          // Simulate file upload with progress
          for (let i = 0; i <= 100; i += 10) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            const updatedProgress = { ...initialProgress };
            
            Object.keys(updatedProgress).forEach((fileName) => {
              updatedProgress[fileName] = i;
            });
            
            setUploadProgress(updatedProgress);
          }

          // Add files to the store
          let uploadedCount = 0;
          let skippedCount = 0;
          
          for (const file of acceptedFiles) {
            const newFile: FileType = {
              id: uuidv4(),
              name: file.name,
              size: file.size,
              type: file.type,
              uploadedAt: new Date(),
              path: currentPath,
              isStarred: false,
              isShared: false,
            };
            
            // Call the external upload handler which checks storage limits
            if (onUpload(newFile)) {
              uploadedCount++;
            } else {
              skippedCount++;
            }
          }

          if (uploadedCount > 0) {
            toast.success(`${uploadedCount} file(s) uploaded successfully`);
          }
          
          if (skippedCount > 0) {
            toast.error(`${skippedCount} file(s) skipped due to storage limits`);
          }
        } catch (error) {
          toast.error('Error uploading files');
          console.error(error);
        } finally {
          setIsUploading(false);
          setUploadProgress({});
        }
      };

      uploadFiles();
    },
    [onUpload, currentPath]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    disabled: isUploading,
    noClick: true,
  });

  const removeFile = (fileName: string) => {
    // This would remove a file from the upload queue in a real app
    // For demo purposes, just update UI
    const newProgress = { ...uploadProgress };
    delete newProgress[fileName];
    setUploadProgress(newProgress);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed ${
          isDragActive ? 'border-apple-blue' : 'border-apple-gray-200'
        } rounded-apple p-8 transition-colors bg-white`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center">
          <CloudUpload
            className={`h-12 w-12 mb-4 ${
              isDragActive ? 'text-apple-blue' : 'text-apple-gray-400'
            }`}
          />
          <p className="text-center text-lg font-medium text-apple-gray-800">
            {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
          </p>
          <p className="text-center text-sm text-apple-gray-500 mt-2">
            or
          </p>
          <Button
            variant="apple"
            className="mt-4"
            onClick={open}
            disabled={isUploading}
          >
            Select Files
          </Button>
        </div>
      </div>

      {Object.keys(uploadProgress).length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-apple-gray-800 mb-3">Uploading Files</h3>
          <div className="space-y-3">
            <AnimatePresence>
              {Object.entries(uploadProgress).map(([fileName, progress]) => (
                <motion.div
                  key={fileName}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white border border-apple-gray-100 rounded-apple p-3 shadow-apple"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate max-w-[200px] text-apple-gray-800">
                      {fileName}
                    </span>
                    <div className="flex items-center">
                      <span className="text-xs text-apple-gray-500 mr-2">{progress}%</span>
                      {isUploading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-apple-blue" />
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeFile(fileName)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-apple-gray-100 rounded-full h-1.5 mt-2">
                    <div
                      className="bg-apple-blue h-1.5 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}; 