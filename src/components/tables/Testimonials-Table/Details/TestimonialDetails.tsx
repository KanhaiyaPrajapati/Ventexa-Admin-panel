import React from "react";
import Badge from "../../../ui/badge/Badge";
import { User, Building, MessageSquare, Star, CheckCircle, XCircle } from "lucide-react";

interface TestimonialDetailsProps {
  testimonial: {
    id?: string;
    client_name: string;
    company_name: string;
    testimonial_text: string;
    rating: number;
    is_active: boolean;
  };
}

const TestimonialDetails: React.FC<TestimonialDetailsProps> = ({
  testimonial,
}) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 sm:w-5 sm:h-5 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
        <span className="ml-2 text-xs font-medium text-gray-700 dark:text-gray-300">
          ({rating}/5)
        </span>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-5 bg-white dark:bg-[#1F2937]">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-[#4FE7C0] mb-3">
        Testimonial Details
      </h2>
      
      <div className="space-y-3">
        {/* Client Name */}
        <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
          <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">
              CLIENT NAME
            </p>
            <p className="text-base font-semibold text-gray-900 dark:text-white wrap-break-word">
              {testimonial?.client_name || "N/A"}
            </p>
          </div>
        </div>

        {/* Company Name */}
        <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
          <div className="shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Building className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">
              COMPANY NAME
            </p>
            <p className="text-base font-semibold text-gray-900 dark:text-white wrap-break-word">
              {testimonial?.company_name || "N/A"}
            </p>
          </div>
        </div>

        {/* Testimonial Text */}
        <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
          <div className="shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">
              TESTIMONIAL TEXT
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 wrap-break-word leading-relaxed italic">
              "{testimonial?.testimonial_text || "No testimonial text provided"}"
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
          <div className="shrink-0 w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
            <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">
              RATING
            </p>
            <div className="mt-0.5">
              {renderStars(testimonial?.rating || 0)}
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
          <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
              testimonial?.is_active 
                ? 'bg-green-100 dark:bg-green-900/40' 
                : 'bg-red-100 dark:bg-red-900/40'
            }`}>
              {testimonial?.is_active ? (
                <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="w-3 h-3 text-red-600 dark:text-red-400" />
              )}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">
              STATUS
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <Badge 
                size="sm" 
                color={testimonial?.is_active ? "success" : "error"}
              >
                {testimonial?.is_active ? "Active" : "Inactive"}
              </Badge>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {testimonial?.is_active 
                  ? '• Currently visible' 
                  : '• Currently hidden'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialDetails;