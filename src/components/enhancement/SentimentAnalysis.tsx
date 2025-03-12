
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useEnhancement } from '@/contexts/EnhancementContext';
import { BarChart2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SentimentAnalysisProps {
  onApply: () => void;
}

const SentimentAnalysis: React.FC<SentimentAnalysisProps> = ({ onApply }) => {
  const { toast } = useToast();
  const { enhancementConfigs, updateTechniqueConfig, enhancedSamples, setEnhancedSamples } = useEnhancement();
  const config = enhancementConfigs.sentiment_analysis;
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleConfidenceThresholdChange = (value: number[]) => {
    updateTechniqueConfig('sentiment_analysis', {
      customParams: { confidenceThreshold: value[0] }
    });
  };

  const handleToneDetectionToggle = (checked: boolean) => {
    updateTechniqueConfig('sentiment_analysis', {
      customParams: { includeTone: checked }
    });
  };

  const handleEmotionalIntensityToggle = (checked: boolean) => {
    updateTechniqueConfig('sentiment_analysis', {
      customParams: { includeIntensity: checked }
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
          text: "I absolutely love this product! It has completely exceeded my expectations.",
          sentiment: {
            label: "Positive",
            score: 0.95,
            tone: config.customParams.includeTone ? "Enthusiastic" : undefined,
            intensity: config.customParams.includeIntensity ? "High" : undefined
          }
        },
        {
          text: "The service was okay, but it took longer than expected to arrive.",
          sentiment: {
            label: "Neutral",
            score: 0.60,
            tone: config.customParams.includeTone ? "Disappointed" : undefined,
            intensity: config.customParams.includeIntensity ? "Medium" : undefined
          }
        },
        {
          text: "This is the worst experience I've ever had. I will never use this service again.",
          sentiment: {
            label: "Negative",
            score: 0.92,
            tone: config.customParams.includeTone ? "Angry" : undefined,
            intensity: config.customParams.includeIntensity ? "High" : undefined
          }
        }
      ];
      
      setEnhancedSamples('sentiment_analysis', samples);
      toast({
        title: "Enhancement Applied",
        description: "Sentiment analysis has been applied to sample data"
      });
      
      onApply();
    }, 2000);
  };

  return (
    <Card className="w-full shadow-sm animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-primary" />
          Sentiment Analysis
        </CardTitle>
        <CardDescription>
          Analyze and categorize the emotional tone in your text data
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="confidenceThreshold" className="text-sm">Confidence Threshold</Label>
              <span className="text-xs font-medium">{config.customParams.confidenceThreshold || 0.7}</span>
            </div>
            <Slider 
              id="confidenceThreshold"
              min={0.1} 
              max={0.9} 
              step={0.1} 
              value={[config.customParams.confidenceThreshold || 0.7]} 
              onValueChange={handleConfidenceThresholdChange}
            />
            <p className="text-xs text-muted-foreground">Higher values require more confidence before labeling sentiment</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="includeTone" className="text-sm font-medium">Detect Emotional Tone</Label>
                <p className="text-xs text-muted-foreground">Identify specific emotions like joy, anger, fear</p>
              </div>
              <Switch 
                id="includeTone"
                checked={config.customParams.includeTone || false}
                onCheckedChange={handleToneDetectionToggle}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="includeIntensity" className="text-sm font-medium">Measure Emotional Intensity</Label>
                <p className="text-xs text-muted-foreground">Rate how strongly the sentiment is expressed</p>
              </div>
              <Switch 
                id="includeIntensity"
                checked={config.customParams.includeIntensity || false}
                onCheckedChange={handleEmotionalIntensityToggle}
              />
            </div>
          </div>
        </div>
        
        {enhancedSamples.sentiment_analysis.length > 0 && (
          <div className="space-y-3 border rounded-md p-3 bg-muted/30">
            <h3 className="text-sm font-medium">Sample Results</h3>
            {enhancedSamples.sentiment_analysis.map((sample, index) => (
              <div key={index} className="space-y-1.5 pb-2">
                <div className="text-xs bg-background p-2 rounded border">
                  {sample.text}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <div 
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      sample.sentiment.label === "Positive" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" :
                      sample.sentiment.label === "Negative" ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" :
                      "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {sample.sentiment.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Score: {sample.sentiment.score.toFixed(2)}
                  </div>
                  {sample.sentiment.tone && (
                    <div className="text-xs text-muted-foreground">
                      Tone: {sample.sentiment.tone}
                    </div>
                  )}
                  {sample.sentiment.intensity && (
                    <div className="text-xs text-muted-foreground">
                      Intensity: {sample.sentiment.intensity}
                    </div>
                  )}
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
              <BarChart2 className="h-4 w-4" />
              Apply Sentiment Analysis
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SentimentAnalysis;
