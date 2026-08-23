import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  LayoutDashboard,
  LogOut,
  LogIn,
  Home,
  FolderKanban,
  Users,
} from "lucide-react";

import { useAuth } from "../../Context/AuthContext";
import { useSocket } from "../../Context/SocketContext";

import NotificationDropdown from "./NotificationDropdown";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { notifications } = useSocket();

  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
      <div className="relative max-w-7xl mx-auto min-w-0 h-20 px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="shrink-0 text-2xl sm:text-3xl font-bold text-white"
          onClick={() => setShowMenu(false)}
        >
          Dev<span className="text-violet-500">Hub</span>
        </Link>

        <nav className="hidden lg:flex gap-8 text-amber-50">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/projects">Projects</NavLink>

          <NavLink to="/talent">Talent</NavLink>
        </nav>

        <div className="hidden lg:flex min-w-0 items-center gap-4">
          {user ? (
            <>
              <div className="text-white">
                <p className="font-semibold">{user.name}</p>

                <span className="text-xs text-gray-400">{user.role}</span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications((prev) => !prev)}
                  className="relative p-2 text-white hover:text-violet-400 transition"
                >
                  <Bell size={24} />

                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <NotificationDropdown
                    close={() => setShowNotifications(false)}
                  />
                )}
              </div>

              <Link
                to={user.role === "client" ? "/client" : "/freelancer"}
                className="
flex
items-center
gap-2
bg-violet-600
hover:bg-violet-700
px-5
py-2.5
rounded-xl
text-white
font-semibold
transition
hover:scale-105
hover:shadow-lg
hover:shadow-violet-500/30
"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="
flex
items-center
gap-2
bg-red-600
hover:bg-red-700
px-5
py-2.5
rounded-xl
text-white
font-semibold
transition
hover:scale-105
"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="
flex
items-center
gap-2
text-white
hover:text-violet-400
transition
"
              >
                <LogIn size={18} />
                Login
              </Link>

              <Link
                to="/register"
                className="bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-xl text-white transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={showMenu}
          onClick={() => setShowMenu((previous) => !previous)}
          className="lg:hidden shrink-0 p-2 text-white"
        >
          <Menu size={24} />
        </button>

        {showMenu && (
          <div className="absolute left-4 right-4 top-[calc(100%-0.5rem)] lg:hidden rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
            <nav className="flex flex-col gap-3 border-b border-slate-800 pb-4 text-amber-50">
              <NavLink to="/" onClick={() => setShowMenu(false)}>
                Home
              </NavLink>
              <NavLink to="/projects" onClick={() => setShowMenu(false)}>
                Projects
              </NavLink>
              <NavLink to="/talent" onClick={() => setShowMenu(false)}>
                Talent
              </NavLink>
            </nav>

            {user ? (
              <div className="flex flex-col gap-3 pt-4">
                <p className="text-white font-semibold">{user.name}</p>
                <span className="text-xs text-gray-400">{user.role}</span>
                <Link
                  to={user.role === "client" ? "/client" : "/freelancer"}
                  onClick={() => setShowMenu(false)}
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 font-semibold text-white"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 font-semibold text-white"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-4">
                <Link
                  to="/login"
                  onClick={() => setShowMenu(false)}
                  className="text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setShowMenu(false)}
                  className="rounded-xl bg-violet-600 px-4 py-2.5 text-center text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
