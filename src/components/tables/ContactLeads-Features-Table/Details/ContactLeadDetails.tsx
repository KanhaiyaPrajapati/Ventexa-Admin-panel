import {
  User,
  Mail,
  MessageSquare,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Badge from "../../../ui/badge/Badge";
import { ContactLead } from "../../../../store/api/contact-leads-api";

interface ContactLeadDetailsProps {
  lead: ContactLead;
  onClose?: () => void;
}

const ContactLeadDetails: React.FC<ContactLeadDetailsProps> = ({ lead }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Contact Lead Details
        </h2>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-start gap-4 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
          <div className="w-10 h-10 rounded-full bg-indigo-100/10 dark:bg-indigo-400/20 flex items-center justify-center">
            <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Name</p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {lead?.name || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
          <div className="w-10 h-10 rounded-full bg-blue-100/10 dark:bg-blue-400/20 flex items-center justify-center">
            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Email</p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {lead?.email || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
          <div className="w-10 h-10 rounded-full bg-purple-100/10 dark:bg-purple-400/20 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Message</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {lead?.message || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              lead?.status === "contacted"
                ? "bg-green-100/10 dark:bg-green-400/20"
                : "bg-yellow-100/10 dark:bg-yellow-400/20"
            }`}
          >
            {lead?.status === "contacted" ? (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            )}
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-2">Status</p>
            <Badge color={lead?.status === "contacted" ? "success" : "warning"}>
              {lead?.status === "contacted" ? "Contacted" : "New"}
            </Badge>
          </div>
        </div>

        <div className="flex items-start gap-4 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
          <div className="w-10 h-10 rounded-full bg-gray-100/10 dark:bg-gray-400/20 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Created Date</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {lead?.created_at
                ? new Date(lead.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactLeadDetails;
