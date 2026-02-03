

import { useState, useEffect } from "react";
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
  getAllContactLeads,
  createContactLead,
  updateContactLead,
  deleteContactLead,
} from "../../../../store/api/contact-leads-api";
import ContactLeadForm from "../form/ContactLeadForm";
import ContactLeadDetails from "../Details/ContactLeadDetails";
import { ContactLead } from "../../../../store/api/contact-leads-api";

const ContactLeadsTableOne: React.FC = () => {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState<ContactLead | null>(null);
  const [mode, setMode] = useState<"create" | "view" | "edit">("create");
  const [formData, setFormData] = useState<ContactLead>({
    name: "",
    email: "",
    message: "",
    status: "new",
    created_at: new Date().toISOString(),
  });
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLeads = async () => {
    try {
      const data = await getAllContactLeads();
      // Sort by created_at descending (newest first)
      const sortedData = data.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setLeads(sortedData);
    } catch {
      showAlert({ type: "error", message: "Failed to load contact leads" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const showAlert = (alertData: { type: "success" | "error"; message: string }) => {
    setAlert(alertData);
    setTimeout(() => setAlert(null), 3500);
  };

  const openModal = (type: "create" | "view" | "edit", lead?: ContactLead) => {
    setMode(type);
    if (lead) {
      setCurrentLead(lead);
      setFormData({ ...lead });
    } else {
      setCurrentLead(null);
      setFormData({
        name: "",
        email: "",
        message: "",
        status: "new",
        created_at: new Date().toISOString(),
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (mode === "create") {
        await createContactLead(formData);
        showAlert({ type: "success", message: "Contact lead created successfully" });
      } else if (mode === "edit" && currentLead?.id) {
        await updateContactLead(currentLead.id, formData);
        showAlert({ type: "success", message: "Contact lead updated successfully" });
      }
      
      fetchLeads();
      closeModal();
    } catch (error) {
      console.error("Operation failed:", error);
      showAlert({ 
        type: "error", 
        message: mode === "create" ? "Failed to create lead" : "Failed to update lead" 
      });
    }
  };

  const openDeleteModal = (lead: ContactLead) => {
    setCurrentLead(lead);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!currentLead?.id) return;
    try {
      await deleteContactLead(currentLead.id);
      showAlert({ type: "success", message: "Lead deleted successfully" });
      fetchLeads();
    } catch {
      showAlert({ type: "error", message: "Delete failed" });
    } finally {
      setIsDeleteModalOpen(false);
      setCurrentLead(null);
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-900 dark:text-white">
        Loading...
      </div>
    );
  }

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        {/* Header with Create button */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-5 py-4 gap-3">
          {/* Create Button - Same as ServiceFeatures */}
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
                {["Name", "Email", "Message", "Status", "Created", "Actions"].map(
                  (head) => (
                    <TableCell
                      key={head}
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                    >
                      {head}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {paginatedLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start whitespace-nowrap">
                    <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {lead.name}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                    {lead.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start whitespace-nowrap">
                    <span className="text-black dark:text-gray-400">
                      {lead.message.length > 30
                        ? `${lead.message.slice(0, 30)}...`
                        : lead.message}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start whitespace-nowrap">
                    <Badge
                      size="sm"
                      color={lead.status === "contacted" ? "success" : "warning"}
                    >
                      {lead.status === "contacted" ? "Contacted" : "New"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal("view", lead)}
                        className="p-2 text-blue-500 hover:text-blue-600 dark:text-blue-400"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => openModal("edit", lead)}
                        className="p-2 text-amber-500 hover:text-amber-600 dark:text-amber-400"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(lead)}
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
          {mode === "view" && currentLead && (
            <ContactLeadDetails lead={currentLead} onClose={closeModal} />
          )}
          {(mode === "create" || mode === "edit") && (
            <ContactLeadForm
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
            Delete Contact Lead
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-medium">{currentLead?.name}</span>? This action
            cannot be undone.
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

export default ContactLeadsTableOne;