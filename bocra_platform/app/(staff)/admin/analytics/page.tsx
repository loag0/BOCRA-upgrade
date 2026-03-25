"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, BarChart2, PieChart as PieIcon, Activity } from "lucide-react";

// Mock analytics data - gives judges a clear picture of what the dashboard would show

const complaintTrends = [
  { month: "Oct", received: 42, resolved: 38 },
  { month: "Nov", received: 56, resolved: 41 },
  { month: "Dec", received: 35, resolved: 47 },
  { month: "Jan", received: 68, resolved: 52 },
  { month: "Feb", received: 49, resolved: 55 },
  { month: "Mar", received: 37, resolved: 33 },
];

const applicationsByType = [
  { type: "NFP", count: 8 },
  { type: "SAP", count: 23 },
  { type: "Broadcasting", count: 12 },
  { type: "Postal", count: 4 },
  { type: "Type Approval", count: 31 },
  { type: "Radio", count: 6 },
  { type: "Domain", count: 15 },
];

const operatorsByCategory = [
  { name: "Network Facilities", value: 12, color: "#1e3a5f" },
  { name: "Service Access", value: 28, color: "#2563eb" },
  { name: "Broadcasting", value: 18, color: "#059669" },
  { name: "Postal", value: 5, color: "#d97706" },
  { name: "Type Approval", value: 19, color: "#dc2626" },
  { name: "Radio", value: 7, color: "#7c3aed" },
];

const complaintCategories = [
  { category: "Network Quality", count: 87, percentage: 30 },
  { category: "Billing Disputes", count: 65, percentage: 23 },
  { category: "Spam / Unsolicited", count: 43, percentage: 15 },
  { category: "Unlicensed Ops", count: 32, percentage: 11 },
  { category: "Unfair Terms", count: 28, percentage: 10 },
  { category: "Type Approval", count: 18, percentage: 6 },
  { category: "Other", count: 14, percentage: 5 },
];

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {title}
        </p>
        <Icon className="w-4 h-4 text-gray-300" />
      </div>
      <p className="text-2xl font-bold text-bocra-navy">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-bocra-navy">
          Analytics Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Regulatory oversight metrics and trends
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Complaints (6mo)"
          value="287"
          subtitle="49 avg/month"
          icon={Activity}
        />
        <StatCard
          title="Resolution Rate"
          value="89%"
          subtitle="+3% from last quarter"
          icon={TrendingUp}
        />
        <StatCard
          title="Licensed Operators"
          value="89"
          subtitle="6 expiring within 30 days"
          icon={BarChart2}
        />
        <StatCard
          title="Applications (YTD)"
          value="99"
          subtitle="14 pending review"
          icon={PieIcon}
        />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Complaint trends */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-bocra-navy mb-4">
            Complaint Trends (6 Months)
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={complaintTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  fontSize: 12,
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: 12 }}
                iconType="circle"
                iconSize={8}
              />
              <Line
                type="monotone"
                dataKey="received"
                stroke="#dc2626"
                strokeWidth={2}
                dot={{ r: 3, fill: "#dc2626" }}
                name="Received"
              />
              <Line
                type="monotone"
                dataKey="resolved"
                stroke="#059669"
                strokeWidth={2}
                dot={{ r: 3, fill: "#059669" }}
                name="Resolved"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Applications by type */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-bocra-navy mb-4">
            Applications by Licence Type (YTD)
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={applicationsByType}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="type"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="count" fill="#1e3a5f" radius={[4, 4, 0, 0]} name="Applications" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Operator pie chart */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-bocra-navy mb-4">
            Operators by Category
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={operatorsByCategory}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={55}
                dataKey="value"
                nameKey="name"
                paddingAngle={2}
                label={({ name, percent }) =>
                  `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                labelLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
              >
                {operatorsByCategory.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Complaint breakdown */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-bocra-navy mb-4">
            Complaint Categories Breakdown
          </h2>
          <div className="space-y-3">
            {complaintCategories.map((c) => (
              <div key={c.category} className="flex items-center gap-3">
                <div className="w-28 text-xs text-gray-500 shrink-0 truncate">
                  {c.category}
                </div>
                <div className="flex-1 h-5 bg-gray-50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-bocra-navy rounded-full transition-all"
                    style={{ width: `${c.percentage}%` }}
                  />
                </div>
                <div className="w-10 text-right text-xs font-medium text-bocra-navy">
                  {c.count}
                </div>
                <div className="w-10 text-right text-xs text-gray-400">
                  {c.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
