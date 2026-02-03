import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../ui/table";

import Badge from "../../../ui/badge/Badge";
import Alert from "../../../ui/alert/Alert";
import Button from "../../../ui/button/Button";
import { Trash2, Eye, Edit, Plus, X } from "lucide-react";
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

  const fetchSteps = async () => {
    try {
      setLoading(true);
      const data = await getAllProcessSteps();
      setSteps(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching steps:", error);
      showAlert({ type: "error", message: "Failed to load process steps" });
      setSteps([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSteps();
  }, []);

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
      [name]: type === 'number' ? parseInt(value) || 0 : value 
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
        showAlert({ type: "success", message: "Process step created successfully" });
      }
      if (mode === "edit" && currentStep?.id) {
        await updateProcessStep(currentStep.id, formData);
        showAlert({ type: "success", message: "Process step updated successfully" });
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
      showAlert({ type: "success", message: "Process step deleted successfully" });
      fetchSteps();
    } catch (error) {
      console.error("Error deleting step:", error);
      showAlert({ type: "error", message: "Delete failed" });
    } finally {
      setIsDeleteModalOpen(false);
      setCurrentStep(null);
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-900 dark:text-white">
        Loading...
      </div>
    );
  }

  const safeSteps = Array.isArray(steps) ? steps : [];
  
  const filteredSteps = safeSteps.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.step_number.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredSteps.length / itemsPerPage);
  const paginatedSteps = filteredSteps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="flex flex-col sm:flex-row justify-between items-center px-5 py-4 gap-3">
          <button
            onClick={() => openModal("create")}
            className="inline-flex items-center justify-center rounded-lg p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            aria-label="Add new process step"
          >
            <Plus size={20} />
          </button>

          <SearchBar
            value={searchTerm}
            onChange={(value) => {
              setSearchTerm(value);
              setCurrentPage(1);
            }}
            placeholder="Search steps..."
          />
        </div>

        <div className="max-w-full overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
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

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {paginatedSteps.length > 0 ? (
                paginatedSteps.map((step) => (
                  <TableRow key={step.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <TableCell className="px-5 py-4 sm:px-6 text-start whitespace-nowrap">
                      <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {step.step_number}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      <span className="text-gray-700 dark:text-gray-300">{step.title}</span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start whitespace-nowrap">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        {step.description && step.description.length > 25
                          ? `${step.description.slice(0, 25)}...`
                          : step.description || "No description"}
                      </span>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-start whitespace-nowrap">
                      <Badge size="sm" color={step.is_active ? "success" : "error"}>
                        {step.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal("view", step)}
                          className="p-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                          title="View"
                          aria-label={`View ${step.title}`}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openModal("edit", step)}
                          className="p-2 text-amber-500 hover:text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded transition-colors"
                          title="Edit"
                          aria-label={`Edit ${step.title}`}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(step)}
                          className="p-2 text-red-500 hover:text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
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
                  <TableCell  className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                    No process steps found. Click the "+" button to create one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="px-5 py-4 border-t border-gray-100 dark:border-white/[0.05]">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          />
          
          <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
            <div className="relative w-full max-w-lg mx-auto my-8">
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                      {mode === 'view' ? 'View Process Step' : 
                       mode === 'edit' ? 'Edit Process Step' : 'Add New Process Step'}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                      {mode === 'view' ? '' : 
                       mode === 'edit' ? '' : ''}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="ml-4 flex-shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={20} className="text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                <div className="p-4 sm:p-6">
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
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0  "
            onClick={() => setIsDeleteModalOpen(false)}
          />
          
          <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
            <div className="relative w-full max-w-md mx-auto my-8">
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white truncate">
                        Delete Process Step
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="ml-4 flex-shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                      aria-label="Close"
                    >
                      <X size={18} className="text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="my-4 sm:my-6">
                    <p className="text-sm text-gray-700 dark:text-gray-300 text-left">
                      Are you sure you want to delete?
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      variant="outline"
                      color="primary"
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="w-full sm:w-auto min-w-[120px] text-sm sm:text-base"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      color="destructive"
                      onClick={confirmDelete}
                      className="w-full sm:w-auto min-w-[120px] text-sm sm:text-base"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {alert && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-4 z-[100] w-auto sm:w-full max-w-xs sm:max-w-sm">
          <Alert
            variant={alert.type}
            title={alert.type === "success" ? "Success" : "Error"}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}
    </>
  );
};

export default ProcessStepsTableOne;