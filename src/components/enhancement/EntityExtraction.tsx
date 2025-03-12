
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useEnhancement } from '@/contexts/EnhancementContext';
import { Tag, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EntityExtractionProps {
  onApply: () => void;
}

const EntityExtraction: React.FC<EntityExtractionProps> = ({ onApply }) => {
  const { toast } = useToast();
  const { enhancementConfigs, updateTechniqueConfig, enhancedSamples, setEnhancedSamples } = useEnhancement();
  const config = enhancementConfigs.entity_extraction;
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleTemperatureChange = (value: number[]) => {
    updateTechniqueConfig('entity_extraction', { temperature: value[0] });
  };

  const toggleEntityType = (type: string, enabled: boolean) => {
    const currentTypes = config.customParams.entityTypes || [];
    let newTypes;
    
    if (enabled) {
      newTypes = [...currentTypes, type];
    } else {
      newTypes = currentTypes.filter(t => t !== type);
    }
    
    updateTechniqueConfig('entity_extraction', {
      customParams: { entityTypes: newTypes }
    });
  };

  const isEntityTypeEnabled = (type: string) => {
    return (config.customParams.entityTypes || []).includes(type);
  };

  const handleApply = () => {
    setIsProcessing(true);
    
    // Simulate processing with timeout
    setTimeout(() => {
      setIsProcessing(false);
      
      // Create sample enhanced data
      const samples = [
        {
          original: "Apple is planning to open a new store in London next month, according to CEO Tim Cook.",
          entities: [
            { text: "Apple", type: "organization", confidence: 0.98 },
            { text: "London", type: "location", confidence: 0.96 },
            { text: "Tim Cook", type: "person", confidence: 0.95 }
          ]
        },
        {
          original: "The European Union announced new climate regulations that will affect industries across France and Germany.",
          entities: [
            { text: "European Union", type: "organization", confidence: 0.97 },
            { text: "France", type: "location", confidence: 0.94 },
            { text: "Germany", type: "location", confidence: 0.94 }
          ]
        }
      ];
      
      setEnhancedSamples('entity_extraction', samples);
      toast({
        title: "Enhancement Applied",
        description: "Entity extraction has been applied to sample data"
      });
      
      onApply();
    }, 2000);
  };

  return (
    <Card className="w-full shadow-sm animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          Entity Extraction
        </CardTitle>
        <CardDescription>
          Identify and extract key entities from your text data for improved searchability and organization
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="temperature" className="text-sm">Detection Sensitivity</Label>
              <span className="text-xs font-medium">{config.temperature.toFixed(1)}</span>
            </div>
            <Slider 
              id="temperature"
              min={0} 
              max={1} 
              step={0.1} 
              value={[config.temperature]} 
              onValueChange={handleTemperatureChange}
            />
            <p className="text-xs text-muted-foreground">Lower values make entity detection more conservative, higher values more inclusive</p>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm">Entity Types to Extract</Label>
            <div className="grid grid-cols-2 gap-3 pt-1">
              {['person', 'organization', 'location', 'date', 'product', 'event'].map((type) => (
                <div key={type} className="flex items-center justify-between space-x-2 bg-muted/40 p-2 rounded-md">
                  <Label htmlFor={`entity-${type}`} className="text-sm capitalize">
                    {type}
                  </Label>
                  <Switch 
                    id={`entity-${type}`}
                    checked={isEntityTypeEnabled(type)}
                    onCheckedChange={(checked) => toggleEntityType(type, checked)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {enhancedSamples.entity_extraction.length > 0 && (
          <div className="space-y-3 border rounded-md p-3 bg-muted/30">
            <h3 className="text-sm font-medium">Sample Results</h3>
            {enhancedSamples.entity_extraction.map((sample, index) => (
              <div key={index} className="space-y-1.5">
                <div className="text-xs bg-background p-2 rounded border">
                  {sample.original}
                </div>
                <div className="flex flex-wrap gap-1.5 py-1">
                  {sample.entities.map((entity, idx) => (
                    <div 
                      key={idx} 
                      className="inline-flex items-center gap-1 text-xs rounded-full px-2 py-0.5 bg-blue-50 border border-blue-100 text-blue-700 dark:bg-blue-950/30 dark:border-blue-900 dark:text-blue-400"
                    >
                      <span className="font-medium">{entity.text}</span>
                      <span className="opacity-70 capitalize">({entity.type})</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleApply} 
          disabled={isProcessing}
          className="w-full gap-2"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Tag className="h-4 w-4" />
              Apply Entity Extraction
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EntityExtraction;
