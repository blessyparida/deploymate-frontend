export interface AnalyzeResponse {
  success: boolean;
  repo?: string;
  branch?: string;
  detected?: Record<string, string>;
  generated?: string[];
  pullRequest?: {
    success: boolean;
    prUrl?: string;
    error?: string;
  }[];
  error?: string;
}

/**
 * Calls your backend API to analyze a repo.
 */
export async function analyzeRepo(repoUrl: string): Promise<AnalyzeResponse> {
  const res = await fetch("http://localhost:3001/api/github/analyze", 
 {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ repoUrl }),
  });

  // Handle non-2xx responses cleanly
  if (!res.ok) {
    const errText = await res.text();
    return {
      success: false,
      error: `Server Error: ${res.status} - ${errText}`,
    };
  }

  const data = await res.json();
  return data;
}
