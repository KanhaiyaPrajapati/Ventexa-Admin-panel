import React from "react";
import { TeamMember } from "../../../../store/types/team-types.ts";

interface LeadershipDetailsProps {
  member: TeamMember;
  onClose: () => void;
}

const LeadershipDetails: React.FC<LeadershipDetailsProps> = ({
  member,
  onClose,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Leadership Details
        </h3>
      </div>

      {/* Details */}
      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name
          </label>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
            <span className="text-gray-900 dark:text-white">
              {member?.full_name || "Not provided"}
            </span>
          </div>
        </div>

        {/* Designation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Designation
          </label>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
            <span className="text-gray-900 dark:text-white">
              {member?.designation || "Not provided"}
            </span>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Bio
          </label>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 min-h-20">
            <span className="text-gray-900 dark:text-white">
              {member?.bio || "No bio provided"}
            </span>
          </div>
        </div>

        {/* Profile Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Profile Image
          </label>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
            {member?.profile_image ? (
              <img
                src={member.profile_image}
                alt={member.full_name}
                className="h-20 w-20 rounded-md object-cover"
              />
            ) : (
              <span className="text-gray-500 dark:text-gray-400">
                No image provided
              </span>
            )}
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            LinkedIn URL
          </label>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
            {member?.linkedin_url ? (
              <a
                href={member.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {member.linkedin_url}
              </a>
            ) : (
              <span className="text-gray-500 dark:text-gray-400">
                Not provided
              </span>
            )}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                member?.is_active
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {member?.is_active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LeadershipDetails;
