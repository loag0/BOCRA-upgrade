"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-in" | "fade-left" | "fade-right";
  delay?: number;
}

export function AnimatedSection({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const baseStyle = {
    transitionDelay: `${delay}ms`,
  };

  const animationClasses: Record<string, string> = {
    "fade-up": isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-8",
    "fade-in": isVisible ? "opacity-100" : "opacity-0",
    "fade-left": isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-8",
    "fade-right": isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-8",
  };

  return (
    <div
      ref={ref}
      style={baseStyle}
      className={`transition-all duration-700 ease-out ${animationClasses[animation]} ${className}`}
    >
      {children}
    </div>
  );
}
