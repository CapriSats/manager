
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepProps {
  number: number;
  title: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const Step: React.FC<StepProps> = ({
  number,
  title,
  icon,
  onClick,
  disabled = false,
  children
}) => (
  <div> {/* This is just a placeholder for the component definition */}
    {children}
  </div>
);

interface StepsProps {
  children: React.ReactNode;
  currentStep: number;
  completedSteps: number[];
}

export const Steps: React.FC<StepsProps> = ({
  children,
  currentStep,
  completedSteps
}) => {
  // Convert children to array and filter out non-Step components
  const steps = React.Children.toArray(children)
    .filter((child) => React.isValidElement(child) && child.type === Step)
    .map((child, index) => {
      if (!React.isValidElement(child)) return null;
      
      const stepNumber = (child.props as StepProps).number;
      const isActive = stepNumber === currentStep;
      const isCompleted = completedSteps.includes(stepNumber);
      const isClickable = (child.props as StepProps).onClick && !(child.props as StepProps).disabled;
      
      return (
        <li key={`step-${stepNumber}`} className="relative">
          <div 
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ease-in-out",
              isActive && "bg-primary/10",
              isClickable && !isActive && "cursor-pointer hover:bg-secondary",
              (child.props as StepProps).disabled && "opacity-50"
            )}
            onClick={() => {
              if (isClickable && (child.props as StepProps).onClick) {
                (child.props as StepProps).onClick();
              }
            }}
          >
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-out",
                isCompleted ? "bg-primary text-white" : "bg-muted border border-border"
              )}
            >
              {isCompleted ? (
                <Check className="h-4 w-4" />
              ) : (
                (child.props as StepProps).icon || <span>{stepNumber}</span>
              )}
            </div>
            <div>
              <p className={cn(
                "font-medium text-sm transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}>
                {(child.props as StepProps).title}
              </p>
            </div>
          </div>
          
          {index < React.Children.count(children) - 1 && (
            <div className="ml-4 h-5 border-l border-muted my-1"></div>
          )}
        </li>
      );
    });
  
  return (
    <ul className="space-y-0 animate-fade-in">
      {steps}
    </ul>
  );
};
