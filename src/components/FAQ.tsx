import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does QualifyPro analyze my resume?",
      answer: "Our AI-powered system analyzes your resume against the job description, checking for ATS compatibility, keyword matches, skills gaps, and formatting issues. You'll receive a detailed score and actionable suggestions for improvement.",
    },
    {
      question: "What file formats do you support?",
      answer: "Currently, we support PDF format for resume uploads. This ensures consistent formatting and accurate analysis across all devices.",
    },
    {
      question: "Is my resume data secure?",
      answer: "Absolutely! We use industry-standard encryption to protect your data. Your resumes are never shared with third parties and are automatically deleted after 30 days.",
    },
    {
      question: "Can I try QualifyPro before purchasing?",
      answer: "Yes! Our Basic plan is completely free and includes 3 resume analyses. You can upgrade anytime to access unlimited analyses and advanced features.",
    },
    {
      question: "How accurate is the ATS compatibility check?",
      answer: "Our ATS scanner is built on analysis of major Applicant Tracking Systems and is regularly updated. We achieve 95%+ accuracy in predicting ATS compatibility issues.",
    },
  ];
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Common Question</Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            Frequently Asked Questions
          </h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
