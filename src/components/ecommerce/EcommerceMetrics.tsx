import { useEffect, useState } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  GroupIcon,
  BoxIconLine,
  GridIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import { Loader } from "../ui/Loader/Loader";

export default function BusinessMetrics() {
  const [loading, setLoading] = useState(true);

  const metrics = [
    {
      title: "Total Services",
      value: "48",
      growth: "12.5%",
      isUp: true,
      icon: <GridIcon className="size-6" />,
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Active Projects",
      value: "156",
      growth: "4.2%",
      isUp: true,
      icon: <BoxIconLine className="size-6" />,
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Total Clients",
      value: "2,840",
      growth: "8.1%",
      isUp: true,
      icon: <GroupIcon className="size-6" />,
      color: "from-orange-500/20 to-yellow-500/20",
    },
    {
      title: "Total Profit",
      value: "$45,230",
      growth: "2.4%",
      isUp: false,
      icon: <GridIcon className="size-6" />,
      color: "from-emerald-500/20 to-teal-500/20",
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
              group relative overflow-hidden rounded-3xl
              border border-gray-200 dark:border-white/10
              bg-white dark:bg-[#111827]
              p-1 transition-all duration-300
            "
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            <div className="relative flex flex-col h-full bg-white/90 dark:bg-[#111827]/80 backdrop-blur-xl rounded-[22px] p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center justify-center size-12 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white">
                  {item.icon}
                </div>

                <Badge color={item.isUp ? "success" : "error"}>
                  <span className="flex items-center gap-1 font-semibold text-xs">
                    {item.isUp ? (
                      <ArrowUpIcon className="size-3" />
                    ) : (
                      <ArrowDownIcon className="size-3" />
                    )}
                    {item.growth}
                  </span>
                </Badge>
              </div>

              <div className="mt-auto">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">
                  {item.title}
                </p>

                <div className="h-[40px] flex items-center">
                  {loading ? (
                    <Loader />
                  ) : (
                    <h4 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {item.value}
                    </h4>
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
