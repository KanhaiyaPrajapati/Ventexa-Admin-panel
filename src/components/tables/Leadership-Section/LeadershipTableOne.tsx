
import { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Modal } from "../../ui/modal";
import Badge from "../../ui/badge/Badge";
import Alert from "../../ui/alert/Alert";
import Button from "../../ui/button/Button";
import {
  Trash2,
  Eye,
  Edit,
  Plus,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import Pagination from "../../ui/Pagination/Pagination";

import {
  fetchAllTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../../../store/api/team-api";

import TeamMemberForm from "./form/LeadershipForm";
import TeamMemberDetails from "./Details/LeadershipDetails";

import { TeamMember } from "../../../store/types/team-types";

const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Search..."
    className="w-full sm:w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm
               focus:outline-none focus:ring-1 focus:ring-blue-500
               dark:bg-gray-800 dark:border-gray-700 dark:text-white"
  />
);

const LeadershipTableOne: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | "view">("create");

  const [formData, setFormData] = useState<TeamMember>({
    full_name: "",
    designation: "",
    bio: "",
    profile_image: "",
    linkedin_url: "",
    is_active: true,
  });

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState("");

  const showAlert = useCallback((alertData: {
    type: "success" | "error";
    message: string;
  }) => {
    setAlert(alertData);
    setTimeout(() => setAlert(null), 3500);
  }, []);

  const loadMembers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAllTeamMembers();
      setMembers(data as TeamMember[]);
    } catch {
      showAlert({ type: "error", message: "Failed to load team members" });
    } finally {
      setLoading(false);
    }
  }, [showAlert]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  const openModal = useCallback((
    type: "create" | "edit" | "view",
    member?: TeamMember
  ) => {
    setMode(type);

    if (member) {
      setCurrentMember(member);

      if (type === "edit") {
        setFormData({
          full_name: member.full_name || "",
          designation: member.designation || "",
          bio: member.bio || "",
          profile_image: member.profile_image || "",
          linkedin_url: member.linkedin_url || "",
          is_active: member.is_active ?? true,
        });
      }
    } else {
      setCurrentMember(null);
      setFormData({
        full_name: "",
        designation: "",
        bio: "",
        profile_image: "",
        linkedin_url: "",
        is_active: true,
      });
    }

    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentMember(null);
  }, []);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const toggleActive = useCallback(() =>
    setFormData((prev) => ({ ...prev, is_active: !prev.is_active })), []);

  const handleSubmit = useCallback(async () => {
    try {
      if (mode === "create") {
        const response = await addTeamMember(formData);
        showAlert({ type: "success", message: "Team member added" });
        
        if (response && typeof response === 'object' && 'id' in response) {
          setMembers(prev => [...prev, response as TeamMember]);
        }
      } else if (mode === "edit" && currentMember?.id) {
        const response = await updateTeamMember(currentMember.id, formData);
        showAlert({ type: "success", message: "Team member updated" });
        
        if (response && typeof response === 'object') {
          setMembers(prev => prev.map(member => 
            member.id === currentMember.id ? { ...member, ...formData } : member
          ));
        }
      }

      closeModal();
    } catch {
      showAlert({ type: "error", message: "Operation failed" });
    }
  }, [mode, formData, currentMember, showAlert, closeModal]);

  const openDeleteModal = useCallback((member: TeamMember) => {
    setCurrentMember(member);
    setIsDeleteModalOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!currentMember?.id) return;

    try {
      await deleteTeamMember(currentMember.id);
      showAlert({ type: "success", message: "Team member deleted" });
      
      setMembers(prev => {
        const newMembers = prev.filter(member => member.id !== currentMember.id);
        
        const remainingFilteredMembers = newMembers.filter(
          m => (m.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
               (m.designation?.toLowerCase() || '').includes(searchTerm.toLowerCase())
        );
        
        const totalPages = Math.max(1, Math.ceil(remainingFilteredMembers.length / itemsPerPage));
        if (currentPage > totalPages && totalPages > 0) {
          setTimeout(() => setCurrentPage(totalPages), 0);
        }
        
        return newMembers;
      });
    } catch {
      showAlert({ type: "error", message: "Delete failed" });
    } finally {
      setIsDeleteModalOpen(false);
      setCurrentMember(null);
    }
  }, [currentMember, showAlert, searchTerm, currentPage, itemsPerPage]);

  const filteredMembers = members.filter(
    (m) =>
      (m.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (m.designation?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0 && filteredMembers.length > 0) {
      setCurrentPage(totalPages);
    } else if (filteredMembers.length === 0) {
      setCurrentPage(1);
    }
  }, [filteredMembers.length, currentPage, totalPages]);

  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  if (loading) return <div className="py-10 text-center dark:text-white">Loading...</div>;

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-5 py-4 gap-3">
          <button
            onClick={() => openModal("create")}
            className="inline-flex items-center justify-center rounded-lg bg-white p-2 text-blue-600 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
            aria-label="Add new team member"
          >
            <Plus size={20} />
          </button>

          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* TABLE — UI SAME */}
        <div className="max-w-full overflow-x-auto">
          <Table className="min-w-175">
            <TableHeader className="border-b border-gray-100 dark:border-white/5">
              <TableRow>
                {[
                  "Name",
                  "Designation",
                  "Bio",
                  "Profile",
                  "LinkedIn",
                  "Status",
                  "Actions",
                ].map((head) => (
                  <TableCell
                    key={head}
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-white whitespace-nowrap"
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {paginatedMembers.length > 0 ? (
                paginatedMembers.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="px-5 py-4 sm:px-6 whitespace-nowrap">
                      <span className="font-medium text-gray-800 text-theme-sm dark:text-white whitespace-nowrap">
                        {m.full_name}
                      </span>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 dark:text-white whitespace-nowrap">
                      {m.designation}
                    </TableCell>

                    <TableCell className="px-4 py-3 whitespace-nowrap dark:text-white">
                      {m.bio && m.bio.length > 20
                        ? `${m.bio.slice(0, 20)}...`
                        : m.bio || "-"}
                    </TableCell>

                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      {m.profile_image ? (
                        <img
                          src={m.profile_image}
                          alt={m.full_name}
                          className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              const span = document.createElement('span');
                              span.textContent = '-';
                              span.className = "dark:text-white";
                              parent.appendChild(span);
                            }
                          }}
                        />
                      ) : (
                        <span className="dark:text-white">-</span>
                      )}
                    </TableCell>

                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      {m.linkedin_url ? (
                        <a
                          href={m.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Linkedin size={16} />
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="dark:text-white">N/A</span>
                      )}
                    </TableCell>

                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <Badge size="sm" color={m.is_active ? "success" : "error"}>
                        {m.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal("view", m)}
                          className="p-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                          aria-label={`View details of ${m.full_name}`}
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() => openModal("edit", m)}
                          className="p-2 text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300"
                          aria-label={`Edit ${m.full_name}`}
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          onClick={() => openDeleteModal(m)}
                          className="p-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                          aria-label={`Delete ${m.full_name}`}
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
                    className="px-4 py-8 text-center dark:text-white"
                  >
                    <p className="text-gray-500 dark:text-white">
                      {searchTerm ? "No team members match your search." : "No team members found."}
                    </p>
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
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {isModalOpen && (
        <Modal isOpen onClose={closeModal} className="max-w-lg p-6">
          {mode === "view" && currentMember ? (
            <TeamMemberDetails member={currentMember} onClose={closeModal} />
          ) : (
            <TeamMemberForm
              mode={mode as "create" | "edit"}
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
            Delete Team Member
          </h3>

          <p className="text-sm text-gray-600 dark:text-white mb-6">
            Are you sure you want to delete{" "}
            <span className="font-medium dark:text-white">
              {currentMember?.full_name}
            </span>
            ?
          </p>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              className="dark:text-white dark:border-gray-600"
            >
              Cancel
            </Button>

            <Button color="destructive" onClick={handleDeleteConfirm}>
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

export default LeadershipTableOne;



