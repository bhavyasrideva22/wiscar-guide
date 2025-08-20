import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Target, TrendingUp, Users, Zap } from 'lucide-react';
import heroImage from '@/assets/hero-consulting.jpg';

interface AssessmentLandingProps {
  onStartAssessment: () => void;
}

export default function AssessmentLanding({ onStartAssessment }: AssessmentLandingProps) {
  return (
    <div className="min-h-screen gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95"></div>
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Process optimization consulting" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Should I Become a{' '}
              <span className="bg-gradient-to-r from-accent-glow to-primary-glow bg-clip-text text-transparent">
                Process Optimization Consultant?
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Discover if you have the psychological fit, technical readiness, and strategic mindset 
              to succeed in process optimization consulting.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="w-5 h-5" />
                <span>25 minutes</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Target className="w-5 h-5" />
                <span>Science-based</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <TrendingUp className="w-5 h-5" />
                <span>Actionable insights</span>
              </div>
            </div>
            
            <Button 
              variant="accent" 
              size="xl" 
              onClick={onStartAssessment}
              className="text-lg font-semibold px-12 py-4"
            >
              Start Assessment
              <Zap className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* What You'll Discover Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              What You'll Discover
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-16">
              Our comprehensive assessment evaluates your fit across multiple dimensions
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="shadow-medium hover:shadow-large transition-smooth">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Users className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Psychological Fit</h3>
                  <p className="text-muted-foreground">
                    Assess your personality traits, interests, and motivational alignment with consulting work.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-medium hover:shadow-large transition-smooth">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Target className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Technical Readiness</h3>
                  <p className="text-muted-foreground">
                    Evaluate your current knowledge and aptitude for process optimization methodologies.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-medium hover:shadow-large transition-smooth">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mb-6 mx-auto">
                    <TrendingUp className="w-8 h-8 text-success-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">WISCAR Analysis</h3>
                  <p className="text-muted-foreground">
                    Comprehensive evaluation of Will, Interest, Skill, Cognitive readiness, Ability, and Real-world fit.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Career Opportunities Section */}
      <section className="py-20 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Career Opportunities
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-16">
              Process optimization skills unlock diverse, high-impact career paths
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Process Optimization Consultant',
                'Business Process Analyst',
                'Continuous Improvement Manager',
                'Lean Six Sigma Specialist',
                'Operations Excellence Manager',
                'Digital Transformation Consultant'
              ].map((role, index) => (
                <div key={index} className="flex items-center gap-3 bg-card p-4 rounded-lg shadow-soft">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="font-medium">{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Discover Your Potential?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Take the first step towards understanding if process optimization consulting is right for you.
            </p>
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onStartAssessment}
              className="text-lg font-semibold px-12 py-4"
            >
              Begin Your Assessment Journey
              <TrendingUp className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}