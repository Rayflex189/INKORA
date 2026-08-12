"use client";

import React, { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Users, Feather, BookOpen, FileText, MessageSquare } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30D");

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics?range=${timeRange}`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const ranges = [
    { key: "TODAY", label: "Today" },
    { key: "7D", label: "7 Days" },
    { key: "30D", label: "30 Days" },
    { key: "90D", label: "90 Days" },
    { key: "1Y", label: "1 Year" },
    { key: "ALL", label: "All Time" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Platform Intelligence & Growth</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold tracking-tight">Platform Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track user acquisition, reader engagement, writing productivity, and publication growth.
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex flex-wrap items-center gap-1 rounded-2xl border border-border bg-card p-1.5 text-xs font-semibold">
          {ranges.map((r) => (
            <button
              key={r.key}
              onClick={() => setTimeRange(r.key)}
              className={`rounded-xl px-3 py-1.5 transition-colors ${
                timeRange === r.key ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <span className="text-[10px] font-bold text-muted-foreground uppercase">Registrations</span>
          <p className="text-2xl font-extrabold font-serif text-primary mt-1">{data?.metrics?.totalUsers || 0}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <span className="text-[10px] font-bold text-muted-foreground uppercase">Writers</span>
          <p className="text-2xl font-extrabold font-serif text-indigo-600 dark:text-indigo-400 mt-1">{data?.metrics?.writersCount || 0}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <span className="text-[10px] font-bold text-muted-foreground uppercase">Readers</span>
          <p className="text-2xl font-extrabold font-serif text-amber-600 dark:text-amber-400 mt-1">{data?.metrics?.readersCount || 0}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <span className="text-[10px] font-bold text-muted-foreground uppercase">Projects</span>
          <p className="text-2xl font-extrabold font-serif text-purple-600 dark:text-purple-400 mt-1">{data?.metrics?.projectsCreated || 0}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <span className="text-[10px] font-bold text-muted-foreground uppercase">Published Books</span>
          <p className="text-2xl font-extrabold font-serif text-emerald-600 dark:text-emerald-400 mt-1">{data?.metrics?.booksPublished || 0}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <span className="text-[10px] font-bold text-muted-foreground uppercase">Comments</span>
          <p className="text-2xl font-extrabold font-serif text-rose-600 dark:text-rose-400 mt-1">{data?.metrics?.totalComments || 0}</p>
        </div>
      </div>

      {/* Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Growth Trends */}
        <div className="rounded-3xl border border-border bg-card p-6 space-y-4 shadow-xs">
          <h3 className="font-serif text-xl font-bold border-b border-border pb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            <span>User & Content Growth Trends</span>
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.trendData || []}>
                <defs>
                  <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#888888" fontSize={10} />
                <YAxis stroke="#888888" fontSize={10} />
                <Tooltip />
                <Area type="monotone" dataKey="registrations" stroke="#4f46e5" fillOpacity={1} fill="url(#colorReg)" />
                <Area type="monotone" dataKey="projects" stroke="#f59e0b" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Writing Words */}
        <div className="rounded-3xl border border-border bg-card p-6 space-y-4 shadow-xs">
          <h3 className="font-serif text-xl font-bold border-b border-border pb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-amber-500" />
            <span>Daily Words Written Output</span>
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.trendData || []}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="day" stroke="#888888" fontSize={10} />
                <YAxis stroke="#888888" fontSize={10} />
                <Tooltip />
                <Bar dataKey="writingWords" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
