import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ScoreCard from '@/components/app/ScoreCard';
import { Home, Download, Printer, Bot, Key, Target, Briefcase, FileText, Lightbulb } from 'lucide-react';
import type { AnalysisResult } from '@/lib/claude-api';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, fileName } = location.state as { results: AnalysisResult; fileName: string } || {};

  if (!results) {
    navigate('/app');
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, any> = {
      high: 'destructive',
      medium: 'default',
      low: 'secondary'
    };
    return <Badge variant={variants[priority] || 'default'}>{priority}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold">
            QualifyPro
          </a>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <Card className="mb-8 bg-gradient-subtle">
            <CardContent className="pt-6">
              <div className="text-center">
                <Badge variant="secondary" className="mb-4">Analysis Report</Badge>
                <h1 className="text-3xl font-bold mb-4">
                  Overall Match Score: <span className={getScoreColor(results.overallScore)}>{results.overallScore}/100</span>
                </h1>
                <Progress value={results.overallScore} className="max-w-md mx-auto h-3 mb-4" />
                <p className="text-lg text-muted-foreground">{results.overallSummary}</p>
                <p className="text-sm text-muted-foreground mt-2">Resume: {fileName}</p>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* ATS Compatibility */}
            <ScoreCard
              icon={<Bot className="w-5 h-5" />}
              title="ATS Compatibility"
              score={results.atsCompatibility.score}
              status={`Status: ${results.atsCompatibility.status}`}
            >
              <div className="space-y-2 text-sm">
                <p>Issues Found:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• {results.atsCompatibility.criticalIssues.length} Critical</li>
                  <li>• {results.atsCompatibility.warnings.length} Warnings</li>
                  <li>• {results.atsCompatibility.suggestions.length} Suggestions</li>
                </ul>
              </div>
            </ScoreCard>

            {/* Keyword Analysis */}
            <ScoreCard
              icon={<Key className="w-5 h-5" />}
              title="Keyword Match"
              score={results.keywordAnalysis.matchRate}
            >
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium mb-1">✅ Found ({results.keywordAnalysis.foundKeywords.length}):</p>
                  <div className="flex flex-wrap gap-1">
                    {results.keywordAnalysis.foundKeywords.slice(0, 6).map((kw, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{kw}</Badge>
                    ))}
                    {results.keywordAnalysis.foundKeywords.length > 6 && (
                      <Badge variant="outline" className="text-xs">
                        +{results.keywordAnalysis.foundKeywords.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <p className="font-medium mb-1">❌ Missing ({results.keywordAnalysis.missingKeywords.length}):</p>
                  <div className="flex flex-wrap gap-1">
                    {results.keywordAnalysis.missingKeywords.slice(0, 4).map((kw, i) => (
                      <Badge key={i} variant="destructive" className="text-xs">{kw.keyword}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </ScoreCard>

            {/* Skills Gap */}
            <ScoreCard
              icon={<Target className="w-5 h-5" />}
              title="Skills Assessment"
              score={results.skillsGap.score}
            >
              <div className="space-y-2 text-sm">
                {results.skillsGap.strongMatches.slice(0, 3).map((match, i) => (
                  <div key={i}>
                    <span className="font-medium">{match.skill}</span>
                    <span className="text-yellow-500 ml-2">{'⭐'.repeat(match.rating)}</span>
                  </div>
                ))}
                {results.skillsGap.missingSkills.length > 0 && (
                  <div className="pt-2 border-t">
                    <p className="font-medium mb-1">Missing Skills:</p>
                    <p className="text-muted-foreground">{results.skillsGap.missingSkills.slice(0, 2).join(', ')}</p>
                  </div>
                )}
              </div>
            </ScoreCard>

            {/* Experience Match */}
            <ScoreCard
              icon={<Briefcase className="w-5 h-5" />}
              title="Experience Analysis"
              score={results.experienceMatch.score}
            >
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium mb-1">✅ Wins:</p>
                  <ul className="text-muted-foreground space-y-1">
                    {results.experienceMatch.wins.slice(0, 3).map((win, i) => (
                      <li key={i}>• {win}</li>
                    ))}
                  </ul>
                </div>
                {results.experienceMatch.gaps.length > 0 && (
                  <div>
                    <p className="font-medium mb-1">⚠️ Gaps:</p>
                    <ul className="text-muted-foreground space-y-1">
                      {results.experienceMatch.gaps.slice(0, 2).map((gap, i) => (
                        <li key={i}>• {gap}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </ScoreCard>

            {/* Format Analysis */}
            <ScoreCard
              icon={<FileText className="w-5 h-5" />}
              title="Format Analysis"
              score={results.formatAnalysis.score}
            >
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium mb-1">✅ Good:</p>
                  <ul className="text-muted-foreground space-y-1">
                    {results.formatAnalysis.goodPoints.slice(0, 3).map((point, i) => (
                      <li key={i}>• {point}</li>
                    ))}
                  </ul>
                </div>
                {results.formatAnalysis.issues.length > 0 && (
                  <div>
                    <p className="font-medium mb-1">⚠️ Issues:</p>
                    <ul className="text-muted-foreground space-y-1">
                      {results.formatAnalysis.issues.slice(0, 2).map((issue, i) => (
                        <li key={i}>• {issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </ScoreCard>

            {/* Top Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="w-5 h-5" />
                  Top Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.recommendations.slice(0, 3).map((rec, i) => (
                    <div key={i} className="pb-3 border-b last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-medium text-sm">{i + 1}. {rec.title}</p>
                        {getPriorityBadge(rec.priority)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{rec.description}</p>
                      <p className="text-xs text-primary">Impact: +{rec.impact} points</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Breakdown */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Detailed Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="ats">
                  <AccordionTrigger>🔴 ATS Issues Breakdown</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {results.atsCompatibility.criticalIssues.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-destructive mb-2">Critical Issues (Must Fix)</h4>
                          {results.atsCompatibility.criticalIssues.map((issue, i) => (
                            <div key={i} className="mb-3 pl-4 border-l-2 border-destructive">
                              <p className="font-medium">{issue.issue}</p>
                              <p className="text-sm text-muted-foreground">Fix: {issue.fix}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {results.atsCompatibility.warnings.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-yellow-600 mb-2">Warnings (Should Fix)</h4>
                          {results.atsCompatibility.warnings.map((warning, i) => (
                            <div key={i} className="mb-3 pl-4 border-l-2 border-yellow-600">
                              <p className="font-medium">{warning.issue}</p>
                              <p className="text-sm text-muted-foreground">Fix: {warning.fix}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="keywords">
                  <AccordionTrigger>🔑 Complete Keyword Comparison</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">✅ Keywords Found ({results.keywordAnalysis.foundKeywords.length})</h4>
                        <div className="flex flex-wrap gap-2">
                          {results.keywordAnalysis.foundKeywords.map((kw, i) => (
                            <Badge key={i} variant="secondary">{kw}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">❌ Missing Keywords ({results.keywordAnalysis.missingKeywords.length})</h4>
                        <div className="space-y-2">
                          {results.keywordAnalysis.missingKeywords.map((kw, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Badge variant="destructive">{kw.keyword}</Badge>
                              <span className="text-sm text-muted-foreground">
                                {kw.priority} priority • {kw.context}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="recommendations">
                  <AccordionTrigger>💡 All Recommendations</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {results.recommendations.map((rec, i) => (
                        <div key={i} className="p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold">{i + 1}. {rec.title}</h4>
                            {getPriorityBadge(rec.priority)}
                          </div>
                          <p className="text-sm mb-2">{rec.description}</p>
                          <p className="text-sm text-muted-foreground mb-2">How to: {rec.howTo}</p>
                          <p className="text-sm text-primary font-medium">+Impact: {rec.impact} points</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" onClick={() => navigate('/app')}>
              Analyze Another Resume
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
