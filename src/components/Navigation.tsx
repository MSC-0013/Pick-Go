
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Car, User, LogOut, Menu, X, Calendar, Settings, Home, Shield, Phone, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    setIsMobileMenuOpen(false);
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
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RentEV
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/cars" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                location.pathname === '/cars' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Find cars
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                  <Shield className="mr-2 h-4 w-4" />
                  Insurance & Protection
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem>
                  <Shield className="mr-2 h-4 w-4" />
                  Insurance Plans
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Car className="mr-2 h-4 w-4" />
                  Damage Protection
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Phone className="mr-2 h-4 w-4" />
                  24/7 Roadside Assistance
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              to="/contact" 
              className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              <Phone className="mr-2 h-4 w-4 inline" />
              Support
            </Link>

            {isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                    <Wrench className="mr-2 h-4 w-4" />
                    Host Tools
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56">
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Car className="mr-2 h-4 w-4" />
                    Manage Fleet
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    Booking Analytics
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden md:block text-sm font-medium">{user.name || user.email.split('@')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{user.name || user.email}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigateWithAuth("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigateWithAuth("/my-bookings")}>
                    <Calendar className="mr-2 h-4 w-4" />
                    My Trips
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigateWithAuth("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" className="text-sm font-medium">
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-sm font-medium px-6">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-white py-4">
            <div className="space-y-2">
              <Link 
                to="/cars"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === '/cars' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                }`}
              >
                Find cars
              </Link>
              <button className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700">
                Insurance & Protection
              </button>
              <Link 
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-gray-700"
              >
                Support
              </Link>
              {user ? (
                <>
                  <button 
                    onClick={() => navigateWithAuth("/profile")}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700"
                  >
                    Profile
                  </button>
                  <button 
                    onClick={() => navigateWithAuth("/my-bookings")}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700"
                  >
                    My Trips
                  </button>
                  <button 
                    onClick={() => navigateWithAuth("/settings")}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700"
                  >
                    Settings
                  </button>
                  {isAdmin && (
                    <Link 
                      to="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 text-sm font-medium text-gray-700"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-red-600"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-medium text-gray-700"
                  >
                    Log in
                  </Link>
                  <Link 
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-md mx-3"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
