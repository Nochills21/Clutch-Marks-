// Landing hero artwork (theme-aware).
import heroLight from "@/assets/hero-light.jpg";
import heroDark from "@/assets/hero-dark.jpg";

interface Props {
  className?: string;
  priority?: boolean;
  alt?: string;
}

export function HeroIllustration({ className = "", priority = false, alt = "Online study platform illustration" }: Props) {
  return (
    <>
      <img
        src={heroLight}
        alt={alt}
        width={1536}
        height={1024}
        loading={priority ? "eager" : "lazy"}
        className={`block dark:hidden ${className}`}
      />
      <img
        src={heroDark}
        alt={alt}
        width={1536}
        height={1024}
        loading={priority ? "eager" : "lazy"}
        className={`hidden dark:block ${className}`}
      />
    </>
  );
}
