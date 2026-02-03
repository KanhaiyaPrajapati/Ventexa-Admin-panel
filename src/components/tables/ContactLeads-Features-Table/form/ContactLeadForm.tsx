
import React from "react";
import Button from "../../../ui/button/Button";
import { ContactLead } from "../../../../store/api/contact-leads-api";

interface ContactLeadFormProps {
  mode: "create" | "view" | "edit";
  formData: ContactLead;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const ContactLeadForm: React.FC<ContactLeadFormProps> = ({
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          {isCreateMode ? "Add Contact Lead" : 
           isViewMode ? "Contact Lead Details" : "Edit Contact Lead"}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {isCreateMode ? "" :
           isViewMode ? "View complete information about this contact lead" :
           ""}
        </p>
      </div>

      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-white">
          Name <span className="text-red-500">*</span>
        </label>
        {isViewMode ? (
          <div className="mt-1 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {formData.name || "N/A"}
            </p>
          </div>
        ) : (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            className="mt-1 block w-full rounded-md p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-white">
          Email <span className="text-red-500">*</span>
        </label>
        {isViewMode ? (
          <div className="mt-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {formData.email || "N/A"}
            </p>
          </div>
        ) : (
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
            className="mt-1 block w-full rounded-md p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>

      {/* Message Field */}
      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-white">
          Message <span className="text-red-500">*</span>
        </label>
        {isViewMode ? (
          <div className="mt-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {formData.message || "N/A"}
            </p>
          </div>
        ) : (
          <textarea
            name="message"
            value={formData.message}
            onChange={onChange}
            rows={1}
            required
            className="mt-1 block w-full rounded-md p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        )}
      </div>

      {/* Status Field */}
      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-white">
          Status <span className="text-red-500">*</span>
        </label>
        {isViewMode ? (
          <div className="mt-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${formData.status === "contacted" 
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"}`}
            >
              {formData.status === "contacted" ? "Contacted" : "New"}
            </span>
          </div>
        ) : (
          <select
            name="status"
            value={formData.status}
            onChange={onChange}
            required
            className="mt-1 block w-full rounded-md p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
          </select>
        )}
      </div>

      {/* Created At Field - Only show in view mode */}
      {isViewMode && (
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-white">
            Created Date
          </label>
          <div className="mt-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {formData.created_at ? new Date(formData.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }) : "N/A"}
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 pt-3">
        {!isViewMode ? (
          <>
            <Button type="submit">
              {isCreateMode ? "Create" : "Update"}
            </Button>
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

export default ContactLeadForm;



