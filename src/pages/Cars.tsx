
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, Star, ArrowRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { cars } from "@/data/cars";

const Cars = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const navigate = useNavigate();

  const brands = [...new Set(cars.map(car => car.brand))];

  const filteredCars = cars
    .filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrand === "all" || car.brand === selectedBrand;
      const matchesPrice = priceRange === "all" ||
                          (priceRange === "budget" && car.pricePerDay <= 100) ||
                          (priceRange === "mid" && car.pricePerDay > 100 && car.pricePerDay <= 200) ||
                          (priceRange === "luxury" && car.pricePerDay > 200);
      return matchesSearch && matchesBrand && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.pricePerDay - b.pricePerDay;
        case "price-high": return b.pricePerDay - a.pricePerDay;
        case "rating": return b.rating - a.rating;
        default: return a.name.localeCompare(b.name);
      }
    });

  const handleCarClick = (carId: number) => {
    navigate(`/car/${carId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Electric vehicles for every journey</h1>
          <p className="text-xl text-gray-600">Discover amazing EVs from trusted hosts across India</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search cars or brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-0 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
            </div>
            
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="h-12 border-0 bg-gray-50">
                <SelectValue placeholder="All brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All brands</SelectItem>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-12 border-0 bg-gray-50">
                <SelectValue placeholder="Price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All prices</SelectItem>
                <SelectItem value="budget">Under ₹100/day</SelectItem>
                <SelectItem value="mid">₹100-₹200/day</SelectItem>
                <SelectItem value="luxury">₹200+/day</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-12 border-0 bg-gray-50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <Button className="h-12 bg-blue-600 hover:bg-blue-700">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredCars.length} of {cars.length} cars
          </p>
          <div className="text-sm text-gray-500">
            {filteredCars.filter(car => car.available).length} available now
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <Card 
              key={car.id} 
              className="group hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
              onClick={() => handleCarClick(car.id)}
            >
              <div className="relative">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={`${car.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {car.available ? "Available" : "Booked"}
                  </Badge>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-black/80 text-white">
                    {car.fuelType}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">{car.brand}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{car.rating}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  {car.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{car.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Range: {car.specifications.range}</span>
                  <span className="text-sm text-gray-600">{car.specifications.seats} seats</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">₹{car.pricePerDay}</span>
                    <span className="text-gray-600 text-sm">/day</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No cars found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedBrand("all");
                setPriceRange("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars;
