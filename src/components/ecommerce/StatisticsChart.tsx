import { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";

export default function ITConsultingDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct","Nov", "Dec"];
  const revenueData = [4500, 3500, 9000, 5500, 8500, 8000, 10500, 10500, 15000, 19000, 20600, 28000];

  const services = [
    { name: "Cloud Migration", count: 12, growth: "+14%", color: "bg-blue-500" },
    { name: "Cyber Security", count: 8, growth: "+5%", color: "bg-purple-500" },
    { name: "AI Strategy", count: 15, growth: "+22%", color: "bg-indigo-500" },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="group relative overflow-hidden rounded-[32px] border border-slate-200/60 bg-white shadow-2xl transition-all duration-300 dark:border-slate-800/60 dark:bg-[#0B1120]">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-[80px]" />

        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Revenue & Growth
              </h2>
              <p className="text-sm font-medium text-slate-500">Global IT Consulting Performance</p>
            </div>

            <div className="relative flex items-center gap-3">
               <button onClick={toggleDropdown} className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 transition-hover hover:bg-slate-100">
                <MoreDotIcon className="size-5 text-slate-500" />
              </button>
              <Dropdown isOpen={isOpen} onClose={closeDropdown} className="right-0 top-14 w-52 rounded-2xl shadow-xl">
                <DropdownItem onItemClick={closeDropdown}>Generate Invoice</DropdownItem>
                <DropdownItem onItemClick={closeDropdown}>Client Portfolio</DropdownItem>
              </Dropdown>
            </div>
          </div>

          <div className="mt-4 h-[350px] w-full">
            <LineChart
              series={[{ 
                data: revenueData, 
                area: true, 
                color: '#6366F1', 
                showMark: true, 
                curve: "catmullRom",
                valueFormatter: (val) => `$${val?.toLocaleString()}`
              }]}
              xAxis={[{ 
                data: months, 
                scaleType: 'point',
                tickLabelStyle: {
                    fontSize: 12,
                    fontWeight: 600,
                    fill: '#94a3b8', 
                },
              }]}
              yAxis={[{ 
                tickLabelStyle: {
                    fontSize: 12,
                    fontWeight: 600,
                    fill: '#94a3b8',
                },
                valueFormatter: (val: number) => `$${val / 1000}k` 
              }]}
              slots={{ legend: undefined }}
              margin={{ left: 10, right:10, top: 20, bottom: 40 }}
              sx={{
                '.MuiAreaElement-root': { fill: 'url(#premium-gradient)', fillOpacity: 1 },
                '.MuiLineElement-root': { strokeWidth: 4 },
                '& .MuiChartsAxis-line': { stroke: '#e2e8f0', strokeWidth: 1 },
                '& .MuiChartsAxis-tick': { stroke: '#e2e8f0', strokeWidth: 1 },
                '.dark & .MuiChartsAxis-line': { stroke: '#1e293b' },
                '.dark & .MuiChartsAxis-tick': { stroke: '#1e293b' },
              }}
            >
              <defs>
                <linearGradient id="premium-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
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
                <span className="text-[10px] font-bold text-emerald-500">{stat.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}