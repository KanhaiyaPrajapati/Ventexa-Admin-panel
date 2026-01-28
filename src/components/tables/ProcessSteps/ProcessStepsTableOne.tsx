import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { Edit, Trash2, Eye, Plus, X, Search, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react"; 
import ProcessStepsForm, { Step } from "./ProcessStepsForm";
import Alert from "../../ui/alert/Alert";
import useSteps from "../../../store/api/steps";

const ProcessStepsTableOne: React.FC = () => {
  const { steps, loading, addStep, updateStep, deleteStep } = useSteps();

  const [editStep, setEditStep] = useState<Step | null>(null);
  const [viewStep, setViewStep] = useState<Step | null>(null);
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [stepToDelete, setStepToDelete] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredSteps = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return steps.filter((step) => 
      step.title.toLowerCase().includes(searchLower) ||
      step.step_number.toString().includes(searchLower) ||
      (step.description && step.description.toLowerCase().includes(searchLower))
    );
  }, [steps, searchTerm]);

  const totalPages = Math.ceil(filteredSteps.length / itemsPerPage);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    return filteredSteps.slice(firstPageIndex, firstPageIndex + itemsPerPage);
  }, [currentPage, filteredSteps]);

  const showAlert = (data: { type: "success" | "error"; message: string }) => {
    setAlert(data);
    setTimeout(() => setAlert(null), 3500);
  };

  const confirmDelete = async () => {
    if (stepToDelete) {
      await deleteStep(stepToDelete);
      setIsConfirmOpen(false);
      setStepToDelete(null);
      showAlert({ type: "success", message: "Step deleted successfully" });
    }
  };

const Modal = ({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4" onClick={onClose}>
    <div 
      onClick={(e) => e.stopPropagation()} 
      className="relative w-[95%] max-w-md bg-[#111827] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-gray-800"
    >
      
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800 flex-shrink-0 bg-[#111827]">
        <h2 className="text-lg font-bold text-white">
          {title}
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white mt-25 transition-colors">
          <X size={20} />
        </button>
      </div>

      
      <div className="flex-1 overflow-y-auto p-5 text-white custom-scrollbar">
        {children}
      </div>
    </div>
  </div>
);

  if (loading) return <div className="flex justify-center items-center py-20 text-white">Loading...</div>;

  return (
    <div className="w-full px-4 sm:px-6 py-6">
      
     
      <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#111827] shadow-sm">
        
       
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4 border-b border-gray-100 dark:border-gray-800">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search steps..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <button 
            onClick={() => setAddFormOpen(true)} 
            className="w-full sm:w-auto flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/20"
          >
            <Plus size={18} className="mr-2" /> 
          </button>
        </div>

        
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[800px]">
            <TableHeader className="bg-gray-50/50 dark:bg-gray-800/30">
              <TableRow>
                <TableCell isHeader className="px-4 py-4 text-center text-xs  font-black text-gray-500 dark:text-gray-400">Step_Number</TableCell>
                <TableCell isHeader className="px-4 py-4 text-center text-xs  font-black text-gray-500 dark:text-gray-400">Title</TableCell>
                <TableCell isHeader className="px-4 py-4 text-center text-xs  font-black text-gray-500 dark:text-gray-400">Description</TableCell>
                <TableCell isHeader className="px-4 py-4 text-center text-xs  font-black text-gray-500 dark:text-gray-400">Status</TableCell>
                <TableCell isHeader className="px-4 py-4 text-center text-xs  font-black text-gray-500 dark:text-gray-400">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTableData.length > 0 ? (
                currentTableData.map((step) => (
                  <TableRow key={step.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 border-b border-gray-100 dark:border-gray-800 last:border-0 transition-colors">
                    <TableCell className="px-4 py-4 text-center text-sm font-medium text-gray-800 dark:text-white">{step.step_number}</TableCell>
                    <TableCell className="px-4 py-4 text-center text-sm font-bold text-gray-800 dark:text-white">{step.title}</TableCell>
                    <TableCell className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400 max-w-[200px]">
                      <p className="truncate" title={step.description}>{step.description || "-"}</p>
                    </TableCell>
                    <TableCell className="px-4 py-4 text-center">
                      <Badge size="sm" className={step.is_active ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"}>
                        {step.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-4 text-center">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => setViewStep(step)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"><Eye size={18} /></button>
                        <button onClick={() => setEditStep(step)} className="p-2 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-lg"><Edit size={18} /></button>
                        <button onClick={() => { setStepToDelete(step.id!); setIsConfirmOpen(true); }} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"><Trash2 size={18} /></button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell  className="px-4 py-12 text-center text-gray-400 italic">No results found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

       
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 p-6 border-t border-gray-100 dark:border-gray-800">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-full text-xs font-bold transition-all ${
                  currentPage === i + 1 
                    ? "bg-white text-blue-600 shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700" 
                    : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

     
      {addFormOpen && (
        <Modal title="Add Step" onClose={() => setAddFormOpen(false)}>
          <ProcessStepsForm initialData={null} onSubmit={async (s) => { await addStep(s); setAddFormOpen(false); showAlert({type:'success', message:'Step Added'}); }} onCancel={() => setAddFormOpen(false)} />
        </Modal>
      )}
      {editStep && (
        <Modal title="Edit Step" onClose={() => setEditStep(null)}>
          <ProcessStepsForm initialData={editStep} onSubmit={async (s) => { await updateStep(s); setEditStep(null); showAlert({type:'success', message:'Step Updated'}); }} onCancel={() => setEditStep(null)} />
        </Modal>
      )}
      {viewStep && (
        <Modal title="Step Details" onClose={() => setViewStep(null)}>
          <ProcessStepsForm initialData={viewStep} onSubmit={() => {}} onCancel={() => setViewStep(null)} readOnly />
        </Modal>
      )}

      {isConfirmOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-[320px] bg-white dark:bg-gray-900 rounded-2xl p-6 text-center shadow-2xl border border-gray-800">
            <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 mb-4">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Delete Step?</h3>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setIsConfirmOpen(false)} className="flex-1 py-2 rounded-lg border border-gray-700 text-gray-300 text-sm font-semibold hover:bg-gray-800">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

      {alert && (
        <div className="fixed bottom-5 right-5 z-[150] w-[90%] sm:max-w-xs">
          <Alert variant={alert.type} title={alert.type === "success" ? "Success" : "Error"} message={alert.message} />
        </div>
      )}
    </div>
  );
};

export default ProcessStepsTableOne;