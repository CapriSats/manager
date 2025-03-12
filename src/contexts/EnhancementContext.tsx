
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type EnhancementTechnique = 
  | "semantic_enrichment" 
  | "entity_extraction" 
  | "sentiment_analysis" 
  | "topic_clustering";

export interface TechniqueConfig {
  temperature: number;
  creativityLevel: number;
  customParams: Record<string, any>;
}

interface EnhancementContextType {
  activeEnhancement: EnhancementTechnique | null;
  enhancementConfigs: Record<EnhancementTechnique, TechniqueConfig>;
  setActiveEnhancement: (technique: EnhancementTechnique | null) => void;
  updateTechniqueConfig: (technique: EnhancementTechnique, config: Partial<TechniqueConfig>) => void;
  enhancementEnabled: boolean;
  setEnhancementEnabled: (enabled: boolean) => void;
  enhancedSamples: Record<EnhancementTechnique, any[]>;
  setEnhancedSamples: (technique: EnhancementTechnique, samples: any[]) => void;
}

const defaultConfig: TechniqueConfig = {
  temperature: 0.7,
  creativityLevel: 50,
  customParams: {}
};

export const EnhancementContext = createContext<EnhancementContextType | undefined>(undefined);

export const EnhancementProvider = ({ children }: { children: ReactNode }) => {
  const [activeEnhancement, setActiveEnhancement] = useState<EnhancementTechnique | null>(null);
  const [enhancementEnabled, setEnhancementEnabled] = useState(false);
  const [enhancementConfigs, setEnhancementConfigs] = useState<Record<EnhancementTechnique, TechniqueConfig>>({
    semantic_enrichment: { ...defaultConfig, customParams: { contextDepth: 3 } },
    entity_extraction: { ...defaultConfig, customParams: { entityTypes: ['person', 'organization', 'location'] } },
    sentiment_analysis: { ...defaultConfig, customParams: { includeTone: true } },
    topic_clustering: { ...defaultConfig, customParams: { clusterCount: 5 } }
  });
  const [enhancedSamples, setEnhancedSamplesState] = useState<Record<EnhancementTechnique, any[]>>({
    semantic_enrichment: [],
    entity_extraction: [],
    sentiment_analysis: [],
    topic_clustering: []
  });

  const updateTechniqueConfig = (technique: EnhancementTechnique, config: Partial<TechniqueConfig>) => {
    setEnhancementConfigs(prev => ({
      ...prev,
      [technique]: {
        ...prev[technique],
        ...config,
        customParams: {
          ...prev[technique].customParams,
          ...(config.customParams || {})
        }
      }
    }));
  };

  const setEnhancedSamples = (technique: EnhancementTechnique, samples: any[]) => {
    setEnhancedSamplesState(prev => ({
      ...prev,
      [technique]: samples
    }));
  };

  return (
    <EnhancementContext.Provider value={{
      activeEnhancement,
      setActiveEnhancement,
      enhancementConfigs,
      updateTechniqueConfig,
      enhancementEnabled,
      setEnhancementEnabled,
      enhancedSamples,
      setEnhancedSamples
    }}>
      {children}
    </EnhancementContext.Provider>
  );
};

export const useEnhancement = () => {
  const context = useContext(EnhancementContext);
  if (context === undefined) {
    throw new Error('useEnhancement must be used within an EnhancementProvider');
  }
  return context;
};
