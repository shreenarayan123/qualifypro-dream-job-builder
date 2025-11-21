import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Briefcase, Star, Crown, Mail, Users, FileText, Smartphone } from "lucide-react";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  
  const plans = [
    {
      icon: Briefcase,
      name: "Basic Plan",
      subtitle: "Job Seekers",
      price: isYearly ? 0 : 0,
      features: [
        { name: "2 Resume Analyses", included: true },
        { name: "Basic ATS Check", included: true },
        { name: "Keyword Matching", included: true },
        { name: "Detailed Suggestions", included: false },
        { name: "Priority Support", included: false },
      ],
      highlighted: false,
    },
    {
      icon: Star,
      name: "Pro Plan",
      subtitle: "Active Job Hunters",
      price: isYearly ? 15 : 19,
      features: [
        { name: "Unlimited Analyses", included: true },
        { name: "Advanced ATS Check", included: true },
        { name: "Keyword Optimization", included: true },
        { name: "Detailed Suggestions", included: true },
        { name: "Priority Support", included: false },
      ],
      highlighted: true,
      badge: "Popular",
    },
    {
      icon: Crown,
      name: "Premium Plan",
      subtitle: "Career Professionals",
      price: isYearly ? 31 : 39,
      features: [
        { name: "Unlimited Analyses", included: true },
        { name: "Advanced ATS Check", included: true },
        { name: "Keyword Optimization", included: true },
        { name: "Detailed Suggestions", included: true },
        { name: "Priority Support", included: true },
        { name: "Cover Letter Analysis", included: true },
        { name: "LinkedIn Optimization", included: true },
      ],
      highlighted: false,
    },
  ];
  
  const allPlansInclude = [
    { icon: Mail, text: "Email Support" },
    { icon: Users, text: "Industry Templates" },
    { icon: FileText, text: "PDF Export" },
    { icon: Smartphone, text: "Mobile Access" },
  ];
  
  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Our Pricing Plan</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose the Best Plan for Your Job Search
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Find the right plan for your needs, with flexible options and transparent pricing.
          </p>
          
          <div className="inline-flex items-center gap-4 bg-muted p-1 rounded-lg">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-md transition-colors ${
                !isYearly ? "bg-background shadow-sm" : ""
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-md transition-colors ${
                isYearly ? "bg-background shadow-sm" : ""
              }`}
            >
              Yearly
            </button>
            <Badge className="bg-primary text-primary-foreground">Save 30%</Badge>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card
                key={index}
                className={`p-8 relative ${
                  plan.highlighted ? "border-2 border-primary shadow-elevated" : ""
                }`}
              >
                {plan.badge && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {plan.badge}
                  </Badge>
                )}
                
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                </div>
                
                <p className="text-muted-foreground mb-6">{plan.subtitle}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                
                <Button
                  className={`w-full mb-6 ${
                    plan.highlighted
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "bg-background text-foreground border border-border hover:bg-muted"
                  }`}
                  asChild
                >
                  <a href="/app">Get Started →</a>
                </Button>
                
                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <span
                        className={
                          feature.included ? "text-foreground" : "text-muted-foreground"
                        }
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center">
          <p className="text-lg font-semibold mb-6">All Plans Include</p>
          <div className="flex flex-wrap justify-center gap-6">
            {allPlansInclude.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
