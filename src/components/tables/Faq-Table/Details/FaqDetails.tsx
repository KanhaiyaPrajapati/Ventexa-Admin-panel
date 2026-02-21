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
import Button from "../../../ui/button/Button";
import { FAQ } from "../../../../store/api/faq-api";

interface FaqDetailsProps {
  faq: FAQ;
  onClose?: () => void;
}

const FaqDetails: React.FC<FaqDetailsProps> = ({ faq, onClose }) => {
  return (
    <div className="relative bg-white dark:bg-[#1F2937] rounded-3xl w-full border border-gray-200 dark:border-gray-700">

      <div className="p-5">
        <h2 className="text-base font-semibold text-gray-900 dark:text-[#4FE7C0] mb-3">
          FAQ Details
        </h2>

        <div className="space-y-2">

          <div className="flex items-start gap-2 p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
            <div className="shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-0.5">
                QUESTION
              </p>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">
                {faq?.question || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
            <div className="shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center border border-green-200 dark:border-green-800">
              <FileText className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-0.5">
                ANSWER
              </p>
              <p className="text-xs text-gray-800 dark:text-gray-300 break-words leading-relaxed whitespace-pre-line">
                {faq?.answer || "No answer provided"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
            <div className="shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center border border-purple-200 dark:border-purple-800">
              <Hash className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-0.5">
                DISPLAY ORDER
              </p>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">
                #{faq?.display_order || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
            <div
              className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center border ${
                faq?.is_active
                  ? "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800"
                  : "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800"
              }`}
            >
              {faq?.is_active ? (
                <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" />
              )}
            </div>
            <div>
              <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-0.5">
                STATUS
              </p>
              <Badge size="sm" color={faq?.is_active ? "success" : "warning"}>
                {faq?.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>

          {faq?.created_at && (
            <div className="flex items-start gap-2 p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
              <div className="shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-900/30 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                <Calendar className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-0.5">
                  CREATED DATE
                </p>
                <p className="text-xs font-semibold text-gray-900 dark:text-white">
                  {new Date(faq.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}

        </div>

        {onClose && (
          <div className="flex justify-end mt-5">
            <Button
              variant="outline"
              color="primary"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        )}

      </div>
    </div>
  );
};

export default FaqDetails;
