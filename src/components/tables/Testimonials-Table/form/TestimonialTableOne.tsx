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

type TestimonialFormData = {
  client_name: string;
  company_name: string;
  testimonial_text: string;
  rating: number;
  is_active: boolean;
};

const TestimonialTableOne: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | "view">("create");
  const [formData, setFormData] = useState<TestimonialFormData>({
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
      const sortedData = safeData.sort((a, b) => {
        if (a.created_at && b.created_at) {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        }
        return (a.id || "").localeCompare(b.id || "");
      });
      setTestimonials(sortedData);
    } catch (error) {
      showAlert({ type: "error", message: "Failed to load testimonials" });
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const showAlert = (alertData: { type: "success" | "error"; message: string }) => {
    setAlert(alertData);
    setTimeout(() => setAlert(null), 3500);
  };

  const openModal = (type: "create" | "edit" | "view", testimonial?: Testimonial) => {
    setMode(type);
    if (testimonial) {
      setCurrentTestimonial(testimonial);
      setFormData({
        client_name: testimonial.client_name,
        company_name: testimonial.company_name,
        testimonial_text: testimonial.testimonial_text,
        rating: testimonial.rating,
        is_active: testimonial.is_active,
      });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        const testimonialData: Omit<Testimonial, "id" | "created_at"> = {
          client_name: formData.client_name,
          company_name: formData.company_name,
          testimonial_text: formData.testimonial_text,
          rating: formData.rating,
          is_active: formData.is_active,
        };

        const createdTestimonial = await createTestimonial(testimonialData as Testimonial);
        showAlert({ type: "success", message: "Testimonial created successfully" });
        
        if (createdTestimonial) {
          setTestimonials(prev => [...prev, createdTestimonial]);
        } else {
          const newTestimonial: Testimonial = { 
            ...formData, 
            id: Date.now().toString(),
            created_at: new Date().toISOString()
          };
          setTestimonials(prev => [...prev, newTestimonial]);
        }
      }
      if (mode === "edit" && currentTestimonial?.id) {
        const testimonialData: Testimonial = {
          id: currentTestimonial.id,
          client_name: formData.client_name,
          company_name: formData.company_name,
          testimonial_text: formData.testimonial_text,
          rating: formData.rating,
          is_active: formData.is_active,
          created_at: currentTestimonial.created_at || new Date().toISOString(),
        };

        await updateTestimonial(currentTestimonial.id, testimonialData);
        showAlert({ type: "success", message: "Testimonial updated successfully" });
        
        setTestimonials(prev => prev.map(testimonial => 
          testimonial.id === currentTestimonial.id 
            ? testimonialData 
            : testimonial
        ));
      }
      
      closeModal();
    } catch (error) {
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
      showAlert({ type: "success", message: "Testimonial deleted successfully" });
      
      setTestimonials(prev => prev.filter(testimonial => testimonial.id !== currentTestimonial.id));
      
      const safeTestimonials = testimonials.filter(t => t.id !== currentTestimonial.id);
      const filtered = filterTestimonials(safeTestimonials);
      const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
      
      if (currentPage > totalPages && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      
    } catch (error) {
      showAlert({ type: "error", message: "Delete failed" });
    } finally {
      setIsDeleteModalOpen(false);
      setCurrentTestimonial(null);
    }
  };

  const filterTestimonials = useCallback((testimonialsArray: Testimonial[]) => {
    if (!searchTerm.trim()) {
      return testimonialsArray;
    }
    const term = searchTerm.toLowerCase();
    return testimonialsArray.filter(
      (testimonial) =>
        testimonial.client_name.toLowerCase().includes(term) ||
        testimonial.company_name.toLowerCase().includes(term) ||
        testimonial.testimonial_text.toLowerCase().includes(term) ||
        testimonial.rating.toString().includes(term),
    );
  }, [searchTerm]);

  const filteredTestimonials = useMemo(() => {
    const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];
    return filterTestimonials(safeTestimonials);
  }, [testimonials, filterTestimonials]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredTestimonials.length / itemsPerPage));
  }, [filteredTestimonials.length, itemsPerPage]);

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

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-900 dark:text-white">
        Loading testimonials...
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-5 py-4 gap-3">
          <button
            onClick={() => openModal("create")}
            className="inline-flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 w-full sm:w-auto border border-gray-200 dark:border-gray-700 transition-colors"
            aria-label="Add new testimonial"
          >
            <Plus size={20} className="mr-2 sm:mr-0" />
            <span className="sm:sr-only">Add New</span>
          </button>
          <div className="w-full sm:w-auto">
            <SearchBar value={searchTerm} onChange={handleSearchChange} />
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
                    Client Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 sm:px-4 py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400 min-w-25"
                  >
                    Company
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 sm:px-4 py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400 min-w-37.5"
                  >
                    Testimonial
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 sm:px-4 py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400 min-w-20"
                  >
                    Rating
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 sm:px-4 py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400 min-w-20"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 sm:px-4 py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400 w-32"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {paginatedTestimonials.length > 0 ? (
                  paginatedTestimonials.map((testimonial) => (
                    <TableRow key={testimonial.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <TableCell className="px-3 sm:px-4 py-3 text-start">
                        <span className="font-medium text-gray-800 text-sm sm:text-theme-sm dark:text-gray-200 wrap-break-word line-clamp-2">
                          {testimonial.client_name}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 sm:px-4 py-3 text-start">
                        <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-theme-sm wrap-break-word line-clamp-2">
                          {testimonial.company_name}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 sm:px-4 py-3 text-start">
                        <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-2 italic wrap-break-word">
                          "{testimonial.testimonial_text.length > 60
                            ? `${testimonial.testimonial_text.slice(0, 60)}...`
                            : testimonial.testimonial_text}"
                        </span>
                      </TableCell>
                      <TableCell className="px-3 sm:px-4 py-3 text-start">
                        <div className="flex items-center gap-1">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= testimonial.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-400 ml-1">
                            ({testimonial.rating}/5)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 sm:px-4 py-3 text-start whitespace-nowrap">
                        <Badge
                          size="sm"
                          color={testimonial.is_active ? "success" : "error"}
                        >
                          {testimonial.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-3 sm:px-4 py-3">
                        <div className="flex items-center justify-start gap-2">
                          <button
                            onClick={() => openModal("view", testimonial)}
                            className="p-1.5 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors rounded-full hover:bg-blue-50 dark:hover:bg-blue-500/10"
                            title="View"
                            aria-label={`View ${testimonial.client_name}`}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => openModal("edit", testimonial)}
                            className="p-1.5 text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300 transition-colors rounded-full hover:bg-amber-50 dark:hover:bg-amber-500/10"
                            title="Edit"
                            aria-label={`Edit ${testimonial.client_name}`}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(testimonial)}
                            className="p-1.5 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-500/10"
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
                    <TableCell className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                      <div className="text-sm sm:text-base">
                        No testimonials found{" "}
                        {searchTerm ? `for "${searchTerm}"` : ""}
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
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* Create/Edit/View Modal */}
      {isModalOpen && (
        <Modal 
          isOpen 
          onClose={closeModal} 
          className="max-w-lg w-[95vw] mx-auto"
          showCloseButton={true}
        >
          <div className="bg-white dark:bg-[#1F2937] rounded-3xl">
            {mode === "view" && currentTestimonial && (
              <TestimonialDetails testimonial={currentTestimonial} />
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
          </div>
        </Modal>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <Modal
          isOpen
          onClose={() => setIsDeleteModalOpen(false)}
          className="max-w-md w-[95vw] mx-auto"
          showCloseButton={true}
        >
          <div className="bg-white dark:bg-[#1F2937] rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-[#4FE7C0] mb-2">
              Delete Testimonial
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete testimonial from{" "}
              <span className="font-medium text-gray-900 dark:text-white">{currentTestimonial?.client_name}</span>? This
              action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <Button
                variant="outline"
                color="primary"
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full sm:w-auto dark:border-gray-600 dark:text-gray-300 dark:hover:bg-[#374151] dark:bg-transparent"
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

export default TestimonialTableOne;