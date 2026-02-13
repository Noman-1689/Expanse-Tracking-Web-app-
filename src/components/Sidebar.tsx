import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ReceiptText,
  Wallet,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    {
      name: "Transactions",
      icon: <ReceiptText size={20} />,
      path: "/transactions",
    },
    {
      name: "Expenses Statistics",
      icon: <Wallet size={20} />,
      path: "/statistics",
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-purple-700 text-white rounded-md shadow-lg active:scale-95 transition-transform"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r flex flex-col p-6 transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center gap-2 text-purple-700 font-bold text-xl mb-10">
          <span className="bg-purple-700 text-white p-1 rounded">
            <Wallet />
          </span>{" "}
          Expance Tracker
        </div>

        <div className="flex flex-col items-center mb-10">
          <img
            src="https://imgs.search.brave.com/jsVbZV6BjaDYzQ7yJeuhY25hGZMy7Wxngx1o7ijrpvg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODcx/NzUyNDYyL3ZlY3Rv/ci9kZWZhdWx0LWdy/YXktcGxhY2Vob2xk/ZXItbWFuLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz00YVV0/OTlNUVlPNGR5by1y/UEltSDJrc3pZZTFF/Y3VST0M2ZjJpTVFt/bjhvPQ"
            className="rounded-full border-2 border-purple-200"
            alt="Profile"
          />
          <h3 className="mt-3 font-semibold text-gray-800">Noman Naeem </h3>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-purple-700 text-white"
                    : "text-gray-500 hover:bg-purple-50"
                }`
              }
            >
              {item.icon} {item.name}
            </NavLink>
          ))}
        </nav>

        <button className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-500 mt-auto">
          <LogOut size={20} /> Sign Out
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
