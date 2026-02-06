import { useEffect, useState } from "react";
import Button from "../../../ui/button/Button";
import { CheckCircle, XCircle, Star } from "lucide-react";

interface Testimonial {
  id?: string;
  client_name: string;
  company_name: string;
  testimonial_text: string;
  rating: number | string;
  is_active: boolean;
}

interface TestimonialFormProps {
  mode: "create" | "edit";
  formData: Testimonial;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onToggleActive: () => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({
  mode,
  formData,
  onChange,
  onToggleActive,
  onSubmit,
  onCancel,
}) => {
  const [localData, setLocalData] = useState<Testimonial>({
    ...formData,
    rating: formData.rating === 0 ? "" : formData.rating,
  });

  useEffect(() => {
    setLocalData({
      ...formData,
      rating: formData.rating === 0 ? "" : formData.rating,
    });
  }, [formData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "rating") {
      if (value === "" || /^[1-5]$/.test(value)) {
        setLocalData((prev) => ({
          ...prev,
          [name]: value === "" ? "" : parseInt(value, 10),
        }));
      }
    } else {
      setLocalData((prev) => ({ ...prev, [name]: value }));
    }

    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name,
        value:
          name === "rating"
            ? value === ""
              ? 0
              : parseInt(value, 10)
            : value,
      },
    } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

    onChange(syntheticEvent);
  };

  const handleStarClick = (value: number) => {
    const syntheticEvent = {
        target: {
            name: "rating",
            value: value,
        },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
    setLocalData((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const renderStars = (value: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            className="focus:outline-none"
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            <Star
              className={`w-6 h-6 ${
                star <= value
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          ({value}/5)
        </span>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="space-y-4 sm:space-y-5">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
            Client Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="client_name"
            value={localData.client_name}
            onChange={handleInputChange}
            placeholder="Enter client name"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
            required
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="company_name"
            value={localData.company_name}
            onChange={handleInputChange}
            placeholder="Enter company name"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
            required
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
            Testimonial Text <span className="text-red-500">*</span>
          </label>
          <textarea
            name="testimonial_text"
            value={localData.testimonial_text}
            onChange={handleInputChange}
            placeholder="Enter testimonial text"
            rows={1}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500 resize-none min-h-25"
            required
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
            Rating <span className="text-red-500">*</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              (1-5 stars)
            </span>
          </label>
          <div className="space-y-3">
            {renderStars(typeof localData.rating === "number" ? localData.rating : 0)}
            <div className="flex items-center">
        
             
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-full ${localData.is_active ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-800"}`}
            >
              {localData.is_active ? (
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {localData.is_active
                  ? "Testimonial is active and visible"
                  : "Testimonial is inactive and hidden"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onToggleActive}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localData.is_active ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"}`}
            aria-label={
              localData.is_active ? "Deactivate testimonial" : "Activate testimonial"
            }
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${localData.is_active ? "translate-x-6" : "translate-x-1"}`}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="button"
          variant="outline"
          color="primary"
          onClick={onCancel}
          className="w-full sm:w-auto px-4 py-2.5 text-sm sm:text-base"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          color="primary"
          className="w-full sm:w-auto px-4 py-2.5 text-sm sm:text-base"
        >
          {mode === "create" ? "Create Testimonial" : "Update Testimonial"}
        </Button>
      </div>
    </form>
  );
};

export default TestimonialForm;