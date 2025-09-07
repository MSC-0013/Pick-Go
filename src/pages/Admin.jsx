import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Car,
  Plus,
  BarChart3,
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  Package,
  LogOut,
  UserCheck,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import AddCarForm from "@/components/admin/AddCarForm";
import BookingManager from "@/components/admin/BookingManager";
import UserManager from "@/components/admin/UserManager";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Admin = () => {
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    Promise.all([
      axios.get(`${API_URL}/cars`, { withCredentials: true }),
      axios.get(`${API_URL}/users`, { withCredentials: true }),
      axios.get(`${API_URL}/bookings`, { withCredentials: true }),
    ])
      .then(([carsRes, usersRes, bookingsRes]) => {
        setCars(Array.isArray(carsRes.data) ? carsRes.data : []);
        setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
        setBookings(Array.isArray(bookingsRes.data) ? bookingsRes.data : []);
      })
      .catch((err) => {
        setError("Failed to load dashboard data. Please try again.");
        setCars([]);
        setUsers([]);
        setBookings([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === "paid")
    .reduce((sum, b) => sum + b.total, 0);

  const averageBookingValue =
    bookings.length > 0 ? Math.round(totalRevenue / bookings.length) : 0;

  const stats = {
    totalCars: cars.length,
    totalBookings: bookings.length,
    totalRevenue,
    activeBookings: bookings.filter((b) =>
      ["confirmed", "processing"].includes(b.status)
    ).length,
    totalUsers: users.length,
    activeUsers: users.filter((u) =>
      bookings.some((b) => b.userEmail === u.email)
    ).length,
    pendingBookings: bookings.filter((b) => b.status === "pending").length,
    monthlyGrowth: bookings.length > 0 ? 15.2 : 0,
    averageBookingValue,
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCarAdded = () => {
    setShowAddCarForm(false);
    axios.get(`${API_URL}/cars`, { withCredentials: true })
      .then(res => setCars(Array.isArray(res.data) ? res.data : []));
  };

  const recentBookings = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()
    )
    .slice(0, 5);

  const topCustomers = users
    .map((u) => {
      const userBookings = bookings.filter((b) => b.userEmail === u.email);
      const totalSpent = userBookings
        .filter((b) => b.paymentStatus === "paid")
        .reduce((sum, b) => sum + b.total, 0);
      return {
        ...u,
        totalSpent,
        bookingCount: userBookings.length,
      };
    })
    .filter((u) => u.totalSpent > 0)
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                Pick&Go Admin
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.name || "Admin"}
              </span>
              <Link to="/">
                <Button variant="outline">Back to Site</Button>
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Complete management system for your car rental business
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-gray-500">Loading dashboard...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
        <>
        {/* Enhanced Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{stats.totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs opacity-80">
                From {stats.totalBookings} bookings
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Bookings
              </CardTitle>
              <Calendar className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs opacity-80">
                {stats.activeBookings} currently active
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs opacity-80">
                {stats.activeUsers} active users
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Bookings
              </CardTitle>
              <Zap className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingBookings}</div>
              <p className="text-xs opacity-80">Require attention</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="cars">Fleet</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recent Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.length > 0 ? (
                      recentBookings.map((booking, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <div className="font-medium">{booking.carName}</div>
                            <div className="text-sm text-gray-500">
                              {booking.userName}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">
                              ₹{booking.total?.toLocaleString?.() ?? booking.total}
                            </div>
                            <div className="text-xs text-gray-500">
                              {booking.bookingDate
                                ? new Date(booking.bookingDate).toLocaleDateString()
                                : booking.startDate
                                ? new Date(booking.startDate).toLocaleDateString()
                                : ""}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        No bookings yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Top Customers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topCustomers.length > 0 ? (
                      topCustomers.map((customer, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border-l-2 border-blue-200 bg-blue-50"
                        >
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-gray-500">
                              {customer.bookingCount} bookings
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">
                              ₹{customer.totalSpent?.toLocaleString?.() ?? customer.totalSpent}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        No customers yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <BookingManager />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserManager />
          </TabsContent>

          <TabsContent value="cars" className="space-y-6">
            {showAddCarForm ? (
              <AddCarForm
                onCarAdded={handleCarAdded}
                onCancel={() => setShowAddCarForm(false)}
              />
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Fleet Management</CardTitle>
                    <CardDescription>
                      Manage your car inventory and add new vehicles
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowAddCarForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Car
                  </Button>
                </CardHeader>
                <CardContent>
                  {cars.length === 0 ? (
                    <div className="text-center py-8">
                      <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">
                        No cars in fleet yet.
                      </p>
                      <p className="text-sm text-gray-400">
                        You can add new cars using the button above
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {cars.map(car => (
                        <Card key={car.id || car._id} className="border shadow">
                          <CardContent className="p-4 flex gap-4 items-center">
                            <img src={car.imageUrl || car.image} alt={car.name} className="w-20 h-14 object-cover rounded" />
                            <div>
                              <div className="font-bold">{car.name}</div>
                              <div className="text-sm text-gray-500">{car.brand} • {car.model} • {car.year}</div>
                              <div className="text-sm text-blue-600 font-semibold">₹{car.pricePerDay}/day</div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Business Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 border rounded">
                        <div className="text-sm text-gray-600">
                          Avg Booking Value
                        </div>
                        <div className="font-bold">
                          ₹{stats.averageBookingValue}
                        </div>
                      </div>
                      <div className="p-3 border rounded">
                        <div className="text-sm text-gray-600">
                          Conversion Rate
                        </div>
                        <div className="font-bold">
                          {stats.totalUsers > 0
                            ? Math.round(
                                (stats.activeUsers / stats.totalUsers) * 100
                              )
                            : 0}
                          %
                        </div>
                      </div>
                      <div className="p-3 border rounded">
                        <div className="text-sm text-gray-600">
                          Revenue per User
                        </div>
                        <div className="font-bold">
                          ₹
                          {stats.totalUsers > 0
                            ? Math.round(stats.totalRevenue / stats.totalUsers)
                            : 0}
                        </div>
                      </div>
                      <div className="p-3 border rounded">
                        <div className="text-sm text-gray-600">
                          Booking Success Rate
                        </div>
                        <div className="font-bold">
                          {bookings.length > 0
                            ? Math.round(
                                (bookings.filter(
                                  (b) => b.status === "completed"
                                ).length /
                                  bookings.length) *
                                  100
                              )
                            : 0}
                          %
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-600">
                            Total Paid
                          </div>
                          <div className="text-xl font-bold text-green-600">
                            ₹
                            {bookings
                              .filter((b) => b.paymentStatus === "paid")
                              .reduce((sum, b) => sum + b.total, 0)
                              .toLocaleString()}
                          </div>
                        </div>
                        <div className="text-2xl">💰</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Paid Bookings</span>
                        <span className="text-sm font-medium">
                          {
                            bookings.filter((b) => b.paymentStatus === "paid")
                              .length
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Pending Payments</span>
                        <span className="text-sm font-medium">
                          {
                            bookings.filter(
                              (b) => b.paymentStatus === "pending"
                            ).length
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Refunded</span>
                        <span className="text-sm font-medium">
                          {
                            bookings.filter(
                              (b) => b.paymentStatus === "refunded"
                            ).length
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Business Reports
                </CardTitle>
                <CardDescription>
                  Generate and analyze comprehensive business reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">
                      Monthly Financial Report
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Total Revenue: ₹{stats.totalRevenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      Total Bookings: {stats.totalBookings}
                    </p>
                    <Button size="sm" disabled>
                      Coming Soon
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">
                      Customer Analytics Report
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Total Users: {stats.totalUsers}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      Active Users: {stats.activeUsers}
                    </p>
                    <Button size="sm" disabled>
                      Coming Soon
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </>
        )}
      </div>
    </div>
  );
};

export default Admin;
