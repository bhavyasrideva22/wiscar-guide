import { AssessmentQuestion } from '@/types/assessment';

export const assessmentQuestions: AssessmentQuestion[] = [
  // PSYCHOMETRIC SECTION - Interest Scale
  {
    id: 'psych_1',
    section: 'psychometric',
    category: 'interest',
    question: 'I enjoy analyzing workflows and systems to find ways to improve them.',
    type: 'likert',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'psych_2',
    section: 'psychometric',
    category: 'interest',
    question: 'I find it satisfying to identify bottlenecks and inefficiencies in processes.',
    type: 'likert',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'psych_3',
    section: 'psychometric',
    category: 'interest',
    question: 'I am naturally curious about how organizations operate and could be improved.',
    type: 'likert',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'psych_4',
    section: 'psychometric',
    category: 'personality',
    question: 'I prefer structured approaches to problem-solving over creative brainstorming.',
    type: 'likert',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'psych_5',
    section: 'psychometric',
    category: 'personality',
    question: 'I pay close attention to details and rarely overlook important information.',
    type: 'likert',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'psych_6',
    section: 'psychometric',
    category: 'personality',
    question: 'I am comfortable with change and adapting to new methodologies.',
    type: 'likert',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'psych_7',
    section: 'psychometric',
    category: 'cognitive_style',
    question: 'I excel at breaking down complex problems into manageable components.',
    type: 'likert',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'psych_8',
    section: 'psychometric',
    category: 'motivation',
    question: 'What primarily motivates you to consider process optimization consulting?',
    type: 'multiple-choice',
    options: [
      'Helping businesses become more efficient and profitable',
      'The intellectual challenge of solving complex operational problems',
      'The opportunity to work with diverse industries and companies',
      'The potential for high income and career advancement',
      'The satisfaction of creating measurable improvements'
    ]
  },

  // TECHNICAL & APTITUDE SECTION
  {
    id: 'tech_1',
    section: 'technical',
    category: 'logical_reasoning',
    question: 'In a manufacturing process, if Step A takes 5 minutes, Step B takes 3 minutes, and Step C takes 7 minutes, and all steps must be completed in sequence, what is the bottleneck?',
    type: 'multiple-choice',
    options: [
      'Step A (5 minutes)',
      'Step B (3 minutes)',
      'Step C (7 minutes)',
      'There is no bottleneck',
      'All steps are equally important'
    ]
  },
  {
    id: 'tech_2',
    section: 'technical',
    category: 'numerical_reasoning',
    question: 'A process currently produces 100 units per hour with a 15% defect rate. After optimization, it produces 120 units per hour with a 5% defect rate. What is the percentage increase in good units produced per hour?',
    type: 'multiple-choice',
    options: [
      '20%',
      '34%',
      '40%',
      '46%',
      '56%'
    ]
  },
  {
    id: 'tech_3',
    section: 'technical',
    category: 'process_knowledge',
    question: 'Which of the following is a core principle of Lean methodology?',
    type: 'multiple-choice',
    options: [
      'Maximize inventory to ensure availability',
      'Eliminate waste (muda) in all forms',
      'Focus on individual performance over team results',
      'Prioritize speed over quality',
      'Implement changes without employee input'
    ]
  },
  {
    id: 'tech_4',
    section: 'technical',
    category: 'process_knowledge',
    question: 'What does the "5S" methodology stand for in Lean?',
    type: 'multiple-choice',
    options: [
      'Sort, Set in order, Shine, Standardize, Sustain',
      'Speed, Scale, Scope, Structure, Strategy',
      'Start, Study, Solve, Support, Success',
      'System, Standard, Simplify, Streamline, Stabilize',
      'Survey, Structure, Sanitize, Secure, Schedule'
    ]
  },
  {
    id: 'tech_5',
    section: 'technical',
    category: 'data_interpretation',
    question: 'A process map shows that 40% of customer complaints come from Step 1, 25% from Step 2, 20% from Step 3, and 15% from other steps. Which step should be prioritized for improvement?',
    type: 'multiple-choice',
    options: [
      'Step 1 - highest complaint percentage',
      'Step 2 - good balance of impact and feasibility',
      'Step 3 - easier to fix than Steps 1 and 2',
      'Other steps - they represent multiple opportunities',
      'All steps should be improved simultaneously'
    ]
  },
  {
    id: 'tech_6',
    section: 'technical',
    category: 'tools_knowledge',
    question: 'Which tool would be most appropriate for documenting a current-state process?',
    type: 'multiple-choice',
    options: [
      'Fishbone diagram',
      'Pareto chart',
      'Process flowchart',
      'Control chart',
      'Scatter plot'
    ]
  },

  // WISCAR FRAMEWORK SECTION
  {
    id: 'wiscar_will_1',
    section: 'wiscar',
    category: 'will',
    question: 'How likely are you to persist with a complex optimization project even when initial results are disappointing?',
    type: 'likert',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Very Unlikely',
      maxLabel: 'Very Likely'
    }
  },
  {
    id: 'wiscar_will_2',
    section: 'wiscar',
    category: 'will',
    question: 'I am willing to invest 6-12 months learning process optimization methodologies before expecting significant income.',
    type: 'likert',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'wiscar_interest_1',
    section: 'wiscar',
    category: 'interest',
    question: 'How often do you find yourself thinking about ways to improve everyday processes (at work, home, etc.)?',
    type: 'likert',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Never',
      maxLabel: 'Very Often'
    }
  },
  {
    id: 'wiscar_interest_2',
    section: 'wiscar',
    category: 'interest',
    question: 'I would enjoy spending hours analyzing data to identify process improvements.',
    type: 'likert',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'wiscar_skill_1',
    section: 'wiscar',
    category: 'skill',
    question: 'What is your current level of experience with process improvement methodologies?',
    type: 'multiple-choice',
    options: [
      'No formal experience or training',
      'Basic understanding from reading or brief training',
      'Some practical experience in a work setting',
      'Significant experience leading improvement projects',
      'Expert level with certifications (Six Sigma, Lean, etc.)'
    ]
  },
  {
    id: 'wiscar_skill_2',
    section: 'wiscar',
    category: 'skill',
    question: 'How comfortable are you with data analysis tools like Excel, SQL, or specialized software?',
    type: 'multiple-choice',
    options: [
      'Not comfortable - would need extensive training',
      'Basic skills - can perform simple tasks',
      'Intermediate - comfortable with most functions',
      'Advanced - can create complex analyses',
      'Expert - can train others and build sophisticated models'
    ]
  },
  {
    id: 'wiscar_cognitive_1',
    section: 'wiscar',
    category: 'cognitive',
    question: 'When faced with a complex system, I can quickly identify the key relationships and dependencies.',
    type: 'likert',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'wiscar_ability_1',
    section: 'wiscar',
    category: 'ability',
    question: 'How do you typically respond to constructive feedback about your work?',
    type: 'multiple-choice',
    options: [
      'I sometimes get defensive but try to learn from it',
      'I appreciate it and actively seek ways to improve',
      'I listen politely but rarely change my approach',
      'I get frustrated and prefer to work independently',
      'I eagerly ask for more specific guidance and examples'
    ]
  },
  {
    id: 'wiscar_realworld_1',
    section: 'wiscar',
    category: 'realWorld',
    question: 'Which work environment would you prefer as a process optimization consultant?',
    type: 'multiple-choice',
    options: [
      'Large corporations with established processes',
      'Small to medium businesses needing significant improvements',
      'Manufacturing companies with physical processes',
      'Service organizations with people-centered processes',
      'Mix of different industries and company sizes'
    ]
  },
  {
    id: 'wiscar_realworld_2',
    section: 'wiscar',
    category: 'realWorld',
    question: 'What type of compensation structure would you prefer?',
    type: 'multiple-choice',
    options: [
      'Steady salary with predictable income',
      'Project-based fees with variable income',
      'Combination of base pay and performance bonuses',
      'Equity/profit-sharing in client improvements',
      'Hourly consulting rates'
    ]
  }
];

export const sectionTitles = {
  psychometric: 'Psychological Fit Assessment',
  technical: 'Technical Readiness Evaluation',
  wiscar: 'WISCAR Framework Analysis'
};

export const sectionDescriptions = {
  psychometric: 'Evaluate your personality traits, interests, and motivational alignment with process optimization consulting.',
  technical: 'Assess your current knowledge and aptitude for the technical aspects of process optimization.',
  wiscar: 'Comprehensive evaluation using our WISCAR framework: Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment.'
};