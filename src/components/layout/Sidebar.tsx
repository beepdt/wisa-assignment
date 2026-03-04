import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  BarChart3,
  Wrench,
  Lock,
  LogOut,
  ChevronUp,
  ChevronDown,
  HelpCircle,
  Settings,
  Link,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed?: boolean;
}

const navItems = [
  { icon: LayoutGrid, label: "My Application", id: "dashboard", path: "/dashboard" },
  {
    icon: Link,
    label: "Generate Link",
    id: "generate-link",
    path: "/generate-link",
  },
  { icon: Users, label: "My Team", id: "team", path: null },
  { icon: BarChart3, label: "Analytics", id: "analytics", path: null },
  { icon: Wrench, label: "Tools", id: "tools", path: null },
];

const bottomItems = [
  { icon: HelpCircle, label: "Support", id: "support" },
  { icon: Settings, label: "Preferences", id: "preferences" },
];

export default function Sidebar({ collapsed: _collapsed }: SidebarProps) {
  const [expanded, setExpanded] = useState(false);
  const [myAppOpen, setMyAppOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string | null) =>
    path !== null && location.pathname === path;

  return (
    <aside
      className={cn(
        "flex flex-col bg-white border-r border-gray-100 transition-all duration-300 h-screen sticky top-0 relative",
        expanded ? "w-[220px]" : "w-[70px]",
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-[60px] border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-700 font-bold text-sm">W</span>
        </div>
        {expanded && (
          <>
            <span className="font-semibold text-gray-900 text-sm">Wisa</span>
            <div className="ml-auto w-6 h-6 rounded-full bg-gray-200" />
          </>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-3 px-2 space-y-1">
        {/* My Application dropdown (first nav item) */}
        <div>
          <button
            onClick={() => {
              navigate("/");
              if (!myAppOpen) setMyAppOpen(true);
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              setMyAppOpen(!myAppOpen);
            }}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
              isActive("/")
                ? "bg-[#014BA9] text-white"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700",
            )}
          >
            <LayoutGrid className="h-4 w-4 flex-shrink-0" />
            {expanded && (
              <>
                <span>My Application</span>
                <span
                  className="ml-auto"
                  onClick={(e) => {
                    
                    e.stopPropagation();
                    setMyAppOpen(!myAppOpen);
                  }}
                >
                  {myAppOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </span>
              </>
            )}
          </button>
          {expanded && myAppOpen && (
            <div className="ml-8 mt-1 space-y-1">
              <button
              onClick={()=>navigate("/destination")}
              className="block text-sm text-blue-600 hover:text-blue-800 py-1 font-medium">
                Self Applied
              </button>
              <button className="block text-sm text-gray-500 hover:text-gray-700 py-1">
                Customer
              </button>
            </div>
          )}
        </div>

        {/* Generate Link */}
        <button
          onClick={() => navigate("/generate-link")}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
            isActive("/generate-link")
              ? "bg-[#014BA9] text-white"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-700",
          )}
        >
          <Link className="h-4 w-4 flex-shrink-0" />
          {expanded && <span>Generate Link</span>}
        </button>

        {/* Other nav items */}
        {navItems.slice(2).map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-colors",
              "text-gray-500 hover:bg-gray-50 hover:text-gray-700",
            )}
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {expanded && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-gray-100 py-3 px-2 space-y-1">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {expanded && <span>{item.label}</span>}
          </button>
        ))}

        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors">
          <Lock className="h-4 w-4 flex-shrink-0" />
          {expanded && <span>Change Password</span>}
        </button>

        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors">
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {expanded && <span>Log out</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="absolute top-1/2 -right-3 w-6 h-6 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 z-10"
      >
        {expanded ? (
          <ChevronDown className="h-3 w-3 -rotate-90" />
        ) : (
          <ChevronDown className="h-3 w-3 rotate-90" />
        )}
      </button>
    </aside>
  );
}
