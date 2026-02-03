// components/tables/Process-Steps-Table/form/ProcessStepForm.tsx
import { useEffect, useState } from "react";
import Button from "../../../ui/button/Button";

interface ProcessStep {
  id?: string;
  step_number: number | string; // Changed to allow empty string
  title: string;
  description: string;
  is_active: boolean;
}

interface ProcessStepFormProps {
  mode: "create" | "edit";
  formData: ProcessStep;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
    step_number: formData.step_number === 0 ? "" : formData.step_number // Convert 0 to empty string
  });

  useEffect(() => {
    setLocalData({
      ...formData,
      step_number: formData.step_number === 0 ? "" : formData.step_number // Convert 0 to empty string
    });
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'step_number') {
      // Allow empty string or numbers only
      if (value === '' || /^\d+$/.test(value)) {
        setLocalData(prev => ({ 
          ...prev, 
          [name]: value === '' ? '' : parseInt(value, 10) 
        }));
      }
    } else {
      setLocalData(prev => ({ ...prev, [name]: value }));
    }
    
    // Create synthetic event with proper value for parent onChange
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name,
        value: name === 'step_number' ? (value === '' ? 0 : parseInt(value, 10)) : value
      }
    } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
    
    onChange(syntheticEvent);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          {mode === "create" ? "Add New Process Step" : "Edit Process Step"}
        </h2>
    
      </div>

      <div className="space-y-4">
        {/* Step Number - Changed to text input to hide arrows */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            required
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={localData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white text-sm"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={localData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white resize-none text-sm"
            required
          />
        </div>

        {/* Active Status */}
        <div className="flex items-center gap-3 pt-2">
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              checked={localData.is_active}
              onChange={onToggleActive}
              className="sr-only"
            />
            <label
              htmlFor="is_active"
              className={`block h-6 w-10 rounded-full cursor-pointer transition-colors ${
                localData.is_active 
                  ? "bg-green-500" 
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 transform ${
                  localData.is_active ? "translate-x-4" : ""
                }`}
              />
            </label>
          </div>
          <label
            htmlFor="is_active"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            Active Status
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="button"
          variant="outline"
          color="primary"
          onClick={onCancel}
          className="px-4 py-2 text-sm"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          color="primary"
          className="px-4 py-2 text-sm"
        >
          {mode === "create" ? "Create Step" : "Update Step"}
        </Button>
      </div>
    </form>
  );
};

export default ProcessStepForm;