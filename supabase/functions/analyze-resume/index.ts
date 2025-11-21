import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { base64PDF, jobDescription } = await req.json();

    if (!base64PDF || !jobDescription) {
      return new Response(JSON.stringify({ error: "Missing base64PDF or jobDescription" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("VITE_ANTHROPIC_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Anthropic API key not configured in backend" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "document",
                source: {
                  type: "base64",
                  media_type: "application/pdf",
                  data: base64PDF,
                },
              },
              {
                type: "text",
                text:
                  "You are an expert ATS (Applicant Tracking System) analyst and career coach. \n\n" +
                  "I've uploaded my resume as a PDF. Please analyze it against the following job description and provide a comprehensive report.\n\n" +
                  "JOB DESCRIPTION:\n" +
                  jobDescription +
                  "\n\nProvide your analysis in the following JSON format (respond ONLY with valid JSON, no markdown):\n\n" +
                  `{
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

Be specific, actionable, and constructive. Focus on helping the candidate improve their chances of getting past ATS and impressing recruiters.`,
              },
            ],
          },
        ],
      }),
    });

    if (!anthropicResponse.ok) {
      const errorText = await anthropicResponse.text();
      console.error("Anthropic API error:", anthropicResponse.status, errorText);
      return new Response(
        JSON.stringify({
          error: "Anthropic API error",
          status: anthropicResponse.status,
          details: errorText,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const data = await anthropicResponse.json();
    let responseText: string = data.content?.[0]?.text ?? "";

    responseText = responseText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const parsed = JSON.parse(responseText);

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-resume error:", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
