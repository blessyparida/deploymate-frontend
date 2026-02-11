"use client";
import React from "react";

interface PullRequestResult {
  success: boolean;
  message?: string;
  prUrl?: string;
  simulated?: boolean;
  error?: string;
}

interface ResultsDisplayProps {
  result: {
    success: boolean;
    repo?: string;
    branch?: string;
    detected?: Record<string, string>;
    generated?: string[];
    pullRequest?: PullRequestResult[];
    error?: string;
  };
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  if (!result) return null;

  
  const prResults =
    result.pullRequest?.filter(
      (p) => p.prUrl || (p.success === false && p.message?.toLowerCase().includes("pr"))
    ) || [];

  return (
    <div className="bg-slate-800/70 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-3xl mt-8 border border-slate-700">
      <h2 className="text-xl font-semibold text-slate-100 mb-4">
        Analysis Summary
      </h2>

      {/* Repo Info */}
      <div className="text-slate-300 text-sm mb-3">
        <p>
          <span className="font-medium text-slate-100">Repository:</span>{" "}
          {result.repo}
        </p>
        <p>
          <span className="font-medium text-slate-100">Branch:</span>{" "}
          {result.branch}
        </p>
      </div>

      {/* Stack Detection */}
      {result.detected && (
        <div className="mb-4">
          <div className="text-slate-400 text-sm uppercase mb-2">
            Detected Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(result.detected).map(([key, value]) => (
              <span
                key={key}
                className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-lg text-sm border border-blue-700"
              >
                {key}: {value}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Generated Files */}
      {result.generated && result.generated.length > 0 && (
        <div className="mb-4">
          <div className="text-slate-400 text-sm uppercase mb-2">
            Generated Files
          </div>
          <ul className="list-disc list-inside text-slate-200 text-sm">
            {result.generated.map((file, idx) => (
              <li key={idx}>{file}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Pull Request */}
      {prResults.length > 0 && (
        <div className="mt-4">
          <div className="text-slate-400 text-sm uppercase mb-2">
            Pull Request
          </div>

          {prResults.map((p, i) => (
            <div key={i} className="text-sm">
              {p.success && p.prUrl ? (
                <a
                  href={p.prUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 hover:underline transition"
                >
                  View Pull Request
                  <span className="transition-transform group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              ) : (
                <div className="text-rose-400">
                  Failed: {p.message || p.error || "Pull request failed"}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
