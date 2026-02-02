import { Calendar, MapPin, Target, Eye, ShieldCheck } from "lucide-react";
import { AboutCompany } from "../../../../store/api/Aboutompany-api";

type Props = {
  data: AboutCompany;
};

const AboutCompanyProfileView = ({ data }: Props) => {
  return (
    <div className="w-full p-4 md:p-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="relative overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm">
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              About Company
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">
              Internal organization profile and strategic objectives.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard 
            icon={<Calendar className="text-blue-500" size={20} />} 
            label="Founded" 
            value={data.founded_year} 
          />
          <StatCard 
            icon={<MapPin className="text-red-500" size={20} />} 
            label="Headquarters" 
            value={data.headquarters} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <ContentBlock 
              title="Company Overview" 
              value={data.company_overview} 
              icon={<ShieldCheck className="text-blue-500" size={22} />}
              highlight
            />
            <ContentBlock 
              title="Core Values" 
              value={data.core_values} 
              icon={<ShieldCheck className="text-orange-500" size={22} />}
            />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <ContentBlock 
              title="Mission Statement" 
              value={data.mission} 
              icon={<Target className="text-emerald-500" size={22} />}
              variant="compact"
            />
            <ContentBlock 
              title="Future Vision" 
              value={data.vision} 
              icon={<Eye className="text-purple-500" size={22} />}
              variant="compact"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
  <div className="flex items-center gap-4 p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm">
    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">{icon}</div>
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="text-base font-bold text-gray-900 dark:text-white">{value || "—"}</p>
    </div>
  </div>
);

const ContentBlock = ({ 
  title, 
  value, 
  icon, 
  highlight = false, 
  variant = "default" 
}: { 
  title: string, value: string, icon: React.ReactNode, highlight?: boolean, variant?: "default" | "compact" 
}) => (
  <div className={`
    p-6 rounded-3xl border transition-all duration-300
    ${highlight ? 'bg-blue-50/30 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800'}
  `}>
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <h4 className="font-bold text-gray-800 dark:text-white uppercase text-xs tracking-widest">{title}</h4>
    </div>
    <p className={`
      text-gray-600 dark:text-gray-300 leading-relaxed
      ${variant === "compact" ? "text-sm" : "text-base"}
    `}>
      {value || "Information not provided yet."}
    </p>
  </div>
);

export default AboutCompanyProfileView;
