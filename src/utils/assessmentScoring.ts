import { AssessmentResponse, AssessmentResult, WISCARScore } from '@/types/assessment';
import { assessmentQuestions } from '@/data/assessmentQuestions';

export function calculateAssessmentResult(responses: AssessmentResponse[]): AssessmentResult {
  const responseMap = new Map(responses.map(r => [r.questionId, r.value]));
  
  // Calculate Psychometric Score
  const psychometricQuestions = assessmentQuestions.filter(q => q.section === 'psychometric');
  const psychometricScore = calculateSectionScore(psychometricQuestions, responseMap, 'psychometric');
  
  // Calculate Technical Score
  const technicalQuestions = assessmentQuestions.filter(q => q.section === 'technical');
  const technicalScore = calculateSectionScore(technicalQuestions, responseMap, 'technical');
  
  // Calculate WISCAR Scores
  const wiscarScores = calculateWISCARScores(responseMap);
  
  // Calculate Overall Confidence
  const overallConfidence = Math.round(
    (psychometricScore * 0.3 + technicalScore * 0.3 + 
     (Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) * 0.4)
  );
  
  // Determine Recommendation
  let recommendation: 'yes' | 'no' | 'maybe';
  if (psychometricScore >= 75 && technicalScore >= 75 && overallConfidence >= 75) {
    recommendation = 'yes';
  } else if (psychometricScore >= 60 && technicalScore >= 60 && overallConfidence >= 60) {
    recommendation = 'maybe';
  } else {
    recommendation = 'no';
  }
  
  // Generate insights
  const { strengths, weaknesses } = generateInsights(psychometricScore, technicalScore, wiscarScores);
  const nextSteps = generateNextSteps(recommendation, weaknesses);
  const careerRoles = generateCareerRoles(overallConfidence);
  const learningPath = generateLearningPath(technicalScore, wiscarScores.skill);
  
  return {
    psychometricScore,
    technicalScore,
    wiscarScores,
    overallConfidence,
    recommendation,
    strengths,
    weaknesses,
    nextSteps,
    careerRoles,
    learningPath
  };
}

function calculateSectionScore(questions: any[], responseMap: Map<string, any>, section: string): number {
  let totalScore = 0;
  let maxScore = 0;
  
  questions.forEach(question => {
    const response = responseMap.get(question.id);
    if (response !== undefined) {
      if (question.type === 'likert') {
        totalScore += Number(response);
        maxScore += question.likertScale.max;
      } else if (question.type === 'multiple-choice') {
        // Scoring logic for multiple choice questions
        const score = getMultipleChoiceScore(question.id, response);
        totalScore += score;
        maxScore += 5; // Max score for multiple choice
      }
    }
  });
  
  return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
}

function calculateWISCARScores(responseMap: Map<string, any>): WISCARScore {
  const wiscarCategories = ['will', 'interest', 'skill', 'cognitive', 'ability', 'realWorld'];
  const scores: WISCARScore = {
    will: 0,
    interest: 0,
    skill: 0,
    cognitive: 0,
    ability: 0,
    realWorld: 0
  };
  
  wiscarCategories.forEach(category => {
    const categoryQuestions = assessmentQuestions.filter(
      q => q.section === 'wiscar' && q.category === category
    );
    
    let totalScore = 0;
    let maxScore = 0;
    
    categoryQuestions.forEach(question => {
      const response = responseMap.get(question.id);
      if (response !== undefined) {
        if (question.type === 'likert') {
          totalScore += Number(response);
          maxScore += question.likertScale!.max;
        } else if (question.type === 'multiple-choice') {
          const score = getMultipleChoiceScore(question.id, response);
          totalScore += score;
          maxScore += 5;
        }
      }
    });
    
    scores[category as keyof WISCARScore] = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  });
  
  return scores;
}

function getMultipleChoiceScore(questionId: string, selectedOption: string): number {
  // Scoring logic for specific multiple choice questions
  const scoringRules: Record<string, Record<string, number>> = {
    'psych_8': {
      'Helping businesses become more efficient and profitable': 5,
      'The intellectual challenge of solving complex operational problems': 4,
      'The satisfaction of creating measurable improvements': 5,
      'The opportunity to work with diverse industries and companies': 3,
      'The potential for high income and career advancement': 2
    },
    'tech_1': {
      'Step C (7 minutes)': 5,
      'Step A (5 minutes)': 2,
      'Step B (3 minutes)': 1,
      'There is no bottleneck': 0,
      'All steps are equally important': 0
    },
    'tech_2': {
      '34%': 5, // Correct answer: (120*0.95 - 100*0.85)/85 * 100 = 34%
      '46%': 3,
      '40%': 2,
      '20%': 1,
      '56%': 1
    },
    'tech_3': {
      'Eliminate waste (muda) in all forms': 5,
      'Focus on individual performance over team results': 1,
      'Prioritize speed over quality': 1,
      'Maximize inventory to ensure availability': 0,
      'Implement changes without employee input': 0
    },
    'tech_4': {
      'Sort, Set in order, Shine, Standardize, Sustain': 5,
      'Speed, Scale, Scope, Structure, Strategy': 1,
      'Start, Study, Solve, Support, Success': 1,
      'System, Standard, Simplify, Streamline, Stabilize': 2,
      'Survey, Structure, Sanitize, Secure, Schedule': 1
    },
    'tech_5': {
      'Step 1 - highest complaint percentage': 5,
      'Step 2 - good balance of impact and feasibility': 3,
      'Step 3 - easier to fix than Steps 1 and 2': 2,
      'Other steps - they represent multiple opportunities': 2,
      'All steps should be improved simultaneously': 1
    },
    'tech_6': {
      'Process flowchart': 5,
      'Fishbone diagram': 2,
      'Pareto chart': 2,
      'Control chart': 1,
      'Scatter plot': 1
    },
    'wiscar_skill_1': {
      'Expert level with certifications (Six Sigma, Lean, etc.)': 5,
      'Significant experience leading improvement projects': 4,
      'Some practical experience in a work setting': 3,
      'Basic understanding from reading or brief training': 2,
      'No formal experience or training': 1
    },
    'wiscar_skill_2': {
      'Expert - can train others and build sophisticated models': 5,
      'Advanced - can create complex analyses': 4,
      'Intermediate - comfortable with most functions': 3,
      'Basic skills - can perform simple tasks': 2,
      'Not comfortable - would need extensive training': 1
    },
    'wiscar_ability_1': {
      'I eagerly ask for more specific guidance and examples': 5,
      'I appreciate it and actively seek ways to improve': 4,
      'I sometimes get defensive but try to learn from it': 3,
      'I listen politely but rarely change my approach': 2,
      'I get frustrated and prefer to work independently': 1
    },
    'wiscar_realworld_1': {
      'Mix of different industries and company sizes': 5,
      'Small to medium businesses needing significant improvements': 4,
      'Large corporations with established processes': 3,
      'Manufacturing companies with physical processes': 3,
      'Service organizations with people-centered processes': 3
    },
    'wiscar_realworld_2': {
      'Project-based fees with variable income': 4,
      'Combination of base pay and performance bonuses': 5,
      'Hourly consulting rates': 4,
      'Equity/profit-sharing in client improvements': 3,
      'Steady salary with predictable income': 2
    }
  };
  
  return scoringRules[questionId]?.[selectedOption] || 0;
}

function generateInsights(psychometricScore: number, technicalScore: number, wiscarScores: WISCARScore): { strengths: string[], weaknesses: string[] } {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  
  // Psychometric insights
  if (psychometricScore >= 80) {
    strengths.push('Excellent psychological fit for consulting work');
  } else if (psychometricScore < 60) {
    weaknesses.push('May struggle with the psychological demands of consulting');
  }
  
  // Technical insights
  if (technicalScore >= 80) {
    strengths.push('Strong technical foundation in process optimization');
  } else if (technicalScore < 60) {
    weaknesses.push('Need to develop technical knowledge in process improvement methodologies');
  }
  
  // WISCAR insights
  if (wiscarScores.will >= 80) strengths.push('High motivation and persistence');
  else if (wiscarScores.will < 60) weaknesses.push('May lack the persistence required for long-term success');
  
  if (wiscarScores.interest >= 80) strengths.push('Genuine interest in process optimization');
  else if (wiscarScores.interest < 60) weaknesses.push('Limited natural interest in process improvement work');
  
  if (wiscarScores.skill >= 80) strengths.push('Solid existing skill base');
  else if (wiscarScores.skill < 60) weaknesses.push('Need to develop foundational skills');
  
  if (wiscarScores.cognitive >= 80) strengths.push('Excellent analytical and systems thinking abilities');
  else if (wiscarScores.cognitive < 60) weaknesses.push('May struggle with complex analytical thinking required');
  
  if (wiscarScores.ability >= 80) strengths.push('Strong learning ability and growth mindset');
  else if (wiscarScores.ability < 60) weaknesses.push('May have difficulty adapting and learning new approaches');
  
  if (wiscarScores.realWorld >= 80) strengths.push('Good alignment with real-world consulting demands');
  else if (wiscarScores.realWorld < 60) weaknesses.push('Expectations may not align with consulting reality');
  
  return { strengths, weaknesses };
}

function generateNextSteps(recommendation: 'yes' | 'no' | 'maybe', weaknesses: string[]): string[] {
  if (recommendation === 'yes') {
    return [
      'Start with Lean Six Sigma Yellow Belt certification',
      'Practice with process mapping tools like Lucidchart or Visio',
      'Join process improvement communities and forums',
      'Seek out improvement projects in your current role',
      'Consider advanced certifications (Green Belt, Black Belt)'
    ];
  } else if (recommendation === 'maybe') {
    const steps = ['Take an introductory course in process improvement'];
    
    if (weaknesses.some(w => w.includes('technical'))) {
      steps.push('Focus on building technical knowledge through online courses');
    }
    if (weaknesses.some(w => w.includes('skills'))) {
      steps.push('Develop proficiency in Excel and data analysis tools');
    }
    if (weaknesses.some(w => w.includes('interest'))) {
      steps.push('Explore process improvement through books and case studies');
    }
    
    steps.push('Shadow a process improvement consultant');
    steps.push('Reassess your fit after 3-6 months of skill development');
    
    return steps;
  } else {
    return [
      'Consider alternative careers in operations, project management, or data analysis',
      'Develop stronger analytical and technical skills before reconsidering',
      'Explore related fields like quality assurance or business analysis',
      'Focus on building the specific weaknesses identified in this assessment'
    ];
  }
}

function generateCareerRoles(overallConfidence: number): string[] {
  const allRoles = [
    'Process Optimization Consultant',
    'Business Process Analyst',
    'Continuous Improvement Manager',
    'Lean Six Sigma Specialist',
    'Operations Excellence Manager',
    'Digital Transformation Consultant',
    'Quality Assurance Manager',
    'Project Management Office (PMO) Lead'
  ];
  
  if (overallConfidence >= 75) {
    return allRoles.slice(0, 6);
  } else if (overallConfidence >= 60) {
    return allRoles.slice(1, 5);
  } else {
    return allRoles.slice(5);
  }
}

function generateLearningPath(technicalScore: number, skillScore: number): { beginner: string[], intermediate: string[], advanced: string[] } {
  return {
    beginner: [
      'Introduction to Lean Manufacturing principles',
      'Basic process mapping and flowcharting',
      'Excel fundamentals for data analysis',
      'Understanding KPIs and metrics',
      'Root cause analysis techniques'
    ],
    intermediate: [
      'Lean Six Sigma Yellow Belt certification',
      'Advanced Excel and basic SQL',
      'Value stream mapping',
      'Statistical process control',
      'Change management fundamentals',
      'Process simulation software'
    ],
    advanced: [
      'Lean Six Sigma Green/Black Belt certification',
      'Advanced statistical analysis and hypothesis testing',
      'Digital process automation tools',
      'Advanced project management (PMP/Agile)',
      'Business case development and ROI analysis',
      'Leadership and consulting skills'
    ]
  };
}