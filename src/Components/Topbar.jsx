import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-20 border-b border-slate-800 px-8 flex items-center justify-between bg-slate-950">
      <div className="relative w-96">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          size={18}
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 outline-none"
        />
      </div>

      <div className="flex items-center gap-5">
        <Bell className="text-slate-300 cursor-pointer" />

        <img
          src="https://i.pravatar.cc/150"
          alt="avatar"
          className="w-11 h-11 rounded-full"
        />
      </div>
    </header>
  );
}