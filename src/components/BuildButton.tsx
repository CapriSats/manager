
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, MessageSquare } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { useEnhancement } from '@/contexts/EnhancementContext';

interface BuildButtonProps {
  onClick: () => void;
  isBuilding: boolean;
  isComplete: boolean;
  isValid: boolean;
  className?: string;
}

const BuildButton: React.FC<BuildButtonProps> = ({
  onClick,
  isBuilding,
  isComplete,
  isValid,
  className
}) => {
  const { toast } = useToast();
  const { enhancementEnabled, activeEnhancement } = useEnhancement();
  
  const handleClick = () => {
    if (!isValid) {
      toast({
        variant: "destructive",
        title: "Invalid configuration",
        description: "Please select a dataset and at least one column"
      });
      return;
    }
    
    onClick();
  };
  
  let buttonText = "Build Text Knowledge Store";
  let icon = <MessageSquare className="h-5 w-5 mr-2" />;
  
  if (enhancementEnabled) {
    buttonText = activeEnhancement
      ? `Build with ${activeEnhancement.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`
      : "Build with Text Enhancement";
    icon = <Sparkles className="h-5 w-5 mr-2" />;
  }
  
  if (isBuilding) {
    buttonText = "Building...";
    icon = <Loader2 className="h-5 w-5 mr-2 animate-spin" />;
  }
  
  if (isComplete) {
    buttonText = "Text Knowledge Store Built";
    icon = <MessageSquare className="h-5 w-5 mr-2" />;
  }
  
  return (
    <Button
      variant={isComplete ? "outline" : "default"}
      size="lg"
      className={cn(
        "font-medium h-12 transition-all duration-300",
        isComplete && "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 dark:bg-green-950/30 dark:border-green-800 dark:text-green-400",
        className
      )}
      onClick={handleClick}
      disabled={isBuilding || isComplete || !isValid}
    >
      {icon}
      {buttonText}
    </Button>
  );
};

export default BuildButton;
