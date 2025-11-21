import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Sparkles } from "lucide-react";

const Hero = () => {
  const companies = ["Grapho", "Signum.", "Vectra", "Optimal", "Zephyr"];
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
            New <Sparkles className="w-4 h-4 ml-2 inline text-primary" /> ATS-Optimized Analysis
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Perfect Every Resume<br />
            for Maximum Interview Callbacks.<br />
            <span className="text-primary">With Smart ATS Optimization.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Analyze your resume against job descriptions with AI-powered insights for ATS compatibility and keyword optimization.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>ATS Compatible</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Instant Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Keyword Matching</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 text-lg px-8" asChild>
              <a href="/app">Analyze Resume →</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <a href="/app">See Example Report →</a>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mb-6">
            Trusted by 10,000+ job seekers worldwide
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-40">
            {companies.map((company) => (
              <span key={company} className="text-lg font-medium">{company}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
