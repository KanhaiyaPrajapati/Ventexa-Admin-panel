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
import { Trash2, Eye, Edit, Plus } from "lucide-react";
import Pagination from "../../../ui/Pagination/Pagination";
import { SearchBar } from "../../../../hooks/SearchBar.tsx";
import {
  getAllProcessSteps,
  createProcessStep,
  updateProcessStep,
  deleteProcessStep,
  ProcessStep,
} from "../../../../store/api/process-steps-api";
import ProcessStepForm from "../form/ProcessStepForm";
import ProcessStepDetails from "../Details/ProcessStepDetails";

const ProcessStepsTableOne: React.FC = () => {
  const [steps, setSteps] = useState<ProcessStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<ProcessStep | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | "view">("create");
  const [formData, setFormData] = useState<ProcessStep>({
    step_number: 0,
    title: "",
    description: "",
    is_active: true,
  });
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSteps = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllProcessSteps();
      const safeData = Array.isArray(data) ? data : [];
      setSteps(safeData);
    } catch (error) {
      console.error("Error fetching steps:", error);
      showAlert({ type: "error", message: "Failed to load process steps" });
      setSteps([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSteps();
  }, [fetchSteps]);

  const showAlert = (alertData: {
    type: "success" | "error";
    message: string;
  }) => {
    setAlert(alertData);
    setTimeout(() => setAlert(null), 3500);
  };

  const openModal = (type: "create" | "edit" | "view", step?: ProcessStep) => {
    setMode(type);
    if (step) {
      setCurrentStep(step);
      setFormData({ ...step });
    } else {
      setCurrentStep(null);
      setFormData({
        step_number: 0,
        title: "",
        description: "",
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
      if (formData.step_number < 1) {
        showAlert({ type: "error", message: "Step number must be at least 1" });
        return;
      }

      if (mode === "create") {
        await createProcessStep(formData);
        showAlert({
          type: "success",
          message: "Process step created successfully",
        });
      }
      if (mode === "edit" && currentStep?.id) {
        await updateProcessStep(currentStep.id, formData);
        showAlert({
          type: "success",
          message: "Process step updated successfully",
        });
      }
      fetchSteps();
      closeModal();
    } catch (error) {
      console.error("Error submitting form:", error);
      showAlert({ type: "error", message: "Operation failed" });
    }
  };

  const openDeleteModal = (step: ProcessStep) => {
    setCurrentStep(step);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!currentStep?.id) return;
    try {
      await deleteProcessStep(currentStep.id);
      showAlert({
        type: "success",
        message: "Process step deleted successfully",
      });
      fetchSteps();
    } catch (error) {
      console.error("Error deleting step:", error);
      showAlert({ type: "error", message: "Delete failed" });
    } finally {
      setIsDeleteModalOpen(false);
      setCurrentStep(null);
    }
  };

  const filteredSteps = useMemo(() => {
    const safeSteps = Array.isArray(steps) ? steps : [];
    if (!searchTerm.trim()) {
      return safeSteps;
    }
    const term = searchTerm.toLowerCase();
    return safeSteps.filter(
      (step) =>
        step.title.toLowerCase().includes(term) ||
        step.description.toLowerCase().includes(term) ||
        step.step_number.toString().includes(term),
    );
  }, [steps, searchTerm]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredSteps.length / itemsPerPage));
  }, [filteredSteps.length, itemsPerPage]);

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
  }, [filteredSteps, currentPage, totalPages, searchTerm]);

  const paginatedSteps = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredSteps.slice(startIndex, endIndex);
  }, [filteredSteps, currentPage, itemsPerPage]);

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
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
        <div className="flex flex-col sm:flex-row justify-between items-center px-5 py-4 gap-3">
          <button
            onClick={() => openModal("create")}
            className="inline-flex items-center justify-center rounded-lg bg-white p-2 text-blue-600 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Add new process step"
          >
            <Plus size={20} />
          </button>
          <SearchBar value={searchTerm} onChange={handleSearchChange} />
        </div>
        <div className="max-w-full overflow-x-auto">
          <Table className="min-w-175">
            <TableHeader className="border-b border-gray-100 dark:border-white/5">
              <TableRow>
                {[
                  "Step Number",
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
            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {paginatedSteps.length > 0 ? (
                paginatedSteps.map((step) => (
                  <TableRow key={step.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start whitespace-nowrap">
                      <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {step.step_number}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      <span className="text-gray-700 dark:text-gray-300">
                        {step.title}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start whitespace-nowrap">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        {step.description && step.description.length > 25
                          ? `${step.description.slice(0, 25)}...`
                          : step.description || "No description"}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start whitespace-nowrap">
                      <Badge
                        size="sm"
                        color={step.is_active ? "success" : "error"}
                      >
                        {step.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal("view", step)}
                          className="p-2 text-blue-500 hover:text-blue-600 dark:text-blue-400"
                          title="View"
                          aria-label={`View ${step.title}`}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openModal("edit", step)}
                          className="p-2 text-amber-500 hover:text-amber-600 dark:text-amber-400"
                          title="Edit"
                          aria-label={`Edit ${step.title}`}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(step)}
                          className="p-2 text-red-500 hover:text-red-600 dark:text-red-400"
                          title="Delete"
                          aria-label={`Delete ${step.title}`}
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
                      No process steps found{" "}
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
        <Modal isOpen onClose={closeModal} className="max-w-lg p-6">
          {mode === "view" && currentStep && (
            <ProcessStepDetails step={currentStep} onClose={closeModal} />
          )}
          {(mode === "create" || mode === "edit") && (
            <ProcessStepForm
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
            Delete Process Step
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-medium">{currentStep?.title}</span>? This
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

export default ProcessStepsTableOne;