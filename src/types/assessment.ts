export interface AssessmentQuestion {
  id: string;
  section: 'psychometric' | 'technical' | 'wiscar';
  category: string;
  question: string;
  type: 'likert' | 'multiple-choice' | 'true-false' | 'scenario';
  options?: string[];
  likertScale?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
}

export interface AssessmentResponse {
  questionId: string;
  value: number | string;
}

export interface SectionScore {
  section: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface WISCARScore {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface AssessmentResult {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: WISCARScore;
  overallConfidence: number;
  recommendation: 'yes' | 'no' | 'maybe';
  strengths: string[];
  weaknesses: string[];
  nextSteps: string[];
  careerRoles: string[];
  learningPath: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  responses: AssessmentResponse[];
  timeStarted: Date;
  isComplete: boolean;
  result?: AssessmentResult;
}