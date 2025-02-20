import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  CurrencyDollarIcon,
  ChartPieIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: HomeIcon },
    { name: "Transactions", href: "/transactions", icon: CurrencyDollarIcon },
    { name: "Budgets", href: "/budgets", icon: WalletIcon },
    { name: "Reports", href: "/reports", icon: ChartPieIcon },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
          <h1 className="text-xl font-bold text-white">Expense Tracker</h1>
          <button
            onClick={onClose}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon
                    className={`${
                      isActive
                        ? "text-gray-300"
                        : "text-gray-400 group-hover:text-gray-300"
                    } mr-3 flex-shrink-0 h-6 w-6`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
