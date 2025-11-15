"use client";
import { useState } from "react";
import { analyzeRepo } from "@/utils/api";
import ResultsDisplay from "@/components/resultsdisplay";
import RepoInput from "@/components/repoinput";


export default function GithubPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
const handleAnalyze = async (repoUrl: string) => {
  setLoading(true);
  setError(null);
  setResult(null);

  //  Step 1: Create a 15s timeout promise
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("This is taking longer than usual. Please try again later.")), 15000)
  );

  try {
    // ⏱ Step 2: Race between API call and timeout
    const res = await Promise.race([analyzeRepo(repoUrl), timeoutPromise]);
    setResult(res);
  } catch (err: any) {
    console.error("Frontend error:", err);

    // 🧠 Step 3: User-friendly error handling
    if (err.message.includes("Failed to fetch")) {
      setError("Couldn’t reach the backend server. Please check your connection or try again later.");
    } else if (err.message.includes("timeout")) {
      setError("This is taking longer than usual. Please try again later.");
    } else {
      setError(err.message || "An unexpected error occurred during analysis.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-2"> Drop a Repo. Get Deployment Ready.</h1>
      <p className="text-slate-400 mb-8 text-center max-w-lg">
       Analyze, configure, and deploy — all from a single GitHub URL.
      </p>

      <RepoInput onResult={handleAnalyze} />

      {loading && (
        <div className="mt-6 text-blue-300 animate-pulse">
          Analyzing your repo...
        </div>
      )}

      {error && (
        <div className="mt-6 text-rose-400 bg-rose-950/40 p-3 rounded-lg">
          {error}
        </div>
      )}

      {!loading && result && <ResultsDisplay result={result} />}
    </div>
  );
}
