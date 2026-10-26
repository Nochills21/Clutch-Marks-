// Last line of defence for production.
//
// Nothing in the app caught render errors, so a single thrown component (for
// example a hook used before its declaration) unmounted the whole tree and left
// visitors on a blank white page with no explanation and no way to recover.
//
// Deliberately dependency-free markup: if the failure came from a broken
// component import, a fallback that itself imports UI components could fail too.
// The support address comes from `@/lib/support`, a module with no imports at
// all — not from `site.ts`, which builds strings from the subject catalogue.
import { Component, type ErrorInfo, type ReactNode } from "react";
import { SUPPORT_EMAIL, supportMailto } from "@/lib/support";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Keep the component stack: it is the only clue in production where there is
    // no dev overlay.
    console.error("Unhandled UI error:", error, info.componentStack);
  }

  private handleRetry = () => {
    // Let the tree re-render in place; works for transient render-time failures
    // (e.g. a query that settled between the error and the click).
    this.setState({ error: null });
  };

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-lg space-y-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Clutch Marks
          </p>
          <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
          <p className="text-sm text-muted-foreground">
            This page failed to load. Your progress is saved — reloading usually
            fixes it.
          </p>
          <p className="text-sm text-muted-foreground">
            If it keeps happening, email{" "}
            <a
              href={supportMailto("Clutch Marks — page error")}
              className="font-medium text-foreground underline underline-offset-4"
            >
              {SUPPORT_EMAIL}
            </a>{" "}
            and tell us what you were doing; we will look into it.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={this.handleReload}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Reload page
            </button>
            <button
              type="button"
              onClick={this.handleRetry}
              className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Try again
            </button>
          </div>
          <details className="text-left">
            <summary className="cursor-pointer text-xs text-muted-foreground">
              Technical details
            </summary>
            <pre className="mt-2 max-h-48 overflow-auto rounded-md bg-muted p-3 text-left text-[11px] leading-relaxed text-muted-foreground">
              {error.name}: {error.message}
            </pre>
          </details>
        </div>
      </div>
    );
  }
}

export default AppErrorBoundary;
