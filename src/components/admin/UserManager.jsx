import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Users, UserCheck, UserX, RefreshCw, Mail, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const UserManager = () => {
  const { getAllUsers, getAllBookings } = useAuth();
  const [users, setUsers] = useState(getAllUsers());
  const [bookings] = useState(getAllBookings());
  const { toast } = useToast();

  useEffect(() => {
    setUsers(getAllUsers());
  }, []);

  const refreshUsers = () => {
    setUsers(getAllUsers());
    toast({
      title: "Users refreshed",
      description: "Latest user data has been loaded",
    });
  };

  const getUserBookingStats = (userEmail) => {
    const userBookings = bookings.filter(booking => booking.userEmail === userEmail);
    const totalSpent = userBookings.reduce((sum, booking) => sum + booking.total, 0);
    return {
      bookingCount: userBookings.length,
      totalSpent,
      lastBooking: userBookings.length > 0 ? userBookings[userBookings.length - 1].bookingDate : null
    };
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(user => {
    const stats = getUserBookingStats(user.email);
    return stats.bookingCount > 0;
  }).length;

  const totalRevenue = users.reduce((sum, user) => {
    const stats = getUserBookingStats(user.email);
    return sum + stats.totalSpent;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{totalUsers - activeUsers}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Users Management Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage all registered users and their booking activity
            </CardDescription>
          </div>
          <Button onClick={refreshUsers} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No users registered yet.</p>
            </div>
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
                {users.map((user) => {
                  const stats = getUserBookingStats(user.email);
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">#{user.id.slice(-6)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span>{user.name || 'N/A'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.registrationDate ? new Date(user.registrationDate).toLocaleDateString() : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{stats.bookingCount}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-green-600">₹{stats.totalSpent.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={stats.bookingCount > 0 ? 'default' : 'secondary'}>
                          {stats.bookingCount > 0 ? 'Active' : 'Inactive'}
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