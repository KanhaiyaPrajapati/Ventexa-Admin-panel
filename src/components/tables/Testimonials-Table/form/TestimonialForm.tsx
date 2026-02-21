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
            className="focus:outline-none transition-transform hover:scale-110"
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= value
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-xs font-medium text-gray-700 dark:text-gray-300">
          ({value}/5)
        </span>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 sm:p-5 bg-white dark:bg-[#1F2937]">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-[#4FE7C0] mb-3">
        {mode === "create" ? "Create New Testimonial" : "Edit Testimonial"}
      </h2>
      
      <div className="space-y-3">
        {/* Client Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Client Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="client_name"
            value={localData.client_name}
            onChange={handleInputChange}
            placeholder="Enter client name"
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1F2937] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
            required
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="company_name"
            value={localData.company_name}
            onChange={handleInputChange}
            placeholder="Enter company name"
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1F2937] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
            required
          />
        </div>

        {/* Testimonial Text */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Testimonial Text <span className="text-red-500">*</span>
          </label>
          <textarea
            name="testimonial_text"
            value={localData.testimonial_text}
            onChange={handleInputChange}
            placeholder="Enter testimonial text"
            rows={2}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1F2937] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#374151]">
            {renderStars(typeof localData.rating === "number" ? localData.rating : 0)}
          </div>
        </div>

        {/* Status Toggle */}
        <div className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#374151]">
          <div className="flex items-center gap-2">
            <div
              className={`p-1 rounded-full ${
                localData.is_active 
                  ? "bg-green-100 dark:bg-green-900/30" 
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
            >
              {localData.is_active ? (
                <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Status
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {localData.is_active
                  ? "Active & visible"
                  : "Inactive & hidden"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onToggleActive}
            className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900 ${
              localData.is_active 
                ? "bg-green-500" 
                : "bg-gray-300 dark:bg-gray-600"
            }`}
            aria-label={
              localData.is_active ? "Deactivate testimonial" : "Activate testimonial"
            }
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform duration-200 ${
                localData.is_active ? "translate-x-4" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="button"
          variant="outline"
          color="primary"
          onClick={onCancel}
          className="w-full sm:w-auto px-3 py-1.5 text-sm dark:border-gray-600 dark:text-gray-300 dark:hover:bg-[#374151] dark:bg-transparent"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          color="primary"
          className="w-full sm:w-auto px-3 py-1.5 text-sm"
        >
          {mode === "create" ? "Create" : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default TestimonialForm;