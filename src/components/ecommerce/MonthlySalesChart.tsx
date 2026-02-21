import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState, useEffect } from "react";

export default function MonthlySalesChart() {
  const [isOpen, setIsOpen] = useState(false);
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

  const options: ApexOptions = {
    colors: [isDarkMode ? "#4FE7C0" : "#3b82f6"],
    chart: {
      fontFamily: "'JetBrains Mono', 'Inter', monospace",
      type: "bar",
      height: 180,
      toolbar: { show: false },
      sparkline: { enabled: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
      strokeDashArray: 3,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: "#64748b", fontSize: "10px", fontWeight: 500 },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#64748b", fontSize: "10px" },
        formatter: (val) => `${val}ms`,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: isDarkMode ? "dark" : "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: [isDarkMode ? "#2DD4BF" : "#60a5fa"], 
        opacityFrom: 0.9,
        opacityTo: 0.3,
      },
    },
    tooltip: {
      theme: isDarkMode ? "dark" : "light",
      x: { show: false },
    },
  };

  const series = [{ name: "System Load", data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112] }];

  return (
    <div className="relative overflow-hidden rounded-2xl mb-10 border border-gray-200 bg-white p-1 dark:border-white/10 dark:bg-[#0f172a] transition-all hover:shadow-lg dark:hover:shadow-[#4FE7C0]/5">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-2 w-2 items-center justify-center">
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-blue-400 dark:bg-[#4FE7C0] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500 dark:bg-[#4FE7C0]"></span>
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400">
              Network throughput
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-mono font-semibold text-gray-900 dark:text-white">
                248.54 <span className="text-[10px] text-gray-400">MB/s</span>
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-[#4FE7C0]">+12.5%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto overflow-y-hidden px-2 pb-2">
        <div className="min-w-[500px] xl:min-w-full">
          <Chart options={options} series={series} type="bar" height={160} />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/30 px-4 py-2.5 dark:border-white/5 dark:bg-white/[0.02]">
        <div className="flex gap-4">
           <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-tighter">Node-ID: <span className="text-gray-600 dark:text-gray-300">0x4f22</span></span>
           <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-tighter">Uptime: <span className="text-slate-600 dark:text-[#4FE7C0]">99.9%</span></span>
        </div>
        <span className="text-[9px] font-mono text-gray-400 uppercase">Live Metrics</span>
      </div>
    </div>
  );
}