"use client";

import * as React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(7);
    const newToast: Toast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />;
      case "info":
        return <Info className="h-5 w-5 text-primary shrink-0" />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 end-4 z-[100] flex flex-col gap-3 max-w-md w-full sm:w-auto pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto relative rounded-xl sm:rounded-2xl border backdrop-blur-lg shadow-2xl p-4 sm:p-5 transition-all duration-300 ease-out animate-[slideInFromTop_0.3s_ease-out]",
              {
                "bg-white-opacity-10 border-white-opacity-20":
                  toast.type === "success" || toast.type === "info",
                "bg-red-500/10 border-red-500/30":
                  toast.type === "error",
              }
            )}
          >
            {/* Background gradient effect for success/info */}
            {(toast.type === "success" || toast.type === "info") && (
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-30 pointer-events-none overflow-hidden">
                <div className="absolute top-0 end-0 w-32 h-32 bg-primary opacity-10 blur-[60px] rounded-full" />
              </div>
            )}

            <div className="relative z-10 flex items-start gap-3 sm:gap-4 pe-8 sm:pe-10">
              {/* Icon */}
              <div className="mt-0.5">{getIcon(toast.type)}</div>

              {/* Message */}
              <div className="flex-1 min-w-0">
                <p
                  className={cn("text-sm sm:text-base font-medium leading-relaxed", {
                    "text-light-gray-90": toast.type === "success" || toast.type === "info",
                    "text-red-300": toast.type === "error",
                  })}
                >
                  {toast.message}
                </p>
              </div>
            </div>

            {/* Close button - positioned relative to toast container */}
            <button
              onClick={() => removeToast(toast.id)}
              className={cn(
                "absolute top-3 end-3 sm:top-4 sm:end-4 rounded-md p-1.5 opacity-70 hover:opacity-100 transition-all hover:bg-white-opacity-10 z-20",
                {
                  "text-light-gray-90 hover:text-light-gray":
                    toast.type === "success" || toast.type === "info",
                  "text-red-300 hover:text-red-200": toast.type === "error",
                }
              )}
              aria-label="Close toast"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Primary glow effect for success */}
            {toast.type === "success" && (
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none">
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl shadow-[0_0_20px_rgba(19,245,132,0.2)]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
