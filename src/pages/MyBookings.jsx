import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, MapPin, Car, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import ReceiptDownload from "@/components/ReceiptDownload";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(userStr);

    axios
      .get(`${API_URL}/bookings/user/${user.id}`, { withCredentials: true })
      .then((res) => {
        console.log("Fetched bookings:", res.data); // ✅ Debug log
        setBookings(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setBookings([]);
      })
      .finally(() => setIsLoading(false));
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // ✅ Now includes "pending"
  const upcomingBookings = bookings.filter(
    (booking) =>
      new Date(booking.startDate) > new Date() &&
      ["confirmed", "pending"].includes(booking.status?.toLowerCase())
  );

  const pastBookings = bookings.filter(
    (booking) =>
      new Date(booking.endDate) < new Date() ||
      booking.status?.toLowerCase() === "completed"
  );

  const activeBookings = bookings.filter(
    (booking) =>
      new Date(booking.startDate) <= new Date() &&
      new Date(booking.endDate) >= new Date() &&
      ["confirmed", "pending"].includes(booking.status?.toLowerCase())
  );

  const BookingCard = ({ booking }) => (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-48">
            <img
              src={booking.carImage}
              alt={booking.carName}
              className="w-full h-32 md:h-28 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    {booking.carBrand}
                  </Badge>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>
                <h3 className="font-semibold text-xl text-gray-900">
                  {booking.carName}
                </h3>
                <p className="text-sm text-gray-600">
                  Booking #{booking.id || booking._id}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">
                  ₹{Math.round(booking.total)}
                </p>
                <p className="text-sm text-gray-600">{booking.totalDays} days</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Pickup</p>
                  <p className="text-sm text-gray-600">
                    {new Date(booking.startDate).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Return</p>
                  <p className="text-sm text-gray-600">
                    {new Date(booking.endDate).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Pickup Location</p>
                  <p className="text-sm text-gray-600">{booking.pickupLocation}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Drop-off Location</p>
                  <p className="text-sm text-gray-600">{booking.dropoffLocation}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/car/${booking.carId}`)}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                View Car
              </Button>
              <ReceiptDownload booking={booking} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Trips</h1>
          <p className="text-gray-600">Manage your electric vehicle bookings</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-gray-500">Loading bookings...</div>
        ) : (
          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList className="grid w-full md:w-auto md:grid-cols-3">
              <TabsTrigger value="upcoming" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Upcoming ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="active" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                Active ({activeBookings.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Past ({pastBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-6">
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking) => (
                  <BookingCard key={booking.id || booking._id} booking={booking} />
                ))
              ) : (
                <p className="text-center text-gray-600 py-8">No upcoming trips</p>
              )}
            </TabsContent>

            <TabsContent value="active" className="space-y-6">
              {activeBookings.length > 0 ? (
                activeBookings.map((booking) => (
                  <BookingCard key={booking.id || booking._id} booking={booking} />
                ))
              ) : (
                <p className="text-center text-gray-600 py-8">No active trips</p>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              {pastBookings.length > 0 ? (
                pastBookings.map((booking) => (
                  <BookingCard key={booking.id || booking._id} booking={booking} />
                ))
              ) : (
                <p className="text-center text-gray-600 py-8">No past trips</p>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
