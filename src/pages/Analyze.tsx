import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, ArrowLeft, Target } from 'lucide-react';
import { analyzeResumePDF } from '@/lib/claude-api';
import { saveAnalysis } from '@/lib/usage-tracking';
import AnalysisLoading from '@/components/app/AnalysisLoading';
import { useToast } from '@/hooks/use-toast';

const Analyze = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const file = location.state?.file as File | undefined;

  if (!file) {
    navigate('/app');
    return null;
  }

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Job description required",
        description: "Please add a job description to continue",
        variant: "destructive"
      });
      return;
    }

    if (jobDescription.length < 100) {
      toast({
        title: "Job description too short",
        description: "Please add more details for better analysis",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const results = await analyzeResumePDF(file, jobDescription);
      const analysisId = saveAnalysis(file.name, results.overallScore, results);
      
      navigate('/app/results', { 
        state: { 
          results, 
          fileName: file.name,
          analysisId 
        } 
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Please check your API key and try again",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {isAnalyzing && <AnalysisLoading />}
      
      <header className="border-b">
        <div className="container mx-auto px-6 py-4">
          <a href="/" className="text-2xl font-bold">
            QualifyPro
          </a>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Badge variant="secondary">✓ Upload Resume</Badge>
              <div className="w-8 h-px bg-border" />
              <Badge>⚫ Add Job Desc</Badge>
              <div className="w-8 h-px bg-border" />
              <Badge variant="outline">○ Get Results</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">Add Target Job Description</h1>
            <p className="text-muted-foreground">
              Paste the full job description for accurate analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Uploaded Resume
              </h2>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-muted-foreground">Filename:</span> {file.name}
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Size:</span> {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <p className="text-sm text-green-600 mt-4">✓ Ready for analysis</p>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Target Job Description
              </h2>
              <Textarea
                placeholder="Paste the full job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[200px] mb-4"
              />
              <div className="bg-muted/50 rounded p-3 text-sm">
                <p className="font-medium mb-1">Tips:</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Include full job posting</li>
                  <li>• Keep requirements section</li>
                  <li>• Include skills & qualifications</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/app')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button 
              onClick={handleAnalyze}
              disabled={!jobDescription.trim() || isAnalyzing}
              size="lg"
            >
              Analyze Resume
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analyze;
