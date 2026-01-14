"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col h-screen w-screen items-center justify-center bg-background",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="aurora-effect"></div>
      </div>
      {children}
    </div>
  );
};
