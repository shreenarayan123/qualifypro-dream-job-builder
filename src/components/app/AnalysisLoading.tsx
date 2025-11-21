import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const loadingSteps = [
  "📄 Reading your resume...",
  "🔍 Analyzing job requirements...",
  "🎯 Matching keywords...",
  "📊 Calculating ATS score...",
  "💡 Generating suggestions...",
  "✅ Finalizing report..."
];

const AnalysisLoading = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-16 h-16 mx-auto mb-6 text-primary animate-spin" />
        <h2 className="text-2xl font-bold mb-4">⚡ Analyzing Your Resume...</h2>
        <p className="text-lg text-muted-foreground mb-8 animate-pulse">
          {loadingSteps[currentStep]}
        </p>
        <p className="text-sm text-muted-foreground">
          This usually takes 15-30 seconds
        </p>
      </div>
    </div>
  );
};

export default AnalysisLoading;
