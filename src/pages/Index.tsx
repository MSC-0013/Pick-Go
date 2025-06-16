
import { useState } from "react";
import { Link } from "react-router-dom";
import { Car, Calendar, Shield, Star, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock car data - in real app, this would come from API
  const featuredCars = [
    {
      id: 1,
      name: "Toyota Camry",
      image: "/placeholder.svg",
      pricePerDay: 45,
      fuelType: "Petrol",
      transmission: "Automatic",
      features: ["AC", "Music System", "GPS"],
      rating: 4.8,
      available: true
    },
    {
      id: 2,
      name: "Honda Civic",
      image: "/placeholder.svg",
      pricePerDay: 40,
      fuelType: "Petrol",
      transmission: "Manual",
      features: ["AC", "Music System"],
      rating: 4.6,
      available: true
    },
    {
      id: 3,
      name: "BMW X3",
      image: "/placeholder.svg",
      pricePerDay: 85,
      fuelType: "Diesel",
      transmission: "Automatic",
      features: ["AC", "Music System", "GPS", "Leather Seats"],
      rating: 4.9,
      available: false
    }
  ];

  const filteredCars = featuredCars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "available" && car.available) ||
                         (selectedFilter === "petrol" && car.fuelType === "Petrol") ||
                         (selectedFilter === "diesel" && car.fuelType === "Diesel");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">RentCars</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/cars" className="text-gray-700 hover:text-blue-600 transition-colors">Cars</Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">Dashboard</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect <span className="text-yellow-400">Rental Car</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Choose from hundreds of cars at the best prices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1">
                <Input
                  placeholder="Search for cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>
              <Link to="/cars">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8">
                  <Search className="mr-2 h-5 w-5" />
                  Search Cars
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose RentCars?</h2>
            <p className="text-xl text-gray-600">Experience the best car rental service</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">Choose from hundreds of cars from economy to luxury</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Book your car in just a few clicks</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Safe</h3>
              <p className="text-gray-600">Your booking and payment are completely secure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Cars</h2>
            <p className="text-xl text-gray-600">Popular choices for your next trip</p>
          </div>
          
          {/* Filter Bar */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button
              variant={selectedFilter === "all" ? "default" : "outline"}
              onClick={() => setSelectedFilter("all")}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              All Cars
            </Button>
            <Button
              variant={selectedFilter === "available" ? "default" : "outline"}
              onClick={() => setSelectedFilter("available")}
            >
              Available
            </Button>
            <Button
              variant={selectedFilter === "petrol" ? "default" : "outline"}
              onClick={() => setSelectedFilter("petrol")}
            >
              Petrol
            </Button>
            <Button
              variant={selectedFilter === "diesel" ? "default" : "outline"}
              onClick={() => setSelectedFilter("diesel")}
            >
              Diesel
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <Card key={car.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="relative">
                    <img 
                      src={car.image} 
                      alt={car.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant={car.available ? "default" : "secondary"}>
                        {car.available ? "Available" : "Booked"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{car.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{car.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Fuel Type:</span>
                      <span className="font-medium">{car.fuelType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Transmission:</span>
                      <span className="font-medium">{car.transmission}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {car.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">${car.pricePerDay}</span>
                      <span className="text-gray-600 text-sm">/day</span>
                    </div>
                    <Link to={`/booking/${car.id}`}>
                      <Button disabled={!car.available}>
                        {car.available ? "Book Now" : "Unavailable"}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-blue-100">Join thousands of satisfied customers</p>
          <Link to="/register">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">RentCars</span>
              </div>
              <p className="text-gray-400">Your trusted car rental partner for all your travel needs.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/cars" className="text-gray-400 hover:text-white transition-colors">Browse Cars</Link></li>
                <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">My Bookings</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">Email: support@rentcars.com</p>
              <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 RentCars. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
