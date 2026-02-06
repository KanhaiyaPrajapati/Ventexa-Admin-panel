import React from "react";
import Button from "../../../ui/button/Button";
import { FAQ } from "../../../../store/api/faq-api";

interface FaqFormProps {
  mode: "create" | "view" | "edit";
  formData: FAQ;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const FaqForm: React.FC<FaqFormProps> = ({
  mode,
  formData,
  onChange,
  onSubmit,
  onCancel,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const isViewMode = mode === "view";
  const isCreateMode = mode === "create";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          {isCreateMode ? "Add FAQ" : isViewMode ? "FAQ Details" : "Edit FAQ"}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {isCreateMode
            ? ""
            : isViewMode
              ? "View complete information about this FAQ"
              : ""}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-white">
          Question <span className="text-red-500">*</span>
        </label>
        {isViewMode ? (
          <div className="mt-1 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {formData.question || "N/A"}
            </p>
          </div>
        ) : (
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={onChange}
            required
            className="mt-1 block w-full rounded-md p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-white">
          Answer <span className="text-red-500">*</span>
        </label>
        {isViewMode ? (
          <div className="mt-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {formData.answer || "N/A"}
            </p>
          </div>
        ) : (
          <textarea
            name="answer"
            value={formData.answer}
            onChange={onChange}
            rows={1}
            required
            className="mt-1 block w-full rounded-md p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-white">
          Display Order <span className="text-red-500">*</span>
        </label>
        {isViewMode ? (
          <div className="mt-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {formData.display_order}
            </p>
          </div>
        ) : (
          <input
            type="text"
            inputMode="numeric"
            name="display_order"
            value={formData.display_order}
            onChange={onChange}
            required
            className="mt-1 block w-full rounded-md p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-white">
          Status <span className="text-red-500">*</span>
        </label>
        {isViewMode ? (
          <div className="mt-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${
                formData.is_active
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {formData.is_active ? "Active" : "Inactive"}
            </span>
          </div>
        ) : (
          <select
            name="is_active"
            value={formData.is_active.toString()}
            onChange={(e) => {
              const value = e.target.value === "true";

              const newEvent = {
                ...e,
                target: {
                  ...e.target,
                  name: "is_active",
                  value: value.toString(),
                },
              } as React.ChangeEvent<HTMLSelectElement>;

              onChange(newEvent);
            }}
            required
            className="mt-1 block w-full rounded-md p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        )}
      </div>

      {isViewMode && formData.created_at && (
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-white">
            Created Date
          </label>
          <div className="mt-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {new Date(formData.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-3">
        {!isViewMode ? (
          <>
            <Button type="submit">{isCreateMode ? "Create" : "Update"}</Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <Button type="button" variant="primary" onClick={onCancel}>
            Close
          </Button>
        )}
      </div>
    </form>
  );
};

export default FaqForm;
