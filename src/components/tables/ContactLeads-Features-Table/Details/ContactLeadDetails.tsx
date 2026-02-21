import React from "react";
import { User, Mail, MessageSquare, Calendar, CheckCircle, X } from "lucide-react";
import { ContactLead } from "../../../../store/api/contact-leads-api";
import Button from "../../../ui/button/Button";

interface ContactLeadDetailsProps {
  lead: ContactLead;
  onClose: () => void;
}

const ContactLeadDetails: React.FC<ContactLeadDetailsProps> = ({
  lead,
  onClose,
}) => {
  return (
    <div className="bg-white dark:bg-[#1F2937] rounded-2xl w-full border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">

      <div className="p-4 sm:p-5">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-[#4FE7C0]">
            Contact Lead Details
          </h2>

          <button
            onClick={onClose}
            className="sm:hidden text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">

          <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800">
              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                Name
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {lead?.name || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center border border-green-200 dark:border-green-800">
              <Mail className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                Email
              </p>
              <p className="text-sm text-gray-800 dark:text-gray-300 break-words truncate">
                {lead?.email || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center border border-purple-200 dark:border-purple-800">
              <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                Message
              </p>
              <p className="text-sm text-gray-800 dark:text-gray-300 break-words line-clamp-3">
                {lead?.message || "No message provided"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center border border-orange-200 dark:border-orange-800">
              <CheckCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                Status
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {lead?.status === "contacted" ? "Contacted" : "New"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center border border-red-200 dark:border-red-800">
              <Calendar className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                Created
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {lead?.created_at
                  ? new Date(lead.created_at).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-sm font-medium 
            bg-gray-900 text-white 
            hover:bg-black 
            dark:bg-gray-700 dark:text-gray-200 
            dark:hover:bg-gray-600 
            transition-all duration-200 shadow-sm"
          >
            Close
          </Button>
        </div>

      </div>
    </div>
  );
};

export default ContactLeadDetails;
