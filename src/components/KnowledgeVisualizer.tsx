
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, BarChart4, Network, RefreshCw } from "lucide-react";

interface KnowledgeVisualizerProps {
  isProcessing: boolean;
  isComplete: boolean;
  knowledgeStoreId?: string;
  className?: string;
  onRefreshVisualizations?: () => void;
}

const KnowledgeVisualizer: React.FC<KnowledgeVisualizerProps> = ({
  isProcessing,
  isComplete,
  knowledgeStoreId,
  className,
  onRefreshVisualizations
}) => {
  const [activeTab, setActiveTab] = useState("clusters");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading visualizations
  useEffect(() => {
    if (isComplete && knowledgeStoreId) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isComplete, knowledgeStoreId]);

  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
      if (onRefreshVisualizations) {
        onRefreshVisualizations();
      }
    }, 1500);
  };

  const renderPlaceholderContent = () => {
    if (isProcessing) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <Loader2 className="h-10 w-10 text-primary mb-4 animate-spin" />
          <h3 className="text-lg font-medium">Building Knowledge Store</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">
            We're processing your data and generating visualizations. This may take a moment...
          </p>
        </div>
      );
    }
    
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <Loader2 className="h-10 w-10 text-primary mb-4 animate-spin" />
          <h3 className="text-lg font-medium">Loading Visualizations</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">
            Preparing visualizations for your knowledge store...
          </p>
        </div>
      );
    }
    
    if (isComplete && knowledgeStoreId) {
      return (
        <div className="h-full w-full flex items-stretch">
          <iframe 
            src={`https://placeholder.com/dash-app/${activeTab}/${knowledgeStoreId}`}
            className="w-full h-full rounded-lg border border-border bg-card"
            title={`${activeTab} visualization`}
          />
        </div>
      );
    }
    
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          {activeTab === "clusters" ? (
            <Network className="h-8 w-8 text-muted-foreground" />
          ) : (
            <BarChart4 className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        <h3 className="text-lg font-medium">No Visualizations Yet</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-md">
          Build your knowledge store first to generate visualizations
        </p>
      </div>
    );
  };

  return (
    <Card className={cn("w-full h-full shadow-sm bg-card/70 backdrop-blur-sm animate-fade-in flex flex-col", className)}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Knowledge Visualizer</CardTitle>
          {isComplete && knowledgeStoreId && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 gap-1.5"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
              Refresh
            </Button>
          )}
        </div>
        <CardDescription>
          Explore and understand your knowledge store through visualizations
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 pb-6">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="h-full flex flex-col"
        >
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="clusters" className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              <span>Clusters</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <BarChart4 className="h-4 w-4" />
              <span>Insights</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="visualizer-container flex-1">
            <TabsContent value="clusters" className="h-full m-0">
              {renderPlaceholderContent()}
            </TabsContent>
            
            <TabsContent value="insights" className="h-full m-0">
              {renderPlaceholderContent()}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default KnowledgeVisualizer;
