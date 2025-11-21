import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-cta relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center text-white">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
            Elevate Your Career
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Transform<br />Your Job Search?
          </h2>
          
          <p className="text-xl text-white/90 mb-8">
            Sign up today and see the difference QualifyPro can make for your career.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your Email Address"
              className="bg-white text-foreground border-none h-12"
            />
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 whitespace-nowrap">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
