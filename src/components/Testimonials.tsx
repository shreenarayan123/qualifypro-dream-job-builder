import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import testimonialJohn from "@/assets/testimonial-john.jpg";
import avatarHenry from "@/assets/avatar-henry.jpg";
import avatarGrace from "@/assets/avatar-grace.jpg";
import avatarJames from "@/assets/avatar-james.jpg";

const Testimonials = () => {
  const smallTestimonials = [
    {
      text: "The ATS check is a game-changer. My resume was getting rejected before, now it passes every system!",
      name: "Michael Chen",
      title: "Product Manager, StartupX",
      avatar: avatarHenry,
    },
    {
      text: "The keyword analysis showed me exactly what recruiters were looking for. I landed my dream job in 2 weeks!",
      name: "Jennifer Adams",
      title: "Marketing Director, BrandCo",
      avatar: avatarGrace,
    },
    {
      text: "Outstanding insights and actionable suggestions. They delivered exactly what I needed to improve my resume.",
      name: "David Rodriguez",
      title: "Data Analyst, Analytics Inc",
      avatar: avatarJames,
    },
  ];
  
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Success Stories</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            See What Job Seekers Are Saying
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how our platform has helped professionals land their dream jobs!
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="p-8 md:p-12 shadow-elevated">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <img
                  src={testimonialJohn}
                  alt="John Nolan"
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>
              
              <div className="order-1 md:order-2">
                <blockquote className="text-2xl font-semibold mb-6">
                  "QualifyPro helped me identify gaps in my resume I didn't know existed. After optimizing, I got 3x more interview callbacks!"
                </blockquote>
                <div className="mb-4">
                  <p className="font-bold text-lg">Sarah Mitchell</p>
                  <p className="text-muted-foreground">Software Engineer, Tech Corp</p>
                </div>
                <Button variant="outline">
                  Read the Story →
                </Button>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {smallTestimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-sm mb-6">{testimonial.text}</p>
              
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
