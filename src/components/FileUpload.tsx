
import React, { useState, useRef } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Upload, FileArchive, CheckCircle, X } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFileSelected: (file: File | null) => void;
  acceptedFormats?: string;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelected,
  acceptedFormats = ".csv,.xlsx,.xls",
  className
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const selectedFile = files[0];
    const extension = selectedFile.name.split('.').pop()?.toLowerCase();
    
    if (extension && (extension === 'csv' || extension === 'xlsx' || extension === 'xls')) {
      setFile(selectedFile);
      onFileSelected(selectedFile);
      toast({
        title: "File uploaded",
        description: `Successfully uploaded ${selectedFile.name}`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid file format",
        description: "Please upload a CSV or Excel file",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFile(null);
    onFileSelected(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e.target.files)}
        accept={acceptedFormats}
        className="hidden"
      />
      
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "knowex-file-drop-area flex flex-col items-center justify-center gap-4",
            isDragging ? "active border-primary bg-primary/5" : "border-muted",
            "animate-fade-in"
          )}
        >
          <div className="p-3 bg-primary/10 rounded-full">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-base font-medium">Drop your file here, or <span className="text-primary cursor-pointer" onClick={handleButtonClick}>browse</span></p>
            <p className="mt-1 text-sm text-muted-foreground">Supports CSV, Excel (.xlsx, .xls)</p>
          </div>
        </div>
      ) : (
        <div className="bg-secondary/50 rounded-xl p-4 flex items-center gap-3 animate-slide-up">
          <div className="p-2 bg-background rounded-lg">
            <FileArchive className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{file.name}</p>
            <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
          <div className="flex gap-2">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 rounded-full"
              onClick={handleRemoveFile}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
