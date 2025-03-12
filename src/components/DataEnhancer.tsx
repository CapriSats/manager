
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Settings, AlertCircle, MessageSquare } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface EnhancementOption {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface DataEnhancerProps {
  onEnhancementConfigChange: (config: EnhancementConfig) => void;
  isConfigValid: boolean;
  className?: string;
}

export interface EnhancementConfig {
  enabled: boolean;
  options: EnhancementOption[];
  modelParams: {
    temperature: number;
    creativityLevel: number;
  };
}

const DataEnhancer: React.FC<DataEnhancerProps> = ({
  onEnhancementConfigChange,
  isConfigValid,
  className
}) => {
  const { toast } = useToast();
  const [enhancementEnabled, setEnhancementEnabled] = useState(false);
  const [enhancementOptions, setEnhancementOptions] = useState<EnhancementOption[]>([
    {
      id: "semantic_enrichment",
      name: "Semantic Enrichment",
      description: "Add contextual information to improve text understanding",
      enabled: true
    },
    {
      id: "entity_extraction",
      name: "Entity Extraction",
      description: "Identify and tag key entities in your text data",
      enabled: true
    },
    {
      id: "sentiment_analysis",
      name: "Sentiment Analysis",
      description: "Analyze and tag emotional tone in text content",
      enabled: false
    },
    {
      id: "topic_clustering",
      name: "Topic Clustering",
      description: "Group similar text content into meaningful topics",
      enabled: false
    },
  ]);
  const [temperature, setTemperature] = useState(0.7);
  const [creativityLevel, setCreativityLevel] = useState(50);

  const handleEnhancementToggle = (value: boolean) => {
    setEnhancementEnabled(value);
    updateConfig(value, enhancementOptions, { temperature, creativityLevel });
  };

  const handleOptionToggle = (optionId: string) => {
    const updatedOptions = enhancementOptions.map(opt => 
      opt.id === optionId ? { ...opt, enabled: !opt.enabled } : opt
    );
    setEnhancementOptions(updatedOptions);
    updateConfig(enhancementEnabled, updatedOptions, { temperature, creativityLevel });
  };

  const handleTemperatureChange = (value: number[]) => {
    setTemperature(value[0]);
    updateConfig(enhancementEnabled, enhancementOptions, { temperature: value[0], creativityLevel });
  };

  const handleCreativityChange = (value: number[]) => {
    setCreativityLevel(value[0]);
    updateConfig(enhancementEnabled, enhancementOptions, { temperature, creativityLevel: value[0] });
  };

  const updateConfig = (
    enabled: boolean, 
    options: EnhancementOption[], 
    modelParams: { temperature: number, creativityLevel: number }
  ) => {
    onEnhancementConfigChange({
      enabled,
      options,
      modelParams
    });
  };

  return (
    <Card className={cn("w-full shadow-sm bg-card/70 backdrop-blur-sm animate-fade-in", className)}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Text Enhancement</CardTitle>
          <div className="flex items-center gap-2">
            <Switch 
              id="enhancement-toggle"
              checked={enhancementEnabled}
              onCheckedChange={handleEnhancementToggle}
            />
            <Label htmlFor="enhancement-toggle">
              {enhancementEnabled ? "Enabled" : "Disabled"}
            </Label>
          </div>
        </div>
        <CardDescription>
          Enhance your text data with AI-powered contextual processing
        </CardDescription>
      </CardHeader>
      
      <CardContent className={cn(
        "transition-opacity duration-300",
        enhancementEnabled ? "opacity-100" : "opacity-50 pointer-events-none"
      )}>
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4 text-primary" />
              Text Enhancement Options
            </h3>
            <div className="space-y-3">
              {enhancementOptions.map((option) => (
                <div key={option.id} className="flex items-center justify-between">
                  <div>
                    <Label 
                      htmlFor={`option-${option.id}`}
                      className="text-sm font-medium"
                    >
                      {option.name}
                    </Label>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </div>
                  <Switch 
                    id={`option-${option.id}`}
                    checked={option.enabled}
                    onCheckedChange={() => handleOptionToggle(option.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center gap-1.5">
              <Settings className="h-4 w-4 text-primary" />
              Model Parameters
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="temperature" className="text-sm">Temperature</Label>
                  <span className="text-xs font-medium">{temperature.toFixed(1)}</span>
                </div>
                <Slider 
                  id="temperature"
                  min={0} 
                  max={1} 
                  step={0.1} 
                  value={[temperature]} 
                  onValueChange={handleTemperatureChange}
                />
                <p className="text-xs text-muted-foreground">Controls randomness: lower values produce more consistent results</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="creativity" className="text-sm">Contextual Depth</Label>
                  <span className="text-xs font-medium">{creativityLevel}%</span>
                </div>
                <Slider 
                  id="creativity"
                  min={0} 
                  max={100} 
                  step={1} 
                  value={[creativityLevel]} 
                  onValueChange={handleCreativityChange}
                />
                <p className="text-xs text-muted-foreground">Higher values add more contextual information to your text data</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      {!isConfigValid && enhancementEnabled && (
        <CardFooter className="pt-0">
          <div className="w-full p-3 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-start gap-2 text-sm">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Configuration issue</p>
              <p className="text-xs">You must select at least one text enhancement option</p>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default DataEnhancer;
