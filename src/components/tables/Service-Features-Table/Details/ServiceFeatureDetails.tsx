import React from "react";
import Button from "../../../ui/button/Button";
import Badge from "../../../ui/badge/Badge";
import { Layers, FileText, AlignLeft, CheckCircle, XCircle } from "lucide-react";
import { ServiceFeature } from "../../../../store/types/types";

interface ServiceFeatureDetailsProps {
  feature: ServiceFeature;
  onClose?: () => void;
}

const ServiceFeatureDetails: React.FC<ServiceFeatureDetailsProps> = ({ feature, onClose }) => {
  return (
    <div className="p-4 space-y-3 bg-white dark:bg-[#1F2937] w-full">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-[#4FE7C0] mb-2">
        Service Feature Details
      </h2>
      
      <div className="space-y-2">
        <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
          <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">
              SERVICE ID
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white break-words">
              {feature?.service_id || "Not Assigned"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
          <div className="shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">
              FEATURE NAME
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white break-words">
              {feature?.feature_title || "Untitled Feature"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
          <div className="shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <AlignLeft className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">
              DESCRIPTION
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 break-words leading-relaxed">
              {feature?.feature_description || "No description provided"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
          <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
              feature?.is_active 
                ? 'bg-green-100 dark:bg-green-900/40' 
                : 'bg-red-100 dark:bg-red-900/40'
            }`}>
              {feature?.is_active ? (
                <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
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
                color={feature?.is_active ? "success" : "error"}
              >
                {feature?.is_active ? "Active" : "Inactive"}
              </Badge>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {feature?.is_active 
                  ? '• This feature is currently active' 
                  : '• This feature is currently inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {onClose && (
        <div className="flex justify-end pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="w-full sm:w-auto px-3 py-1.5 text-sm dark:border-gray-600 dark:text-gray-300 dark:hover:bg-[#374151] dark:bg-transparent"
          >
            Close Details
          </Button>
        </div>
      )}
    </div>
  );
};

export default ServiceFeatureDetails;