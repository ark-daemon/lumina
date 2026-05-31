import React, { useCallback, useState } from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

interface DropzoneProps {
  onImageLoad: (file: File) => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onImageLoad }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageLoad(file);
      }
    }
  }, [onImageLoad]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onImageLoad(e.target.files[0]);
    }
  }, [onImageLoad]);

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full h-64 p-6 border-2 border-dashed rounded-2xl transition-all duration-200 ease-in-out cursor-pointer ${
        isDragging 
          ? 'border-indigo-500 bg-indigo-500/10 scale-[1.02]' 
          : 'border-zinc-300 dark:border-zinc-700 hover:border-indigo-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept="image/*"
        onChange={handleChange}
      />
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`p-4 rounded-full ${isDragging ? 'bg-indigo-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'} transition-colors`}>
          {isDragging ? <UploadCloud size={32} /> : <ImageIcon size={32} />}
        </div>
        <div>
          <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-200">
            Drag & drop your image here
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            or click to browse files
          </p>
        </div>
      </div>
    </div>
  );
};
