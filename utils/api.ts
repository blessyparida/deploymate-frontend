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

export async function analyzeRepo(repoUrl: string): Promise<AnalyzeResponse> {
  // Define BASE_URL first
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL ;

  // Log the BASE_URL to see what value is being picked
  console.log("BASE_URL >>>", BASE_URL);

  // Then call fetch
  const res = await fetch(`${BASE_URL}/api/github/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ repoUrl }),
  });

  if (!res.ok) {
    const errText = await res.text();
    return {
      success: false,
      error: `Server Error: ${res.status} - ${errText}`,
    };
  }

  return res.json();
}
