
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUpload from "./FileUpload";
import { Database, FileText } from "lucide-react";
import { cn } from '@/lib/utils';

// Mock pre-existing datasets focused on ITSM (IT Service Management)
const SAMPLE_DATASETS = [
  { 
    id: "incident_tickets", 
    name: "IT Incident Tickets", 
    description: "Customer reported IT incidents with priority, category, and resolution details" 
  },
  { 
    id: "service_requests", 
    name: "Service Request Records", 
    description: "IT service requests with approval status, fulfillment time, and customer feedback" 
  },
  { 
    id: "change_management", 
    name: "Change Management Logs", 
    description: "Change requests with risk assessment, implementation plans, and outcomes" 
  },
  { 
    id: "problem_records", 
    name: "Problem Management Records", 
    description: "Root cause analysis and resolution of recurring incidents" 
  },
  { 
    id: "knowledge_articles", 
    name: "Knowledge Base Articles", 
    description: "Technical solutions and documentation with usage analytics" 
  },
];

export interface DatasetInfo {
  id: string;
  name: string;
  type: "sample" | "uploaded";
  file?: File;
}

interface DatasetSelectorProps {
  onDatasetSelected: (dataset: DatasetInfo | null) => void;
  className?: string;
}

const DatasetSelector: React.FC<DatasetSelectorProps> = ({ onDatasetSelected, className }) => {
  const [selectedSampleDataset, setSelectedSampleDataset] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<string>("sample");

  const handleSampleDatasetChange = (value: string) => {
    setSelectedSampleDataset(value);
    const dataset = SAMPLE_DATASETS.find(d => d.id === value);
    
    if (dataset) {
      onDatasetSelected({
        id: dataset.id,
        name: dataset.name,
        type: "sample"
      });
    } else {
      onDatasetSelected(null);
    }
  };

  const handleFileSelected = (file: File | null) => {
    setUploadedFile(file);
    
    if (file) {
      onDatasetSelected({
        id: `uploaded-${Date.now()}`,
        name: file.name,
        type: "uploaded",
        file
      });
    } else {
      onDatasetSelected(null);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Reset selection when switching tabs
    if (value === "sample") {
      setUploadedFile(null);
      if (selectedSampleDataset) {
        const dataset = SAMPLE_DATASETS.find(d => d.id === selectedSampleDataset);
        if (dataset) {
          onDatasetSelected({
            id: dataset.id,
            name: dataset.name,
            type: "sample"
          });
        }
      } else {
        onDatasetSelected(null);
      }
    } else {
      setSelectedSampleDataset("");
      if (uploadedFile) {
        onDatasetSelected({
          id: `uploaded-${Date.now()}`,
          name: uploadedFile.name,
          type: "uploaded",
          file: uploadedFile
        });
      } else {
        onDatasetSelected(null);
      }
    }
  };

  return (
    <Card className={cn("w-full shadow-sm bg-card/70 backdrop-blur-sm animate-fade-in", className)}>
      <CardHeader>
        <CardTitle className="text-xl">Select Dataset</CardTitle>
        <CardDescription>
          Choose from our sample datasets or upload your own CSV/Excel file
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sample" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="sample" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Sample Datasets</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Upload File</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sample" className="animate-fade-in mt-0">
            <div className="space-y-1.5">
              <label htmlFor="dataset-select" className="text-sm font-medium">
                Dataset
              </label>
              <Select value={selectedSampleDataset} onValueChange={handleSampleDatasetChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a dataset" />
                </SelectTrigger>
                <SelectContent>
                  {SAMPLE_DATASETS.map((dataset) => (
                    <SelectItem key={dataset.id} value={dataset.id}>
                      <div>
                        <span>{dataset.name}</span>
                        <p className="text-xs text-muted-foreground">{dataset.description}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedSampleDataset && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium">
                  {SAMPLE_DATASETS.find(d => d.id === selectedSampleDataset)?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {SAMPLE_DATASETS.find(d => d.id === selectedSampleDataset)?.description}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upload" className="animate-fade-in mt-0">
            <FileUpload onFileSelected={handleFileSelected} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DatasetSelector;
