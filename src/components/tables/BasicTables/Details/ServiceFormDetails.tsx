import Button from "../../../ui/button/Button";
import Badge from "../../../ui/badge/Badge";
import {
  Layers,
  FileText,
  AlignLeft,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { ServiceFeature } from "../../../../store/types/types";

/* ================================
   Props Interface
================================ */
interface ServiceFormDetailsProps {
  feature: ServiceFeature;
  onClose?: () => void;
}

/* ================================
   Component
================================ */
const ServiceFormDetails: React.FC<ServiceFormDetailsProps> = ({
  feature,
  onClose,
}) => {
  return (
    <div className="space-y-4 sm:space-y-6 bg-transparent">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Service Feature Details
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          View complete information about this service feature
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Service ID */}
        <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="w-10 h-10 rounded-full bg-indigo-100/10 dark:bg-indigo-400/20 flex items-center justify-center">
            <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">
              Service ID
            </p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {feature?.service_id || "N/A"}
            </p>
          </div>
        </div>

        {/* Feature Title */}
        <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="w-10 h-10 rounded-full bg-blue-100/10 dark:bg-blue-400/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">
              Feature Title
            </p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {feature?.feature_title || "N/A"}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="w-10 h-10 rounded-full bg-purple-100/10 dark:bg-purple-400/20 flex items-center justify-center">
            <AlignLeft className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">
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

        {/* Status */}
        <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              feature?.is_active
                ? "bg-green-100/10 dark:bg-green-400/20"
                : "bg-red-100/10 dark:bg-red-400/20"
            }`}
          >
            {feature?.is_active ? (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            )}
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-2">
              Status
            </p>
            <Badge color={feature?.is_active ? "success" : "error"}>
              {feature?.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Footer */}
      {onClose && (
        <div className="flex justify-end pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default ServiceFormDetails;
