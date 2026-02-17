import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Modal } from "../../ui/modal";
import Badge from "../../ui/badge/Badge";
import Alert from "../../ui/alert/Alert";
import Button from "../../ui/button/Button";
import Loader from "../../ui/Loader/Loader";

import { Trash2, Eye, Edit, Plus } from "lucide-react";
import Pagination from "../../ui/Pagination/Pagination";
import { SearchBar } from "../../../hooks/SearchBar.tsx";

import {
  getAllServiceFeatures,
  createServiceFeature,
  updateServiceFeature,
  deleteServiceFeature,
} from "../../../store/api/service-features-api";

import { ServiceFeature } from "../../../store/types/types";
import ServiceFeatureForm from "./form/ServiceFeatureForm";
import ServiceFeatureDetails from "./Details/ServiceFeatureDetails";

const ServiceFeaturesTableOne: React.FC = () => {
  const [features, setFeatures] = useState<ServiceFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState<ServiceFeature | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | "view">("create");
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState("");

  const showAlert = (alertData: { type: "success" | "error"; message: string }) => {
    setAlert(alertData);
    setTimeout(() => setAlert(null), 3500);
  };

  const fetchFeatures = async () => {
    try {
      setLoading(true);
      const data = await getAllServiceFeatures();
      setFeatures(Array.isArray(data) ? data : []);
    } catch {
      showAlert({ type: "error", message: "Failed to load features" });
      setFeatures([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const openModal = (type: "create" | "edit" | "view", feature?: ServiceFeature) => {
    setMode(type);
    setCurrentFeature(feature || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentFeature(null);
  };

  const openDeleteModal = (feature: ServiceFeature) => {
    setCurrentFeature(feature);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!currentFeature?.id) {
      showAlert({ type: "error", message: "Invalid feature ID" });
      return;
    }

    try {
      await deleteServiceFeature(String(currentFeature.id));

      setFeatures((prev) => prev.filter((item) => item.id !== currentFeature.id));

      const filtered = filteredFeatures.filter((item) => item.id !== currentFeature.id);
      const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
      if (currentPage > totalPages && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      showAlert({ type: "success", message: "Feature deleted successfully" });
    } catch {
      showAlert({ type: "error", message: "Delete failed" });
    } finally {
      setIsDeleteModalOpen(false);
      setCurrentFeature(null);
    }
  };

  const handleSubmit = async (data: ServiceFeature) => {
    try {
      if (mode === "create") {
        const created = await createServiceFeature(data);
        setFeatures((prev) => [created, ...prev]);
        showAlert({ type: "success", message: "Feature created successfully" });
      }

      if (mode === "edit" && currentFeature?.id) {
        const updated = await updateServiceFeature(String(currentFeature.id), data);
        setFeatures((prev) =>
          prev.map((item) => (item.id === currentFeature.id ? updated : item))
        );
        showAlert({ type: "success", message: "Feature updated successfully" });
      }

      closeModal();
    } catch {
      showAlert({ type: "error", message: "Operation failed" });
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-900 dark:text-white">
        <Loader />
      </div>
    );
  }

  const filteredFeatures = features.filter((f) => {
    const search = searchTerm.toLowerCase();
    const serviceId = (f?.service_id || "").toLowerCase();
    const title = (f?.feature_title || "").toLowerCase();
    const description = (f?.feature_description || "").toLowerCase();
    return serviceId.includes(search) || title.includes(search) || description.includes(search);
  });

  const totalPages = Math.max(1, Math.ceil(filteredFeatures.length / itemsPerPage));
  const paginatedFeatures = filteredFeatures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-5 py-4 gap-3">
          <button
            onClick={() => openModal("create")}
            className="inline-flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 w-full sm:w-auto border border-gray-200 dark:border-gray-700 transition-colors"
            aria-label="Add new service feature"
          >
            <Plus size={20} className="mr-2 sm:mr-0" />
            <span className="sm:sr-only">Add New</span>
          </button>
          <div className="w-full sm:w-auto">
            <SearchBar 
              value={searchTerm} 
              onChange={(value) => {
                setSearchTerm(value);
                setCurrentPage(1);
              }} 
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-0">
            <Table className="w-full">
              <TableHeader className="border-b border-gray-100 dark:border-gray-800">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-3 sm:px-4 py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400 min-w-25"
                  >
                    Service ID
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 sm:px-4 py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400 min-w-30"
                  >
                    Title
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 sm:px-4 py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400 min-w-37.5"
                  >
                    Description
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 sm:px-4 py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400 min-w-25"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 sm:px-4 py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400 min-w-30"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {paginatedFeatures.length > 0 ? (
                  paginatedFeatures.map((f, index) => {
                    const description = f?.feature_description || "";

                    return (
                      <TableRow 
                        key={f?.id ?? `${f?.service_id}-${index}`} 
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <TableCell className="px-3 sm:px-4 py-3 sm:py-4 text-start whitespace-nowrap">
                          <span className="font-medium text-gray-800 text-sm sm:text-theme-sm dark:text-gray-200">
                            {f?.service_id || "-"}
                          </span>
                        </TableCell>

                        <TableCell className="px-3 sm:px-4 py-3 text-start text-sm sm:text-theme-sm">
                          <span className="text-gray-700 dark:text-gray-300 wrap-break-word">
                            {f?.feature_title || "-"}
                          </span>
                        </TableCell>

                        <TableCell className="px-3 sm:px-4 py-3 text-start">
                          <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm wrap-break-word">
                            {description.length > 50
                              ? `${description.slice(0, 50)}...`
                              : description || "No description"}
                          </span>
                        </TableCell>

                        <TableCell className="px-3 sm:px-4 py-3 text-start whitespace-nowrap">
                          <Badge
                            size="sm"
                            color={f?.is_active ? "success" : "error"}
                          >
                            {f?.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>

                        <TableCell className="px-3 sm:px-4 py-3">
                          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                            <button
                              onClick={() => openModal("view", f)}
                              className="p-1 sm:p-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors rounded-full hover:bg-blue-50 dark:hover:bg-blue-500/10"
                              title="View"
                              aria-label={`View feature`}
                            >
                              <Eye size={14} className="sm:size-4" />
                            </button>
                            <button
                              onClick={() => openModal("edit", f)}
                              className="p-1 sm:p-2 text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300 transition-colors rounded-full hover:bg-amber-50 dark:hover:bg-amber-500/10"
                              title="Edit"
                              aria-label={`Edit feature`}
                            >
                              <Edit size={14} className="sm:size-4" />
                            </button>
                            <button
                              onClick={() => openDeleteModal(f)}
                              className="p-1 sm:p-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-500/10"
                              title="Delete"
                              aria-label={`Delete feature`}
                            >
                              <Trash2 size={14} className="sm:size-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                      <div className="text-sm sm:text-base">
                        No service features found {searchTerm ? `for "${searchTerm}"` : ""}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="px-3 sm:px-4 py-3 border-t border-gray-100 dark:border-gray-800">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal
          isOpen
          onClose={closeModal}
          className="max-w-md w-[95vw] mx-auto" 
          showCloseButton={true}
        >
          <div className="bg-white dark:bg-[#1F2937] rounded-3xl overflow-hidden flex flex-col" style={{ maxHeight: "80vh" }}>
            <div className="overflow-y-auto custom-scrollbar">
              {mode === "view" && currentFeature && (
                <ServiceFeatureDetails feature={currentFeature} onClose={closeModal} />
              )}

              {(mode === "create" || mode === "edit") && (
                <ServiceFeatureForm
                  mode={mode}
                  initialData={currentFeature || undefined}
                  onSubmit={handleSubmit}
                  onCancel={closeModal}
                />
              )}
            </div>
          </div>
        </Modal>
      )}

      {isDeleteModalOpen && currentFeature && (
        <Modal
          isOpen
          onClose={() => setIsDeleteModalOpen(false)}
          className="max-w-md w-[95vw] mx-auto"
          showCloseButton={true}
        >
          <div className="bg-white dark:bg-[#1F2937] rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-[#4FE7C0] mb-2">
              Delete Service Feature
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {currentFeature?.feature_title || "this feature"}
              </span>? This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <Button
                variant="outline"
                color="primary"
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full sm:w-auto dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:bg-transparent"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                color="destructive"
                onClick={confirmDelete}
                className="w-full sm:w-auto"
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {alert && (
        <div className="fixed bottom-5 right-2 z-50 w-[calc(100vw-1rem)] sm:w-72 max-w-sm">
          <Alert
            variant={alert.type}
            title={alert.type === "success" ? "Success" : "Error"}
            message={alert.message}
          />
        </div>
      )}
    </>
  );
};

export default ServiceFeaturesTableOne;