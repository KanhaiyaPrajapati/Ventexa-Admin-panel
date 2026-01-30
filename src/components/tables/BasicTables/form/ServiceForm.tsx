import React from "react";
import Button from "../../../ui/button/Button";
import { ServiceFeature } from "../../../../store/types/types2";

interface ServiceFormProps {
  mode: "create" | "edit";
  formData: ServiceFeature;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onToggleActive: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  mode,
  formData,
  onChange,
  onSubmit,
  onCancel,
  onToggleActive,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-transparent">
      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-white">
          Tital
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onChange}
          required
          className="mt-1 block w-full rounded-md p-2
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     border border-gray-300 dark:border-gray-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-white">
          Slug
        </label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={onChange}
          required
          className="mt-1 block w-full rounded-md p-2
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     border border-gray-300 dark:border-gray-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-white">
          Short_Description
        </label>
        <textarea
          name="short_description"
          value={formData.short_description}
          onChange={onChange}
          rows={3}
          required
          className="mt-1 block w-full rounded-md p-2
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     border border-gray-300 dark:border-gray-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-800 dark:text-white">
          Status
        </label>

        <div
          onClick={onToggleActive}
          className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors
            ${formData.is_active ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform
              ${formData.is_active ? "translate-x-7" : "translate-x-0"}`}
          />
        </div>

        <span
          className={`text-sm font-medium
            ${formData.is_active ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-300"}`}
        >
          {formData.is_active ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="flex justify-end gap-2 pt-3">
        <Button type="submit">{mode === "create" ? "Add" : "Update"}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ServiceForm;

