import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AssessmentResult } from '@/types/assessment';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Brain,
  Target,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  Download,
  Share
} from 'lucide-react';

interface ResultsPageProps {
  result: AssessmentResult;
  onRestart: () => void;
}

export default function ResultsPage({ result, onRestart }: ResultsPageProps) {
  const getRecommendationConfig = (recommendation: string) => {
    switch (recommendation) {
      case 'yes':
        return {
          icon: CheckCircle2,
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          title: 'Excellent Fit!',
          description: 'You show strong potential for success as a Process Optimization Consultant.'
        };
      case 'maybe':
        return {
          icon: AlertTriangle,
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          title: 'Moderate Fit',
          description: 'You have potential but may need to develop certain skills before pursuing this career.'
        };
      case 'no':
        return {
          icon: XCircle,
          color: 'text-destructive',
          bgColor: 'bg-destructive/10',
          borderColor: 'border-destructive/20',
          title: 'Consider Alternatives',
          description: 'This career path may not be the best fit based on your current profile.'
        };
      default:
        return {
          icon: AlertTriangle,
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/10',
          borderColor: 'border-muted/20',
          title: 'Assessment Complete',
          description: 'Review your results below.'
        };
    }
  };

  const recommendationConfig = getRecommendationConfig(result.recommendation);
  const RecommendationIcon = recommendationConfig.icon;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  return (
    <div className="min-h-screen gradient-subtle py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${recommendationConfig.bgColor} ${recommendationConfig.borderColor} border-2 mb-6`}>
            <RecommendationIcon className={`w-6 h-6 ${recommendationConfig.color}`} />
            <span className={`font-semibold text-lg ${recommendationConfig.color}`}>
              {recommendationConfig.title}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {recommendationConfig.description}
          </p>
        </div>

        {/* Overall Confidence Score */}
        <Card className="mb-8 shadow-large">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Overall Confidence Score</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative inline-block">
              <div className={`text-6xl font-bold ${getScoreColor(result.overallConfidence)} mb-2`}>
                {result.overallConfidence}%
              </div>
              <Badge variant="secondary" className="absolute -top-2 -right-8">
                {getScoreBadge(result.overallConfidence)}
              </Badge>
            </div>
            <Progress value={result.overallConfidence} className="w-64 h-3 mx-auto mt-4" />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Section Scores */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Assessment Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Psychological Fit</span>
                    <span className={`font-bold ${getScoreColor(result.psychometricScore)}`}>
                      {result.psychometricScore}%
                    </span>
                  </div>
                  <Progress value={result.psychometricScore} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Technical Readiness</span>
                    <span className={`font-bold ${getScoreColor(result.technicalScore)}`}>
                      {result.technicalScore}%
                    </span>
                  </div>
                  <Progress value={result.technicalScore} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* WISCAR Scores */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                WISCAR Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(result.wiscarScores).map(([key, score]) => (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium capitalize">{key}</span>
                    <span className={`font-bold text-sm ${getScoreColor(score)}`}>
                      {score}%
                    </span>
                  </div>
                  <Progress value={score} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <CheckCircle2 className="w-5 h-5" />
                Your Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertTriangle className="w-5 h-5" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Career Roles */}
        <Card className="mb-8 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Recommended Career Roles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {result.careerRoles.map((role, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <Award className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-medium">{role}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Your Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {result.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Learning Path */}
        <Card className="mb-8 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Recommended Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3 text-accent">Beginner</h4>
                <ul className="space-y-2">
                  {result.learningPath.beginner.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-3 text-primary">Intermediate</h4>
                <ul className="space-y-2">
                  {result.learningPath.intermediate.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-3 text-success">Advanced</h4>
                <ul className="space-y-2">
                  {result.learningPath.advanced.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-3 h-3 text-success mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="lg" onClick={onRestart}>
            Take Assessment Again
          </Button>
          <Button variant="outline" size="lg">
            <Download className="w-4 h-4 mr-2" />
            Download Results
          </Button>
          <Button variant="outline" size="lg">
            <Share className="w-4 h-4 mr-2" />
            Share Results
          </Button>
        </div>
      </div>
    </div>
  );
}