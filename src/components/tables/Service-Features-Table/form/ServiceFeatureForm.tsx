import React from "react";
import Button from "../../../ui/button/Button";
import { ServiceFeature } from "../../../../store/types/types";

interface ServiceFeatureFormProps {
  mode: "create" | "edit";
  formData: ServiceFeature;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onToggleActive: () => void;
}

const ServiceFeatureForm: React.FC<ServiceFeatureFormProps> = ({
  mode,
  formData,
  onChange,
  onSubmit,
  onCancel,
  onToggleActive,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="relative rounded-sm p-2 bg-white dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-white">
            Service ID
          </label>
          <input
            type="text"
            name="service_id"
            value={formData.service_id}
            onChange={onChange}
            required
            className="mt-1 block w-full rounded-md p-2 bg-white dark:bg-transparent
              text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-white">
            Feature Title
          </label>
          <input
            type="text"
            name="feature_title"
            value={formData.feature_title}
            onChange={onChange}
            required
            className="mt-1 block w-full rounded-md p-2 bg-white dark:bg-transparent
              text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-white">
            Description
          </label>
          <textarea
            name="feature_description"
            value={formData.feature_description}
            onChange={onChange}
            rows={3}
            required
            className="mt-1 block w-full rounded-md p-2 bg-white dark:bg-transparent
              text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-800 dark:text-white">
            Status
          </label>
          <div
            onClick={onToggleActive}
            className={`w-12 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-colors
      ${formData.is_active ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform
        ${formData.is_active ? "translate-x-6" : "translate-x-0"}`}
            />
          </div>
          <span
            className={`text-sm font-medium ${
              formData.is_active
                ? "text-green-600 dark:text-green-400"
                : "text-gray-500 dark:text-gray-300"
            }`}
          >
            {formData.is_active ? "Active" : "Inactive"}
          </span>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-5">
            <Button type="submit">
              {mode === "create" ? "Create" : "Update"}
            </Button>

            <button
              type="button"
              onClick={onCancel}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ServiceFeatureForm;
