
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Car, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Star,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { cars } from "@/data/cars";

const Admin = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(storedBookings);
  }, [navigate]);

  // Calculate statistics
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.total, 0);
  const totalBookings = bookings.length;
  const averageBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;

  const recentBookings = bookings.slice(0, 5);

  const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            {trend && (
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {trend}
              </p>
            )}
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your car rental business</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={`₹${Math.round(totalRevenue).toLocaleString()}`}
            icon={DollarSign}
            trend="+12% from last month"
            color="text-green-600"
          />
          <StatCard
            title="Total Bookings"
            value={totalBookings}
            icon={Calendar}
            trend="+8% from last month"
            color="text-blue-600"
          />
          <StatCard
            title="Available Cars"
            value={cars.length}
            icon={Car}
            trend="5 new cars added"
            color="text-purple-600"
          />
          <StatCard
            title="Avg. Booking Value"
            value={`₹${Math.round(averageBookingValue).toLocaleString()}`}
            icon={TrendingUp}
            trend="+5% from last month"
            color="text-orange-600"
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="cars" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Cars
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Bookings
                  </CardTitle>
                  <CardDescription>Latest booking activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.length > 0 ? (
                      recentBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-3">
                            <img src={booking.carImage} alt={booking.carName} className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <p className="font-medium">{booking.carName}</p>
                              <p className="text-sm text-gray-600">Booking #{booking.id}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">₹{Math.round(booking.total)}</p>
                            <Badge className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                              {booking.status}
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-8">No bookings yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage your business quickly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start h-12 bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-[1.02]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Car
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 hover:bg-gray-50 transition-all duration-200">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 hover:bg-gray-50 transition-all duration-200">
                    <MapPin className="h-4 w-4 mr-2" />
                    Update Locations
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 hover:bg-gray-50 transition-all duration-200">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Reports
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>All Bookings</CardTitle>
                    <CardDescription>Manage customer bookings</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search bookings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.length > 0 ? (
                    bookings
                      .filter(booking => 
                        booking.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        booking.id.toString().includes(searchTerm)
                      )
                      .map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                          <div className="flex items-center gap-4">
                            <img src={booking.carImage} alt={booking.carName} className="w-16 h-16 rounded-lg object-cover" />
                            <div>
                              <h3 className="font-semibold text-lg">{booking.carName}</h3>
                              <p className="text-gray-600">Booking #{booking.id}</p>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-sm text-gray-500">
                                  {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                </span>
                                <Badge className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                                  {booking.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-2xl font-bold text-green-600">₹{Math.round(booking.total)}</p>
                              <p className="text-sm text-gray-600">{booking.totalDays} days</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No bookings found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cars" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Car Fleet</CardTitle>
                    <CardDescription>Manage your vehicle inventory</CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Car
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cars.slice(0, 9).map((car) => (
                    <Card key={car.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                      <div className="relative">
                        <img src={car.image} alt={car.name} className="w-full h-48 object-cover rounded-t-lg" />
                        <div className="absolute top-3 right-3">
                          <Badge className={car.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {car.available ? "Available" : "Booked"}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{car.name}</h3>
                            <p className="text-sm text-gray-600">{car.brand}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{car.rating}</span>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-blue-600 mb-3">₹{car.pricePerDay}/day</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Monthly revenue breakdown</CardDescription>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center">
                  <p className="text-gray-500">Chart placeholder - Revenue over time</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Popular Cars</CardTitle>
                  <CardDescription>Most booked vehicles</CardDescription>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center">
                  <p className="text-gray-500">Chart placeholder - Popular cars</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage customer accounts</CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <p className="text-gray-500">User management interface coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
