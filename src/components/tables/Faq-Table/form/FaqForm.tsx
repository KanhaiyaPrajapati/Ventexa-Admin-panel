import React from "react";
import { FAQ } from "../../../../store/api/faq-api";
import { CheckCircle2 } from "lucide-react";

interface FaqFormProps {
  mode: "create" | "view" | "edit";
  formData: FAQ;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    > | { target: { name: string; value: any } }
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

  const handleToggle = () => {
    if (isViewMode) return;
    const nextStatus = !formData.is_active;
    onChange({ target: { name: "is_active", value: nextStatus } });
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
            {isCreateMode ? "Add FAQ" : isViewMode ? "FAQ Details" : "Edit FAQ"}
          </h2>
        </div>

        {/* Question Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Question <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="question"
            disabled={isViewMode}
            value={formData.question}
            onChange={onChange}
            required
            placeholder="Enter question"
            className="w-full rounded-lg p-2.5 text-sm transition-all outline-none border
              bg-gray-50 dark:bg-[#1f2937] 
              border-gray-300 dark:border-gray-700 
              text-gray-900 dark:text-white 
              focus:ring-1 focus:ring-blue-500 dark:focus:border-[#4FE7C0]"
          />
        </div>

        {/* Answer Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Answer <span className="text-red-500">*</span>
          </label>
          <textarea
            name="answer"
            disabled={isViewMode}
            value={formData.answer}
            onChange={onChange}
            rows={3}
            required
            placeholder="Enter answer"
            className="w-full rounded-lg p-2.5 text-sm transition-all outline-none resize-none border
              bg-gray-50 dark:bg-[#1f2937] 
              border-gray-300 dark:border-gray-700 
              text-gray-900 dark:text-white 
              focus:ring-1 focus:ring-blue-500 dark:focus:border-[#4FE7C0]"
          />
        </div>

        {/* Display Order Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Display Order <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="display_order"
            disabled={isViewMode}
            value={formData.display_order}
            onChange={onChange}
            required
            min="1"
            className="w-full rounded-lg p-2.5 text-sm transition-all outline-none border
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
                {formData.is_active ? "FAQ is active and visible" : "FAQ is hidden"}
              </p>
            </div>
          </div>
          
          <button
            type="button"
            disabled={isViewMode}
            onClick={handleToggle}
            className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${
              formData.is_active ? "bg-[#22c55e]" : "bg-gray-300 dark:bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${
                formData.is_active ? "translate-x-5.5" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          {!isViewMode ? (
            <>
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
                {isCreateMode ? "Create" : "Update"}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm font-medium text-gray-900 dark:text-white hover:opacity-80 transition-all"
            >
              Close
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FaqForm;