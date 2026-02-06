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
      const sortedData = [...safeData].sort((a, b) => a.step_number - b.step_number);
      setSteps(sortedData);
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
        const newStep = { ...formData, id: Date.now().toString() };
        const updatedSteps = [newStep, ...steps].sort((a, b) => a.step_number - b.step_number);
        setSteps(updatedSteps);
      }
      if (mode === "edit" && currentStep?.id) {
        await updateProcessStep(currentStep.id, formData);
        showAlert({
          type: "success",
          message: "Process step updated successfully",
        });
        const updatedSteps = steps.map((step) =>
          step.id === currentStep.id
            ? { ...formData, id: currentStep.id }
            : step,
        ).sort((a, b) => a.step_number - b.step_number);
        setSteps(updatedSteps);
      }

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

      const safeSteps = steps.filter((step) => step.id !== currentStep.id);
      setSteps(safeSteps);

      const filtered = filterSteps(safeSteps);
      const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

      if (currentPage > totalPages && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("Error deleting step:", error);
      showAlert({ type: "error", message: "Delete failed" });
    } finally {
      setIsDeleteModalOpen(false);
      setCurrentStep(null);
    }
  };

  const filterSteps = useCallback(
    (stepsArray: ProcessStep[]) => {
      if (!searchTerm.trim()) {
        return stepsArray;
      }
      const term = searchTerm.toLowerCase();
      return stepsArray.filter(
        (step) =>
          step.title.toLowerCase().includes(term) ||
          step.description.toLowerCase().includes(term) ||
          step.step_number.toString().includes(term),
      );
    },
    [searchTerm],
  );

  const filteredSteps = useMemo(() => {
    const safeSteps = Array.isArray(steps) ? steps : [];
    return filterSteps(safeSteps);
  }, [steps, filterSteps]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredSteps.length / itemsPerPage));
  }, [filteredSteps.length, itemsPerPage]);

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

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

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
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-5 py-4 gap-3">
          <button
            onClick={() => openModal("create")}
            className="inline-flex items-center justify-center rounded-lg bg-white p-2 text-blue-600 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-gray-700 w-full sm:w-auto"
            aria-label="Add new process step"
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
              <TableHeader className="border-b border-gray-100 dark:border-white/5">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-3 sm:px-4 py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400 min-w-25"
                  >
                    Step Number
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
              <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                {paginatedSteps.length > 0 ? (
                  paginatedSteps.map((step) => (
                    <TableRow key={step.id}>
                      <TableCell className="px-3 sm:px-4 py-3 sm:py-4 text-start whitespace-nowrap">
                        <span className="font-medium text-gray-800 text-sm sm:text-theme-sm dark:text-white/90">
                          {step.step_number}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 sm:px-4 py-3 text-start text-sm sm:text-theme-sm dark:text-gray-400">
                        <span className="text-gray-700 dark:text-gray-300 wrap-break-word">
                          {step.title}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 sm:px-4 py-3 text-start">
                        <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm wrap-break-word">
                          {step.description && step.description.length > 50
                            ? `${step.description.slice(0, 50)}...`
                            : step.description || "No description"}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 sm:px-4 py-3 text-start whitespace-nowrap">
                        <Badge
                          size="sm"
                          color={step.is_active ? "success" : "error"}
                        >
                          {step.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-3 sm:px-4 py-3">
                        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                          <button
                            onClick={() => openModal("view", step)}
                            className="p-1 sm:p-2 text-blue-500 hover:text-blue-600 dark:text-blue-400"
                            title="View"
                            aria-label={`View ${step.title}`}
                          >
                            <Eye size={14} className="sm:size-4" />
                          </button>
                          <button
                            onClick={() => openModal("edit", step)}
                            className="p-1 sm:p-2 text-amber-500 hover:text-amber-600 dark:text-amber-400"
                            title="Edit"
                            aria-label={`Edit ${step.title}`}
                          >
                            <Edit size={14} className="sm:size-4" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(step)}
                            className="p-1 sm:p-2 text-red-500 hover:text-red-600 dark:text-red-400"
                            title="Delete"
                            aria-label={`Delete ${step.title}`}
                          >
                            <Trash2 size={14} className="sm:size-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                      <div className="text-sm sm:text-base">
                        No process steps found{" "}
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
          <div className="px-3 sm:px-4 py-3">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal
          isOpen
          onClose={closeModal}
          className="max-w-lg w-[95vw] sm:w-full mx-auto p-4 sm:p-9"
        >
          <div className="max-h-[80vh] overflow-y-auto">
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
          </div>
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal
          isOpen
          onClose={() => setIsDeleteModalOpen(false)}
          className="max-w-md w-[95vw] sm:w-full mx-auto p-4 sm:p-6"
        >
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Delete Process Step
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
            Are you sure you want to delete{" "}
            <span className="font-medium">{currentStep?.title}</span>? This
            action cannot be undone.
          </p>
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
            <Button
              variant="outline"
              color="primary"
              onClick={() => setIsDeleteModalOpen(false)}
              className="w-full sm:w-auto"
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
        </Modal>
      )}

      {alert && (
        <div className="fixed bottom-5 right-2 z-50 w-[calc(100vw-1rem)] sm:w-70 max-w-75">
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