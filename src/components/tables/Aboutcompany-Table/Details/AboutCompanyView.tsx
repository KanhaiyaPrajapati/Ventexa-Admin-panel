import React from "react";
import { Target, Eye, ShieldCheck, Calendar, MapPin, X } from "lucide-react";

interface AboutCompany {
  id?: string;
  _id?: string;
  company_overview: string;
  mission: string;
  vision: string;
  core_values: string;
  founded_year: number | string;
  headquarters: string;
}

interface AboutCompanyProfileViewProps {
  data: AboutCompany;
  onClose?: () => void;
}

const AboutCompanyProfileView: React.FC<AboutCompanyProfileViewProps> = ({
  data,
  onClose,
}) => {
  return (
    <div className="relative bg-white dark:bg-[#1F2937] rounded-3xl w-full border border-gray-200 dark:border-gray-700">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      )}
      
      <div className="p-5 pt-10">
        <h2 className="text-base font-semibold text-gray-900 dark:text-[#4FE7C0] mb-3">
          Company Profile Details
        </h2>
        
        <div className="space-y-2">
          <div className="flex items-start gap-2 p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
            <div className="shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-0.5">
                COMPANY OVERVIEW
              </p>
              <p className="text-xs text-gray-800 dark:text-gray-300 break-words leading-relaxed line-clamp-2">
                {data?.company_overview || "No overview provided"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
            <div className="shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center border border-green-200 dark:border-green-800">
              <Target className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-0.5">
                MISSION
              </p>
              <p className="text-xs text-gray-800 dark:text-gray-300 break-words leading-relaxed line-clamp-2">
                {data?.mission || "No mission provided"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
            <div className="shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center border border-purple-200 dark:border-purple-800">
              <Eye className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-0.5">
                VISION
              </p>
              <p className="text-xs text-gray-800 dark:text-gray-300 break-words leading-relaxed line-clamp-2">
                {data?.vision || "No vision provided"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
            <div className="shrink-0 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center border border-orange-200 dark:border-orange-800">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-0.5">
                CORE VALUES
              </p>
              <p className="text-xs text-gray-800 dark:text-gray-300 break-words leading-relaxed line-clamp-2">
                {data?.core_values || "No core values provided"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-start gap-2 p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
              <div className="shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center border border-red-200 dark:border-red-800">
                <Calendar className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-0.5">
                  FOUNDED
                </p>
                <p className="text-xs font-semibold text-gray-900 dark:text-white">
                  {data?.founded_year || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
              <div className="shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
                <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-0.5">
                  HQ
                </p>
                <p className="text-xs font-semibold text-gray-900 dark:text-white">
                  {data?.headquarters || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCompanyProfileView;