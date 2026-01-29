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

import {
  fetchAllFeatures,
  addFeature,
  modifyFeature,
  removeFeature,
} from "../../../store/api/categories-api";

import ServiceForm from "./form/ServiceForm";
import ServiceFormDetails from "./Details/ServiceFormDetails";
import { ServiceFeature } from "../../../store/api/service-features-api";

// 🔹 LOCAL SearchBar COMPONENT (no import issues)
const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Search..."
    className="w-full sm:w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm
               focus:outline-none focus:ring-1 focus:ring-blue-500
               dark:bg-gray-800 dark:border-gray-700 dark:text-white"
  />
);

const BasicTableTwo: React.FC = () => {
  const [features, setFeatures] = useState<ServiceFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState<ServiceFeature | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | "view">("create");
  const [formData, setFormData] = useState<ServiceFeature>({
    title: "",
    slug: "",
    short_description: "",
    is_active: true,
  });
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState("");

  // Load features
  const loadFeatures = async () => {
    try {
      setLoading(true);
      const data = await fetchAllFeatures();
      setFeatures(data);
    } catch {
      showAlert({ type: "error", message: "Failed to load features" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeatures();
  }, []);

  const showAlert = (alertData: { type: "success" | "error"; message: string }) => {
    setAlert(alertData);
    setTimeout(() => setAlert(null), 3500);
  };

  // Open modal - FIXED: Properly handle different modes
  const openModal = (type: "create" | "edit" | "view", feature?: ServiceFeature) => {
    setMode(type);
    
    if (feature) {
      setCurrentFeature(feature);
      
      // Only populate formData for edit mode
      if (type === "edit") {
        setFormData({ 
          title: feature.title || "",
          slug: feature.slug || "",
          short_description: feature.short_description || "",
          is_active: feature.is_active || true,
        });
      } else {
        // For view mode, don't touch formData
        // For create mode with feature (shouldn't happen), reset formData
        setFormData({
          title: "",
          slug: "",
          short_description: "",
          is_active: true,
        });
      }
    } else {
      // Create mode without existing feature
      setCurrentFeature(null);
      setFormData({
        title: "",
        slug: "",
        short_description: "",
        is_active: true,
      });
    }
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentFeature(null);
    // Reset form data when closing modal
    setFormData({
      title: "",
      slug: "",
      short_description: "",
      is_active: true,
    });
  };

  // Form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleActive = () => setFormData((prev) => ({ ...prev, is_active: !prev.is_active }));

  const handleSubmit = async () => {
    try {
      if (mode === "create") {
        await addFeature(formData);
        showAlert({ type: "success", message: "Feature created successfully" });
      } else if (mode === "edit" && currentFeature?.id) {
        await modifyFeature(currentFeature.id, formData);
        showAlert({ type: "success", message: "Feature updated successfully" });
      }
      await loadFeatures();
      closeModal();
    } catch {
      showAlert({ type: "error", message: "Operation failed" });
    }
  };

  // Delete
  const openDeleteModal = (feature: ServiceFeature) => {
    setCurrentFeature(feature);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!currentFeature?.id) return;
    try {
      await removeFeature(currentFeature.id);
      showAlert({ type: "success", message: "Feature deleted successfully" });
      setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
      await loadFeatures();
    } catch {
      showAlert({ type: "error", message: "Delete failed" });
    } finally {
      setIsDeleteModalOpen(false);
      setCurrentFeature(null);
    }
  };

  // Loading
  if (loading) {
    return <div className="py-10 text-center text-gray-900 dark:text-white">Loading...</div>;
  }

  // Filter and paginate
  const filteredFeatures = features.filter(
    (f) =>
      (f.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.slug ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFeatures.length / itemsPerPage);
  const paginatedFeatures = filteredFeatures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
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
          <Table className="min-w-175">
            <TableHeader className="border-b border-gray-100 dark:border-white/5">
              <TableRow>
                {["Title", "Slug", "Short_Description", "Status", "Actions"].map((head) => (
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

            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {paginatedFeatures.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start whitespace-nowrap">
                    <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {f.title}
                    </span>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                    {f.slug}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-start whitespace-nowrap">
                    <span className="text-black dark:text-gray-400">
                      {(f.short_description ?? "").length > 20
                        ? `${f.short_description.slice(0, 20)}...`
                        : f.short_description}
                    </span>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-start whitespace-nowrap">
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
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </div>

      {isModalOpen && (
        <Modal isOpen onClose={closeModal} className="max-w-lg p-6">
          {mode === "view" && currentFeature ? (
            <ServiceFormDetails feature={currentFeature} onClose={closeModal} />
          ) : (
            <ServiceForm
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
        <Modal isOpen onClose={() => setIsDeleteModalOpen(false)} className="max-w-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete Feature</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to delete <span className="font-medium">{currentFeature?.title}</span>?
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button color="destructive" onClick={confirmDelete}>Delete</Button>
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

export default BasicTableTwo;