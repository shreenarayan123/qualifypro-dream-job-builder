import { Bot, CheckCircle2, Key, Target, Lightbulb, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Benefits = () => {
  const features = [
    "ATS Optimization",
    "Real-time Analysis", 
    "Keyword Matching",
    "Score Tracking",
    "Industry Standards",
    "Expert Insights",
  ];
  
  const benefits = [
    {
      icon: Bot,
      title: "AI-Powered Analysis",
      description: "Advanced AI analyzes your resume against job descriptions to identify gaps and optimization opportunities.",
    },
    {
      icon: CheckCircle2,
      title: "ATS Compatibility Check",
      description: "Ensure your resume passes Applicant Tracking Systems with our comprehensive compatibility scanner.",
    },
    {
      icon: Key,
      title: "Keyword Optimization",
      description: "Identify missing keywords and optimize your resume to match job requirements perfectly.",
    },
    {
      icon: TrendingUp,
      title: "Instant Scoring",
      description: "Get immediate feedback with detailed scoring on content, format, and ATS compatibility.",
    },
    {
      icon: Lightbulb,
      title: "Smart Suggestions",
      description: "Receive actionable recommendations to improve your resume's impact and relevance.",
    },
    {
      icon: Target,
      title: "Skills Gap Analysis",
      description: "Discover which skills you're missing and which ones to highlight for your target role.",
    },
  ];
  
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <Badge variant="secondary" className="mb-4">Benefits</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Unlock Your Dream Job with Professional Resume Optimization and AI Analysis
            </h2>
            <p className="text-muted-foreground mb-8">
              Transform your resume with our advanced AI tools and data-driven insights for maximum interview success.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {features.map((feature) => (
                <Badge key={feature} variant="outline" className="px-4 py-2">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex gap-4 group">
                  <div className="w-1 bg-primary rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">{benefit.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
