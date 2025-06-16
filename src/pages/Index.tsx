
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { cars } from "@/data/cars";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const featuredCars = cars.slice(0, 6);

  const filteredCars = featuredCars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "available" && car.available) ||
                         (selectedFilter === "luxury" && car.pricePerDay > 150) ||
                         (selectedFilter === "affordable" && car.pricePerDay <= 100);
    return matchesSearch && matchesFilter;
  });

  const handleCarClick = (carId: number) => {
    navigate(`/car/${carId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <div className="lg:ml-64">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-900 to-black text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Drive the Future with <span className="text-blue-400">Electric Cars</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300">
                Premium electric vehicles for your next adventure
              </p>
              {!user && (
                <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
                  <div className="flex-1">
                    <Input
                      placeholder="Search for cars..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-12 text-lg bg-white text-black"
                    />
                  </div>
                  <Link to="/cars">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 h-12">
                      <Search className="mr-2 h-5 w-5" />
                      Explore Cars
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                onClick={() => setSelectedFilter("all")}
                className="hover:scale-105 transition-transform"
              >
                All Cars
              </Button>
              <Button
                variant={selectedFilter === "available" ? "default" : "outline"}
                onClick={() => setSelectedFilter("available")}
                className="hover:scale-105 transition-transform"
              >
                Available Now
              </Button>
              <Button
                variant={selectedFilter === "luxury" ? "default" : "outline"}
                onClick={() => setSelectedFilter("luxury")}
                className="hover:scale-105 transition-transform"
              >
                Luxury ($150+)
              </Button>
              <Button
                variant={selectedFilter === "affordable" ? "default" : "outline"}
                onClick={() => setSelectedFilter("affordable")}
                className="hover:scale-105 transition-transform"
              >
                Affordable ($100-)
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Cars */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Electric Vehicles</h2>
              <p className="text-xl text-gray-600">Premium EVs with cutting-edge technology</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
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
                      <div className="text-right">
                        <span className="text-2xl font-bold text-blue-600">${car.pricePerDay}</span>
                        <span className="text-gray-600 text-sm">/day</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{car.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Range: {car.specifications.range}
                      </div>
                      <Button size="sm" disabled={!car.available}>
                        {car.available ? "View Details" : "Unavailable"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to="/cars">
                <Button size="lg" className="hover:scale-105 transition-transform">
                  View All Cars
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Drive Electric?</h2>
            <p className="text-xl mb-8 text-gray-300">Join thousands of satisfied customers</p>
            {!user ? (
              <Link to="/register">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 hover:scale-105 transition-transform">
                  Get Started Today
                </Button>
              </Link>
            ) : (
              <Link to="/cars">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 hover:scale-105 transition-transform">
                  Browse Cars
                </Button>
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
