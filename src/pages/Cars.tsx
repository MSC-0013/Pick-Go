
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { cars } from "@/data/cars";

const Cars = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 250]);
  const [sortBy, setSortBy] = useState("price");
  const navigate = useNavigate();

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === "all" || car.brand === selectedBrand;
    const matchesPrice = car.pricePerDay >= priceRange[0] && car.pricePerDay <= priceRange[1];
    
    return matchesSearch && matchesBrand && matchesPrice;
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.pricePerDay - b.pricePerDay;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      case "range":
        return parseInt(b.specifications.range) - parseInt(a.specifications.range);
      default:
        return 0;
    }
  });

  const brands = [...new Set(cars.map(car => car.brand))];

  const handleCarClick = (carId: number) => {
    navigate(`/car/${carId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="lg:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Electric Vehicle Collection</h1>
            <p className="text-gray-600">Discover our premium selection of electric vehicles</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Brand Filter */}
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price: Low to High</SelectItem>
                  <SelectItem value="rating">Rating: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                  <SelectItem value="range">Range: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedBrand("all");
                  setPriceRange([0, 250]);
                }}
              >
                Clear Filters
              </Button>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <Label>Price Range (per day): ${priceRange[0]} - ${priceRange[1]}</Label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={250}
                min={0}
                step={10}
                className="w-full"
              />
            </div>
          </div>

          {/* Results Info */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {sortedCars.length} of {cars.length} cars
            </p>
          </div>

          {/* Cars Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCars.map((car) => (
              <Card 
                key={car.id} 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:border-blue-200"
                onClick={() => handleCarClick(car.id)}
              >
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
                      <CardTitle className="text-lg mb-1">{car.name}</CardTitle>
                      <Badge variant="outline" className="mb-2">{car.brand}</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{car.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{car.description}</p>
                  <div className="space-y-1 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Range:</span>
                      <span>{car.specifications.range}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">0-60 mph:</span>
                      <span>{car.specifications.acceleration}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">${car.pricePerDay}</span>
                      <span className="text-gray-600 text-sm">/day</span>
                    </div>
                    <Button size="sm" disabled={!car.available}>
                      {car.available ? "View Details" : "Unavailable"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedCars.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cars;
