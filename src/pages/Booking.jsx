import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  Clock,
  CreditCard,
  ArrowLeft,
  Check,
  Star,
  Users,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { cars } from "@/data/cars";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Booking = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    pickupLocation: "",
    dropoffLocation: "",
    additionalRequests: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const car = cars.find((c) => c.id === parseInt(carId || "1")) || cars[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateDays = () => {
    if (bookingData.startDate && bookingData.endDate) {
      const start = new Date(bookingData.startDate);
      const end = new Date(bookingData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const totalDays = calculateDays();
  const subtotal = totalDays * car.pricePerDay;
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handleBooking = (e) => {
    e.preventDefault();

    const userStr = localStorage.getItem("user");
    if (!userStr) {
      toast({
        title: "Login required",
        description: "Please login to make a booking",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    const user = JSON.parse(userStr);

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

    const bookingDetails = {
      userId: user.id,
      userEmail: user.email,
      userName: user.name || "User",
      carId: car.id,
      carName: car.name,
      carImage: car.image,
      carBrand: car.brand,
      pricePerDay: car.pricePerDay,
      ...bookingData,
      totalDays,
      subtotal,
      tax: Math.round(tax),
      total: Math.round(total),
    };

    axios
      .post(`${API_URL}/bookings`, bookingDetails, { withCredentials: true })
      .then(() => {
        toast({
          title: "Booking confirmed!",
          description: "Your EV has been booked successfully",
        });
        navigate("/my-bookings");
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message || "Failed to save booking",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete your booking
          </h1>
          <p className="text-gray-600">
            You're just a few steps away from your EV adventure
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Trip details
                </CardTitle>
                <CardDescription>
                  When and where would you like to pick up your EV?
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
                        min={new Date().toISOString().split("T")[0]}
                        required
                        className="h-12"
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
                        min={
                          bookingData.startDate ||
                          new Date().toISOString().split("T")[0]
                        }
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickupLocation">Pickup Location</Label>
                      <Input
                        id="pickupLocation"
                        name="pickupLocation"
                        placeholder="Enter pickup address in India"
                        value={bookingData.pickupLocation}
                        onChange={handleInputChange}
                        required
                        className="h-12"
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
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalRequests">
                      Additional Requests (Optional)
                    </Label>
                    <Textarea
                      id="additionalRequests"
                      name="additionalRequests"
                      placeholder="Any special requirements..."
                      value={bookingData.additionalRequests}
                      onChange={handleInputChange}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 h-14"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Processing booking...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Confirm booking • ₹{Math.round(total)}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Car Info & Price Summary */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Your EV</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{car.brand}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">
                          {car.rating}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{car.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {car.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>{car.specifications.seats} seats</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-gray-400" />
                        <span>{car.specifications.range}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Price breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      ₹{car.pricePerDay} × {totalDays || 0} days
                    </span>
                    <span className="font-medium">₹{subtotal || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-medium">₹{Math.round(tax) || 0}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-bold text-blue-600">
                      ₹{Math.round(total) || 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>What's included</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "Comprehensive insurance",
                    "24/7 roadside assistance",
                    "Free charging guidance",
                    "Unlimited kilometers",
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
