import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AssessmentState, AssessmentResponse } from '@/types/assessment';
import { assessmentQuestions } from '@/data/assessmentQuestions';
import { calculateAssessmentResult } from '@/utils/assessmentScoring';
import AssessmentLanding from './AssessmentLanding';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import ResultsPage from './ResultsPage';

export default function AssessmentFlow() {
  const { toast } = useToast();
  
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentSection: 0,
    currentQuestion: 0,
    responses: [],
    timeStarted: new Date(),
    isComplete: false
  });

  const [showLanding, setShowLanding] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const sections = ['psychometric', 'technical', 'wiscar'];
  const currentQuestions = assessmentQuestions.filter(
    q => q.section === sections[assessmentState.currentSection]
  );

  const totalQuestions = assessmentQuestions.length;
  const currentQuestionIndex = assessmentQuestions.findIndex(
    q => q.id === currentQuestions[assessmentState.currentQuestion]?.id
  );

  const startAssessment = () => {
    setShowLanding(false);
    setAssessmentState(prev => ({
      ...prev,
      timeStarted: new Date()
    }));
    
    toast({
      title: "Assessment Started!",
      description: "Take your time and answer honestly for the best results.",
    });
  };

  const handleAnswer = (value: string | number) => {
    const currentQuestion = currentQuestions[assessmentState.currentQuestion];
    if (!currentQuestion) return;

    setAssessmentState(prev => {
      const existingResponseIndex = prev.responses.findIndex(
        r => r.questionId === currentQuestion.id
      );

      const newResponses = [...prev.responses];
      const newResponse: AssessmentResponse = {
        questionId: currentQuestion.id,
        value
      };

      if (existingResponseIndex >= 0) {
        newResponses[existingResponseIndex] = newResponse;
      } else {
        newResponses.push(newResponse);
      }

      return {
        ...prev,
        responses: newResponses
      };
    });
  };

  const getCurrentResponse = () => {
    const currentQuestion = currentQuestions[assessmentState.currentQuestion];
    if (!currentQuestion) return undefined;

    const response = assessmentState.responses.find(
      r => r.questionId === currentQuestion.id
    );
    return response?.value;
  };

  const goToNext = async () => {
    setIsLoading(true);
    
    // Simulate a brief loading state for better UX
    await new Promise(resolve => setTimeout(resolve, 300));

    setAssessmentState(prev => {
      // If we're at the last question of the current section
      if (prev.currentQuestion >= currentQuestions.length - 1) {
        // If we're at the last section, complete the assessment
        if (prev.currentSection >= sections.length - 1) {
          const result = calculateAssessmentResult(prev.responses);
          return {
            ...prev,
            isComplete: true,
            result
          };
        } else {
          // Move to next section
          return {
            ...prev,
            currentSection: prev.currentSection + 1,
            currentQuestion: 0
          };
        }
      } else {
        // Move to next question in current section
        return {
          ...prev,
          currentQuestion: prev.currentQuestion + 1
        };
      }
    });
    
    setIsLoading(false);
  };

  const goToPrevious = () => {
    setAssessmentState(prev => {
      // If we're at the first question of the current section
      if (prev.currentQuestion <= 0) {
        // If we're at the first section, can't go back further
        if (prev.currentSection <= 0) {
          return prev;
        } else {
          // Move to previous section, last question
          const prevSectionQuestions = assessmentQuestions.filter(
            q => q.section === sections[prev.currentSection - 1]
          );
          return {
            ...prev,
            currentSection: prev.currentSection - 1,
            currentQuestion: prevSectionQuestions.length - 1
          };
        }
      } else {
        // Move to previous question in current section
        return {
          ...prev,
          currentQuestion: prev.currentQuestion - 1
        };
      }
    });
  };

  const canGoNext = () => {
    const currentResponse = getCurrentResponse();
    return currentResponse !== undefined && currentResponse !== '';
  };

  const canGoPrevious = () => {
    return assessmentState.currentSection > 0 || assessmentState.currentQuestion > 0;
  };

  const restartAssessment = () => {
    setAssessmentState({
      currentSection: 0,
      currentQuestion: 0,
      responses: [],
      timeStarted: new Date(),
      isComplete: false
    });
    setShowLanding(true);
  };

  // Show loading state if questions aren't loaded
  if (assessmentQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading assessment...</p>
        </div>
      </div>
    );
  }

  // Show landing page
  if (showLanding) {
    return <AssessmentLanding onStartAssessment={startAssessment} />;
  }

  // Show results page
  if (assessmentState.isComplete && assessmentState.result) {
    return (
      <ResultsPage 
        result={assessmentState.result} 
        onRestart={restartAssessment}
      />
    );
  }

  // Show assessment questions
  const currentQuestion = currentQuestions[assessmentState.currentQuestion];
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Error: Question not found</p>
          <button onClick={restartAssessment} className="mt-4 text-primary hover:underline">
            Restart Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-subtle py-8">
      <div className="container mx-auto px-4">
        <ProgressBar
          currentStep={currentQuestionIndex + 1}
          totalSteps={totalQuestions}
          currentSection={sections[assessmentState.currentSection]}
        />
        
        <QuestionCard
          question={currentQuestion}
          value={getCurrentResponse()}
          onAnswer={handleAnswer}
          onNext={goToNext}
          onPrevious={goToPrevious}
          canGoNext={canGoNext()}
          canGoPrevious={canGoPrevious()}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}