import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function ITConsultingDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);


  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct","Nov", "Dec"];
  const revenueData = [4500, 3500, 9000, 5500, 8500, 8000, 10500, 10500, 15000, 19000, 20600, 28000];

  const brandColor = isDarkMode ? "#4FE7C0" : "#6366f1"; 

  return (
    <div className="w-full space-y-6">
      <div className="group relative overflow-hidden rounded-[32px] border border-slate-300/90 bg-white transition-all duration-300 dark:border-slate-800/60 dark:bg-[#0B1120]">
        
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/5 dark:bg-[#4FE7C0]/10 blur-[80px]" />

        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Revenue & Growth
              </h2>
              <p className="text-sm font-medium text-slate-500">Global IT Consulting Performance</p>
            </div>
          </div>

          <div className="mt-4 h-[350px] w-full">
            <LineChart
              series={[{ 
                data: revenueData, 
                area: true, 
                color: brandColor, 
                showMark: true, 
                curve: "catmullRom",
                valueFormatter: (val) => `$${val?.toLocaleString()}`
              }]}
              xAxis={[{ 
                data: months, 
                scaleType: 'point',
                tickLabelStyle: { fontSize: 12, fontWeight: 600, fill: '#94a3b8' },
              }]}
              yAxis={[{ 
                tickLabelStyle: { fontSize: 12, fontWeight: 600, fill: '#94a3b8' },
                valueFormatter: (val: number) => `$${val /1000}k` 
              }]}
              slots={{ legend: undefined }}
              margin={{ left: 10, right:10, top: 20, bottom: 40 }}
              sx={{
                '.MuiAreaElement-root': { fill: 'url(#dynamic-gradient)', fillOpacity: 1 },
                '.MuiLineElement-root': { strokeWidth: 3 },
                '.MuiMarkElement-root': { 
                    stroke: brandColor, 
                    strokeWidth: 2, 
                    fill: isDarkMode ? '#0B1120' : '#ffffff' 
                },
                '& .MuiChartsAxis-line': { stroke: '#e2e8f0', strokeWidth: 1 },
                '& .MuiChartsAxis-tick': { stroke: '#e2e8f0', strokeWidth: 1 },
                '.dark & .MuiChartsAxis-line': { stroke: '#1e293b' },
                '.dark & .MuiChartsAxis-tick': { stroke: '#1e293b' },
              }}
            >
              <defs>
                <linearGradient id="dynamic-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={brandColor} stopOpacity={isDarkMode ? 0.4 : 0.2} />
                  <stop offset="100%" stopColor={brandColor} stopOpacity={0} />
                </linearGradient>
              </defs>
            </LineChart>
          </div>
        </div>

         <div className="grid grid-cols-1 gap-px border-t border-slate-100 bg-slate-100 dark:border-slate-800 dark:bg-slate-800 sm:grid-cols-3 mt-6">
          {[
            { label: "Active Clients", value: "42", detail: "+4 this month" },
            { label: "Project Margin", value: "32.4%", detail: "Optimized" },
            { label: "Billable Hours", value: "1,840", detail: "92% Capacity" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white px-8 py-6 dark:bg-[#0B1120]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</span>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-[#4FE7C0]">{stat.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}