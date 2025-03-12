
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: string[];
  className?: string;
  onComplete?: () => void;
  isCompleteEnabled?: boolean;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  tabs,
  className,
  onComplete,
  isCompleteEnabled = false
}) => {
  const currentIndex = tabs.indexOf(activeTab);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === tabs.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setActiveTab(tabs[currentIndex + 1]);
    } else if (onComplete) {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (!isFirst) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  return (
    <div className={cn('flex justify-between items-center', className)}>
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={isFirst}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <div className="flex gap-1">
        {tabs.map((tab, index) => (
          <div
            key={tab}
            className={cn(
              'w-2 h-2 rounded-full',
              index === currentIndex
                ? 'bg-primary'
                : index < currentIndex
                ? 'bg-primary/40'
                : 'bg-gray-200 dark:bg-gray-700'
            )}
          />
        ))}
      </div>

      <Button
        onClick={handleNext}
        disabled={isLast && !isCompleteEnabled}
        className="flex items-center gap-1"
        variant={isLast && onComplete ? "default" : "outline"}
      >
        {isLast && onComplete ? 'Complete' : 'Next'}
        {!isLast && <ChevronRight className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default TabNavigation;
