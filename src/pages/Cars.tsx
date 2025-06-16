
import { useState } from "react";
import { Link } from "react-router-dom";
import { Car, Search, Filter, Star, Fuel, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const Cars = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedFuelType, setSelectedFuelType] = useState("all");
  const [selectedTransmission, setSelectedTransmission] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("price");

  // Mock car data
  const cars = [
    {
      id: 1,
      name: "Toyota Camry",
      brand: "Toyota",
      image: "/placeholder.svg",
      pricePerDay: 45,
      fuelType: "Petrol",
      transmission: "Automatic",
      features: ["AC", "Music System", "GPS"],
      rating: 4.8,
      available: true,
      description: "Comfortable mid-size sedan perfect for business trips"
    },
    {
      id: 2,
      name: "Honda Civic",
      brand: "Honda",
      image: "/placeholder.svg",
      pricePerDay: 40,
      fuelType: "Petrol",
      transmission: "Manual",
      features: ["AC", "Music System"],
      rating: 4.6,
      available: true,
      description: "Reliable compact car with excellent fuel economy"
    },
    {
      id: 3,
      name: "BMW X3",
      brand: "BMW",
      image: "/placeholder.svg",
      pricePerDay: 85,
      fuelType: "Diesel",
      transmission: "Automatic",
      features: ["AC", "Music System", "GPS", "Leather Seats"],
      rating: 4.9,
      available: false,
      description: "Luxury SUV with premium features and comfort"
    },
    {
      id: 4,
      name: "Hyundai Elantra",
      brand: "Hyundai",
      image: "/placeholder.svg",
      pricePerDay: 35,
      fuelType: "Petrol",
      transmission: "Automatic",
      features: ["AC", "Music System"],
      rating: 4.5,
      available: true,
      description: "Affordable sedan with modern technology"
    },
    {
      id: 5,
      name: "Ford Mustang",
      brand: "Ford",
      image: "/placeholder.svg",
      pricePerDay: 75,
      fuelType: "Petrol",
      transmission: "Manual",
      features: ["AC", "Music System", "Sports Mode"],
      rating: 4.7,
      available: true,
      description: "Iconic sports car for an unforgettable experience"
    },
    {
      id: 6,
      name: "Audi A4",
      brand: "Audi",
      image: "/placeholder.svg",
      pricePerDay: 90,
      fuelType: "Diesel",
      transmission: "Automatic",
      features: ["AC", "Music System", "GPS", "Leather Seats", "Sunroof"],
      rating: 4.8,
      available: true,
      description: "Premium luxury sedan with cutting-edge technology"
    }
  ];

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === "all" || car.brand === selectedBrand;
    const matchesFuelType = selectedFuelType === "all" || car.fuelType === selectedFuelType;
    const matchesTransmission = selectedTransmission === "all" || car.transmission === selectedTransmission;
    const matchesPrice = car.pricePerDay >= priceRange[0] && car.pricePerDay <= priceRange[1];
    
    return matchesSearch && matchesBrand && matchesFuelType && matchesTransmission && matchesPrice;
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.pricePerDay - b.pricePerDay;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const brands = [...new Set(cars.map(car => car.brand))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">RentCars</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/cars" className="text-blue-600 font-medium">Cars</Link>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Cars</h1>
          <p className="text-gray-600">Find the perfect car for your next adventure</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label>Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search cars..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <Label>Price Range (per day)</Label>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={200}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Brand */}
                <div className="space-y-2">
                  <Label>Brand</Label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Brands</SelectItem>
                      {brands.map(brand => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Fuel Type */}
                <div className="space-y-2">
                  <Label>Fuel Type</Label>
                  <Select value={selectedFuelType} onValueChange={setSelectedFuelType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Transmission */}
                <div className="space-y-2">
                  <Label>Transmission</Label>
                  <Select value={selectedTransmission} onValueChange={setSelectedTransmission}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedBrand("all");
                    setSelectedFuelType("all");
                    setSelectedTransmission("all");
                    setPriceRange([0, 200]);
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Cars List */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {sortedCars.length} of {cars.length} cars
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price: Low to High</SelectItem>
                  <SelectItem value="rating">Rating: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {sortedCars.map((car) => (
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
                      <div>
                        <CardTitle className="text-lg">{car.name}</CardTitle>
                        <p className="text-sm text-gray-600">{car.description}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{car.rating}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Fuel className="h-4 w-4 text-gray-500" />
                        <span>{car.fuelType}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-gray-500" />
                        <span>{car.transmission}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {car.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
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

            {sortedCars.length === 0 && (
              <div className="text-center py-12">
                <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
