// src/app/github/install/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function GitHubInstallPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const installationId = searchParams.get("installation_id");

    if (installationId) {
      localStorage.setItem(
        "github_installation_id",
        installationId
      );

      console.log("✅ GitHub App installed:", installationId);

      router.replace("/github");
    } else {
      console.error("❌ installation_id missing");
    }
  }, [searchParams, router]);

  return (
    <div style={{ padding: 40 }}>
      <h2>Connecting GitHub…</h2>
      <p>Please wait.</p>
    </div>
  );
}
