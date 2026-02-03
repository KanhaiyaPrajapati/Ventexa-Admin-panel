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
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Service Feature Details
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          View complete information about this service feature
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
              Service ID
            </p>
            <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
              {feature?.service_id || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
              Feature Title
            </p>
            <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
              {feature?.feature_title || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <AlignLeft className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
              Description
            </p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {feature?.feature_description
                ? feature.feature_description.length > 20
                  ? `${feature.feature_description.slice(0, 20)}...`
                  : feature.feature_description
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <div
            className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
              feature?.is_active
                ? "bg-green-100 dark:bg-green-900/30"
                : "bg-red-100 dark:bg-red-900/30"
            }`}
          >
            {feature?.is_active ? (
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
              Status
            </p>
            <Badge color={feature?.is_active ? "success" : "error"} size="md">
              {feature?.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </div>

      {onClose && (
        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="primary" onClick={onClose} size="md" className="w-full sm:w-auto">
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default ServiceFeatureDetails;
