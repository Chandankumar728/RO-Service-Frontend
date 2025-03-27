import React, { useRef } from 'react';
import { useStore } from "@/store";

interface TopNavigationProps {
  isMobile: boolean;
  activeMenuItem: string;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  handleMenuItemClick: (itemName: string, subItem?: string | null) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  isMobile,
  activeMenuItem,
  isDropdownOpen,
  toggleDropdown,
  handleMenuItemClick,
  dropdownRef
}) => {
  const { user } = useStore();

  const breadcrumbItems = [
    { name: "Home", href: "#" },
    { name: activeMenuItem, href: "#" },
  ];

  return (
    <nav
      className="flex mb-6 bg-white py-3 px-4 shadow-sm"
      aria-label="Breadcrumb"
    >
      <ol className="flex justify-between items-center space-x-1 w-full">
        <li className="inline-flex items-center">
          {breadcrumbItems.map((item, index) => (
            <div key={item.name} className="inline-flex items-center">
              {index > 0 && (
                <svg
                  className="w-5 h-5 text-gray-400 mx-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}

              <a
                href={item.href}
                className={`
                  text-sm font-medium 
                  ${
                    index === breadcrumbItems.length - 1
                      ? "text-gray-500"
                      : "text-gray-700 hover:text-blue-600"
                  }
                `}
              >
                {item.name}
              </a>
            </div>
          ))}
        </li>
        <li className="ml-auto">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="p-2 rounded-full hover:bg-gray-100 flex items-center text-gray-700"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-1">
                {user?.fullName.charAt(0)}
              </div>

              {!isMobile && (
                <>
                  <span className="mx-1">{user?.fullName}</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-4 h-4 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </>
              )}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1">
                <div
                  onClick={() => handleMenuItemClick("Profile")}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  Profile
                </div>

                <div
                  onClick={() => handleMenuItemClick("Profile", null)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  Settings
                </div>

                <div className="border-t border-gray-100 my-1"></div>

                <div
                  onClick={() => handleMenuItemClick("Logout")}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                    />
                  </svg>
                  Logout
                </div>
              </div>
            )}
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default TopNavigation;