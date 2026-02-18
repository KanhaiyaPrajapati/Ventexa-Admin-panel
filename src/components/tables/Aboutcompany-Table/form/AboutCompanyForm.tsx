import React, { useEffect, useState } from "react";
import Button from "../../../ui/button/Button";

interface AboutCompany {
  id?: string;
  _id?: string;
  company_overview: string;
  mission: string;
  vision: string;
  core_values: string;
  founded_year: number | string;
  headquarters: string;
}

interface AboutCompanyFormProps {
  mode: "create" | "edit";
  initialData?: AboutCompany;
  onSubmit: (data: AboutCompany) => void;
  onClose?: () => void;
}

const AboutCompanyForm: React.FC<AboutCompanyFormProps> = ({
  mode,
  initialData,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<AboutCompany>({
    company_overview: "",
    mission: "",
    vision: "",
    core_values: "",
    founded_year: "",
    headquarters: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        founded_year: initialData.founded_year || "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === "founded_year") {
      if (value === "" || /^\d+$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value === "" ? "" : value,
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      founded_year: formData.founded_year ? parseInt(formData.founded_year.toString(), 10) : ""
    };
    onSubmit(submissionData as AboutCompany);
  };

  const inputClasses = "w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#111827] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500 transition-all";

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-[#1F2937] border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
        {mode === "create" ? "Create Company Profile" : "Edit Company Profile"}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1.5">
            Company Overview <span className="text-red-500">*</span>
          </label>
          <textarea
            name="company_overview"
            value={formData.company_overview}
            onChange={handleChange}
            placeholder="Describe what your company does..."
            rows={3}
            className={`${inputClasses} resize-none`}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1.5">
              Mission <span className="text-red-500">*</span>
            </label>
            <textarea
              name="mission"
              value={formData.mission}
              onChange={handleChange}
              placeholder="Our purpose is..."
              rows={2}
              className={`${inputClasses} resize-none`}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1.5">
              Vision <span className="text-red-500">*</span>
            </label>
            <textarea
              name="vision"
              value={formData.vision}
              onChange={handleChange}
              placeholder="We aim to become..."
              rows={2}
              className={`${inputClasses} resize-none`}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1.5">
            Core Values <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="core_values"
            value={formData.core_values}
            onChange={handleChange}
            placeholder="Integrity, Innovation, Inclusion..."
            className={inputClasses}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1.5">
              Founded Year <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="founded_year"
              value={formData.founded_year}
              onChange={handleChange}
              placeholder="e.g. 2005"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1.5">
              Headquarters <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="headquarters"
              value={formData.headquarters}
              onChange={handleChange}
              placeholder="e.g. New York, USA"
              className={inputClasses}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
        {onClose && (
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto dark:border-gray-700 dark:text-gray-300"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
        >
          {mode === "create" ? "Create Profile" : "Update Profile"}
        </Button>
      </div>
    </form>
  );
};

export default AboutCompanyForm;