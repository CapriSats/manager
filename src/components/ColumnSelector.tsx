
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DatasetInfo } from './DatasetSelector';
import { Loader2, Table } from 'lucide-react';

interface Column {
  name: string;
  selected: boolean;
  dataType: string;
}

// Mock column data for ITSM sample datasets
const SAMPLE_DATASET_COLUMNS: Record<string, Column[]> = {
  "incident_tickets": [
    { name: "incident_id", selected: true, dataType: "string" },
    { name: "reported_date", selected: true, dataType: "date" },
    { name: "status", selected: true, dataType: "categorical" },
    { name: "priority", selected: true, dataType: "categorical" },
    { name: "category", selected: true, dataType: "categorical" },
    { name: "subcategory", selected: true, dataType: "categorical" },
    { name: "affected_user", selected: false, dataType: "string" },
    { name: "affected_service", selected: true, dataType: "categorical" },
    { name: "description", selected: true, dataType: "text" },
    { name: "resolution_notes", selected: true, dataType: "text" },
    { name: "resolution_time_hours", selected: false, dataType: "numeric" },
  ],
  "service_requests": [
    { name: "request_id", selected: true, dataType: "string" },
    { name: "requested_date", selected: true, dataType: "date" },
    { name: "requestor", selected: false, dataType: "string" },
    { name: "request_type", selected: true, dataType: "categorical" },
    { name: "description", selected: true, dataType: "text" },
    { name: "approval_status", selected: true, dataType: "categorical" },
    { name: "approved_by", selected: false, dataType: "string" },
    { name: "fulfillment_time_hours", selected: true, dataType: "numeric" },
    { name: "feedback", selected: true, dataType: "text" },
    { name: "satisfaction_score", selected: true, dataType: "numeric" },
  ],
  "change_management": [
    { name: "change_id", selected: true, dataType: "string" },
    { name: "title", selected: true, dataType: "string" },
    { name: "submission_date", selected: true, dataType: "date" },
    { name: "change_type", selected: true, dataType: "categorical" },
    { name: "category", selected: true, dataType: "categorical" },
    { name: "risk_level", selected: true, dataType: "categorical" },
    { name: "status", selected: true, dataType: "categorical" },
    { name: "requester", selected: false, dataType: "string" },
    { name: "description", selected: true, dataType: "text" },
    { name: "implementation_plan", selected: true, dataType: "text" },
    { name: "rollback_plan", selected: true, dataType: "text" },
    { name: "impact_assessment", selected: true, dataType: "text" },
    { name: "approver_comments", selected: true, dataType: "text" },
  ],
  "problem_records": [
    { name: "problem_id", selected: true, dataType: "string" },
    { name: "identification_date", selected: true, dataType: "date" },
    { name: "status", selected: true, dataType: "categorical" },
    { name: "priority", selected: true, dataType: "categorical" },
    { name: "category", selected: true, dataType: "categorical" },
    { name: "related_incidents", selected: false, dataType: "string" },
    { name: "description", selected: true, dataType: "text" },
    { name: "root_cause_analysis", selected: true, dataType: "text" },
    { name: "workaround", selected: true, dataType: "text" },
    { name: "permanent_solution", selected: true, dataType: "text" },
    { name: "resolution_date", selected: false, dataType: "date" },
    { name: "lessons_learned", selected: true, dataType: "text" },
  ],
  "knowledge_articles": [
    { name: "article_id", selected: true, dataType: "string" },
    { name: "title", selected: true, dataType: "string" },
    { name: "publication_date", selected: true, dataType: "date" },
    { name: "last_updated", selected: true, dataType: "date" },
    { name: "status", selected: true, dataType: "categorical" },
    { name: "category", selected: true, dataType: "categorical" },
    { name: "subcategory", selected: true, dataType: "categorical" },
    { name: "author", selected: false, dataType: "string" },
    { name: "content", selected: true, dataType: "text" },
    { name: "tags", selected: true, dataType: "string" },
    { name: "view_count", selected: false, dataType: "numeric" },
    { name: "helpful_votes", selected: false, dataType: "numeric" },
    { name: "feedback_comments", selected: true, dataType: "text" },
  ],
};

// Mock function to parse file (in a real app, you'd parse the actual file)
const mockParseFile = (file: File): Promise<Column[]> => {
  return new Promise((resolve) => {
    // Simulate loading
    setTimeout(() => {
      // Generate random columns based on file name
      const columnCount = Math.floor(Math.random() * 5) + 5; // 5-10 columns
      const columns: Column[] = [];
      
      for (let i = 0; i < columnCount; i++) {
        const isNumeric = Math.random() > 0.2;
        columns.push({
          name: isNumeric ? `feature_${i+1}` : `category_${i+1}`,
          selected: isNumeric,
          dataType: isNumeric ? "numeric" : "categorical"
        });
      }
      
      // Add a target column
      columns.push({
        name: "target",
        selected: false,
        dataType: "categorical"
      });
      
      resolve(columns);
    }, 1500); // Simulate loading delay
  });
};

interface ColumnSelectorProps {
  dataset: DatasetInfo | null;
  onColumnsSelected: (columns: Column[]) => void;
  className?: string;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({ 
  dataset, 
  onColumnsSelected,
  className 
}) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!dataset) {
      setColumns([]);
      return;
    }
    
    setLoading(true);
    
    if (dataset.type === "sample") {
      // Get columns for sample dataset
      const sampleColumns = [...SAMPLE_DATASET_COLUMNS[dataset.id]];
      setColumns(sampleColumns);
      onColumnsSelected(sampleColumns);
      setLoading(false);
    } else if (dataset.type === "uploaded" && dataset.file) {
      // Parse uploaded file
      mockParseFile(dataset.file).then(parsedColumns => {
        setColumns(parsedColumns);
        onColumnsSelected(parsedColumns);
        setLoading(false);
      });
    }
  }, [dataset, onColumnsSelected]);

  const handleColumnToggle = (columnName: string) => {
    const updatedColumns = columns.map(col => 
      col.name === columnName ? { ...col, selected: !col.selected } : col
    );
    
    setColumns(updatedColumns);
    onColumnsSelected(updatedColumns);
  };

  if (!dataset) {
    return null;
  }

  return (
    <Card className={cn("w-full shadow-sm bg-card/70 backdrop-blur-sm animate-fade-in", className)}>
      <CardHeader>
        <CardTitle className="text-xl">Select Columns</CardTitle>
        <CardDescription>
          Choose the columns to include in your knowledge store
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-8 flex flex-col items-center justify-center text-center gap-2">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Analyzing dataset columns...</p>
          </div>
        ) : columns.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Table className="h-4 w-4" />
              <span>{columns.length} columns found in dataset</span>
            </div>
            
            <div className="space-y-2">
              {columns.map((column) => (
                <div 
                  key={column.name}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg transition-colors",
                    column.selected ? "bg-primary/10" : "bg-secondary hover:bg-secondary/70"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      id={`col-${column.name}`}
                      checked={column.selected}
                      onCheckedChange={() => handleColumnToggle(column.name)}
                    />
                    <label 
                      htmlFor={`col-${column.name}`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {column.name}
                    </label>
                  </div>
                  <div className="text-xs px-2 py-1 rounded-full bg-muted">
                    {column.dataType}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            No columns available. Please select a dataset.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ColumnSelector;
