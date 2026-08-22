import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  MessageSquare,
  CreditCard,
  Settings,
} from "lucide-react";

const links = [
  {
    name: "Overview",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Projects",
    icon: FolderOpen,
    path: "/dashboard/projects",
  },
  {
    name: "Talent",
    icon: Users,
    path: "/dashboard/talent",
  },
  {
    name: "Messages",
    icon: MessageSquare,
    path: "/dashboard/messages",
  },
  {
    name: "Payments",
    icon: CreditCard,
    path: "/dashboard/payments",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 p-6">
      <h1 className="text-3xl font-bold mb-10">
        Dev<span className="text-violet-500">Hub</span>
      </h1>

      <nav className="space-y-2">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}