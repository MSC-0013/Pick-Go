import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const handleBooking = (e) => {
  e.preventDefault();

  const userStr = localStorage.getItem("user");
  if (!userStr) {
    toast({ title: "Login required", description: "Please login first", variant: "destructive" });
    navigate("/login");
    return;
  }

  const user = JSON.parse(userStr);

  const bookingDetails = {
    userId: user.id,
    userEmail: user.email,
    userName: user.name,
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

  axios.post(`${API_URL}/bookings`, bookingDetails, { withCredentials: true })
    .then(() => {
      toast({ title: "Booking confirmed!", description: "Your EV has been booked successfully" });
      navigate("/my-bookings");
    })
    .catch(err => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    });
};
