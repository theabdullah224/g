import React, { useState } from "react";
import {
  Users,
  UserPlus,
  CreditCard,
  Utensils,
  FileText,
  BarChart2,
  Bell,
  Menu,
  X,
} from "lucide-react";
import UserManagement from "./UserManagement";
import { useNavigate } from "react-router-dom";
const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div
    className={`flex items-center p-3 cursor-pointer transition-colors duration-200 ${
      active ? "bg-P-Green1 text-white" : "text-gray-600 hover:bg-blue-50"
    }`}
    onClick={onClick}
  >
    <Icon className="mr-3" size={20} />
    <span className="font-medium">{label}</span>
  </div>
);

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("User Management");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarItems = [
    { icon: Users, label: "User Management" },
    { icon: UserPlus, label: "Add User" },
    // { icon: CreditCard, label: 'Subscription Management' },
    // { icon: Utensils, label: 'Meal Plan Management' },
    // { icon: FileText, label: "PDF Management" },
    // { icon: BarChart2, label: 'Analytics and Reports' },
    // { icon: Bell, label: 'Notifications & Messaging' },
  ];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    subscription_status: 'inactive',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData  )
  };
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin")
    navigate("/");
    window.location.reload(true);

  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("Adding user...")
      const response = await fetch('https://meeel.xyz/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "Your Name": formData.name,
          "Email Address": formData.email,
          "Password": formData.password,
          "status": formData.subscription_status,
        }),
      });

      const data = await response.json();

      if (response.ok) {

        setMessage('User registered successfully');
        setTimeout(() => {
            setMessage("")
        }, 3000);
        setError('');
        setFormData({
          name: '',
          email: '',
          password: '',
          subscription_status: 'inactive',
        });
      } else {
        setMessage('');
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      setError('An error occurred while adding the user');
      setMessage('');
    }
  };
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <div className={` 'w-64 hidden md:block transition-all duration-300`}>
        <div className="flex flex-col h-full bg-white shadow-lg">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center px-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
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
        <div
          className={`fixed inset-0 flex z-40 ${
            isMobileMenuOpen ? "" : "pointer-events-none"
          }`}
        >
          <div
            className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300 ${
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={toggleMobileMenu}
          />
          <div
            className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transition ease-in-out duration-300 transform ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
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
                <h1 className="text-2xl font-bold text-gray-800 px-2">
                  Admin Dashboard
                </h1>
                <span
                  onClick={toggleMobileMenu}
                  className="mr-4 hover:cursor-pointer select-none"
                >
                  X
                </span>
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
            <h2 className="text-2xl font-bold text-gray-900">
              {activeSection}
            </h2>
            <button
                  className=" py-1 px-7 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                  onClick={handleLogout}
                >
                  Logout
                </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {activeSection === "Add User" && (
              <>
                 <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Add User</h2>

        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter name"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1 font-medium">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter email"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1 font-medium">Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter password"
            />
          </label>

          {/* <label className="flex flex-col">
  <span className="mb-1 font-medium">Subscription Status</span>
  <select
    name="subscription_status"
    value={formData.subscription_status}
    onChange={handleChange}
    className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
  >
    <option value="pro">Pro</option>
    <option value="ultra_pro">Ultra Pro</option>
    <option value="inactive">Inactive</option>
  </select>
</label> */}


          <button
            type="submit"
            className="bg-P-Green1 text-white p-3 rounded-md mt-4 hover:bg-blue-600 transition-colors"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
              </>
            )}
            {activeSection === "User Management" && <UserManagement />}
            {/* Add other sections here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
