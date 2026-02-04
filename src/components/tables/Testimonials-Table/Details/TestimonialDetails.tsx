import Button from "../../../ui/button/Button";
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
  onClose?: () => void;
}

const TestimonialDetails: React.FC<TestimonialDetailsProps> = ({
  testimonial,
  onClose,
}) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 sm:w-6 sm:h-6 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          ({rating}/5)
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-15">
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
          <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100/10 dark:bg-blue-400/20 flex items-center justify-center">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">CLIENT NAME</p>
            <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white wrap-break-word">
              {testimonial?.client_name || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
          <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100/10 dark:bg-green-400/20 flex items-center justify-center">
            <Building className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">COMPANY NAME</p>
            <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white wrap-break-word">
              {testimonial?.company_name || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
          <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-100/10 dark:bg-purple-400/20 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">TESTIMONIAL TEXT</p>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 wrap-break-word leading-relaxed italic">
              "{testimonial?.testimonial_text || "No testimonial text provided"}"
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
          <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-100/10 dark:bg-yellow-400/20 flex items-center justify-center">
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">RATING</p>
            <div className="mt-1">
              {renderStars(testimonial?.rating || 0)}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
          <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-linear-to-br from-gray-100/20 to-gray-200/20 dark:from-gray-800/50 dark:to-gray-900/50">
            <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center ${testimonial?.is_active ? 'bg-green-100 dark:bg-green-900/40' : 'bg-red-100 dark:bg-red-900/40'}`}>
              {testimonial?.is_active ? (
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
                color={testimonial?.is_active ? "success" : "error"}
                className="text-sm sm:text-base"
              >
                {testimonial?.is_active ? "Active" : "Inactive"}
              </Badge>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {testimonial?.is_active ? '• This testimonial is currently visible' : '• This testimonial is currently hidden'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {onClose && (
        <div className="flex justify-end pt- sm:pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="w-full sm:w-auto px-2 py-2.5 text-sm sm:text-base"
          >
            Close Details
          </Button>
        </div>
      )}
    </div>
  );
};

export default TestimonialDetails;