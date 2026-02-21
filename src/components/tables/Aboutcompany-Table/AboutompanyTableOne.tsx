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
} from "../../../store/api/Aboutcompany-api.ts";

import Loader from "../../ui/Loader/Loader";
import AboutCompanyProfileView from "../Aboutcompany-Table/Details/AboutCompanyView.tsx";
import AboutCompanyForm from "../Aboutcompany-Table/form/AboutCompanyForm";

const truncateText = (text?: string, limit: number = 20) => {
  if (!text) return "";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

const AboutCompanyTable: React.FC = () => {
  const [companies, setCompanies] = useState<AboutCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState<AboutCompany | null>(
    null,
  );
  const [mode, setMode] = useState<"create" | "edit" | "view">("create");
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await getAllcompanies();
      setCompanies(Array.isArray(data) ? data : []);
    } catch {
      showAlert({ type: "error", message: "Failed to load companies" });
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const showAlert = (alertData: {
    type: "success" | "error";
    message: string;
  }) => {
    setAlert(alertData);
    setTimeout(() => setAlert(null), 3500);
  };

  const openModal = (
    type: "create" | "edit" | "view",
    company?: AboutCompany,
  ) => {
    setMode(type);
    setCurrentCompany(company || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setCurrentCompany(null);
      setMode("create");
    }, 200);
  };

  const handleSubmit = async (data: AboutCompany) => {
    const targetId = currentCompany?.id || currentCompany?._id;

    try {
      if (mode === "create") {
        const newCompany = await createCompany(data);
        setCompanies((prev) => [newCompany, ...prev]);
        showAlert({ type: "success", message: "Company created successfully" });
      } else if (mode === "edit" && targetId) {
        const updatedCompany = await updateCompany(targetId, data);
        setCompanies((prev) =>
          prev.map((c) =>
            c.id === targetId || c._id === targetId ? updatedCompany : c,
          ),
        );
        showAlert({ type: "success", message: "Company updated successfully" });
      }
      closeModal();
    } catch (error) {
      showAlert({ type: "error", message: "Operation failed" });
    }
  };

  const openDeleteModal = (company: AboutCompany) => {
    setCurrentCompany(company);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const targetId = currentCompany?.id || currentCompany?._id;
    if (!targetId) return;

    try {
      await deleteCompany(targetId);
      setCompanies((prev) =>
        prev.filter((c) => c.id !== targetId && c._id !== targetId),
      );
      showAlert({ type: "success", message: "Company deleted successfully" });
    } catch {
      showAlert({ type: "error", message: "Delete failed" });
    } finally {
      setIsDeleteModalOpen(false);
      setCurrentCompany(null);
    }
  };

  const filteredCompanies = companies.filter((c) =>
    (
      (c.company_overview || "") +
      (c.mission || "") +
      (c.vision || "") +
      (c.core_values || "") +
      (c.headquarters || "")
    )
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCompanies.length / itemsPerPage),
  );
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-900 dark:text-white">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-5 py-4 gap-3">
          <button
            onClick={() => openModal("create")}
            className="inline-flex items-center justify-center p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 w-full sm:w-auto transition-colors"
          >
            <Plus size={20} className="mr-2 sm:mr-0" />
          </button>
          <div className="w-full sm:w-auto">
            <SearchBar
              value={searchTerm}
              onChange={(value) => {
                setSearchTerm(value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px]"> 
            <Table className="w-full table-fixed">
              <TableHeader className="border-b border-gray-100 dark:border-gray-800">
                <TableRow>
                  <TableCell isHeader className="w-[18%] px-3 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">Overview</TableCell>
                  <TableCell isHeader className="w-[15%] px-3 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">Mission</TableCell>
                  <TableCell isHeader className="w-[15%] px-3 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">Vision</TableCell>
                  <TableCell isHeader className="w-[15%] px-3 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">Values</TableCell>
                  <TableCell isHeader className="w-[10%] px-3 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">Founded</TableCell>
                  <TableCell isHeader className="w-[12%] px-3 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">HQ</TableCell>
                  <TableCell isHeader className="w-[15%] px-3 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">Actions</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {paginatedCompanies.length > 0 ? (
                  paginatedCompanies.map((c) => (
                    <TableRow
                      key={c.id || c._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <TableCell className="px-3 py-4 text-start">
                        <span className="line-clamp-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                          {truncateText(c.company_overview, 15)}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 py-3 text-start text-sm">
                        <span className="line-clamp-2 text-gray-700 dark:text-gray-300">
                          {truncateText(c.mission, 15)}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 py-3 text-start">
                        <span className="line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
                          {truncateText(c.vision, 15)}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 py-3 text-start">
                        <span className="line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
                          {truncateText(c.core_values, 15)}
                        </span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-3 py-3 text-start text-sm text-gray-700 dark:text-gray-300">
                        {c.founded_year || "N/A"}
                      </TableCell>
                      <TableCell className="px-2 py-3 text-start">
                        <span className="line-clamp-1 text-sm text-gray-700 dark:text-gray-300">
                          {truncateText(c.headquarters, 10)}
                        </span>
                      </TableCell>
                      <TableCell className="px-2 py-3">
                        <div className="flex items-center justify-start gap-1">
                          <button
                            onClick={() => openModal("view", c)}
                            className="rounded-full p-1.5 text-blue-500 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => openModal("edit", c)}
                            className="rounded-full p-1.5 text-amber-500 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-500/10"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(c)}
                            className="rounded-full p-1.5 text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
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
                      No companies found {searchTerm ? `for "${searchTerm}"` : ""}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="border-t border-gray-100 px-3 py-3 dark:border-gray-800">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>

      {isModalOpen && mode === "view" && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          className="max-w-lg w-[90vw] mx-auto"
          showCloseButton={false}
        >
          <div className="overflow-hidden rounded-3xl bg-white dark:bg-[#1F2937]">
            {currentCompany && (
              <AboutCompanyProfileView
                data={currentCompany}
                onClose={closeModal}
              />
            )}
          </div>
        </Modal>
      )}
      {isModalOpen && (mode === "create" || mode === "edit") && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          className="w-[90vw] md:w-[50vw] max-w-2xl max-h-[75vh] overflow-hidden"
          showCloseButton={true}
        >
          <div className="h-full flex flex-col rounded-xl bg-white dark:bg-[#1F2937]">
            <AboutCompanyForm
              mode={mode}
              initialData={
                mode === "edit" ? currentCompany || undefined : undefined
              }
              onSubmit={handleSubmit}
              onClose={closeModal}
            />
          </div>
        </Modal>
      )}

      {isDeleteModalOpen && currentCompany && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          className="max-w-md w-[95vw] mx-auto"
          showCloseButton={true}
        >
          <div className="rounded-3xl bg-white p-6 dark:bg-[#1F2937]">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-[#4FE7C0]">
              Delete Company
            </h3>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {currentCompany.headquarters || "this company"}
              </span>
              ?
            </p>
            <div className="flex flex-col gap-3 sm:flex-row justify-end">
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full sm:w-auto dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:bg-transparent"
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
        <div className="fixed bottom-5 right-2 z-50 w-[calc(100vw-1rem)] max-w-sm sm:w-72">
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

export default AboutCompanyTable;