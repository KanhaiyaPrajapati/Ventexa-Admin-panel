import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "../../../ui/button/Button";
import { CheckCircle, XCircle } from "lucide-react";
import { ServiceFeature } from "../../../../store/types/types";

interface Props {
  mode: "create" | "edit";
  initialData?: ServiceFeature;
  onSubmit: (data: ServiceFeature) => void;
  onCancel: () => void;
}

const ServiceFeatureForm: React.FC<Props> = ({ mode, initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<ServiceFeature>({
    service_id: "",
    feature_title: "",
    feature_description: "",
    is_active: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleActive = () => {
    setFormData((prev) => ({ ...prev, is_active: !prev.is_active }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-white dark:bg-[#1F2937] w-full">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-[#4FE7C0] mb-3">
        {mode === "create" ? "Create Service Feature" : "Edit Service Feature"}
      </h2>
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Service ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="service_id"
            value={formData.service_id}
            onChange={handleChange}
            placeholder="Enter service ID"
            className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1F2937] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Feature Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="feature_title"
            value={formData.feature_title}
            onChange={handleChange}
            placeholder="Enter feature title"
            className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1F2937] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="feature_description"
            value={formData.feature_description}
            onChange={handleChange}
            placeholder="Enter feature description"
            rows={2}
            className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1F2937] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
            required
          />
        </div>

        <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#374151]">
          <div className="flex items-center gap-3">
            <div
              className={`p-1.5 rounded-full ${
                formData.is_active 
                  ? "bg-green-100 dark:bg-green-900/30" 
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
            >
              {formData.is_active ? (
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formData.is_active
                  ? "Feature is active and visible"
                  : "Feature is inactive and hidden"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleActive}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
              formData.is_active 
                ? "bg-green-500" 
                : "bg-gray-300 dark:bg-gray-600"
            }`}
            aria-label={
              formData.is_active ? "Deactivate feature" : "Activate feature"
            }
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200 ${
                formData.is_active ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

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
          {mode === "create" ? "Create Feature" : "Update Feature"}
        </Button>
      </div>
    </form>
  );
};

export default ServiceFeatureForm;