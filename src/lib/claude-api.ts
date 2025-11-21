const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

export interface AnalysisResult {
  overallScore: number;
  overallSummary: string;
  atsCompatibility: {
    score: number;
    status: string;
    criticalIssues: Array<{ issue: string; fix: string; impact: string }>;
    warnings: Array<{ issue: string; fix: string; impact: string }>;
    suggestions: Array<{ suggestion: string; benefit: string; impact: string }>;
  };
  keywordAnalysis: {
    matchRate: number;
    foundKeywords: string[];
    missingKeywords: Array<{ keyword: string; priority: string; mentions: number; context: string }>;
  };
  skillsGap: {
    score: number;
    strongMatches: Array<{ skill: string; rating: number; evidence: string }>;
    skillsToHighlight: string[];
    missingSkills: string[];
  };
  experienceMatch: {
    score: number;
    wins: string[];
    gaps: string[];
  };
  formatAnalysis: {
    score: number;
    goodPoints: string[];
    issues: string[];
  };
  recommendations: Array<{
    priority: string;
    title: string;
    description: string;
    impact: number;
    howTo: string;
  }>;
}

const convertPDFToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzeResumePDF = async (
  pdfFile: File,
  jobDescription: string
): Promise<AnalysisResult> => {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('Anthropic API key not configured. Add VITE_ANTHROPIC_API_KEY to your .env file and restart the dev server.');
  }

  const base64PDF = await convertPDFToBase64(pdfFile);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'document',
              source: {
                type: 'base64',
                media_type: 'application/pdf',
                data: base64PDF
              }
            },
            {
              type: 'text',
              text: `You are an expert ATS (Applicant Tracking System) analyst and career coach. 

I've uploaded my resume as a PDF. Please analyze it against the following job description and provide a comprehensive report.

JOB DESCRIPTION:
${jobDescription}

Provide your analysis in the following JSON format (respond ONLY with valid JSON, no markdown):

{
  "overallScore": 78,
  "overallSummary": "Good match with minor improvements needed",
  
  "atsCompatibility": {
    "score": 82,
    "status": "Likely to Pass",
    "criticalIssues": [
      {
        "issue": "Contact information format",
        "fix": "Place email in standard contact section",
        "impact": "high"
      }
    ],
    "warnings": [
      {
        "issue": "Date format inconsistency",
        "fix": "Use consistent format throughout",
        "impact": "medium"
      }
    ],
    "suggestions": [
      {
        "suggestion": "Use standard section headers",
        "benefit": "Improves ATS readability",
        "impact": "low"
      }
    ]
  },
  
  "keywordAnalysis": {
    "matchRate": 68,
    "foundKeywords": ["Python", "React", "TypeScript", "AWS", "Docker"],
    "missingKeywords": [
      {
        "keyword": "Kubernetes",
        "priority": "high",
        "mentions": 3,
        "context": "Required skill"
      }
    ]
  },
  
  "skillsGap": {
    "score": 75,
    "strongMatches": [
      {
        "skill": "Full Stack Development",
        "rating": 5,
        "evidence": "Strong experience shown"
      }
    ],
    "skillsToHighlight": ["DevOps experience", "System design"],
    "missingSkills": ["Container orchestration", "Message queues"]
  },
  
  "experienceMatch": {
    "score": 85,
    "wins": [
      "Years of experience match",
      "Relevant job titles",
      "Industry alignment"
    ],
    "gaps": [
      "Specific project types mentioned in JD",
      "Team size management"
    ]
  },
  
  "formatAnalysis": {
    "score": 90,
    "goodPoints": [
      "Clean formatting",
      "Proper sections",
      "Good length"
    ],
    "issues": [
      "Use bullet points for impact",
      "Add measurable achievements"
    ]
  },
  
  "recommendations": [
    {
      "priority": "high",
      "title": "Add missing keywords",
      "description": "Include Kubernetes, GraphQL, Microservices",
      "impact": 12,
      "howTo": "Add to skills section and incorporate in experience descriptions"
    },
    {
      "priority": "high",
      "title": "Quantify achievements",
      "description": "Add metrics and numbers to accomplishments",
      "impact": 8,
      "howTo": "Replace 'Led team' with 'Led team of 5 developers, delivered 12 features'"
    }
  ]
}

Be specific, actionable, and constructive. Focus on helping the candidate improve their chances of getting past ATS and impressing recruiters.`
            }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  let responseText = data.content[0].text;
  
  // Clean any markdown formatting
  responseText = responseText
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  return JSON.parse(responseText);
};
