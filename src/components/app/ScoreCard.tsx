import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ReactNode } from 'react';

interface ScoreCardProps {
  icon: ReactNode;
  title: string;
  score: number;
  status?: string;
  children: ReactNode;
}

const ScoreCard = ({ icon, title, score, status, children }: ScoreCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Score: {score}/100</span>
          </div>
          <Progress value={score} className="h-2" />
          {status && (
            <p className="text-sm text-muted-foreground mt-2">{status}</p>
          )}
        </div>
        {children}
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
