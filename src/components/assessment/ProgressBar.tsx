import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  currentSection: string;
}

export default function ProgressBar({ currentStep, totalSteps, currentSection }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  const getSectionColor = (section: string) => {
    switch (section) {
      case 'psychometric':
        return 'text-accent';
      case 'technical':
        return 'text-primary';
      case 'wiscar':
        return 'text-success';
      default:
        return 'text-foreground';
    }
  };
  
  return (
    <div className="w-full bg-card shadow-soft rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className={`font-semibold text-lg ${getSectionColor(currentSection)}`}>
            {currentSection === 'psychometric' && 'Psychological Fit Assessment'}
            {currentSection === 'technical' && 'Technical Readiness Evaluation'}
            {currentSection === 'wiscar' && 'WISCAR Framework Analysis'}
          </h3>
          <p className="text-sm text-muted-foreground">
            Question {currentStep} of {totalSteps}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            {Math.round(progress)}%
          </div>
          <div className="text-sm text-muted-foreground">Complete</div>
        </div>
      </div>
      
      <Progress value={progress} className="h-3" />
      
      <div className="flex justify-between text-xs text-muted-foreground mt-2">
        <span>Start</span>
        <span>Complete</span>
      </div>
    </div>
  );
}