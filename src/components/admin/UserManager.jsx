import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Users, UserCheck, UserX, RefreshCw, Mail, Calendar } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`, { withCredentials: true });
      // Map backend data safely
      const safeUsers = res.data.map(u => ({
        id: u._id || u.id || "unknown",
        name: u.name || "N/A",
        email: u.email || "N/A",
        role: u.role || (u.isAdmin ? "admin" : "user") || "user",
        registrationDate: u.registrationDate || u.createdAt || null,
      }));
      setUsers(safeUsers);

      toast({
        title: "Users refreshed",
        description: "Latest user data has been loaded",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getUserBookingStats = (user, bookings = []) => {
    const userBookings = bookings.filter(
      booking =>
        (booking.userId && booking.userId === user.id) ||
        (booking.userEmail && booking.userEmail === user.email)
    );
    const totalSpent = userBookings.reduce((sum, booking) => sum + (booking.total || 0), 0);
    const lastBooking = userBookings.length > 0
      ? userBookings[userBookings.length - 1].startDate || userBookings[userBookings.length - 1].bookingDate
      : null;
    return { bookingCount: userBookings.length, totalSpent, lastBooking };
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(user => getUserBookingStats(user).bookingCount > 0).length;
  const totalRevenue = users.reduce((sum, user) => sum + getUserBookingStats(user).totalSpent, 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle>Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle>Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle>Inactive Users</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{totalUsers - activeUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle>Total Revenue</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage all registered users</CardDescription>
          </div>
          <Button onClick={fetchUsers} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No users registered yet.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => {
                  const stats = getUserBookingStats(user);
                  return (
                    <TableRow key={user.id || user.email}>
                      <TableCell>#{user.id?.slice(-6) || "N/A"}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.registrationDate
                          ? new Date(user.registrationDate).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>{stats.bookingCount}</TableCell>
                      <TableCell>₹{stats.totalSpent.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={stats.bookingCount > 0 ? "default" : "secondary"}>
                          {stats.bookingCount > 0 ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManager;
