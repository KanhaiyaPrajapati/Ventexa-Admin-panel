import Button from "../../../ui/button/Button";
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
  onClose?: () => void;
}

const ProcessStepDetails: React.FC<ProcessStepDetailsProps> = ({
  step,
  onClose,
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-3 sm:space-y-4">
  
        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100/10 dark:bg-blue-400/20 flex items-center justify-center">
            <Hash className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">STEP NUMBER</p>
            <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white truncate">
              {step?.step_number || "N/A"}
            </p>
          </div>
        </div>

       
        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100/10 dark:bg-green-400/20 flex items-center justify-center">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">TITLE</p>
            <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white break-words">
              {step?.title || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-100/10 dark:bg-purple-400/20 flex items-center justify-center">
            <AlignLeft className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">DESCRIPTION</p>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 break-words leading-relaxed">
              {step?.description || "No description provided"}
            </p>
          </div>
        </div>

      
        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-100/20 to-gray-200/20 dark:from-gray-800/50 dark:to-gray-900/50">
            <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center ${step?.is_active ? 'bg-green-100 dark:bg-green-900/40' : 'bg-red-100 dark:bg-red-900/40'}`}>
              {step?.is_active ? (
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400" />
              )}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">STATUS</p>
            <div className="flex items-center gap-2">
              <Badge 
                size="md" 
                color={step?.is_active ? "success" : "error"}
                className="text-sm sm:text-base"
              >
                {step?.is_active ? "Active" : "Inactive"}
              </Badge>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {step?.is_active ? '• This step is currently active' : '• This step is currently inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {onClose && (
        <div className="flex justify-end pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="w-full sm:w-auto px-4 py-2.5 text-sm sm:text-base"
          >
            Close Details
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProcessStepDetails;