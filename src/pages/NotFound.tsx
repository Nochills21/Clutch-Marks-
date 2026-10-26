// 404 fallback.
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import { SITE } from "@/lib/site";
import { supportMailto } from "@/lib/support";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <SEOHead
        title="Page Not Found (404) — Clutch Marks"
        description="This Clutch Marks page doesn't exist or has moved. Head back to the home page to find Maths, Physics, Chemistry, Biology, Computer Science and English revision resources."
        path={location.pathname}
        noindex
      />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
        <p className="mt-6 text-sm text-muted-foreground">
          If a link on this site brought you here, tell us at{" "}
          <a
            href={supportMailto(`Broken link: ${location.pathname}`)}
            className="text-primary underline hover:text-primary/90"
          >
            {SITE.supportEmail}
          </a>{" "}
          so we can fix it.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
