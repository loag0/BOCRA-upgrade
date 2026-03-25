"use client";

import { useAuth } from "@/lib/auth-context";
import { Shield, Server, Database, Bell, Globe } from "lucide-react";

export default function SettingsPage() {
  const { user, role } = useAuth();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-bocra-navy">
          Settings
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          System configuration and admin account details
        </p>
      </div>

      {/* Account info */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-bocra-navy" />
          <h2 className="text-sm font-semibold text-bocra-navy">
            Admin Account
          </h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-sm font-medium text-bocra-navy">
              {user?.email ?? "-"}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-sm text-gray-500">Display Name</span>
            <span className="text-sm font-medium text-bocra-navy">
              {user?.displayName ?? "-"}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-sm text-gray-500">Role</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-bocra-navy text-white">
              {role ?? "unknown"}
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-500">Firebase UID</span>
            <span className="text-xs font-mono text-gray-400">
              {user?.uid ?? "-"}
            </span>
          </div>
        </div>
      </div>

      {/* System info */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Server className="w-4 h-4 text-bocra-navy" />
          <h2 className="text-sm font-semibold text-bocra-navy">
            System Information
          </h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-sm text-gray-500">Frontend</span>
            <span className="text-sm text-gray-600">Next.js (Vercel)</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-sm text-gray-500">Backend API</span>
            <span className="text-sm text-gray-600">Spring Boot (Java)</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-sm text-gray-500">Database</span>
            <span className="text-sm text-gray-600">Supabase (PostgreSQL)</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-sm text-gray-500">Authentication</span>
            <span className="text-sm text-gray-600">Firebase Auth</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-500">Environment</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-600">
              Development
            </span>
          </div>
        </div>
      </div>

      {/* Placeholder sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 opacity-60">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-4 h-4 text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-400">
              Notifications
            </h2>
          </div>
          <p className="text-xs text-gray-400">
            Email and SMS notification preferences will be configurable here.
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 opacity-60">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-400">
              API Configuration
            </h2>
          </div>
          <p className="text-xs text-gray-400">
            Backend URL, rate limits, and CORS settings will be managed here.
          </p>
        </div>
      </div>
    </div>
  );
}
