import { useState } from "react";
import Button from "../../../ui/button/Button";
import Label from "../../../form/Label";
import TextArea from "../../../form/input/TextArea";
import Input from "../../../form/input/InputField";
import { AboutCompany } from "../../../../store/api/Aboutompany-api";

type Props = {
  mode: "create" | "edit";
  initialData?: AboutCompany;
  onSubmit: (data: AboutCompany) => void;
  onClose?: () => void;
};

const AboutCompanyForm: React.FC<Props> = ({
  mode,
  initialData,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<AboutCompany>({
    _id: "",
    company_overview: "",
    mission: "",
    vision: "",
    core_values: "",
    founded_year: 0,
    headquarters: "",
    ...initialData,
  });

  const handleChange = (key: keyof AboutCompany, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full p-4 md:p-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
      >
        <div className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {mode === "create"
              ? "Create Company Profile"
              : "Edit Company Profile"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Provide the essential details about your organization for the public
            profile.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="company_overview" className="font-medium">
              Company Overview
            </Label>
            <TextArea
              value={formData.company_overview || ""}
              onChange={(val) => handleChange("company_overview", val)}
              placeholder="Describe what your company does..."
              className="min-h-[120px] transition-all focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="mission" className="font-medium">
                Mission
              </Label>
              <TextArea
                value={formData.mission || ""}
                onChange={(val) => handleChange("mission", val)}
                placeholder="Our purpose is..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vision" className="font-medium">
                Vision
              </Label>
              <TextArea
                value={formData.vision || ""}
                onChange={(val) => handleChange("vision", val)}
                placeholder="We aim to become..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="core_values" className="font-medium">
              Core Values
            </Label>
            <TextArea
              value={formData.core_values || ""}
              onChange={(val) => handleChange("core_values", val)}
              placeholder="Integrity, Innovation, Inclusion..."
              className="min-h-[80px]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="founded_year" className="font-medium">
                Founded Year
              </Label>
              <Input
                id="founded_year"
                type="number"
                value={formData.founded_year || ""}
                onChange={(e) =>
                  handleChange("founded_year", parseInt(e.target.value))
                }
                placeholder="e.g. 2005"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="headquarters" className="font-medium">
                Headquarters
              </Label>
              <Input
                id="headquarters"
                type="text"
                value={formData.headquarters || ""}
                onChange={(e) => handleChange("headquarters", e.target.value)}
                placeholder="e.g. New York, USA"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
          {onClose && (
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            className="px-8 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-semibold shadow-md transition-all active:scale-95"
          >
            {mode === "create" ? "Create Profile" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AboutCompanyForm;
