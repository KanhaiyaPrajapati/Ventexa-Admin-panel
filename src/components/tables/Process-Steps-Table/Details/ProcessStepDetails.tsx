import React from "react";
import Badge from "../../../ui/badge/Badge";
import { FileText, AlignLeft, CheckCircle, XCircle, Hash } from "lucide-react";

interface ProcessStepDetailsProps {
  step: {
    id?: string;
    step_number: number;
    title: string;
    description: string;
    is_active: boolean;
  };
}

const ProcessStepDetails: React.FC<ProcessStepDetailsProps> = ({
  step,
}) => {
  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-[#1F2937]">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[#4FE7C0] mb-4">
        Process Step Details
      </h2>
      
      <div className="space-y-3 sm:space-y-4">
        
        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
          <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              STEP NUMBER
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              {step?.step_number || "N/A"}
            </p>
          </div>
        </div>

        
        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
          <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              TITLE
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white wrap-break-word">
              {step?.title || "N/A"}
            </p>
          </div>
        </div>

        
        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
          <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <AlignLeft className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              DESCRIPTION
            </p>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 wrap-break-word leading-relaxed">
              {step?.description || "No description provided"}
            </p>
          </div>
        </div>

        
        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
          <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center ${
              step?.is_active 
                ? 'bg-green-100 dark:bg-green-900/40' 
                : 'bg-red-100 dark:bg-red-900/40'
            }`}>
              {step?.is_active ? (
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 dark:text-red-400" />
              )}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              STATUS
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <Badge 
                size="sm" 
                color={step?.is_active ? "success" : "error"}
              >
                {step?.is_active ? "Active" : "Inactive"}
              </Badge>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {step?.is_active 
                  ? '• This step is currently active' 
                  : '• This step is currently inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessStepDetails;