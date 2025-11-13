"use client";
import React, { useState } from "react";

interface RepoInputProps {
  onResult: (repoUrl: string) => void;
}

const RepoInput: React.FC<RepoInputProps> = ({ onResult }) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState("");

  const handleAnalyze = () => {
    setError("");
    const cleaned = repoUrl.trim();

    // ✅ Step 1: Empty check
    if (!cleaned) {
      setError("Please enter a GitHub repository URL.");
      return;
    }

    // ✅ Step 2: GitHub URL validation
    const githubUrlPattern =
      /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(\/)?$/;

    if (!githubUrlPattern.test(cleaned)) {
      setError(
        "That doesn’t look like a valid GitHub repo URL. Example: https://github.com/user/repo"
      );
      return;
    }

    // ✅ Step 3: If all good, proceed
    onResult(cleaned);
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg w-full max-w-xl mx-auto border border-slate-700">
      <h2 className="text-lg font-semibold text-slate-100 mb-4 tracking-wide">
        Repository URL
      </h2>

      <input
        type="text"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        placeholder="e.g. https://github.com/user/repo"
        className={`w-full p-3 rounded-md bg-slate-700/60 text-slate-100 placeholder-slate-400 border transition-all duration-200
          ${
            error
              ? "border-rose-500 focus:ring-rose-400"
              : "border-slate-600 focus:ring-blue-300"
          }
          focus:outline-none focus:ring-2`}
      />

      {error && (
        <div className="text-rose-400 text-sm mt-2 animate-pulse">{error}</div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={!repoUrl}
        className={`mt-5 w-full py-3 rounded-md font-medium transition-all duration-200 ${
          !repoUrl
            ? "bg-slate-600 text-slate-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white shadow-md hover:shadow-lg"
        }`}
      >
        Analyze Repository
      </button>
    </div>
  );
};

export default RepoInput;
