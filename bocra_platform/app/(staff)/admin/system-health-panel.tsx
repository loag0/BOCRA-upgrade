"use client";

import { CheckCircle2, Server, Clock, GitBranch, RotateCcw } from "lucide-react";

const BUILD_TIMESTAMP = new Date().toISOString();

export function SystemHealthPanel() {
  const services = [
    { name: "Frontend (Next.js)", status: "operational" as const },
    { name: "Firebase Auth", status: "operational" as const },
    { name: "Spring Boot API", status: "pending" as const },
    { name: "Database (Supabase)", status: "pending" as const },
  ];

  const statusConfig = {
    operational: { label: "Online", className: "bg-green-50 text-bocra-green", dot: "bg-bocra-green" },
    degraded: { label: "Degraded", className: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
    pending: { label: "Not connected", className: "bg-gray-100 text-gray-500", dot: "bg-gray-400" },
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-bocra-green" />
          <h2 className="text-sm font-semibold text-bocra-navy">System Health</h2>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Service statuses */}
        <div className="space-y-2.5">
          {services.map((svc) => {
            const cfg = statusConfig[svc.status];
            return (
              <div key={svc.name} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{svc.name}</span>
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${cfg.className}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  {cfg.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Build info */}
        <div className="pt-3 border-t border-gray-100 space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <GitBranch className="w-3 h-3" />
            <span>Branch: main</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            <span>
              Deployed:{" "}
              {new Date(BUILD_TIMESTAMP).toLocaleDateString("en-BW", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* Rollback info */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs font-medium text-gray-500">Rollback</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Instant rollback is available via the Vercel dashboard. Each deployment is preserved
            and can be promoted back to production in one click. No data loss occurs during rollback
            as the database state is independent of the frontend deployment.
          </p>
        </div>
      </div>
    </div>
  );
}
