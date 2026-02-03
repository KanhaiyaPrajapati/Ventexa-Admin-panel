import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Modal } from "../../ui/modal";
import Alert from "../../ui/alert/Alert";
import Button from "../../ui/button/Button";
import { Trash2, Eye, Edit, Plus } from "lucide-react";
import Pagination from "../../ui/Pagination/Pagination";
import { SearchBar } from "../../../hooks/SearchBar.tsx";

import {
  getAllcompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  AboutCompany,
} from "../../../store/api/Aboutompany-api";

import Loader from "../../ui/Loader/Loader";
import AboutCompanyProfileView from "../Aboutcompany-Table/Details/AboutCompanyView.tsx";
import AboutCompanyForm from "../Aboutcompany-Table/form/AboutCompanyForm";

const truncateText = (text?: string, limit: number = 20) => {
  if (!text) return "";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

const AboutCompanyTableViewCreate: React.FC = () => {
  const [companies, setCompanies] = useState<AboutCompany[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [currentCompany, setCurrentCompany] = useState<AboutCompany | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | "view">("create");

  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pendingPage, setPendingPage] = useState<number | null>(null);
  const itemsPerPage = 4;

  const [searchTerm, setSearchTerm] = useState("");

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const timer = new Promise((resolve) => setTimeout(resolve, 1500));
      const apiCall = getAllcompanies();
      const [, data] = await Promise.all([timer, apiCall]);
      setCompanies(
        Array.isArray(data)
          ? data.map((c: AboutCompany) => ({
              ...c,
              id: c.id || c._id, 
            }))
          : []
      );
    } catch {
      showAlert({ type: "error", message: "Failed to load companies" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (pendingPage === null) return;
    const timer = setTimeout(() => {
      setCurrentPage(pendingPage);
    }, 100);
    return () => clearTimeout(timer);
  }, [pendingPage]);

  const showAlert = (alertData: { type: "success" | "error"; message: string }) => {
    setAlert(alertData);
    setTimeout(() => setAlert(null), 3500);
  };

  const openModal = (type: "create" | "edit" | "view", company?: AboutCompany) => {
    setMode(type);
    setCurrentCompany(company || null);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (data: AboutCompany) => {
    try {
      if (mode === "create") {
        await createCompany(data);
        showAlert({ type: "success", message: "Company created successfully" });
      }
      if (mode === "edit" && currentCompany) {
        const id = currentCompany.id || currentCompany._id;
        if (!id) throw new Error("No company ID found");
        await updateCompany(id, data);
        showAlert({ type: "success", message: "Company updated successfully" });
      }
      fetchCompanies();
      closeModal();
    } catch {
      showAlert({ type: "error", message: "Operation failed" });
    }
  };

  const openDeleteModal = (company: AboutCompany) => {
    setCurrentCompany(company);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!currentCompany) return;

    const id = currentCompany.id || currentCompany._id;
    if (!id) {
      showAlert({ type: "error", message: "Invalid company ID" });
      return;
    }

    try {
      await deleteCompany(id);
      showAlert({ type: "success", message: "Company deleted successfully" });

      setCompanies((prev) => prev.filter((c) => c.id !== id));
    } catch {
      showAlert({ type: "error", message: "Delete failed" });
    } finally {
      setIsDeleteModalOpen(false);
      setCurrentCompany(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[90vh] w-full">
        <Loader />
      </div>
    );
  }

  const filteredCompanies = companies.filter((c) =>
    (
      (c.company_overview || "") +
      (c.mission || "") +
      (c.vision || "") +
      (c.core_values || "") +
      (c.headquarters || "")
    )
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="flex flex-col sm:flex-row justify-between items-center px-5 py-4 gap-3">
          <button
            onClick={() => openModal("create")}
            className="inline-flex items-center justify-center rounded-lg p-2 text-blue-600 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <Plus size={20} />
          </button>

          <SearchBar value={searchTerm} onChange={(value) => setSearchTerm(value)} />
        </div>

        <div className="max-w-full overflow-x-auto">
          <Table className="min-w-[900px]">
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {[
                  "Company Overview",
                  "Mission",
                  "Vision",
                  "Core Values",
                  "Founded",
                  "Headquarters",
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
              {paginatedCompanies.length > 0 ? (
                paginatedCompanies.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start whitespace-nowrap">
                      <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {truncateText(c.company_overview, 20)}
                      </span>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {truncateText(c.mission, 20)}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-start text-theme-sm whitespace-nowrap">
                      <span className="text-black dark:text-gray-400">
                        {truncateText(c.vision, 20)}
                      </span>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-start text-theme-sm whitespace-nowrap">
                      <span className="text-black dark:text-gray-400">
                        {truncateText(c.core_values, 20)}
                      </span>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-start text-theme-sm whitespace-nowrap text-black dark:text-gray-400">
                      {c.founded_year}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-start text-theme-sm whitespace-nowrap text-black dark:text-gray-400">
                      {c.headquarters}
                    </TableCell>

                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openModal("view", c)} className="p-2 text-blue-500">
                          <Eye size={16} />
                        </button>

                        <button onClick={() => openModal("edit", c)} className="p-2 text-amber-500">
                          <Edit size={16} />
                        </button>

                        <button onClick={() => openDeleteModal(c)} className="p-2 text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="text-center text-gray-500 py-4">
                    No companies found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setPendingPage(page)} />
        )}
      </div>

      {isModalOpen && (
        <Modal isOpen onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 overflow-y-auto">
          <div className="relative w-full max-w-5xl h-full sm:h-auto bg-white dark:bg-gray-900 shadow-xl overflow-y-auto" style={{ maxHeight: "90vh" }}>
            {mode === "view" && currentCompany && <AboutCompanyProfileView data={currentCompany} />}
            {(mode === "create" || mode === "edit") && (
              <AboutCompanyForm mode={mode} initialData={currentCompany || undefined} onSubmit={handleSubmit} onClose={closeModal} />
            )}
          </div>
        </Modal>
      )}

      {isDeleteModalOpen && currentCompany && (
        <Modal isOpen onClose={() => setIsDeleteModalOpen(false)} className="max-w-md p-6 rounded-md bg-white dark:bg-gray-900">
          <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Delete Company</h3>

          <p className="text-sm mb-6 text-gray-700 dark:text-gray-300">
            Are you sure you want to delete{" "}
            <span className="font-medium text-black dark:text-white">
              {currentCompany.headquarters || "this company"}
            </span>
            ?
          </p>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="primary" color="destructive" onClick={confirmDelete}>Delete</Button>
          </div>
        </Modal>
      )}

      {alert && (
        <div className="fixed bottom-5 right-2 z-50 w-72">
          <Alert variant={alert.type} title={alert.type === "success" ? "Success" : "Error"} message={alert.message} />
        </div>
      )}
    </>
  );
};

export default AboutCompanyTableViewCreate;
