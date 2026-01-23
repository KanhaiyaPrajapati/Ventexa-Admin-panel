import { X } from "lucide-react";
import Badge from "../../ui/badge/Badge";

interface Props {
  mode: "add" | "edit" | "view";
  initialData?: {
    name: string;
    email: string;
    message: string;
    status: "new" | "contacted";
  };
  onSubmit: (data: {
    name: string;
    email: string;
    message: string;
    status: "new" | "contacted";
  }) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ContactLeadsForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
  loading,
}: Props) {
  /* =====================
     VIEW MODE
  ===================== */

  if (mode === "view" && initialData) {
    return (
      <div className="w-full space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Lead Details
          </h3>
        
<button
  type="button" // ✅ FIX
  onClick={onCancel}
  className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
>
  <X size={18} className="text-gray-500 dark:text-gray-300" />
</button>


          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={18} className="text-gray-500 dark:text-gray-300" />
          </button>
        </div>

        {/* Fields */}
        <ViewField label="Name" value={initialData.name} />
        <ViewField label="Email" value={initialData.email} />
        <ViewField label="Message" value={initialData.message} />

        {/* Status */}
        <div className="space-y-1">
          <label className="block text-sm text-gray-500 dark:text-gray-400">
            Status
          </label>
          <div>
            <Badge
              size="sm"
              color={initialData.status === "new" ? "warning" : "success"}
            >
              {initialData.status}
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  /* =====================
     ADD / EDIT MODE
  ===================== */
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        onSubmit({
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          message: formData.get("message") as string,
          status: formData.get("status") as "new" | "contacted",
        });
      }}
    >
      <Input label="Name" name="name" defaultValue={initialData?.name} />
      <Input label="Email" name="email" defaultValue={initialData?.email} />
      <Textarea
        label="Message"
        name="message"
        defaultValue={initialData?.message}
      />

      <Select
        label="Status"
        name="status"
        defaultValue={initialData?.status || "new"}
      />

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}

/* =====================
   HELPER COMPONENTS
===================== */

function ViewField({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-500 dark:text-gray-400">
        {label}
      </label>
      <div className="w-full rounded border border-gray-300 px-3 py-2 text-sm bg-gray-50 text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
        {value && value.trim() !== "" ? value : "-"}
      </div>
    </div>
  );
}

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-500 dark:text-gray-400">
        {label}
      </label>
      <input
        {...props}
        required
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      />
    </div>
  );
}

function Textarea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-500 dark:text-gray-400">
        {label}
      </label>
      <textarea
        {...props}
        rows={4}
        required
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      />
    </div>
  );
}

function Select({
  label,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <div>
      <label className="block text-sm mb-2 text-gray-500 dark:text-gray-400">
        {label}
      </label>
      <select
        {...props}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      >
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
      </select>
    </div>
  );
}




