import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronDown } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">QualifyPro</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
              Pricing
            </a>
            <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors">
              Resources
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          
          <Button className="bg-foreground text-background hover:bg-foreground/90" asChild>
            <a href="/app">Try Free →</a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
