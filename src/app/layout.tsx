import "./globals.css";

export const metadata = {
  title: "DeployMate Auto Analyzer",
  description: "AI-powered repo analysis and deployment config generator",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col items-center justify-start">
        <header className="py-6 text-center">
          <h1 className="text-3xl font-bold text-blue-400 tracking-wide">
             DeployMate Auto Analyzer
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            
          </p>
        </header>
        <main className="flex-1 w-full max-w-3xl px-6">{children}</main>
        <footer className="py-4 text-xs text-slate-600">
          © {new Date().getFullYear()} DeployMate Labs
        </footer>
      </body>
    </html>
  );
}
