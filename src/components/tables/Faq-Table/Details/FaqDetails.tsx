import React from "react";
import {
  HelpCircle,
  FileText,
  Hash,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";
import Badge from "../../../ui/badge/Badge";
import { FAQ } from "../../../../store/api/faq-api";

interface FaqDetailsProps {
  faq: FAQ;
  onClose?: () => void;
}

const FaqDetails: React.FC<FaqDetailsProps> = ({ faq }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          FAQ Details
        </h2>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-start gap-4 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
          <div className="w-10 h-10 rounded-full bg-blue-100/10 dark:bg-blue-400/20 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase mb-1">Question</p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {faq?.question || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
          <div className="w-10 h-10 rounded-full bg-green-100/10 dark:bg-green-400/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase mb-1">Answer</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {faq?.answer || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
          <div className="w-10 h-10 rounded-full bg-purple-100/10 dark:bg-purple-400/20 flex items-center justify-center">
            <Hash className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">
              Display Order
            </p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              #{faq?.display_order || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              faq?.is_active
                ? "bg-green-100/10 dark:bg-green-400/20"
                : "bg-yellow-100/10 dark:bg-yellow-400/20"
            }`}
          >
            {faq?.is_active ? (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            )}
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-2">Status</p>
            <Badge color={faq?.is_active ? "success" : "warning"}>
              {faq?.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>

        {faq?.created_at && (
          <div className="flex items-start gap-4 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
            <div className="w-10 h-10 rounded-full bg-gray-100/10 dark:bg-gray-400/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase mb-1">
                Created Date
              </p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {new Date(faq.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqDetails;
