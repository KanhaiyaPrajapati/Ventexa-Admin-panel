import { useEffect, useState } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  GroupIcon,
  BoxIconLine,
  GridIcon,
} from "../../icons";
import Loader from "../ui/Loader/Loader";

export default function BusinessMetrics() {
  const [loading, setLoading] = useState(true);

  const metrics = [
    {
      title: "Total Services",
      value: "48",
      growth: "12.5%",
      isUp: true,
      icon: <GridIcon className="size-6" />,
    },
    {
      title: "Active Projects",
      value: "156",
      growth: "4.2%",
      isUp: true,
      icon: <BoxIconLine className="size-6" />,
    },
    {
      title: "Total Clients",
      value: "2,840",
      growth: "8.1%",
      isUp: true,
      icon: <GroupIcon className="size-6" />,
    },
    {
      title: "Total Profit",
      value: "$45,230",
      growth: "2.4%",
      isUp: false,
      icon: <GridIcon className="size-6" />,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 md:p-2 mb-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((item, index) => (
          <div
            key={index}
            className="
              group relative overflow-hidden rounded-[32px]
              border border-gray-200 dark:border-white/10
              bg-white dark:bg-[#0B1120]
              p-1 transition-all duration-500 hover:scale-[1.02]
            "
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#4FE7C0]/20 via-transparent to-transparent opacity-0 dark:group-hover:opacity-100 transition-opacity duration-500"
            />

            <div className="relative flex flex-col h-full bg-white dark:bg-[#0B1120]/90 backdrop-blur-xl rounded-[28px] p-6">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center justify-center size-12 rounded-2xl bg-slate-100 dark:bg-[#4FE7C0]/10 border border-slate-200 dark:border-[#4FE7C0]/20 text-slate-600 dark:text-[#4FE7C0]">
                  {item.icon}
                </div>

                <div className={`
                  flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-tighter
                  ${item.isUp 
                    ? "bg-emerald-50 text-emerald-600 dark:bg-[#4FE7C0]/10 dark:text-[#4FE7C0]" 
                    : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"}
                `}>
                  {item.isUp ? (
                    <ArrowUpIcon className="size-3" />
                  ) : (
                    <ArrowDownIcon className="size-3" />
                  )}
                  {item.growth}
                </div>
              </div>

              <div className="mt-auto">
                <p className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-1">
                  {item.title}
                </p>

                <div className="flex items-baseline gap-2">
                  {loading ? (
                    <div className="h-9 flex items-center">
                      <Loader />
                    </div>
                  ) : (
                    <>
                      <h4 className="text-3xl font-black text-slate-900 dark:text-white">
                        {item.value}
                      </h4>
                      <div className="hidden dark:block size-1.5 rounded-full bg-[#4FE7C0] animate-pulse" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}