import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import DatasetSelector, { DatasetInfo } from "@/components/DatasetSelector";
import ColumnSelector from "@/components/ColumnSelector";
import KnowledgeVisualizer from "@/components/KnowledgeVisualizer";
import BuildButton from "@/components/BuildButton";
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Steps, Step } from "@/components/Steps";
import { Database, Network, Sparkles } from "lucide-react";
import { EnhancementProvider, useEnhancement } from '@/contexts/EnhancementContext';
import EnhancementTechniques from '@/components/enhancement/EnhancementTechniques';
import SemanticEnrichment from '@/components/enhancement/SemanticEnrichment';
import EntityExtraction from '@/components/enhancement/EntityExtraction';
import SentimentAnalysis from '@/components/enhancement/SentimentAnalysis';
import TopicClustering from '@/components/enhancement/TopicClustering';
import TabNavigation from '@/components/TabNavigation';

interface Column {
  name: string;
  selected: boolean;
  dataType: string;
}

const EnhancementContent = () => {
  const { activeEnhancement } = useEnhancement();
  const [shouldShowVisualizer, setShouldShowVisualizer] = useState(false);
  
  const handleApplyEnhancement = () => {
    setShouldShowVisualizer(true);
  };

  const renderTechniqueComponent = () => {
    switch (activeEnhancement) {
      case "semantic_enrichment":
        return <SemanticEnrichment onApply={handleApplyEnhancement} />;
      case "entity_extraction":
        return <EntityExtraction onApply={handleApplyEnhancement} />;
      case "sentiment_analysis":
        return <SentimentAnalysis onApply={handleApplyEnhancement} />;
      case "topic_clustering":
        return <TopicClustering onApply={handleApplyEnhancement} />;
      default:
        return (
          <div className="py-12 text-center text-muted-foreground">
            Select a text enhancement technique to configure
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <EnhancementTechniques />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          {renderTechniqueComponent()}
        </div>
        
        {shouldShowVisualizer && (
          <KnowledgeVisualizer
            isProcessing={false}
            isComplete={true}
            knowledgeStoreId={`ks-${activeEnhancement}-${Date.now()}`}
            className="h-[500px]"
          />
        )}
      </div>
    </div>
  );
};

const Index = () => {
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<DatasetInfo | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<Column[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [knowledgeStoreId, setKnowledgeStoreId] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<string>("config");

  const isDatasetValid = !!selectedDataset;
  const isColumnsValid = selectedColumns.some(col => col.selected);
  const isConfigValid = isDatasetValid && isColumnsValid;

  useEffect(() => {
    const newCompletedSteps: number[] = [];
    
    if (isDatasetValid) {
      newCompletedSteps.push(1);
    }
    
    if (isColumnsValid) {
      newCompletedSteps.push(2);
    }
    
    if (isComplete) {
      newCompletedSteps.push(4);
    }
    
    setCompletedSteps(newCompletedSteps);
  }, [isDatasetValid, isColumnsValid, isComplete]);

  const handleDatasetSelected = (dataset: DatasetInfo | null) => {
    setSelectedDataset(dataset);
    setSelectedColumns([]);
    setIsComplete(false);
    setKnowledgeStoreId(undefined);
    
    if (dataset) {
      setCurrentStep(2);
    }
  };

  const handleColumnsSelected = (columns: Column[]) => {
    setSelectedColumns(columns);
    
    if (columns.some(col => col.selected)) {
      setCurrentStep(Math.max(currentStep, 3));
    }
  };

  const handleBuildKnowledgeStore = () => {
    if (!isConfigValid) return;
    
    setIsBuilding(true);
    setCurrentStep(4);
    setActiveTab("visualize");
    
    const buildTime = 3000;
    
    setTimeout(() => {
      setIsBuilding(false);
      setIsComplete(true);
      setKnowledgeStoreId(`ks-${Date.now()}`);
      
      toast({
        title: "Knowledge Store Built",
        description: "Your text knowledge store has been successfully created",
      });
    }, buildTime);
  };

  const handleRefreshVisualizations = () => {
    setKnowledgeStoreId(`ks-${Date.now()}`);
  };

  const tabOrder = ["config", "enhance", "visualize"];

  return (
    <EnhancementProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-muted/50">
        <main className="flex-1 container px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <div className="sticky top-24">
                <Steps currentStep={currentStep} completedSteps={completedSteps}>
                  <Step 
                    number={1} 
                    title="Select Dataset" 
                    icon={<Database className="h-4 w-4" />} 
                    onClick={() => setCurrentStep(1)}
                  />
                  <Step 
                    number={2} 
                    title="Choose Columns" 
                    icon={<Database className="h-4 w-4" />} 
                    onClick={() => isDatasetValid ? setCurrentStep(2) : null}
                    disabled={!isDatasetValid}
                  />
                  <Step 
                    number={3} 
                    title="Enhance Text" 
                    icon={<Sparkles className="h-4 w-4" />} 
                    onClick={() => isColumnsValid ? setCurrentStep(3) : null}
                    disabled={!isColumnsValid}
                  />
                  <Step 
                    number={4} 
                    title="Explore Knowledge" 
                    icon={<Network className="h-4 w-4" />} 
                    onClick={() => isComplete ? setCurrentStep(4) : null}
                    disabled={!isComplete}
                  />
                </Steps>
                
                <div className="mt-8">
                  <BuildButton 
                    onClick={handleBuildKnowledgeStore}
                    isBuilding={isBuilding}
                    isComplete={isComplete}
                    isValid={isConfigValid}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-9">
              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="space-y-6"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="config">Configuration</TabsTrigger>
                  <TabsTrigger value="enhance">Text Enhancement</TabsTrigger>
                  <TabsTrigger value="visualize">Visualization</TabsTrigger>
                </TabsList>
                
                <TabsContent value="config" className="m-0 space-y-6 animate-fade-in">
                  <div className={cn(
                    "transition-opacity duration-300",
                    currentStep >= 1 ? "opacity-100" : "opacity-50 pointer-events-none"
                  )}>
                    <DatasetSelector 
                      onDatasetSelected={handleDatasetSelected}
                    />
                  </div>
                  
                  <div className={cn(
                    "transition-opacity duration-300",
                    currentStep >= 2 ? "opacity-100" : "opacity-50 pointer-events-none"
                  )}>
                    <ColumnSelector
                      dataset={selectedDataset}
                      onColumnsSelected={handleColumnsSelected}
                    />
                  </div>
                  
                  <TabNavigation 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabs={tabOrder}
                    className="mt-8"
                    isCompleteEnabled={isColumnsValid}
                  />
                </TabsContent>
                
                <TabsContent value="enhance" className="m-0 animate-fade-in">
                  <div className={cn(
                    "transition-opacity duration-300",
                    currentStep >= 3 && isColumnsValid ? "opacity-100" : "opacity-50 pointer-events-none"
                  )}>
                    <EnhancementContent />
                  </div>
                  
                  <TabNavigation 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabs={tabOrder}
                    className="mt-8"
                  />
                </TabsContent>
                
                <TabsContent value="visualize" className="m-0 min-h-[500px] animate-fade-in">
                  <KnowledgeVisualizer
                    isProcessing={isBuilding}
                    isComplete={isComplete}
                    knowledgeStoreId={knowledgeStoreId}
                    onRefreshVisualizations={handleRefreshVisualizations}
                    className="h-[600px]"
                  />
                  
                  <TabNavigation 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabs={tabOrder}
                    className="mt-8"
                    onComplete={isComplete ? handleRefreshVisualizations : undefined}
                    isCompleteEnabled={isComplete}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </EnhancementProvider>
  );
};

export default Index;
