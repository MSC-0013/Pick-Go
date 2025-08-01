import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Users,
  Fuel,
  Settings,
  Shield,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { cars } from "@/data/cars";

const CarDetails = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const car = cars.find((c) => c.id === Number(carId));

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Car not found</h1>
          <Link to="/cars">
            <Button>Back to Cars</Button>
          </Link>
        </div>
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState(0);

  const carImages = [
    car.image,
    car.image.replace("crop", "crop&sat=-20"),
    car.image.replace("crop", "crop&brightness=10"),
  ];

  const handleBookNow = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to book this car",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    navigate(`/booking/${carId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/cars" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Cars
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={carImages[selectedImage]}
                alt={car.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {carImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-blue-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img src={image} alt={`${car.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Car Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{car.brand}</Badge>
                <Badge variant={car.available ? "default" : "secondary"}>
                  {car.available ? "Available" : "Booked"}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{car.rating}</span>
                  <span className="text-gray-600">(150+ reviews)</span>
                </div>
              </div>
              <p className="text-gray-600 text-lg">{car.description}</p>
            </div>

            {/* Price */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-blue-600">₹{car.pricePerDay}</span>
                    <span className="text-gray-600 text-lg">/day</span>
                  </div>
                  <Button
                    size="lg"
                    onClick={handleBookNow}
                    disabled={!car.available}
                    className="px-8 hover:scale-105 transition-transform bg-blue-600 hover:bg-blue-700"
                  >
                    {car.available ? (
                      <>
                        <Calendar className="mr-2 h-5 w-5" />
                        Book Now
                      </>
                    ) : (
                      "Unavailable"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <Users className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium">{car.specifications.seats} Seats</div>
                  <div className="text-sm text-gray-600">Capacity</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <Fuel className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium">{car.specifications.range}</div>
                  <div className="text-sm text-gray-600">Range</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <Settings className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium">{car.transmission}</div>
                  <div className="text-sm text-gray-600">Transmission</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <Shield className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium">{car.specifications.acceleration}</div>
                  <div className="text-sm text-gray-600">0-100 kmh</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More Information */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Seating:</span>
                <span className="font-medium">{car.specifications.seats} persons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Luggage:</span>
                <span className="font-medium">{car.specifications.luggage} large bags</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Range:</span>
                <span className="font-medium">{car.specifications.range}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Acceleration:</span>
                <span className="font-medium">{car.specifications.acceleration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fuel Type:</span>
                <span className="font-medium">{car.fuelType}</span>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* What's Included */}
          <Card>
            <CardHeader>
              <CardTitle>What's Included</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  "Comprehensive insurance",
                  "24/7 roadside assistance",
                  "Free charging guidance",
                  "Unlimited kilometers",
                  "Professional cleaning",
                  "GPS navigation system",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
