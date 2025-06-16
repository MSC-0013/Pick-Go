
import { useState } from "react";
import { Calendar, MapPin, Clock, Star, Car, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const MyBookings = () => {
  const { toast } = useToast();
  const [bookings] = useState(() => {
    return JSON.parse(localStorage.getItem("bookings") || "[]");
  });

  const upcomingBookings = bookings.filter((booking: any) => 
    new Date(booking.startDate) >= new Date()
  );

  const pastBookings = bookings.filter((booking: any) => 
    new Date(booking.endDate) < new Date()
  );

  const currentBookings = bookings.filter((booking: any) => {
    const now = new Date();
    return new Date(booking.startDate) <= now && new Date(booking.endDate) >= now;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelBooking = (bookingId: number) => {
    toast({
      title: "Booking cancelled",
      description: "Your booking has been cancelled successfully"
    });
  };

  const BookingCard = ({ booking, showActions = true }: { booking: any, showActions?: boolean }) => (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden">
            <img 
              src={booking.carImage} 
              alt={booking.carName}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline">{booking.carBrand}</Badge>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold">{booking.carName}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">4.8</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">₹{booking.total}</div>
                <div className="text-sm text-gray-600">total</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>{booking.totalDays} days</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{booking.pickupLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-gray-400" />
                <span>₹{booking.pricePerDay}/day</span>
              </div>
            </div>

            {showActions && (
              <div className="flex gap-3 pt-3">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Receipt
                </Button>
                {booking.status === 'confirmed' && new Date(booking.startDate) > new Date() && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleCancelBooking(booking.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Cancel Booking
                  </Button>
                )}
                {booking.status === 'completed' && (
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Book Again
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Track and manage your EV rentals</p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
            <TabsTrigger value="current">Current ({currentBookings.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking: any) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No upcoming bookings</h3>
                  <p className="text-gray-600 mb-6">Book your next EV adventure today!</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Browse Cars
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="current" className="space-y-6">
            {currentBookings.length > 0 ? (
              currentBookings.map((booking: any) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No current bookings</h3>
                  <p className="text-gray-600">You don't have any active rentals at the moment.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {pastBookings.length > 0 ? (
              pastBookings.map((booking: any) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No past bookings</h3>
                  <p className="text-gray-600">Your rental history will appear here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyBookings;
