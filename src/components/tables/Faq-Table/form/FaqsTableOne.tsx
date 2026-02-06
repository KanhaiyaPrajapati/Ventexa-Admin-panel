import { useState, useEffect, useMemo, useCallback } from "react";
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
import { Trash2, Eye, Edit, Plus } from "lucide-react";
import Pagination from "../../../ui/Pagination/Pagination";
import { SearchBar } from "../../../../hooks/SearchBar.tsx";
import {
  getAllFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} from "../../../../store/api/faq-api";
import FaqForm from "../form/FaqForm";
import FaqDetails from "../Details/FaqDetails";
import { FAQ } from "../../../../store/api/faq-api";

const FaqsTable: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<FAQ | null>(null);
  const [mode, setMode] = useState<"create" | "view" | "edit">("create");
  const [formData, setFormData] = useState<FAQ>({
    question: "",
    answer: "",
    display_order: "",
    is_active: true,
    created_at: new Date().toISOString(),
  });
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState("");

  const fetchFaqs = useCallback(async () => {
    try {
      const data = await getAllFAQs();

      const sortedData = data.sort(
        (a, b) => Number(a.display_order) - Number(b.display_order),
      );

      setFaqs(sortedData);
    } catch {
      showAlert({ type: "error", message: "Failed to load FAQs" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  const showAlert = (alertData: {
    type: "success" | "error";
    message: string;
  }) => {
    setAlert(alertData);
    setTimeout(() => setAlert(null), 3500);
  };

  const openModal = (type: "create" | "view" | "edit", faq?: FAQ) => {
    setMode(type);

    if (faq) {
      setCurrentFaq(faq);
      setFormData({ ...faq });
    } else {
      setCurrentFaq(null);

      setFormData({
        question: "",
        answer: "",
        display_order:"",   
        is_active: true,
        created_at: new Date().toISOString(),
      });
    }

    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    let finalValue: string | number | boolean = value;

    if (name === "display_order") {
      finalValue = value === "" ? "" : parseInt(value, 10);
    } else if (name === "is_active") {
      finalValue = value === "true";
    }

    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async () => {
    try {
      if (mode === "create") {
        await createFAQ(formData);
        showAlert({
          type: "success",
          message: "FAQ created successfully",
        });
      } else if (mode === "edit" && currentFaq?.id) {
        await updateFAQ(currentFaq.id, formData);
        showAlert({
          type: "success",
          message: "FAQ updated successfully",
        });
      }

      await fetchFaqs();
      closeModal();
    } catch (error) {
      console.error("Operation failed:", error);
      showAlert({
        type: "error",
        message:
          mode === "create" ? "Failed to create FAQ" : "Failed to update FAQ",
      });
    }
  };

  const openDeleteModal = (faq: FAQ) => {
    setCurrentFaq(faq);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!currentFaq?.id) return;
    try {
      await deleteFAQ(currentFaq.id);
      showAlert({ type: "success", message: "FAQ deleted successfully" });
      await fetchFaqs();
    } catch {
      showAlert({ type: "error", message: "Delete failed" });
    } finally {
      setIsDeleteModalOpen(false);
      setCurrentFaq(null);
    }
  };

  const filteredFaqs = useMemo(() => {
    if (!searchTerm.trim()) {
      return faqs;
    }
    const term = searchTerm.toLowerCase();
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term),
    );
  }, [faqs, searchTerm]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredFaqs.length / itemsPerPage));
  }, [filteredFaqs.length, itemsPerPage]);

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
  }, [filteredFaqs, currentPage, totalPages, searchTerm]);

  const paginatedFaqs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredFaqs.slice(startIndex, endIndex);
  }, [filteredFaqs, currentPage, itemsPerPage]);

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
        Loading...
      </div>
    );
  }

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
          <SearchBar value={searchTerm} onChange={handleSearchChange} />
        </div>

        <div className="max-w-full overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {[
                  "#",
                  "Question",
                  "Answer Preview",
                  "Display Order",
                  "Status",
                  "Actions",
                ].map((head) => (
                  <TableCell
                    key={head}
                    isHeader
                    className="px-3 sm:px-5 py-2 sm:py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400 whitespace-nowrap"
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {paginatedFaqs.length > 0 ? (
                paginatedFaqs.map((faq, index) => (
                  <TableRow key={faq.id}>
                    <TableCell className="px-3 sm:px-5 py-2 sm:py-4 text-start whitespace-nowrap">
                      <span className="font-medium text-gray-800 text-xs sm:text-theme-sm dark:text-white/90">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </span>
                    </TableCell>
                    <TableCell className="px-3 sm:px-4 py-2 sm:py-3 text-start min-w-[150px] sm:min-w-[200px]">
                      <span className="font-medium text-gray-800 text-xs sm:text-theme-sm dark:text-white/90">
                        {faq.question}
                      </span>
                    </TableCell>
                    <TableCell className="px-3 sm:px-4 py-2 sm:py-3 text-start min-w-[200px]">
                      <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                        {faq.answer.length > 50
                          ? `${faq.answer.slice(0, 50)}...`
                          : faq.answer}
                      </span>
                    </TableCell>
                    <TableCell className="px-3 sm:px-4 py-2 sm:py-3 text-gray-500 text-start text-xs sm:text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      #{faq.display_order}
                    </TableCell>
                    <TableCell className="px-3 sm:px-4 py-2 sm:py-3 text-start whitespace-nowrap">
                      <Badge
                        size="sm"
                        color={faq.is_active ? "success" : "warning"}
                      >
                        {faq.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        <button
                          onClick={() => openModal("view", faq)}
                          className="p-1 sm:p-2 text-blue-500 hover:text-blue-600 dark:text-blue-400"
                          title="View"
                        >
                          <Eye size={14} className="sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={() => openModal("edit", faq)}
                          className="p-1 sm:p-2 text-amber-500 hover:text-amber-600 dark:text-amber-400"
                          title="Edit"
                        >
                          <Edit size={14} className="sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(faq)}
                          className="p-1 sm:p-2 text-red-500 hover:text-red-600 dark:text-red-400"
                          title="Delete"
                        >
                          <Trash2 size={14} className="sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    <div className="text-sm sm:text-base">
                      No FAQs found {searchTerm ? `for "${searchTerm}"` : ""}
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
        <Modal isOpen onClose={closeModal} className="max-w-lg p-6">
          {mode === "view" && currentFaq && (
            <FaqDetails faq={currentFaq} onClose={closeModal} />
          )}
          {(mode === "create" || mode === "edit") && (
            <FaqForm
              mode={mode}
              formData={formData}
              onChange={handleChange}
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
            Delete FAQ
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-medium">"{currentFaq?.question}"</span>? This
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

export default FaqsTable;
