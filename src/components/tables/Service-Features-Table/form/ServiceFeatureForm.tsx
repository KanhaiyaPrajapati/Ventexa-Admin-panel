// ProcessStepsForm.tsx
import { useEffect, useState } from "react";

export interface Step {
  id?: string;
  step_number: number;
  title: string;
  description: string;
  is_active: boolean;
}

interface Props {
  initialData: Step | null;
  onSubmit: (step: Step) => void;
  onCancel: () => void;
  readOnly?: boolean;
}

const ProcessStepsForm: React.FC<Props> = ({
  initialData,
  onSubmit,
  onCancel,
  readOnly = false,
}) => {
  const [stepNumber, setStepNumber] = useState<number>(
    initialData?.step_number || 1
  );
  const [title, setTitle] = useState<string>(initialData?.title || "");
  const [description, setDescription] = useState<string>(
    initialData?.description || ""
  );
  const [isActive, setIsActive] = useState<boolean>(
    initialData?.is_active ?? true
  );

  useEffect(() => {
    if (initialData) {
      setStepNumber(initialData.step_number);
      setTitle(initialData.title);
      setDescription(initialData.description);
      setIsActive(initialData.is_active);
    } else {
      setStepNumber(1);
      setTitle("");
      setDescription("");
      setIsActive(true);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stepNumber || title.trim() === "" || description.trim() === "") {
      alert("Please fill all required fields");
      return;
    }
    onSubmit({
      id: initialData?.id,
      step_number: stepNumber,
      title: title.trim(),
      description: description.trim(),
      is_active: isActive,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col min-h-[300px] max-h-[80vh] sm:max-h-[70vh] md:max-h-[60vh] overflow-hidden space-y-4"
    >
      {/* ===== Scrollable Content ===== */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {/* Step Number */}
        <div>
          <label className="block text-gray-700 dark:text-white mb-1">
            Step Number <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={stepNumber}
            onChange={(e) => setStepNumber(Number(e.target.value))}
            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
            required
            disabled={readOnly}
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-700 dark:text-white mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
            required
            disabled={readOnly}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 dark:text-white mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white resize-none"
            required
            disabled={readOnly}
          />
        </div>

        {/* Active Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
            disabled={readOnly}
            id="isActive"
          />
          <label htmlFor="isActive" className="text-gray-700 dark:text-white">
            Active
          </label>
        </div>
      </div>

      {/* ===== Fixed Footer ===== */}
      {!readOnly && (
        <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border rounded bg-blue-600 text-white"
          >
            Submit
          </button>
        </div>
      )}
    </form>
  );
};

export default ProcessStepsForm;
