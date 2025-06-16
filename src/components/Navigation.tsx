
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Car, User, LogOut, Menu, X, Calendar, Settings, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = user?.email === "admin@gmail.com";

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out successfully",
      description: "Come back soon!"
    });
    navigate("/");
    setIsSidebarOpen(false);
  };

  const navigateWithAuth = (path: string) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to access this page",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    navigate(path);
    setIsSidebarOpen(false);
  };

  const menuItems = [
    { title: "Home", href: "/", icon: Home, public: true },
    { title: "Cars", href: "/cars", icon: Car, public: true },
    { title: "My Bookings", href: "/dashboard", icon: Calendar, public: false },
    { title: "Profile", href: "/dashboard", icon: User, public: false },
    { title: "Settings", href: "/dashboard", icon: Settings, public: false },
  ];

  if (isAdmin) {
    menuItems.push({ title: "Admin Dashboard", href: "/admin", icon: Settings, public: false });
  }

  return (
    <>
      {/* Top Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Link to="/" className="flex items-center space-x-2">
                <Car className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">RentCars</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`transition-colors ${location.pathname === '/' ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Home
              </Link>
              <Link 
                to="/cars" 
                className={`transition-colors ${location.pathname === '/cars' ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Cars
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="hidden lg:flex items-center gap-2">
                  <span className="text-sm text-gray-600">Welcome, {user.name || user.email}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSidebarOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </div>
              ) : (
                <div className="hidden lg:flex items-center space-x-4">
                  <Link to="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:shadow-none lg:w-64`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Car className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">RentCars</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            {user && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-900">{user.name || user.email}</div>
                <div className="text-xs text-gray-500">{isAdmin ? "Administrator" : "Member"}</div>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.title}
                onClick={() => {
                  if (item.public || user) {
                    navigate(item.href);
                    setIsSidebarOpen(false);
                  } else {
                    navigateWithAuth(item.href);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all hover:bg-gray-100 hover:scale-105 ${
                  location.pathname === item.href ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-700'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.title}</span>
                {!item.public && !user && (
                  <span className="ml-auto text-xs text-gray-400">Login required</span>
                )}
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          {user && (
            <div className="p-4 border-t">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          )}

          {!user && (
            <div className="p-4 border-t space-y-2">
              <Link to="/login" className="block">
                <Button variant="outline" className="w-full" onClick={() => setIsSidebarOpen(false)}>
                  Login
                </Button>
              </Link>
              <Link to="/register" className="block">
                <Button className="w-full" onClick={() => setIsSidebarOpen(false)}>
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Sidebar Overlay (when sidebar is open) */}
      {isSidebarOpen && (
        <div className="hidden lg:block fixed inset-0 bg-black bg-opacity-20 z-40" onClick={() => setIsSidebarOpen(false)} />
      )}
    </>
  );
};

export default Navigation;
