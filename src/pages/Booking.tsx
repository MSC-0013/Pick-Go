
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Car, Calendar, MapPin, Clock, CreditCard, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const Booking = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    pickupLocation: "",
    dropoffLocation: "",
    additionalRequests: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // Mock car data - in real app, this would be fetched based on carId
  const car = {
    id: parseInt(carId || "1"),
    name: "Toyota Camry",
    image: "/placeholder.svg",
    pricePerDay: 45,
    fuelType: "Petrol",
    transmission: "Automatic",
    features: ["AC", "Music System", "GPS"],
    rating: 4.8,
    available: true,
    description: "Comfortable mid-size sedan perfect for business trips",
    specifications: {
      seats: 5,
      luggage: 3,
      fuelTank: "60L",
      mileage: "25 km/l"
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateDays = () => {
    if (bookingData.startDate && bookingData.endDate) {
      const start = new Date(bookingData.startDate);
      const end = new Date(bookingData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const totalDays = calculateDays();
  const subtotal = totalDays * car.pricePerDay;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to make a booking",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!bookingData.startDate || !bookingData.endDate) {
      toast({
        title: "Please select dates",
        description: "Start date and end date are required",
        variant: "destructive",
      });
      return;
    }

    if (new Date(bookingData.startDate) >= new Date(bookingData.endDate)) {
      toast({
        title: "Invalid dates",
        description: "End date must be after start date",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate booking process
    setTimeout(() => {
      toast({
        title: "Booking confirmed!",
        description: "Your car has been booked successfully",
      });
      navigate("/dashboard");
      setIsLoading(false);
    }, 2000);
  };

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
            <Link to="/cars" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              Back to Cars
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
          <p className="text-gray-600">Fill in the details below to reserve your car</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Rental Details
                </CardTitle>
                <CardDescription>
                  Select your rental dates and locations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBooking} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={bookingData.startDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={bookingData.endDate}
                        onChange={handleInputChange}
                        min={bookingData.startDate || new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickupLocation">Pickup Location</Label>
                      <Input
                        id="pickupLocation"
                        name="pickupLocation"
                        placeholder="Enter pickup address"
                        value={bookingData.pickupLocation}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dropoffLocation">Drop-off Location</Label>
                      <Input
                        id="dropoffLocation"
                        name="dropoffLocation"
                        placeholder="Enter drop-off address"
                        value={bookingData.dropoffLocation}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalRequests">Additional Requests (Optional)</Label>
                    <Textarea
                      id="additionalRequests"
                      name="additionalRequests"
                      placeholder="Any special requirements or requests..."
                      value={bookingData.additionalRequests}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Processing Booking...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Proceed to Payment
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Car Details & Summary */}
          <div className="space-y-6">
            {/* Car Details */}
            <Card>
              <CardHeader>
                <CardTitle>Selected Car</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{car.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{car.description}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{car.fuelType}</Badge>
                      <Badge variant="outline">{car.transmission}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-600">Seats:</span>
                        <span>{car.specifications.seats}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-600">Luggage:</span>
                        <span>{car.specifications.luggage}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-600">Fuel Tank:</span>
                        <span>{car.specifications.fuelTank}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-600">Mileage:</span>
                        <span>{car.specifications.mileage}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {car.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <Check className="h-3 w-3 mr-1" />
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per day:</span>
                    <span className="font-medium">${car.pricePerDay}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Number of days:</span>
                    <span className="font-medium">{totalDays || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">${subtotal || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (10%):</span>
                    <span className="font-medium">${tax.toFixed(2) || 0}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-blue-600">${total.toFixed(2) || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Included Features */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "Unlimited mileage",
                    "Basic insurance coverage",
                    "24/7 roadside assistance",
                    "Free cancellation (24h notice)"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
