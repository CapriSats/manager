
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEnhancement } from '@/contexts/EnhancementContext';
import { Network, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TopicClusteringProps {
  onApply: () => void;
}

const TopicClustering: React.FC<TopicClusteringProps> = ({ onApply }) => {
  const { toast } = useToast();
  const { enhancementConfigs, updateTechniqueConfig, enhancedSamples, setEnhancedSamples } = useEnhancement();
  const config = enhancementConfigs.topic_clustering;
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleClusterCountChange = (value: number[]) => {
    updateTechniqueConfig('topic_clustering', {
      customParams: { clusterCount: value[0] }
    });
  };

  const handleMinClusterSizeChange = (value: number[]) => {
    updateTechniqueConfig('topic_clustering', {
      customParams: { minClusterSize: value[0] }
    });
  };

  const handleStopwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const words = e.target.value.split(',').map(word => word.trim());
    updateTechniqueConfig('topic_clustering', {
      customParams: { stopwords: words }
    });
  };

  const handleApply = () => {
    setIsProcessing(true);
    
    // Simulate processing with timeout
    setTimeout(() => {
      setIsProcessing(false);
      
      // Create sample clustering results
      const clusters = [
        {
          id: 1,
          name: "Product Features",
          keyTerms: ["design", "functionality", "performance", "quality"],
          documentCount: 15,
          sampleTexts: [
            "The new design includes improved performance features",
            "Quality of the product exceeded our expectations"
          ]
        },
        {
          id: 2,
          name: "Customer Service",
          keyTerms: ["support", "response", "helpful", "resolution"],
          documentCount: 12,
          sampleTexts: [
            "Customer support was very helpful with my issue",
            "Fast response time from the support team"
          ]
        },
        {
          id: 3,
          name: "Pricing Concerns",
          keyTerms: ["cost", "expensive", "value", "price"],
          documentCount: 8,
          sampleTexts: [
            "The price point seems high compared to competitors",
            "Not sure if the cost provides enough value"
          ]
        }
      ];
      
      setEnhancedSamples('topic_clustering', clusters);
      toast({
        title: "Enhancement Applied",
        description: "Topic clustering has been applied to sample data"
      });
      
      onApply();
    }, 3000);
  };

  return (
    <Card className="w-full shadow-sm animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5 text-primary" />
          Topic Clustering
        </CardTitle>
        <CardDescription>
          Group similar text content into meaningful topics and discover patterns in your data
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="clusterCount" className="text-sm">Target Cluster Count</Label>
              <span className="text-xs font-medium">{config.customParams.clusterCount || 5}</span>
            </div>
            <Slider 
              id="clusterCount"
              min={2} 
              max={10} 
              step={1} 
              value={[config.customParams.clusterCount || 5]} 
              onValueChange={handleClusterCountChange}
            />
            <p className="text-xs text-muted-foreground">The ideal number of topic clusters to generate</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="minClusterSize" className="text-sm">Minimum Cluster Size</Label>
              <span className="text-xs font-medium">{config.customParams.minClusterSize || 3}</span>
            </div>
            <Slider 
              id="minClusterSize"
              min={1} 
              max={10} 
              step={1} 
              value={[config.customParams.minClusterSize || 3]} 
              onValueChange={handleMinClusterSizeChange}
            />
            <p className="text-xs text-muted-foreground">Minimum number of texts required to form a cluster</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stopwords" className="text-sm">Custom Stopwords</Label>
            <Input 
              id="stopwords"
              placeholder="Enter words to ignore, separated by commas"
              defaultValue={(config.customParams.stopwords || []).join(', ')}
              onChange={handleStopwordChange}
            />
            <p className="text-xs text-muted-foreground">Words to exclude from topic analysis (e.g., common words)</p>
          </div>
        </div>
        
        {enhancedSamples.topic_clustering.length > 0 && (
          <div className="space-y-3 border rounded-md p-3 bg-muted/30">
            <h3 className="text-sm font-medium">Sample Clusters</h3>
            <div className="space-y-3">
              {enhancedSamples.topic_clustering.map((cluster, index) => (
                <div key={index} className="bg-background rounded-md p-2 border">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-primary">{cluster.name}</h4>
                    <span className="text-xs text-muted-foreground">{cluster.documentCount} texts</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {cluster.keyTerms.map((term, i) => (
                      <span key={i} className="text-xs bg-muted px-1.5 py-0.5 rounded">
                        {term}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 space-y-1">
                    {cluster.sampleTexts.map((text, i) => (
                      <p key={i} className="text-xs text-muted-foreground">
                        • {text}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
              <Network className="h-4 w-4" />
              Apply Topic Clustering
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TopicClustering;
