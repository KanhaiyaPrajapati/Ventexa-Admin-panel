import React from "react";
import { ServiceFeature } from "../../../../store/types/types2.ts";

interface ServiceFormDetailsProps {
  feature: ServiceFeature;
  onClose: () => void;
}

const ServiceFormDetails: React.FC<ServiceFormDetailsProps> = ({
  feature,
  onClose,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Feature Details
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
            <span className="text-gray-900 dark:text-white">
              {feature?.title || "Not provided"}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Slug
          </label>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
            <span className="text-gray-900 dark:text-white">
              {feature?.slug || "Not provided"}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 min-h-20">
            <span className="text-gray-900 dark:text-white">
              {feature?.short_description || "No description provided"}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                feature?.is_active
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {feature?.is_active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>

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

export default ServiceFormDetails;


