export interface AnalyzeResponse {
  success: boolean;
  repo?: string;
  branch?: string;

  detectedStack?: {
    languages: string[];
    frameworks: string[];
    deployment?: string;
  };

  generatedConfigs?: Record<string, any>;

  pullRequest?: {
    success: boolean;
    message?: string;
    simulated?: boolean;
    error?: string;
  }[];

  error?: string;
}

export async function analyzeRepo(repoUrl: string): Promise<AnalyzeResponse> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!BASE_URL) {
    return { success: false, error: "API base URL not configured" };
  }

  const installationId = localStorage.getItem("github_installation_id");
  if (!installationId) {
    return { success: false, error: "GitHub not connected. Please install the GitHub App." };
  }

  const res = await fetch(`${BASE_URL}/api/github/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      repoUrl,
      installationId: Number(installationId), 
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    return { success: false, error: `Server Error: ${res.status} - ${errText}` };
  }

  return await res.json(); 
}
