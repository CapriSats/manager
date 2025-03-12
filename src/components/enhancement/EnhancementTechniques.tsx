
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnhancementTechnique, useEnhancement } from '@/contexts/EnhancementContext';
import { Book, Tag, BarChart2, Network } from 'lucide-react';

interface EnhancementTechniquesProps {
  className?: string;
}

const techniques: {
  id: EnhancementTechnique;
  name: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "semantic_enrichment",
    name: "Semantic Enrichment",
    description: "Add contextual information to text data",
    icon: <Book className="h-5 w-5" />
  },
  {
    id: "entity_extraction",
    name: "Entity Extraction",
    description: "Identify key entities in text",
    icon: <Tag className="h-5 w-5" />
  },
  {
    id: "sentiment_analysis",
    name: "Sentiment Analysis",
    description: "Analyze emotional tone in text",
    icon: <BarChart2 className="h-5 w-5" />
  },
  {
    id: "topic_clustering",
    name: "Topic Clustering",
    description: "Group similar text content",
    icon: <Network className="h-5 w-5" />
  }
];

const EnhancementTechniques: React.FC<EnhancementTechniquesProps> = ({ className }) => {
  const { activeEnhancement, setActiveEnhancement, enhancementEnabled, setEnhancementEnabled } = useEnhancement();

  const handleTechniqueSelect = (techniqueId: EnhancementTechnique) => {
    setActiveEnhancement(techniqueId);
    setEnhancementEnabled(true);
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">Text Enhancement Techniques</CardTitle>
      </CardHeader>
      
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {techniques.map((technique) => (
          <Button
            key={technique.id}
            variant={activeEnhancement === technique.id ? "default" : "outline"}
            className="h-auto py-4 px-4 justify-start gap-3"
            onClick={() => handleTechniqueSelect(technique.id)}
          >
            <div className={`p-2 rounded-full ${
              activeEnhancement === technique.id 
                ? "bg-primary-foreground" 
                : "bg-muted"
            }`}>
              {technique.icon}
            </div>
            <div className="text-left">
              <div className="font-medium">{technique.name}</div>
              <div className="text-xs text-muted-foreground">{technique.description}</div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default EnhancementTechniques;
