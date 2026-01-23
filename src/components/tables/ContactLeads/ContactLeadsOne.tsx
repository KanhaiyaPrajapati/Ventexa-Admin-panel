// import { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../../ui/table";
// import Badge from "../../ui/badge/Badge";
// import { Plus, Edit, Trash2, Eye } from "lucide-react";
// import ContactLeadsForm from "./ContactLeadsForm";

// import {
//   ContactLead,
//   getContactLeads,
//   createContactLead,
//   updateContactLead,
//   deleteContactLead,
// } from "../../../store/api/contactLeads-api"; // <-- fixed import

// type FormMode = "add" | "edit" | "view";

// export default function ContactLeadsOne() {
//   const [tableData, setTableData] = useState<ContactLead[]>([]);
//   const [showFormModal, setShowFormModal] = useState(false);
//   const [formMode, setFormMode] = useState<FormMode>("add");
//   const [selectedLead, setSelectedLead] = useState<ContactLead | null>(null);
//   const [loading, setLoading] = useState(false);

//   const fetchLeads = async () => {
//     try {
//       const data = await getContactLeads();
//       setTableData(data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch leads");
//     }
//   };

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   const openFormModal = (mode: FormMode, lead?: ContactLead) => {
//     setFormMode(mode);
//     setSelectedLead(lead || null);
//     setShowFormModal(true);
//   };

//   const handleDelete = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this lead?")) return;
//     try {
//       await deleteContactLead(id);
//       setTableData((prev) => prev.filter((l) => l.id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete lead");
//     }
//   };

//   const handleAddEdit = async (data: {
//     name: string;
//     email: string;
//     message: string;
//     status: "new" | "contacted";
//   }) => {
//     setLoading(true);
//     try {
//       if (formMode === "add") {
//         const newLead = await createContactLead(data);
//         setTableData((prev) => [...prev, newLead]);
//       } else if (formMode === "edit" && selectedLead?.id) {
//         const updatedLead = await updateContactLead(selectedLead.id, data);
//         setTableData((prev) =>
//           prev.map((l) => (l.id === selectedLead.id ? updatedLead : l)),
//         );
//       }
//       setShowFormModal(false);
//       setSelectedLead(null);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save lead");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="">
//       {/* Table */}
//       <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.10] dark:bg-white/[0.03]">
//         <div className="flex justify-end items-center">

//           {/* <button
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
//             onClick={() => openFormModal("add")}
//           >
//             <Plus size={16} />
//           </button> */}

//           <button
//   type="button" // ✅ FIX
//   className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
//   onClick={() => openFormModal("add")}
// >
//   <Plus size={16} />
// </button>
 
//         </div>
//         <div className="max-w-full overflow-x-auto">
//           <Table>
//             <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
//               <TableRow>
//                 {[
//                   "Name",
//                   "Email",
//                   "Message",
//                   "Status",
//                   "Created At",
//                   "Actions",
//                 ].map((header) => (
//                   <TableCell
//                     key={header}
//                     isHeader
//                     className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//                   >
//                     {header}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHeader>
//             <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
//               {tableData.map((lead) => (
//                 <TableRow key={lead.id}>
//                   <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90">
//                     {lead.name}
//                   </TableCell>
//                   <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
//                     {lead.email}
//                   </TableCell>
//                   <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400 max-w-xs truncate">
//                     {lead.message}
//                   </TableCell>
//                   <TableCell className="px-5 py-4">
//                     <Badge
//                       size="sm"
//                       color={lead.status === "new" ? "warning" : "success"}
//                     >
//                       {lead.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
//                     {new Date(lead.created_at || "").toLocaleString()}
//                   </TableCell>
//                   <TableCell className="px-5 py-4 flex gap-2">
//                     {/* button */}

//                     <div className="flex items-center gap-2">
                   
// <button
//   type="button" // ✅ FIX
//   onClick={() => openFormModal("view", lead)}
//   title="View"
//   className="group flex items-center justify-center rounded-lg border border-blue-500/30 bg-blue-50 p-2 text-blue-600 transition-all hover:bg-blue-500 hover:text-white hover:shadow-md"
// >
//   <Eye size={14} className="transition-transform group-hover:scale-110" />
// </button>

// <button
//   type="button" // ✅ FIX
//   onClick={() => openFormModal("edit", lead)}
//   title="Edit"
//   className="group flex items-center justify-center rounded-lg border border-yellow-500/30 bg-yellow-50 p-2 text-yellow-600 transition-all hover:bg-yellow-500 hover:text-white hover:shadow-md"
// >
//   <Edit size={14} className="transition-transform group-hover:scale-110" />
// </button>

// <button
//   type="button" // ✅ FIX
//   onClick={() => handleDelete(lead.id!)}
//   title="Delete"
//   className="group flex items-center justify-center rounded-lg border border-red-500/30 bg-red-50 p-2 text-red-600 transition-all hover:bg-red-600 hover:text-white hover:shadow-md"
// >
//   <Trash2 size={14} className="transition-transform group-hover:scale-110" />
// </button>


//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>

//       {/* Form Modal */}
//       {showFormModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-70 mt-25">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-sm">
//             <h2 className="text-xl font-semibold mb-4">
//               {formMode === "add"
//                 ? "Add Lead"
//                 : formMode === "edit"
//                   ? "Edit Lead"
//                   : "View Lead"}
//             </h2>
//             <ContactLeadsForm
//               mode={formMode}
//               initialData={selectedLead || undefined}
//               onSubmit={handleAddEdit}
//               onCancel={() => {
//                 setShowFormModal(false);
//                 setSelectedLead(null);
//               }}
//               loading={loading}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import ContactLeadsForm from "./ContactLeadsForm";

import {
  ContactLead,
  getContactLeads,
  createContactLead,
  updateContactLead,
  deleteContactLead,
} from "../../../store/api/contactLeads-api";

type FormMode = "add" | "edit" | "view";

export default function ContactLeadsOne() {
  const [tableData, setTableData] = useState<ContactLead[]>([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("add");
  const [selectedLead, setSelectedLead] = useState<ContactLead | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchLeads = async () => {
    try {
      const data = await getContactLeads();
      setTableData(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch leads");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const openFormModal = (mode: FormMode, lead?: ContactLead) => {
    setFormMode(mode);
    setSelectedLead(lead || null);
    setShowFormModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      await deleteContactLead(id);
      setTableData((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete lead");
    }
  };

  const handleAddEdit = async (data: {
    name: string;
    email: string;
    message: string;
    status: "new" | "contacted";
  }) => {
    setLoading(true);
    try {
      if (formMode === "add") {
        const newLead = await createContactLead(data);
        setTableData((prev) => [...prev, newLead]);
      } else if (formMode === "edit" && selectedLead?.id) {
        const updatedLead = await updateContactLead(selectedLead.id, data);
        setTableData((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? updatedLead : l))
        );
      }
      setShowFormModal(false);
      setSelectedLead(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">

      {/* Add Lead button */}
      <div className="flex justify-end items-center mb-4">
        <button
          type="button" // ✅ Prevent refresh
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
          onClick={() => openFormModal("add")}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.10] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {["Name", "Email", "Message", "Status", "Created At", "Actions"].map((header) => (
                  <TableCell key={header} isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90">{lead.name}</TableCell>
                  <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">{lead.email}</TableCell>
                  <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400 max-w-xs truncate">{lead.message}</TableCell>
                  <TableCell className="px-5 py-4">
                    <Badge size="sm" color={lead.status === "new" ? "warning" : "success"}>{lead.status}</Badge>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">{new Date(lead.created_at || "").toLocaleString()}</TableCell>
                  <TableCell className="px-5 py-4 flex gap-2">

                    <button
                      type="button" // ✅ Prevent refresh
                      onClick={() => openFormModal("view", lead)}
                      title="View"
                      className="group flex items-center justify-center rounded-lg border border-blue-500/30 bg-blue-50 p-2 text-blue-600 transition-all hover:bg-blue-500 hover:text-white hover:shadow-md"
                    >
                      <Eye size={14} className="transition-transform group-hover:scale-110" />
                    </button>

                    <button
                      type="button" // ✅ Prevent refresh
                      onClick={() => openFormModal("edit", lead)}
                      title="Edit"
                      className="group flex items-center justify-center rounded-lg border border-yellow-500/30 bg-yellow-50 p-2 text-yellow-600 transition-all hover:bg-yellow-500 hover:text-white hover:shadow-md"
                    >
                      <Edit size={14} className="transition-transform group-hover:scale-110" />
                    </button>

                    <button
                      type="button" // ✅ Prevent refresh
                      onClick={() => handleDelete(lead.id!)}
                      title="Delete"
                      className="group flex items-center justify-center rounded-lg border border-red-500/30 bg-red-50 p-2 text-red-600 transition-all hover:bg-red-600 hover:text-white hover:shadow-md"
                    >
                      <Trash2 size={14} className="transition-transform group-hover:scale-110" />
                    </button>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-70 mt-23">
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-sm"
            onClick={(e) => e.stopPropagation()} // ✅ Prevent click bubbling
          >
            <h2 className="text-xl font-semibold mb-4">
              {formMode === "add" ? "Add Lead" : formMode === "edit" ? "Edit Lead" : "View Lead"}
            </h2>
            <ContactLeadsForm
              mode={formMode}
              initialData={selectedLead || undefined}
              onSubmit={handleAddEdit}
              onCancel={() => {
                setShowFormModal(false);
                setSelectedLead(null);
              }}
              loading={loading}
            />
          </div>
        </div>
      )}

    </div>
  );
}
  
