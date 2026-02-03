import { JSX, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import NotificationDropdown from "../components/header/NotificationDropdown";
import UserDropdown from "../components/header/UserDropdown";
import { SearchIcon, GridIcon, TableIcon, Layers } from "lucide-react";

interface NavItem {
  name: string;
  icon?: JSX.Element;
  subItems?: { name: string; path: string; pro?: boolean }[];
}

interface SearchItem {
  label: string;
  path: string;
}

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const navItems: NavItem[] = [
    {
      icon: <GridIcon />,
      name: "Dashboard",
      subItems: [{ name: "Ecommerce", path: "/" }],
    },
    {
      icon: <TableIcon />,
      name: "Tables",
      subItems: [{ name: "Basic Tables", path: "/basic-tables" }],
    },
    {
      icon: <Layers className="w-5 h-5" />,
      name: "Service Features",
      subItems: [{ name: "Features", path: "/service-features" }],
    },

    {
      icon: <Layers className="w-5 h-5" />,
      name: "About Company",
      subItems: [{ name: "Company Info", path: "/about-company" }],
    },

  ];

  const searchItems: SearchItem[] = navItems.flatMap(
    (item) =>
      item.subItems?.map((sub) => ({ label: sub.name, path: sub.path })) || [],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isApplicationMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setApplicationMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isApplicationMenuOpen]);

  const handleToggleSidebar = () => {
    if (window.innerWidth >= 1024) toggleSidebar();
    else toggleMobileSidebar();
  };

  const toggleApplicationMenu = () => setApplicationMenuOpen((prev) => !prev);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (!value) return setSearchResults([]);
    const filtered = searchItems.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase()),
    );
    setSearchResults(filtered);
  };

  const handleResultClick = (path: string) => {
    window.location.href = path;
    setQuery("");
    setSearchResults([]);
    setApplicationMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-white/10 font-mono">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6 lg:py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleSidebar}
            className="flex items-center justify-center w-10 h-10 lg:h-11 lg:w-11 text-gray-500 rounded-lg border border-gray-200 dark:text-gray-400 dark:border-white/10"
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <span className="text-lg">×</span>
            ) : (
              <span className="text-lg">☰</span>
            )}
          </button>

          <Link to="/" className="lg:hidden">
            <img
              className="w-32 h-auto dark:hidden"
              src="ventexa_new_logo.png"
              alt="Logo"
            />
            <img
              className="w-32 h-auto hidden dark:block"
              src="ventexa_new_logo.png"
              alt="Logo"
            />
          </Link>
        </div>

        <div className="hidden lg:flex flex-1 max-w-107.5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchResults.length > 0)
                handleResultClick(searchResults[0].path);
            }}
            className="w-full relative"
          >
            <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <SearchIcon size={15} className="dark:text-white" />
            </span>
            <input
              ref={inputRef}
              value={query}
              onChange={handleSearchChange}
              type="text"
              placeholder="Search or type command..."
              className="h-11 w-full rounded-lg border border-gray-200 bg-transparent pl-12 pr-14 text-sm text-gray-800 placeholder-gray-400 focus:border-brand-300 focus:outline-none dark:border-white/10 dark:bg-[#111827] dark:text-white/90 dark:placeholder-white/30"
            />
            {searchResults.length > 0 && (
              <ul className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 rounded-md shadow-md z-50 max-h-60 overflow-y-auto font-mono text-black dark:text-white">
                {searchResults.map((item) => (
                  <li
                    key={item.path}
                    onClick={() => handleResultClick(item.path)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
            <button
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded border font-mono
             bg-gray-50 text-black border-gray-200
             dark:bg-[#111827] dark:text-white dark:border-white/10"
            >
              ⌘ K
            </button>
          </form>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 lg:hidden text-gray-700 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <span className="text-xl">⋮</span>
          </button>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggleButton />
            <NotificationDropdown />
            <UserDropdown />
          </div>
        </div>
      </div>

      {isApplicationMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden px-4 py-2 border-t border-gray-200 dark:border-white/10 flex justify-between items-center bg-white dark:bg-[#111827]"
        >
          <ThemeToggleButton />
          <NotificationDropdown />
          <UserDropdown />
        </div>
      )}
    </header>
  );
};

export default AppHeader;
