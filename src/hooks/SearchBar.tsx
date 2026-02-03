import { Search } from "lucide-react";

export function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="relative w-full sm:w-64 md:w-72 lg:w-80">
      <input
        type="text"
        placeholder="Search by ID or Name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg 
                   dark:bg-gray-800 dark:text-white"
      />
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}
