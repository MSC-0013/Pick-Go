
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Star, MapPin, ArrowRight, Calendar, Clock, Plane, Car as CarIcon, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { cars } from "@/data/cars";

const Index = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const carBrands = [
    { name: "Tesla", logo: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=100&h=100&fit=crop", count: 8 },
    { name: "BMW", logo: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=100&h=100&fit=crop", count: 6 },
    { name: "Mercedes", logo: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=100&h=100&fit=crop", count: 5 },
    { name: "Audi", logo: "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", count: 4 },
    { name: "Porsche", logo: "https://images.unsplash.com/photo-1611651338412-8403fa6e3599?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", count: 3 },
    { name: "Jaguar", logo: "https://images.unsplash.com/photo-1519381843062-c8b7bc45f987?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amFndWFyJTIwY2FyfGVufDB8fDB8fHww", count: 2 }
  ];

  const destinations = [
    { name: "Mumbai", image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=300&h=200&fit=crop", cars: 150 },
    { name: "Delhi", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&h=200&fit=crop", cars: 120 },
    { name: "Bangalore", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=300&h=200&fit=crop", cars: 100 },
    { name: "Chennai", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&h=200&fit=crop", cars: 80 },
    { name: "Pune", image: "https://images.unsplash.com/photo-1553064483-f10fe837615f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVuZSUyMGNpdHl8ZW58MHx8MHx8fDA%3D", cars: 70 },
    { name: "Hyderabad", image: "https://plus.unsplash.com/premium_photo-1697730430283-7e4456c78375?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGh5ZGVyYWJhZGNpdHl8ZW58MHx8MHx8fDA%3D", cars: 60 }
  ];

  const airports = [
    { name: "Mumbai Airport (BOM)", code: "BOM", cars: 45 },
    { name: "Delhi Airport (DEL)", code: "DEL", cars: 38 },
    { name: "Bangalore Airport (BLR)", code: "BLR", cars: 32 },
    { name: "Chennai Airport (MAA)", code: "MAA", cars: 28 }
  ];

  const featuredCars = cars.slice(0, 6);

  const handleSearch = () => {
    if (searchLocation) {
      navigate(`/cars`);
    } else {
      navigate("/cars");
    }
  };

  const handleBrandClick = (brand: string) => {
    navigate(`/cars?brand=${encodeURIComponent(brand)}`);
  };

  const handleDestinationClick = (destination: string) => {
    navigate(`/cars?location=${encodeURIComponent(destination)}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              The world's largest
              <span className="block text-yellow-400">
                EV car sharing
              </span>
              marketplace
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8">
              Book amazing electric vehicles from trusted hosts across India
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 shadow-2xl border-0">
              <div className="grid lg:grid-cols-4 gap-4">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Where</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="City, airport, address or hotel"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-10 h-12 text-gray-900 border-gray-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="h-12 text-gray-900 border-gray-300"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Until</label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="h-12 text-gray-900 border-gray-300"
                    min={startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button
                  onClick={handleSearch}
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg font-semibold"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search for cars
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Browse by Airport */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find cars at airports</h2>
            <p className="text-lg text-gray-600">Pick up your rental car right when you land</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {airports.map((airport) => (
              <Card
                key={airport.code}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
                onClick={() => navigate('/cars')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Plane className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{airport.code}</h3>
                      <p className="text-sm text-gray-600">{airport.cars} cars available</p>
                    </div>
                  </div>
                  <p className="text-gray-700 font-medium">{airport.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Make */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by make</h2>
            <p className="text-lg text-gray-600">Find your favorite electric vehicle brand</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {carBrands.map((brand) => (
              <Card
                key={brand.name}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
                onClick={() => handleBrandClick(brand.name)}
              >
                <CardContent className="p-6 text-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg mb-1">{brand.name}</h3>
                  <p className="text-sm text-gray-600">{brand.count} cars</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Destination */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular destinations</h2>
            <p className="text-lg text-gray-600">Explore cars in India's top cities</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <Card
                key={destination.name}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
                onClick={() => handleDestinationClick(destination.name)}
              >
                <div className="relative">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-xl mb-1">{destination.name}</h3>
                    <p className="text-sm">{destination.cars} cars available</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured electric vehicles</h2>
            <p className="text-lg text-gray-600">Discover our premium collection starting from ₹2,000/day</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <Card
                key={car.id}
                className="group hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
                onClick={() => navigate(`/car/${car.id}`)}
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
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{car.description}</p>
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

          <div className="text-center mt-12">
            <Link to="/cars">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg hover:bg-blue-50">
                View all cars
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Comprehensive Protection</h3>
              <p className="text-gray-600">Every trip includes comprehensive insurance and 24/7 roadside assistance.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Trusted Community</h3>
              <p className="text-gray-600">Join thousands of satisfied customers sharing amazing EVs across India.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CarIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Premium Experience</h3>
              <p className="text-gray-600">Luxury electric vehicles with cutting-edge technology and eco-friendly driving.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to drive electric?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of drivers making the switch to sustainable transportation
          </p>
          {!user ? (
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                Get started today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/cars">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                Browse cars
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
