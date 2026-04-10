import React from "react";
import { cn } from "../../lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section = ({ children, className, id }: SectionProps) => {
  return (
    <section 
      id={id} 
      className={cn(
        "py-24 px-6 md:px-12 max-w-7xl mx-auto relative", 
        className
      )}
    >
      {children}
    </section>
  );
};
