import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Eye, Edit, Trash2, RefreshCw, DollarSign, User, Car } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const BookingManager = () => {
    const { getAllBookings, updateBookingStatus, updatePaymentStatus } = useAuth();
    const [bookings, setBookings] = useState(getAllBookings());
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const { toast } = useToast();

    useEffect(() => {
        // Refresh bookings data
        setBookings(getAllBookings());
    }, []);

    const refreshBookings = () => {
        setBookings(getAllBookings());
        toast({
            title: "Bookings refreshed",
            description: "Latest booking data has been loaded",
        });
    };

    const handleStatusUpdate = (bookingId: string, newStatus: any) => {
        updateBookingStatus(bookingId, newStatus);
        setBookings(getAllBookings());

        toast({
            title: "Booking updated",
            description: `Booking #${bookingId} status changed to ${newStatus}`,
        });
    };

    const handlePaymentUpdate = (bookingId: string, newPaymentStatus: any) => {
        updatePaymentStatus(bookingId, newPaymentStatus);
        setBookings(getAllBookings());

        toast({
            title: "Payment updated",
            description: `Payment status changed to ${newPaymentStatus}`,
        });
    };

    const deleteBooking = (bookingId: string) => {
        const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        setBookings(updatedBookings);

        toast({
            title: "Booking deleted",
            description: `Booking #${bookingId} has been removed`,
            variant: "destructive",
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "processing":
                return "bg-blue-100 text-blue-800";
            case "completed":
                return "bg-purple-100 text-purple-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case "paid":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "refunded":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const totalRevenue = bookings
        .filter(booking => booking.paymentStatus === 'paid')
        .reduce((sum, booking) => sum + booking.total, 0);

    const pendingBookings = bookings.filter(booking => booking.status === 'pending').length;
    const activeBookings = bookings.filter(booking =>
        ['confirmed', 'processing'].includes(booking.status)
    ).length;

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                        <Car className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{bookings.length}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">{pendingBookings}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
                        <RefreshCw className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">{activeBookings}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Booking Management Table */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>All Bookings Management</CardTitle>
                        <CardDescription>
                            Manage all customer bookings, update status and payment information
                        </CardDescription>
                    </div>
                    <Button onClick={refreshBookings} variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                    </Button>
                </CardHeader>
                <CardContent>
                    {bookings.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No bookings found. Users need to make bookings first.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Booking ID</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Car</TableHead>
                                    <TableHead>Date Range</TableHead>
                                    <TableHead>Locations</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Payment</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bookings.map((booking) => (
                                    <TableRow key={booking.id}>
                                        <TableCell className="font-medium">#{String(booking.id).slice(-6)}</TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{booking.userName}</div>
                                                <div className="text-sm text-gray-500">{booking.userEmail}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={booking.carImage}
                                                    alt={booking.carName}
                                                    className="w-10 h-10 rounded object-cover"
                                                />
                                                <div>
                                                    <div className="font-medium">{booking.carName}</div>
                                                    <div className="text-sm text-gray-500">₹{booking.pricePerDay}/day</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                <div>{new Date(booking.startDate).toLocaleDateString()}</div>
                                                <div className="text-gray-500">to {new Date(booking.endDate).toLocaleDateString()}</div>
                                                <div className="text-xs text-blue-600">{booking.totalDays} days</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                <div className="font-medium">From: {booking.pickupLocation}</div>
                                                <div className="text-gray-500">To: {booking.dropoffLocation}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={booking.status}
                                                onValueChange={(value) => handleStatusUpdate(booking.id, value)}
                                            >
                                                <SelectTrigger className="w-32">
                                                    <Badge className={getStatusColor(booking.status)}>
                                                        {booking.status}
                                                    </Badge>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="confirmed">Confirmed</SelectItem>
                                                    <SelectItem value="processing">Processing</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={booking.paymentStatus}
                                                onValueChange={(value) => handlePaymentUpdate(booking.id, value)}
                                            >
                                                <SelectTrigger className="w-24">
                                                    <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                                                        {booking.paymentStatus}
                                                    </Badge>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="paid">Paid</SelectItem>
                                                    <SelectItem value="refunded">Refunded</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="font-medium">₹{booking.total.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setSelectedBooking(booking)}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => deleteBooking(booking.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Booking Details Modal */}
            {selectedBooking && (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Booking Details - #{String(selectedBooking.id).slice(-6)}</CardTitle>
                        <Button
                            variant="outline"
                            onClick={() => setSelectedBooking(null)}
                            className="w-fit"
                        >
                            Close Details
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold mb-2">Customer Information</h4>
                                <p><strong>Name:</strong> {selectedBooking.userName}</p>
                                <p><strong>Email:</strong> {selectedBooking.userEmail}</p>
                                <p><strong>Booking Date:</strong> {new Date(selectedBooking.bookingDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Trip Information</h4>
                                <p><strong>Car:</strong> {selectedBooking.carName}</p>
                                <p><strong>Duration:</strong> {selectedBooking.totalDays} days</p>
                                <p><strong>Rate:</strong> ₹{selectedBooking.pricePerDay}/day</p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Locations</h4>
                                <p><strong>Pickup:</strong> {selectedBooking.pickupLocation}</p>
                                <p><strong>Drop-off:</strong> {selectedBooking.dropoffLocation}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Payment Breakdown</h4>
                                <p><strong>Subtotal:</strong> ₹{selectedBooking.subtotal}</p>
                                <p><strong>Tax (18%):</strong> ₹{selectedBooking.tax}</p>
                                <p><strong>Total:</strong> ₹{selectedBooking.total}</p>
                            </div>
                            {selectedBooking.additionalRequests && (
                                <div className="md:col-span-2">
                                    <h4 className="font-semibold mb-2">Additional Requests</h4>
                                    <p className="text-gray-600">{selectedBooking.additionalRequests}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default BookingManager;
