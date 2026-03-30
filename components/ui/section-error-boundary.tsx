"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

interface SectionErrorBoundaryProps {
  children: React.ReactNode;
  fallbackMessage?: string;
  retryLabel?: string;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
}

export class SectionErrorBoundary extends React.Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  constructor(props: SectionErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): SectionErrorBoundaryState {
    return { hasError: true };
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center"
          role="alert"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
            <AlertTriangle className="h-6 w-6 text-white/30" strokeWidth={1.5} />
          </div>
          <p className="text-sm text-white/50 max-w-xs leading-relaxed">
            {this.props.fallbackMessage ?? "Something went wrong"}
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="text-sm font-medium text-primary/80 hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded px-3 py-1.5"
          >
            {this.props.retryLabel ?? "Try again"}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
