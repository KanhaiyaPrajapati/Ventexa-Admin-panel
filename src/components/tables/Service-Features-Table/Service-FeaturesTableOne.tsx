import { useEffect, useState } from "react";
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

import { Trash2, Eye, Edit, Plus } from "lucide-react";
import Pagination from "../../ui/Pagination/Pagination";
import { SearchBar } from "../../../hooks/SearchBar.tsx";

import {
  getAllServiceFeatures,
  createServiceFeature,
  updateServiceFeature,
  deleteServiceFeature,
} from "../../../store/api/service-features-api";

import ServiceFeatureForm from "./form/ServiceFeatureForm";
import ServiceFeatureDetails from "./Details/ServiceFeatureDetails";
import { ServiceFeature } from "../../../store/types/types";

const ServiceFeaturesTableOne: React.FC = () => {
  const [features, setFeatures] = useState<ServiceFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState<ServiceFeature | null>(
    null,
  );
  const [mode, setMode] = useState<"create" | "edit" | "view">("create");

  const [formData, setFormData] = useState<ServiceFeature>({
    service_id: "",
    feature_title: "",
    feature_description: "",
    is_active: true,
  });

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState("");

  const fetchFeatures = async () => {
    try {
      const data = await getAllServiceFeatures();
      setFeatures(data);
    } catch {
      showAlert({ type: "error", message: "Failed to load features" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const showAlert = (alertData: {
    type: "success" | "error";
    message: string;
  }) => {
    setAlert(alertData);
    setTimeout(() => setAlert(null), 3500);
  };

  const openModal = (
    type: "create" | "edit" | "view",
    feature?: ServiceFeature,
  ) => {
    setMode(type);
    if (feature) {
      setCurrentFeature(feature);
      setFormData({ ...feature });
    } else {
      setCurrentFeature(null);
      setFormData({
        service_id: "",
        feature_title: "",
        feature_description: "",
        is_active: true,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleActive = () => {
    setFormData((prev) => ({ ...prev, is_active: !prev.is_active }));
  };

  const handleSubmit = async () => {
    try {
      if (mode === "create") {
        await createServiceFeature(formData);
        showAlert({ type: "success", message: "Feature created successfully" });
      }
      if (mode === "edit" && currentFeature?.id) {
        await updateServiceFeature(currentFeature.id, formData);
        showAlert({ type: "success", message: "Feature updated successfully" });
      }
      fetchFeatures();
      closeModal();
    } catch {
      showAlert({ type: "error", message: "Operation failed" });
    }
  };

  const openDeleteModal = (feature: ServiceFeature) => {
    setCurrentFeature(feature);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!currentFeature?.id) return;
    try {
      await deleteServiceFeature(currentFeature.id);
      showAlert({ type: "success", message: "Feature deleted successfully" });
      fetchFeatures();
    } catch {
      showAlert({ type: "error", message: "Delete failed" });
    } finally {
      setIsDeleteModalOpen(false);
      setCurrentFeature(null);
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-900 dark:text-white">
        Loading...
      </div>
    );
  }

  const filteredFeatures = features.filter(
    (f) =>
      f.service_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.feature_title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredFeatures.length / itemsPerPage);
  const paginatedFeatures = filteredFeatures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="flex flex-col sm:flex-row justify-between items-center px-5 py-4 gap-3">
          <button
            onClick={() => openModal("create")}
            className="inline-flex items-center justify-center rounded-lg bg-white p-2 text-blue-600 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <Plus size={20} />
          </button>

          <SearchBar
            value={searchTerm}
            onChange={(value) => {
              setSearchTerm(value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="max-w-full overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {[
                  "Service ID",
                  "Title",
                  "Description",
                  "Status",
                  "Actions",
                ].map((head) => (
                  <TableCell
                    key={head}
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {paginatedFeatures.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start whitespace-nowrap">
                    <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {f.service_id}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                    {f.feature_title}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start whitespace-nowrap">
                    <span className="text-black dark:text-gray-400">
                      {f.feature_description.length > 20
                        ? `${f.feature_description.slice(0, 15)}...`
                        : f.feature_description}
                    </span>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-start whitespace-nowrap ">
                    <Badge size="sm" color={f.is_active ? "success" : "error"}>
                      {f.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal("view", f)}
                        className="p-2 text-blue-500 hover:text-blue-600 dark:text-blue-400"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => openModal("edit", f)}
                        className="p-2 text-amber-500 hover:text-amber-600 dark:text-amber-400"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(f)}
                        className="p-2 text-red-500 hover:text-red-600 dark:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
      {isModalOpen && (
        <Modal isOpen onClose={closeModal} className="max-w-lg p-6">
          {mode === "view" && currentFeature && (
            <ServiceFeatureDetails feature={currentFeature} />
          )}
          {(mode === "create" || mode === "edit") && (
            <ServiceFeatureForm
              mode={mode}
              formData={formData}
              onChange={handleChange}
              onToggleActive={toggleActive}
              onSubmit={handleSubmit}
              onCancel={closeModal}
            />
          )}
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal
          isOpen
          onClose={() => setIsDeleteModalOpen(false)}
          className="max-w-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Delete Feature
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-medium">{currentFeature?.feature_title}</span>
            ? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              color="primary"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              color="destructive"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}

      {alert && (
        <div className="fixed bottom-5 right-2 z-50 w-70">
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
