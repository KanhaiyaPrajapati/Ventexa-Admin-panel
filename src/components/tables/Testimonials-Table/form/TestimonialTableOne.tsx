import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { Modal } from "../../../ui/modal";
import Badge from "../../../ui/badge/Badge";
import Alert from "../../../ui/alert/Alert";
import Button from "../../../ui/button/Button";
import { Trash2, Eye, Edit, Plus, Star } from "lucide-react";
import Pagination from "../../../ui/Pagination/Pagination";
import { SearchBar } from "../../../../hooks/SearchBar.tsx";
import {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  Testimonial,
} from "../../../../store/api/testimonials-api";
import TestimonialForm from "./TestimonialForm";
import TestimonialDetails from "../Details/TestimonialDetails";

const TestimonialTableOne: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | "view">("create");
  const [formData, setFormData] = useState<Testimonial>({
    client_name: "",
    company_name: "",
    testimonial_text: "",
    rating: 0,
    is_active: true,
  });
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllTestimonials();
      const safeData = Array.isArray(data) ? data : [];
      setTestimonials(safeData);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      showAlert({ type: "error", message: "Failed to load testimonials" });
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const showAlert = (alertData: {
    type: "success" | "error";
    message: string;
  }) => {
    setAlert(alertData);
    setTimeout(() => setAlert(null), 3500);
  };

  const openModal = (type: "create" | "edit" | "view", testimonial?: Testimonial) => {
    setMode(type);
    if (testimonial) {
      setCurrentTestimonial(testimonial);
      setFormData({ ...testimonial });
    } else {
      setCurrentTestimonial(null);
      setFormData({
        client_name: "",
        company_name: "",
        testimonial_text: "",
        rating: 0,
        is_active: true,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  const toggleActive = () => {
    setFormData((prev) => ({ ...prev, is_active: !prev.is_active }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.client_name.trim() || !formData.company_name.trim() || !formData.testimonial_text.trim()) {
        showAlert({ type: "error", message: "All fields are required" });
        return;
      }

      if (formData.rating < 1 || formData.rating > 5) {
        showAlert({ type: "error", message: "Rating must be between 1 and 5" });
        return;
      }

      if (mode === "create") {
        await createTestimonial(formData);
        showAlert({
          type: "success",
          message: "Testimonial created successfully",
        });
      }
      if (mode === "edit" && currentTestimonial?.id) {
        await updateTestimonial(currentTestimonial.id, formData);
        showAlert({
          type: "success",
          message: "Testimonial updated successfully",
        });
      }
      fetchTestimonials();
      closeModal();
    } catch (error) {
      console.error("Error submitting form:", error);
      showAlert({ type: "error", message: "Operation failed" });
    }
  };

  const openDeleteModal = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!currentTestimonial?.id) return;
    try {
      await deleteTestimonial(currentTestimonial.id);
      showAlert({
        type: "success",
        message: "Testimonial deleted successfully",
      });
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      showAlert({ type: "error", message: "Delete failed" });
    } finally {
      setIsDeleteModalOpen(false);
      setCurrentTestimonial(null);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredTestimonials = useMemo(() => {
    const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];
    if (!searchTerm.trim()) {
      return safeTestimonials;
    }
    const term = searchTerm.toLowerCase();
    return safeTestimonials.filter(
      (testimonial) =>
        testimonial.client_name.toLowerCase().includes(term) ||
        testimonial.company_name.toLowerCase().includes(term) ||
        testimonial.testimonial_text.toLowerCase().includes(term) ||
        testimonial.rating.toString().includes(term),
    );
  }, [testimonials, searchTerm]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredTestimonials.length / itemsPerPage));
  }, [filteredTestimonials.length, itemsPerPage]);

  useEffect(() => {
    if (searchTerm.trim() && currentPage > totalPages) {
      setCurrentPage(1);
    } else if (
      !searchTerm.trim() &&
      currentPage > totalPages &&
      totalPages > 0
    ) {
      setCurrentPage(totalPages);
    }
  }, [filteredTestimonials, currentPage, totalPages, searchTerm]);

  const paginatedTestimonials = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTestimonials.slice(startIndex, endIndex);
  }, [filteredTestimonials, currentPage, itemsPerPage]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-900 dark:text-white">
        Loading testimonials...
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
        <div className="flex flex-col sm:flex-row justify-between items-center px-5 py-4 gap-3">
          <button
            onClick={() => openModal("create")}
            className="inline-flex items-center justify-center rounded-lg bg-white p-2 text-blue-600 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Add new testimonial"
          >
            <Plus size={20} />
          </button>
          <SearchBar value={searchTerm} onChange={handleSearchChange} />
        </div>
        <div className="max-w-full overflow-x-auto">
          <Table className="min-w-200">
            <TableHeader className="border-b border-gray-100 dark:border-white/5">
              <TableRow>
                {[
                  "Client Name",
                  "Company",
                  "Testimonial",
                  "Rating",
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
            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {paginatedTestimonials.length > 0 ? (
                paginatedTestimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start whitespace-nowrap">
                      <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {testimonial.client_name}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      <span className="text-gray-700 dark:text-gray-300">
                        {testimonial.company_name}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <span className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 italic">
                        "{testimonial.testimonial_text.length > 40
                          ? `${testimonial.testimonial_text.slice(0, 40)}...`
                          : testimonial.testimonial_text}"
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {renderStars(testimonial.rating)}
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          ({testimonial.rating}/5)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start whitespace-nowrap">
                      <Badge
                        size="sm"
                        color={testimonial.is_active ? "success" : "error"}
                      >
                        {testimonial.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal("view", testimonial)}
                          className="p-2 text-blue-500 hover:text-blue-600 dark:text-blue-400"
                          title="View"
                          aria-label={`View ${testimonial.client_name}`}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openModal("edit", testimonial)}
                          className="p-2 text-amber-500 hover:text-amber-600 dark:text-amber-400"
                          title="Edit"
                          aria-label={`Edit ${testimonial.client_name}`}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(testimonial)}
                          className="p-2 text-red-500 hover:text-red-600 dark:text-red-400"
                          title="Delete"
                          aria-label={`Delete ${testimonial.client_name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                    
                  >
                    <div>
                      No testimonials found{" "}
                      {searchTerm ? `for "${searchTerm}"` : ""}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {isModalOpen && (
        <Modal isOpen onClose={closeModal} className="max-w-2xl p-9">
          {mode === "view" && currentTestimonial && (
            <TestimonialDetails testimonial={currentTestimonial} onClose={closeModal} />
          )}
          {(mode === "create" || mode === "edit") && (
            <TestimonialForm
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
            Delete Testimonial
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to delete testimonial from{" "}
            <span className="font-medium">{currentTestimonial?.client_name}</span>? This
            action cannot be undone.
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

export default TestimonialTableOne;