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

      if (mode === "create") {
        const newStep = { ...formData, id: Date.now().toString() };
        setSteps((prev) => [newStep, ...prev]);
      } else if (mode === "edit" && currentStep?.id) {
        setSteps((prev) =>
          prev.map((step) =>
            step.id === currentStep.id
              ? { ...formData, id: currentStep.id }
              : step,
          ),
        );
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

      setSteps((prev) => prev.filter((step) => step.id !== currentStep.id));

      const safeSteps = steps.filter((step) => step.id !== currentStep.id);
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
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-5 py-4 gap-3">
          <button
            onClick={() => openModal("create")}
            className="inline-flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 w-full sm:w-auto border border-gray-200 dark:border-gray-700 transition-colors"
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
              <TableHeader className="border-b border-gray-100 dark:border-gray-800">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-3 sm:px-4 py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400 w-24"
                  >
                    Step Number
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 sm:px-4 py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400 w-1/4"
                  >
                    Title
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 sm:px-4 py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400 w-2/5"
                  >
                    Description
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 sm:px-4 py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400 w-20"
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
                {paginatedSteps.length > 0 ? (
                  paginatedSteps.map((step) => (
                    <TableRow key={step.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <TableCell className="px-3 sm:px-4 py-3 text-start align-top whitespace-nowrap">
                        <span className="font-medium text-gray-800 text-sm sm:text-theme-sm dark:text-gray-200">
                          {step.step_number}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 sm:px-4 py-3 text-start align-top">
                        <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-theme-sm wrap-break-word whitespace-normal">
                          {step.title}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 sm:px-4 py-3 text-start align-top">
                        <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm wrap-break-word whitespace-normal">
                          {step.description || "No description"}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 sm:px-4 py-3 text-start align-top whitespace-nowrap">
                        <Badge
                          size="sm"
                          color={step.is_active ? "success" : "error"}
                        >
                          {step.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-3 sm:px-4 py-3 align-top">
                        <div className="flex items-center justify-start gap-2">
                          <button
                            onClick={() => openModal("view", step)}
                            className="p-1.5 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors rounded-full hover:bg-blue-50 dark:hover:bg-blue-500/10"
                            title="View"
                            aria-label={`View ${step.title}`}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => openModal("edit", step)}
                            className="p-1.5 text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300 transition-colors rounded-full hover:bg-amber-50 dark:hover:bg-amber-500/10"
                            title="Edit"
                            aria-label={`Edit ${step.title}`}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(step)}
                            className="p-1.5 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-500/10"
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
            {mode === "view" && currentStep && (
              <ProcessStepDetails step={currentStep} />
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
              Delete Process Step
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-900 dark:text-white">{currentStep?.title}</span>? This
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

export default ProcessStepsTableOne;