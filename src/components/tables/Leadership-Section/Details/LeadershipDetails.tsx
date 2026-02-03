
import React from "react";
import { TeamMember } from "../../../../store/types/team-types.ts";
import Button from "../../../ui/button/Button";
import Badge from "../../../ui/badge/Badge";
import { User, Briefcase, FileText, Linkedin, CheckCircle, XCircle } from "lucide-react";

interface LeadershipDetailsProps {
  member: TeamMember;
  onClose?: () => void;
}

const LeadershipDetails: React.FC<LeadershipDetailsProps> = ({
  member,
  onClose,
}) => {
  return (
    <div className="space-y-4 sm:space-y-6 bg-transparent">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Team Member Details
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          View complete information about this team member
        </p>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent">
          <div className="w-10 h-10 rounded-full bg-indigo-100/10 dark:bg-indigo-400/20 flex items-center justify-center">
            <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Full Name</p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {member?.full_name || "Not provided"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent">
          <div className="w-10 h-10 rounded-full bg-blue-100/10 dark:bg-blue-400/20 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Designation</p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {member?.designation || "Not provided"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent">
          <div className="w-10 h-10 rounded-full bg-purple-100/10 dark:bg-purple-400/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Bio</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {member?.bio
                ? member.bio.length > 20
                  ? `${member.bio.slice(0, 20)}...`
                  : member.bio
                : "No bio provided"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent">
          <div className="w-10 h-10 rounded-full bg-green-100/10 dark:bg-green-400/20 flex items-center justify-center">
            <Linkedin className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">LinkedIn URL</p>
            {member?.linkedin_url ? (
              <a
                href={member.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
              >
                {member.linkedin_url.length > 30
                  ? `${member.linkedin_url.slice(0, 30)}...`
                  : member.linkedin_url}
              </a>
            ) : (
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                Not provided
              </p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              member?.is_active
                ? "bg-green-100/10 dark:bg-green-400/20"
                : "bg-red-100/10 dark:bg-red-400/20"
            }`}
          >
            {member?.is_active ? (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            )}
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-2">Status</p>
            <Badge color={member?.is_active ? "success" : "error"}>
              {member?.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </div>

      {onClose && (
        <div className="flex justify-end pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default LeadershipDetails;