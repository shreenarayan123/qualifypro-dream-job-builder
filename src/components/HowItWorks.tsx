import { Upload, FileText, Search, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      step: "Step 1",
      title: "Upload Resume",
      description: "Upload your resume in PDF format for instant analysis.",
    },
    {
      icon: FileText,
      step: "Step 2",
      title: "Add Job Description",
      description: "Paste the target job description to compare and analyze fit.",
    },
    {
      icon: Search,
      step: "Step 3",
      title: "Get AI Analysis",
      description: "Our AI analyzes keywords, skills, ATS compatibility, and match score.",
    },
    {
      icon: Download,
      step: "Done",
      title: "Download Report",
      description: "Get your detailed report with suggestions and optimizations.",
    },
  ];
  
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">How to Use?</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple Steps to Get Started
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Optimize your resume in minutes with seamless upload, intelligent analysis, and actionable insights for your job search.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-elevated transition-shadow bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="text-xs">{step.step}</Badge>
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
