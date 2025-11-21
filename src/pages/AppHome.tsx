import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FileUploader from '@/components/app/FileUploader';
import UpgradeModal from '@/components/app/UpgradeModal';
import { canAnalyze, getRemainingAnalyses } from '@/lib/usage-tracking';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const AppHome = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const navigate = useNavigate();
  const remaining = getRemainingAnalyses();

  const handleContinue = () => {
    if (!canAnalyze()) {
      setShowUpgradeModal(true);
      return;
    }
    
    if (selectedFile) {
      navigate('/app/analyze', { state: { file: selectedFile } });
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold">
            QualifyPro
          </a>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              🎯 {remaining}/2 Free Analyses Remaining
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload your resume, add job description,<br />get AI-powered analysis</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Upload Your Resume
          </h1>
          <p className="text-xl text-muted-foreground">
            Get instant AI-powered analysis and optimization suggestions
          </p>
        </div>

        <FileUploader
          onFileSelect={setSelectedFile}
          selectedFile={selectedFile}
          onClear={handleClearFile}
        />

        {selectedFile && (
          <div className="text-center mt-8">
            <Button 
              onClick={handleContinue}
              size="lg"
              className="px-8"
            >
              Continue to Job Description
            </Button>
          </div>
        )}

        <div className="max-w-2xl mx-auto mt-12 p-6 bg-card border rounded-lg">
          <h3 className="font-semibold mb-3">✨ What you'll get:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• ATS Compatibility Score with detailed analysis</li>
            <li>• Keyword matching against job description</li>
            <li>• Skills gap assessment and recommendations</li>
            <li>• Format and structure optimization tips</li>
            <li>• Actionable suggestions to improve your resume</li>
          </ul>
        </div>
      </main>

      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
      />
    </div>
  );
};

export default AppHome;
