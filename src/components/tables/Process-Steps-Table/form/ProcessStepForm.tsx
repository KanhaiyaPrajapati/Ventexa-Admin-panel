import { useEffect, useState } from "react";
import Button from "../../../ui/button/Button";
import { CheckCircle, XCircle } from "lucide-react";

interface ProcessStep {
  id?: string;
  step_number: number | string;
  title: string;
  description: string;
  is_active: boolean;
}

interface ProcessStepFormProps {
  mode: "create" | "edit";
  formData: ProcessStep;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onToggleActive: () => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const ProcessStepForm: React.FC<ProcessStepFormProps> = ({
  mode,
  formData,
  onChange,
  onToggleActive,
  onSubmit,
  onCancel,
}) => {
  const [localData, setLocalData] = useState<ProcessStep>({
    ...formData,
    step_number: formData.step_number === 0 ? "" : formData.step_number,
  });

  useEffect(() => {
    setLocalData({
      ...formData,
      step_number: formData.step_number === 0 ? "" : formData.step_number,
    });
  }, [formData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "step_number") {
      if (value === "" || /^\d+$/.test(value)) {
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
          name === "step_number"
            ? value === ""
              ? 0
              : parseInt(value, 10)
            : value,
      },
    } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

    onChange(syntheticEvent);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="space-y-4 sm:space-y-5">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
            Step Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            name="step_number"
            value={localData.step_number}
            onChange={handleInputChange}
            placeholder="Enter step number"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            required
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={localData.title}
            onChange={handleInputChange}
            placeholder="Enter step title"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
            required
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={localData.description}
            onChange={handleInputChange}
            placeholder="Enter step description"
            rows={3}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500 resize-none min-h-[80px]"
            required
          />
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
                  ? "Step is active and visible"
                  : "Step is inactive and hidden"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onToggleActive}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localData.is_active ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"}`}
            aria-label={
              localData.is_active ? "Deactivate step" : "Activate step"
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
          {mode === "create" ? "Create Step" : "Update Step"}
        </Button>
      </div>
    </form>
  );
};

export default ProcessStepForm;
