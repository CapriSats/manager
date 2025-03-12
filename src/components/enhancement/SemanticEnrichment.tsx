import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEnhancement } from '@/contexts/EnhancementContext';
import { Sparkles, Book, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SemanticEnrichmentProps {
  onApply: () => void;
}

const SemanticEnrichment: React.FC<SemanticEnrichmentProps> = ({ onApply }) => {
  const { toast } = useToast();
  const { enhancementConfigs, updateTechniqueConfig, enhancedSamples, setEnhancedSamples } = useEnhancement();
  const config = enhancementConfigs.semantic_enrichment;
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleContextDepthChange = (value: number[]) => {
    updateTechniqueConfig('semantic_enrichment', {
      customParams: { contextDepth: value[0] }
    });
  };

  const handleTemperatureChange = (value: number[]) => {
    updateTechniqueConfig('semantic_enrichment', { temperature: value[0] });
  };

  const handleCreativityChange = (value: number[]) => {
    updateTechniqueConfig('semantic_enrichment', { creativityLevel: value[0] });
  };

  const handleUseExternalKnowledge = (checked: boolean) => {
    updateTechniqueConfig('semantic_enrichment', {
      customParams: { useExternalKnowledge: checked }
    });
  };

  const handleApply = () => {
    setIsProcessing(true);
    
    // Simulate processing with timeout
    setTimeout(() => {
      setIsProcessing(false);
      
      // Create sample enhanced data
      const samples = [
        {
          original: "Apple released a new iPhone model.",
          enhanced: "Apple Inc., a leading technology company founded by Steve Jobs, released their latest iPhone model, which continues their line of premium smartphones featuring cutting-edge hardware and iOS software."
        },
        {
          original: "The president will address the nation tomorrow.",
          enhanced: "The President of the United States will deliver an official address to the nation tomorrow, continuing the traditional practice of executive communication with citizens on matters of national significance."
        }
      ];
      
      setEnhancedSamples('semantic_enrichment', samples);
      toast({
        title: "Enhancement Applied",
        description: "Semantic enrichment has been applied to sample data"
      });
      
      onApply();
    }, 2000);
  };

  return (
    <Card className="w-full shadow-sm animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5 text-primary" />
          Semantic Enrichment
        </CardTitle>
        <CardDescription>
          Add contextual information to improve text understanding and provide richer knowledge representation
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="contextDepth" className="text-sm">Context Depth</Label>
              <span className="text-xs font-medium">{config.customParams.contextDepth || 3}</span>
            </div>
            <Slider 
              id="contextDepth"
              min={1} 
              max={5} 
              step={1} 
              value={[config.customParams.contextDepth || 3]} 
              onValueChange={handleContextDepthChange}
            />
            <p className="text-xs text-muted-foreground">Higher values add more detailed contextual information</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="temperature" className="text-sm">Temperature</Label>
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
            <p className="text-xs text-muted-foreground">Controls randomness: lower values produce more consistent results</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="creativity" className="text-sm">Creativity Level</Label>
              <span className="text-xs font-medium">{config.creativityLevel}%</span>
            </div>
            <Slider 
              id="creativity"
              min={0} 
              max={100} 
              step={1} 
              value={[config.creativityLevel]} 
              onValueChange={handleCreativityChange}
            />
            <p className="text-xs text-muted-foreground">Higher values encourage more creative and diverse text enrichment</p>
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="useExternalKnowledge" 
              checked={config.customParams.useExternalKnowledge || false}
              onCheckedChange={handleUseExternalKnowledge}
            />
            <Label htmlFor="useExternalKnowledge" className="text-sm">Use external knowledge sources</Label>
          </div>
        </div>
        
        {enhancedSamples.semantic_enrichment.length > 0 && (
          <div className="space-y-3 border rounded-md p-3 bg-muted/30">
            <h3 className="text-sm font-medium">Sample Results</h3>
            {enhancedSamples.semantic_enrichment.map((sample, index) => (
              <div key={index} className="space-y-1.5">
                <div className="text-xs bg-background p-2 rounded border">
                  <span className="font-medium">Original:</span> {sample.original}
                </div>
                <div className="text-xs bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-100 dark:border-green-900">
                  <span className="font-medium text-green-700 dark:text-green-400">Enhanced:</span> {sample.enhanced}
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
              <Sparkles className="h-4 w-4" />
              Apply Semantic Enrichment
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SemanticEnrichment;
