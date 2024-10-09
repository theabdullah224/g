import React, { useState } from 'react';
import { Users, CreditCard, Utensils, FileText, BarChart2, Bell, Menu, X } from 'lucide-react';
import UserManagement from './UserManagement';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div
    className={`flex items-center p-3 cursor-pointer transition-colors duration-200 ${
      active ? 'bg-P-Green1 text-white' : 'text-gray-600 hover:bg-blue-50'
    }`}
    onClick={onClick}
  >
    <Icon className="mr-3" size={20} />
    <span className="font-medium">{label}</span>
  </div>
);

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('User Management');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarItems = [
    { icon: Users, label: 'User Management' },
    // { icon: CreditCard, label: 'Subscription Management' },
    // { icon: Utensils, label: 'Meal Plan Management' },
    { icon: FileText, label: 'PDF Management' },
    // { icon: BarChart2, label: 'Analytics and Reports' },
    // { icon: Bell, label: 'Notifications & Messaging' },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <div
        className={` 'w-64 hidden md:block transition-all duration-300`}
      >
        <div className="flex flex-col h-full bg-white shadow-lg">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center px-4">
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            </div>
            <nav className="mt-5 flex-1" aria-label="Sidebar">
              {sidebarItems.map((item) => (
                <SidebarItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  active={activeSection === item.label}
                  onClick={() => setActiveSection(item.label)}
                />
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className={`fixed inset-0 flex z-40 ${isMobileMenuOpen ? '' : 'pointer-events-none'}`}>
          <div
            className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={toggleMobileMenu}
          />
          <div
            className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transition ease-in-out duration-300 transform ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1  flex items-center justify-center"
                onClick={toggleMobileMenu}
              >
                {/* <span className="sr-only">Close sidebar</span> */}
                {/* <X className="h-6 w-6 text-white" aria-hidden="true" /> */}
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex  justify-between ">
                <h1 className="text-2xl font-bold text-gray-800 px-2">Admin Dashboard</h1>
                <span 
                onClick={toggleMobileMenu}
                className='mr-4 hover:cursor-pointer select-none'
                >X</span>
              </div>
              <nav className="mt-5" aria-label="Sidebar">
                {sidebarItems.map((item) => (
                  <SidebarItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    active={activeSection === item.label}
                    onClick={() => {
                      setActiveSection(item.label);
                      toggleMobileMenu();
                    }}
                  />
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Toggle button for mobile */}
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500  md:hidden"
            >
              {/* <span className="sr-only">Open sidebar</span> */}
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Toggle Sidebar Button on Large Screens */}
            <button
              onClick={toggleSidebar}
              className="hidden md:hidden text-gray-500 "
            >
              {/* <span className="sr-only">Toggle sidebar</span> */}
              {isSidebarOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
            <h2 className="text-2xl font-bold text-gray-900">{activeSection}</h2>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {activeSection === 'User Management' && <UserManagement />}
            {/* Add other sections here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;