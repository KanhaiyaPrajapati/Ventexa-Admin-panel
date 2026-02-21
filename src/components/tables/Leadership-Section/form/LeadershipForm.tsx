import React from "react";
import Button from "../../../ui/button/Button";
import { TeamMember } from "../../../../store/types/team-types.ts";

interface LeadershipFormProps {
  mode: "create" | "edit";
  formData: TeamMember;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onToggleActive: () => void;
}

const LeadershipForm: React.FC<LeadershipFormProps> = ({
  mode,
  formData,
  onChange,
  onSubmit,
  onCancel,
  onToggleActive,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-transparent">
      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-white">
          Full Name
        </label>
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={onChange}
          required
          className="mt-1 block w-full rounded-md p-2
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     border border-gray-300 dark:border-gray-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-white">
          Designation
        </label>
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={onChange}
          required
          className="mt-1 block w-full rounded-md p-2
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     border border-gray-300 dark:border-gray-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-white">
          Bio
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={onChange}
          rows={3}
          required
          className="mt-1 block w-full rounded-md p-2
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     border border-gray-300 dark:border-gray-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-white">
          Profile Image URL
        </label>
        <input
          type="text"
          name="profile_image"
          value={formData.profile_image}
          onChange={onChange}
          className="mt-1 block w-full rounded-md p-2
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     border border-gray-300 dark:border-gray-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-white">
          LinkedIn URL
        </label>
        <input
          type="text"
          name="linkedin_url"
          value={formData.linkedin_url}
          onChange={onChange}
          className="mt-1 block w-full rounded-md p-2
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     border border-gray-300 dark:border-gray-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-800 dark:text-white">
          Status
        </label>

        <div
          onClick={onToggleActive}
          className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors
            ${
              formData.is_active
                ? "bg-green-500"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform
              ${
                formData.is_active
                  ? "translate-x-7"
                  : "translate-x-0"
              }`}
          />
        </div>

        <span
          className={`text-sm font-medium
            ${
              formData.is_active
                ? "text-green-600 dark:text-green-400"
                : "text-gray-500 dark:text-gray-300"
            }`}
        >
          {formData.is_active ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="flex justify-end gap-2 pt-3">
        <Button type="submit">
          {mode === "create" ? "Add" : "Update"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default LeadershipForm;
