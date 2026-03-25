"use client";

import { useEffect, useState, useCallback } from "react";
import { AlertCircle, RefreshCw, Trash2, Clock } from "lucide-react";
import { toast } from "sonner";
import type { ErrorRecord } from "@/lib/error-store";

export function ErrorLogPanel() {
  const [errors, setErrors] = useState<ErrorRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchErrors = useCallback(async () => {
    try {
      const res = await fetch("/api/errors");
      const data = await res.json();
      setErrors(data.errors ?? []);
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchErrors();
    const interval = setInterval(fetchErrors, 30_000);
    return () => clearInterval(interval);
  }, [fetchErrors]);

  const handleClear = async () => {
    try {
      await fetch("/api/errors", { method: "DELETE" });
      setErrors([]);
      toast.success("Error log cleared.");
    } catch {
      toast.error("Failed to clear error log.");
    }
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    const now = Date.now();
    const diff = now - d.getTime();
    if (diff < 60_000) return "just now";
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
    if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
    return d.toLocaleDateString("en-BW", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-bocra-red" />
          <h2 className="text-sm font-semibold text-bocra-navy">Error Log</h2>
          {errors.length > 0 && (
            <span className="text-xs bg-red-50 text-bocra-red font-medium px-2 py-0.5 rounded-full">
              {errors.length} error{errors.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchErrors}
            className="p-1.5 text-gray-400 hover:text-bocra-blue rounded transition-colors"
            aria-label="Refresh error log"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
          {errors.length > 0 && (
            <button
              onClick={handleClear}
              className="text-xs text-gray-400 hover:text-bocra-red transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>
      </div>

      {loading && errors.length === 0 ? (
        <div className="px-5 py-8 text-center">
          <div className="loading-dots mx-auto" style={{ display: "flex", justifyContent: "center" }}>
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>
        </div>
      ) : errors.length === 0 ? (
        <div className="px-5 py-8 text-center">
          <AlertCircle className="w-8 h-8 text-gray-200 mx-auto mb-2" />
          <p className="text-sm text-gray-400">No errors recorded</p>
          <p className="text-xs text-gray-300 mt-0.5">Errors from all route groups appear here automatically</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
          {errors.slice(0, 20).map((err) => (
            <div key={err.id} className="px-5 py-3 hover:bg-red-50/30 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-gray-400">{err.id}</span>
                    <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                      {err.route}
                    </span>
                  </div>
                  <p className="text-sm text-bocra-navy mt-0.5 truncate">{err.message}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                  <Clock className="w-3 h-3" />
                  {formatTime(err.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {errors.length > 20 && (
        <div className="px-5 py-3 border-t border-gray-50">
          <p className="text-xs text-gray-400">
            Showing 20 of {errors.length} errors (newest first)
          </p>
        </div>
      )}
    </div>
  );
}
