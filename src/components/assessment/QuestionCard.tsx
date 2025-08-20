import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AssessmentQuestion } from '@/types/assessment';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuestionCardProps {
  question: AssessmentQuestion;
  value?: string | number;
  onAnswer: (value: string | number) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLoading?: boolean;
}

export default function QuestionCard({
  question,
  value,
  onAnswer,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isLoading
}: QuestionCardProps) {
  const [selectedValue, setSelectedValue] = useState<string>(value?.toString() || '');

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    onAnswer(question.type === 'likert' ? Number(newValue) : newValue);
  };

  const renderLikertScale = () => {
    if (!question.likertScale) return null;
    
    const { min, max, minLabel, maxLabel } = question.likertScale;
    const options = [];
    
    for (let i = min; i <= max; i++) {
      options.push(i);
    }
    
    return (
      <div className="space-y-6">
        <RadioGroup
          value={selectedValue}
          onValueChange={handleValueChange}
          className="flex flex-col space-y-4"
        >
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
              <RadioGroupItem value={option.toString()} id={`option-${option}`} />
              <Label 
                htmlFor={`option-${option}`} 
                className="flex-1 cursor-pointer font-medium"
              >
                <div className="flex justify-between items-center">
                  <span>{option}</span>
                  {option === min && <span className="text-sm text-muted-foreground">{minLabel}</span>}
                  {option === max && <span className="text-sm text-muted-foreground">{maxLabel}</span>}
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        <div className="flex justify-between text-sm text-muted-foreground mt-4">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      </div>
    );
  };

  const renderMultipleChoice = () => {
    if (!question.options) return null;
    
    return (
      <RadioGroup
        value={selectedValue}
        onValueChange={handleValueChange}
        className="space-y-3"
      >
        {question.options.map((option, index) => (
          <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-smooth border border-transparent hover:border-border">
            <RadioGroupItem value={option} id={`option-${index}`} className="mt-1" />
            <Label 
              htmlFor={`option-${index}`} 
              className="flex-1 cursor-pointer leading-relaxed"
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    );
  };

  const getSectionBadgeColor = (section: string) => {
    switch (section) {
      case 'psychometric':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'technical':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'wiscar':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-large">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getSectionBadgeColor(question.section)}`}>
              {question.section.charAt(0).toUpperCase() + question.section.slice(1)} Section
            </div>
            <div className="text-sm text-muted-foreground">
              {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
            </div>
          </div>
          
          <CardTitle className="text-xl md:text-2xl leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="min-h-[200px]">
            {question.type === 'likert' && renderLikertScale()}
            {question.type === 'multiple-choice' && renderMultipleChoice()}
          </div>
          
          <div className="flex justify-between items-center pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={!canGoPrevious || isLoading}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <Button
              variant="hero"
              onClick={onNext}
              disabled={!canGoNext || !selectedValue || isLoading}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}