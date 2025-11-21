import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const FinalCTA = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-white">
      {/* Warm Orange Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(
              circle at top left,
              rgba(255, 140, 60, 0.5),
              transparent 70%
            )
          `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Elevate Your Career
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Ready to Transform<br />Your Job Search?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8">
            Sign up today and see the difference QualifyPro can make for your career.
          </p>
          
          <div className="text-center">
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 px-8" asChild>
              <a href="/app">Get Started</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
