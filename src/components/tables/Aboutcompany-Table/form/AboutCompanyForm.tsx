import React, { useEffect, useState } from "react";
import Button from "../../../ui/button/Button";
import Input from "../../../form/input/InputField";

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

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        founded_year: initialData.founded_year || "",
      });
    }
  }, [initialData]);

  const handleChange = (name: string, value: any) => {
    const actualValue =
      typeof value === "string"
        ? value
        : value?.target?.value ?? "";

    if (name === "founded_year") {
      if (actualValue === "" || /^\d+$/.test(actualValue)) {
        setFormData((prev) => ({
          ...prev,
          [name]: actualValue,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: actualValue,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.company_overview ||
      !formData.mission ||
      !formData.vision ||
      !formData.core_values ||
      !formData.founded_year ||
      !formData.headquarters
    ) {
      setError("Please fill all required fields.");
      return;
    }

    const submissionData: AboutCompany = {
      ...formData,
      founded_year: Number(formData.founded_year),
    };

    setError(null);
    onSubmit(submissionData);
  };

  const labelClasses =
    "block text-[11px] font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 p-4 z-50"
      onClick={() => onClose?.()}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white dark:bg-[#1F2937] border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg flex flex-col max-h-[85vh]"
      >
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            {mode === "create"
              ? "Create Company Profile"
              : "Edit Company Profile"}
          </h2>
        </div>
        <div className="p-4 overflow-y-auto flex-1">
          {error && (
            <p className="text-red-500 text-xs mb-3">{error}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-3">
              <div>
                <label className={labelClasses}>Company Overview *</label>
                <Input
                  name="company_overview"
                  value={formData.company_overview}
                  onChange={(v: any) =>
                    handleChange("company_overview", v)
                  }
                />
              </div>

              <div>
                <label className={labelClasses}>Mission *</label>
                <Input
                  name="mission"
                  value={formData.mission}
                  onChange={(v: any) =>
                    handleChange("mission", v)
                  }
                />
              </div>

              <div>
                <label className={labelClasses}>Vision *</label>
                <Input
                  name="vision"
                  value={formData.vision}
                  onChange={(v: any) =>
                    handleChange("vision", v)
                  }
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className={labelClasses}>Core Values *</label>
                <Input
                  name="core_values"
                  value={formData.core_values}
                  onChange={(v: any) =>
                    handleChange("core_values", v)
                  }
                />
              </div>

              <div>
                <label className={labelClasses}>Founded Year *</label>
                <Input
                  name="founded_year"
                  value={formData.founded_year}
                  onChange={(v: any) =>
                    handleChange("founded_year", v)
                  }
                  inputMode="numeric"
                  maxLength={4}
                />
              </div>

              <div>
                <label className={labelClasses}>Headquarters *</label>
                <Input
                  name="headquarters"
                  value={formData.headquarters}
                  onChange={(v: any) =>
                    handleChange("headquarters", v)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-2 bg-gray-50 dark:bg-gray-800">
          {onClose && (
            <Button type="button" variant="outline">
              Cancel
            </Button>
          )}

          <Button type="submit" variant="primary">
            {mode === "create" ? "Create" : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AboutCompanyForm;
 