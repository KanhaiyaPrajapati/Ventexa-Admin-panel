import React from "react";
import { ContactLead } from "../../../../store/api/contact-leads-api";
import { CheckCircle2 } from "lucide-react";

interface ContactLeadFormProps {
  mode: "create" | "view" | "edit";
  formData: ContactLead;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    > | { target: { name: string; value: any } }
  ) => void;
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

  const handleToggle = () => {
    if (isViewMode) return;
    const nextStatus = formData.status === "contacted" ? "new" : "contacted";
    onChange({ target: { name: "status", value: nextStatus } });
  };

  return (
    <div className="max-w-md mx-auto rounded-2xl shadow-2xl transition-colors duration-300
      /* Adaptive Background */
      bg-white dark:bg-[#111827] 
      border border-gray-200 dark:border-gray-800 
      p-6">
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h2 className="text-xl font-bold mb-4 
            /* Light: Black | Dark: #4FE7C0 */
            text-black dark:text-[#4FE7C0]">
            {isCreateMode
              ? "Add Service Feature"
              : isViewMode
              ? "Service Feature Details"
              : "Edit Service Feature"}
          </h2>
        </div>

        {/* Service ID Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Service ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            disabled={isViewMode}
            value={formData.name}
            onChange={onChange}
            required
            className="w-full rounded-lg p-2.5 text-sm transition-all outline-none border
              bg-gray-50 dark:bg-[#1f2937] 
              border-gray-300 dark:border-gray-700 
              text-gray-900 dark:text-white 
              focus:ring-1 focus:ring-blue-500 dark:focus:border-[#4FE7C0]"
          />
        </div>

        {/* Feature Title Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Feature Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="email"
            disabled={isViewMode}
            value={formData.email}
            onChange={onChange}
            required
            className="w-full rounded-lg p-2.5 text-sm transition-all outline-none border
              bg-gray-50 dark:bg-[#1f2937] 
              border-gray-300 dark:border-gray-700 
              text-gray-900 dark:text-white 
              focus:ring-1 focus:ring-blue-500 dark:focus:border-[#4FE7C0]"
          />
        </div>

        {/* Description Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            disabled={isViewMode}
            value={formData.message}
            onChange={onChange}
            rows={2}
            required
            className="w-full rounded-lg p-2.5 text-sm transition-all outline-none resize-none border
              bg-gray-50 dark:bg-[#1f2937] 
              border-gray-300 dark:border-gray-700 
              text-gray-900 dark:text-white 
              focus:ring-1 focus:ring-blue-500 dark:focus:border-[#4FE7C0]"
          />
        </div>

        {/* Status Toggle Card */}
        <div className="flex items-center justify-between p-3 rounded-xl border transition-colors
          bg-gray-50 dark:bg-[#1f2937]/50 
          border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-full bg-emerald-500/10">
               <CheckCircle2 className="text-[#22c55e] dark:text-[#4FE7C0]" size={20} />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight text-gray-900 dark:text-gray-100">Status</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                {formData.status === "contacted" ? "Feature is active and visible" : "Feature is hidden"}
              </p>
            </div>
          </div>
          
          <button
            type="button"
            disabled={isViewMode}
            onClick={handleToggle}
            className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${
              formData.status === "contacted" ? "bg-[#22c55e]" : "bg-gray-300 dark:bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${
                formData.status === "contacted" ? "translate-x-5.5" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Action Buttons */}
        {!isViewMode && (
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 rounded-lg border text-sm font-medium transition-all
                border-gray-300 text-gray-700 hover:bg-gray-100
                dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 dark:bg-[#4f46e5] hover:opacity-90 text-sm text-white font-medium shadow-md transition-all active:scale-95"
            >
              {isCreateMode ? "Create Feature" : "Update Feature"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactLeadForm;