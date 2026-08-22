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
  Users
} from "lucide-react";

import { useAuth } from "../../Context/AuthContext";
import { useSocket } from "../../Context/SocketContext";

import NotificationDropdown from "./NotificationDropdown";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { notifications } = useSocket();

  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] =
    useState(false);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-bold text-white"
        >
          Dev<span className="text-violet-500">Hub</span>
        </Link>

        <nav className="hidden lg:flex gap-8 text-amber-50">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/projects">
            Projects
          </NavLink>

          <NavLink to="/talent">
            Talent
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="text-white">
                <p className="font-semibold">
                  {user.name}
                </p>

                <span className="text-xs text-gray-400">
                  {user.role}
                </span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() =>
                    setShowNotifications((prev) => !prev)
                  }
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
                    close={() =>
                      setShowNotifications(false)
                    }
                  />
                )}
              </div>

            <Link

to={
user.role === "client"
? "/client"
: "/freelancer"
}

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

<LayoutDashboard size={18}/>

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

<LogOut size={18}/>

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

<LogIn size={18}/>

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

        <button className="lg:hidden text-white">
          <Menu />
        </button>
      </div>
    </header>
  );
}