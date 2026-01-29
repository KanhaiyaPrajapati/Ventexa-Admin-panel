import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import { useState } from "react";

export default function MonthlySalesChart() {
  const [isOpen, setIsOpen] = useState(false);

  const options: ApexOptions = {
    colors: ["#3b82f6"],
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
        borderRadius: 2,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: "rgba(156, 163, 175, 0.1)",
      strokeDashArray: 3,
      padding: { left: 10, right: 0 },
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
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#60a5fa"],
        opacityFrom: 0.9,
        opacityTo: 0.4,
      },
    },
    tooltip: {
      theme: "dark",
      x: { show: false },
      style: { fontSize: "12px" },
    },
  };

  const series = [
    {
      name: "System Load",
      data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112],
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-xl mb-10  border border-gray-200 bg-[#f8fafc] p-1 dark:border-white/10 dark:bg-[#0f172a]">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-2 w-2 items-center justify-center">
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Network throughput
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-mono font-semibold text-gray-900 dark:text-white">
                248.54 <span className="text-[10px] text-gray-400">MB/s</span>
              </span>
              <span className="text-[10px] font-medium text-emerald-500">+12.5%</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 shadow-sm transition-all hover:bg-gray-50 dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <MoreDotIcon className="size-4" />
          </button>

          <Dropdown
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            className="right-0 top-10 w-40 overflow-hidden border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-gray-900"
          >
            <DropdownItem className="px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-white/5">
              Export Logs
            </DropdownItem>
            <DropdownItem className="px-3 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
              Purge Cache
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto overflow-y-hidden px-2 pb-2">
        <div className="min-w-[500px] xl:min-w-full">
          <Chart options={options} series={series} type="bar" height={160} />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-4 py-2 dark:border-white/5 dark:bg-white/[0.02]">
        <span className="text-[10px] font-mono text-gray-400 uppercase">Node-ID: 0x4f22</span>
        <span className="text-[10px] font-mono text-gray-400 uppercase">Uptime: 99.9%</span>
      </div>
    </div>
  );
}
