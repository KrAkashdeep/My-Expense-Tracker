function Navbar({ onMenuClick }) {
  return (
    <div className="h-16 bg-white shadow">
      <div className="h-full px-4 flex justify-between md:justify-end items-center">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 text-gray-600 hover:text-gray-800"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="ml-4 flex items-center md:ml-6">
          {/* Profile dropdown */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
