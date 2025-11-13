"use client";
import React, { useState } from "react";
import RepoInput from "../components/repoinput";
import ResultsDisplay from "../components/resultsdisplay";
import { analyzeRepo } from "../utils/api";

const DeployMatePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResult = async (repoUrl: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await analyzeRepo(repoUrl);
      setResult(res);
    } catch (err: any) {
      console.error("Frontend error:", err);
      setError(err.message || "Failed to analyze repository");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 flex flex-col items-center px-6 py-10">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-slate-100 mb-3 tracking-tight">
          DeployMate Auto Analyzer
        </h1>
        <p className="text-slate-400 mb-10 text-base leading-relaxed">
          Enter a public GitHub repository URL below. DeployMate will detect its
          tech stack, generate deployment configuration files, and automatically
          open a pull request for you.
        </p>
      </div>

      <RepoInput onResult={handleResult} />

      {loading && (
        <div className="mt-8 text-indigo-300 animate-pulse font-medium">
          Analyzing repository...
        </div>
      )}

      {error && (
        <div className="mt-8 text-rose-400 bg-rose-950/40 p-4 rounded-lg w-full max-w-xl border border-rose-800/30">
          {error}
        </div>
      )}

      {!loading && result && (
        <div className="mt-10 w-full max-w-3xl">
          <ResultsDisplay result={result} />
        </div>
      )}
    </div>
  );
};

export default DeployMatePage;
