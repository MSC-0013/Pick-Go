import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Support from "./pages/Support";
import { AuthProvider } from "@/contexts/AuthContext";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/car/:carId" element={<CarDetails />} />
          <Route path="/booking/:carId" element={<Booking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contact" element={<Support />} />
          
    
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
