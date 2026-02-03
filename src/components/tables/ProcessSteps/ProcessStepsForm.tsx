import React, { useState } from "react";

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

const ProcessStepsForm: React.FC<Props> = ({ initialData, onSubmit, onCancel, readOnly = false }) => {
  const [stepNumber, setStepNumber] = useState(initialData?.step_number || 1);
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ ...initialData, step_number: stepNumber, title, description, is_active: isActive }); }} className="space-y-4">
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Step #</label>
          <input 
            type="number" 
            value={stepNumber} 
            onChange={(e) => setStepNumber(Number(e.target.value))} 
            disabled={readOnly} 
            className="w-full rounded-md border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none dark:bg-gray-800" 
          />
        </div>
        
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            disabled={readOnly} 
            className="w-full rounded-md border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none dark:bg-gray-800" 
          />
        </div>
        
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
          <textarea 
            rows={3} 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            disabled={readOnly} 
            className="w-full rounded-md border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none resize-none dark:bg-gray-800" 
          />
        </div>
        
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="isActive" 
            checked={isActive} 
            onChange={(e) => setIsActive(e.target.checked)} 
            disabled={readOnly} 
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
          />
          <label htmlFor="isActive" className="text-sm font-medium text-slate-600 dark:text-gray-300">Active</label>
        </div>
      </div>

      <div className="pt-4 flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 text-xs font-semibold text-slate-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
          {readOnly ? "Close" : "Cancel"}
        </button>
        {!readOnly && (
          <button type="submit" className="px-5 py-1.5 rounded-md bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-sm">
            Save
          </button>
        )}
      </div>
    </form>
  );
};

export default ProcessStepsForm;