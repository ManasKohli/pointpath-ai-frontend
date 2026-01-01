import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WizardProgressProps {
  currentStep: number;
  totalSteps?: number;
}

const WizardProgress = ({ currentStep, totalSteps = 4 }: WizardProgressProps) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round(progress)}% complete
        </span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default WizardProgress;
