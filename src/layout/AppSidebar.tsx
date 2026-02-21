import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

import { ChevronDownIcon, GridIcon, HorizontaLDots } from "../icons";
import { useSidebar } from "../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";
import { HelpCircle, Info, Layers, MessageSquare, UserPlus } from "lucide-react";

/* ---------------- TYPES ---------------- */

type NavItem = {
  name: string;
  icon: ReactNode;
  path?: string;
  subItems?: {
    name: string;
    path: string;
    pro?: boolean;
    new?: boolean;
  }[];
};

/* ---------------- NAV DATA ---------------- */

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    name: "Basic Tables",
    path: "/basic-tables",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    name: "Service Features",
    path: "/service-features",
  },
  {
    icon: <UserPlus className="w-5 h-5" />,
    name: "Contact Leads",
    path: "/contact-leads",
  },
    {
    icon: <HelpCircle className="w-5 h-5" />,
    name: "FAQs",
    path: "/faqs",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    name: "Process Steps",
    path: "/process-steps",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    name: "Team Members",
    path: "/team-section",
  },
  {
    icon: <Info className="w-5 h-5" />,
    name: "About Company",
    path: "/about-company",
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    name: "Testimonials",
    path: "/testimonials",
  },
];

const othersItems: NavItem[] = [
  {
    icon: <Layers className="w-5 h-5" />,
    name: "Authentication",
    subItems: [
      {
        name: "Basic Tables",
        path: "/basic-tables",
      },
    ],
  },
];

/* ---------------- COMPONENT ---------------- */

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  /* -------- Auto open submenu on route change -------- */

  useEffect(() => {
    let matched = false;

    (["main", "others"] as const).forEach((type) => {
      const items = type === "main" ? navItems : othersItems;

      items.forEach((nav, index) => {
        nav.subItems?.forEach((sub) => {
          if (isActive(sub.path)) {
            setOpenSubmenu({ type, index });
            matched = true;
          }
        });
      });
    });

    if (!matched) setOpenSubmenu(null);
  }, [location.pathname, isActive]);

  /* -------- Calculate submenu height -------- */

  useEffect(() => {
    if (!openSubmenu) return;

    const key = `${openSubmenu.type}-${openSubmenu.index}`;
    const el = subMenuRefs.current[key];

    if (el) {
      setSubMenuHeight((prev) => ({
        ...prev,
        [key]: el.scrollHeight,
      }));
    }
  }, [openSubmenu]);

  /* -------- Handlers -------- */

  const handleSubmenuToggle = (index: number, type: "main" | "others") => {
    setOpenSubmenu((prev) =>
      prev?.type === type && prev.index === index ? null : { type, index }
    );
  };

  /* -------- Render Menu -------- */

  const renderMenuItems = (items: NavItem[], type: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => {
        const key = `${type}-${index}`;
        const isOpen =
          openSubmenu?.type === type && openSubmenu?.index === index;

        // Check if any subitem is active
        const hasActiveSubItem = nav.subItems?.some(sub => isActive(sub.path)) || false;

        return (
          <li key={nav.name}>
            {nav.subItems ? (
              <button
                onClick={() => handleSubmenuToggle(index, type)}
                className={`menu-item ${
                  isOpen || hasActiveSubItem ? "menu-item-active" : "menu-item-inactive"
                }`}
                style={
                  isOpen || hasActiveSubItem
                    ? {
                        color: "#4FE7C0",
                        backgroundColor: "rgba(79, 231, 192, 0.1)",
                      }
                    : {}
                }
              >
                <span 
                  className="menu-item-icon-size"
                  style={isOpen || hasActiveSubItem ? { color: "#4FE7C0" } : {}}
                >
                  {nav.icon}
                </span>

                {(isExpanded || isHovered || isMobileOpen) && (
                  <>
                    <span className="menu-item-text">{nav.name}</span>
                    <ChevronDownIcon
                      className={`ml-auto w-5 h-5 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      style={isOpen ? { color: "#4FE7C0" } : {}}
                    />
                  </>
                )}
              </button>
            ) : (
              nav.path && (
                <Link
                  to={nav.path}
                  className={`menu-item ${
                    isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                  }`}
                  style={
                    isActive(nav.path)
                      ? {
                          color: "#4FE7C0",
                          backgroundColor: "rgba(79, 231, 192, 0.1)",
                        }
                      : {}
                  }
                >
                  <span 
                    className="menu-item-icon-size"
                    style={isActive(nav.path) ? { color: "#4FE7C0" } : {}}
                  >
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="menu-item-text">{nav.name}</span>
                  )}
                </Link>
              )
            )}

            {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
              <div
                ref={(el) => {
                  subMenuRefs.current[key] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{ height: isOpen ? subMenuHeight[key] : 0 }}
              >
                <ul className="mt-2 ml-9 space-y-1">
                  {nav.subItems.map((sub) => (
                    <li key={sub.name}>
                      <Link
                        to={sub.path}
                        className={`menu-dropdown-item ${
                          isActive(sub.path)
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                        style={
                          isActive(sub.path)
                            ? {
                                color: "#4FE7C0",
                                backgroundColor: "rgba(79, 231, 192, 0.05)",
                              }
                            : {}
                        }
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  /* ---------------- JSX ---------------- */

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen px-5 bg-white dark:bg-gray-900 transition-all duration-300 overflow-y-auto
        ${isExpanded || isHovered || isMobileOpen ? "w-72.5" : "w-22.5"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        scrollbarWidth: 'none', /* Firefox */
        msOverflowStyle: 'none', /* IE and Edge */
      }}
    >
      {/* Hide scrollbar for Chrome, Safari and Opera using inline style tag */}
      <style>{`
        .fixed.overflow-y-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .fixed.overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Logo - sticky at top */}
      <div 
        className="py-8 flex justify-center lg:justify-start sticky top-0 bg-white dark:bg-gray-900 z-10"
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'inherit',
          zIndex: 10
        }}
      >
        <Link to="/">
          <img
            src="/ventexa_new_logo.png"
            alt="Logo"
            width={isExpanded || isHovered ? 150 : 32}
          />
        </Link>
      </div>

      {/* Menu */}
      <div className="flex flex-col pb-6">
        <nav className="mb-6">
          <h2 className="mb-4 text-xs uppercase text-gray-400">
            {isExpanded || isHovered ? "Menu" : <HorizontaLDots />}
          </h2>
          {renderMenuItems(navItems, "main")}
        </nav>

        <nav className="mb-6">
          <h2 className="mb-4 text-xs uppercase text-gray-400">
            {isExpanded || isHovered ? "Others" : <HorizontaLDots />}
          </h2>
          {renderMenuItems(othersItems, "others")}
        </nav>

        {(isExpanded || isHovered || isMobileOpen) && <SidebarWidget />}
      </div>
    </aside>
  );
};

export default AppSidebar;