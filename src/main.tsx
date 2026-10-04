// Vite entrypoint: checks build configuration, mounts the React app, and wraps
// it in the top-level error boundary.
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import { AppErrorBoundary } from "@/components/AppErrorBoundary";
import { describeConfigProblems, isConfigured } from "@/lib/env";
import "./index.css";

/**
 * Shown instead of the app when required build variables are missing. Without
 * this the app mounted with an undefined Supabase URL and every request failed
 * with an unexplained error.
 */
function ConfigError({ message }: { message: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-lg space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Clutch Marks
        </p>
        <h1 className="text-2xl font-bold text-foreground">Configuration error</h1>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

const container = document.getElementById("root")!;
const root = createRoot(container);

if (!isConfigured) {
  root.render(<ConfigError message={describeConfigProblems()} />);
} else {
  root.render(
    <AppErrorBoundary>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </AppErrorBoundary>,
  );
}
