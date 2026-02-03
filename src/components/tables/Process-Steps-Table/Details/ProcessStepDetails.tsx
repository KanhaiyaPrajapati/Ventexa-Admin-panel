// components/tables/Process-Steps-Table/Details/ProcessStepDetails.tsx
import Button from "../../../ui/button/Button";
import Badge from "../../../ui/badge/Badge";
import { FileText, AlignLeft, CheckCircle, XCircle } from "lucide-react";

interface ProcessStepDetailsProps {
  step: {
    id?: string;
    step_number: number;
    title: string;
    description: string;
    is_active: boolean;
  };
  onClose?: () => void;
}

// Custom SVG Screenshot Icon (Google Cloud style)
const ScreenshotIcon = () => (
  <svg
    className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
    />
  </svg>
);

const ProcessStepDetails: React.FC<ProcessStepDetailsProps> = ({
  step,
  onClose,
}) => {
  return (
    <div className="space-y-4 sm:space-y-6 bg-transparent">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Process Step Details
        </h2>
       
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        {/* Step Number - Updated with Screenshot icon */}
        <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent">
          <div className="w-10 h-10 rounded-full bg-indigo-100/10 dark:bg-indigo-400/20 flex items-center justify-center">
            <ScreenshotIcon />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">STEP NUMBER</p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {step?.step_number || "N/A"}
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent">
          <div className="w-10 h-10 rounded-full bg-blue-100/10 dark:bg-blue-400/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">TITLE</p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {step?.title || "N/A"}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent">
          <div className="w-10 h-10 rounded-full bg-purple-100/10 dark:bg-purple-400/20 flex items-center justify-center">
            <AlignLeft className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">DESCRIPTION</p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {step?.description || "N/A"}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step?.is_active
                ? "bg-green-100/10 dark:bg-green-400/20"
                : "bg-red-100/10 dark:bg-red-400/20"
            }`}
          >
            {step?.is_active ? (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            )}
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-2">STATUS</p>
            <Badge color={step?.is_active ? "success" : "error"}>
              {step?.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </div>

      {onClose && (
        <div className="flex justify-end pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button variant="primary" onClick={onClose} className="px-4 py-2 text-sm">
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProcessStepDetails;