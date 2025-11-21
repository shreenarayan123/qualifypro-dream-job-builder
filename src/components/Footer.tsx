import { CheckCircle2 } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    features: [
      { name: "ATS Analysis", href: "#" },
      { name: "Benefits", href: "#features" },
      { name: "Why Choose Us", href: "#" },
      { name: "How To Use", href: "#how-it-works" },
      { name: "Pricing", href: "#pricing" },
    ],
    pages: [
      { name: "Homepage", href: "/" },
      { name: "About Us", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms & Conditions", href: "#" },
    ],
    social: [
      { name: "Twitter(X)", href: "#" },
      { name: "LinkedIn", href: "#" },
      { name: "Instagram", href: "#" },
      { name: "GitHub", href: "#" },
    ],
  };
  
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">QualifyPro</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Optimize your resume and land your dream job with AI-powered analysis.
            </p>
            <p className="text-sm text-muted-foreground">
              hello.qualifypro@gmail.com
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              {footerLinks.features.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Pages</h3>
            <ul className="space-y-2">
              {footerLinks.pages.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Social</h3>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>Terms & Conditions</p>
          <p>Copyright QualifyPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
