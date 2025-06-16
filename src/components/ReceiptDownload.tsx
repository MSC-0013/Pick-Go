
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ReceiptDownloadProps {
  booking: {
    id: number;
    carName: string;
    carBrand: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    pricePerDay: number;
    subtotal: number;
    tax: number;
    total: number;
    pickupLocation: string;
    dropoffLocation: string;
    bookingDate: string;
    status: string;
  };
}

const ReceiptDownload = ({ booking }: ReceiptDownloadProps) => {
  const generateReceipt = () => {
    const receiptContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>RentEV Booking Receipt</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { color: #2563eb; font-size: 28px; font-weight: bold; }
          .receipt-details { margin-bottom: 30px; }
          .booking-info, .car-info, .pricing { margin-bottom: 20px; }
          .section-title { font-weight: bold; color: #374151; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
          .info-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
          .total-row { font-weight: bold; font-size: 18px; border-top: 2px solid #2563eb; padding-top: 10px; margin-top: 10px; }
          .footer { text-align: center; margin-top: 40px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">RentEV</div>
          <h2>Booking Receipt</h2>
          <p>Receipt #${booking.id}</p>
        </div>
        
        <div class="receipt-details">
          <div class="booking-info">
            <div class="section-title">Booking Information</div>
            <div class="info-row">
              <span>Booking Date:</span>
              <span>${new Date(booking.bookingDate).toLocaleDateString()}</span>
            </div>
            <div class="info-row">
              <span>Status:</span>
              <span>${booking.status.toUpperCase()}</span>
            </div>
            <div class="info-row">
              <span>Pickup Date:</span>
              <span>${new Date(booking.startDate).toLocaleDateString()}</span>
            </div>
            <div class="info-row">
              <span>Return Date:</span>
              <span>${new Date(booking.endDate).toLocaleDateString()}</span>
            </div>
            <div class="info-row">
              <span>Duration:</span>
              <span>${booking.totalDays} days</span>
            </div>
          </div>
          
          <div class="car-info">
            <div class="section-title">Vehicle Information</div>
            <div class="info-row">
              <span>Vehicle:</span>
              <span>${booking.carBrand} ${booking.carName}</span>
            </div>
            <div class="info-row">
              <span>Pickup Location:</span>
              <span>${booking.pickupLocation}</span>
            </div>
            <div class="info-row">
              <span>Drop-off Location:</span>
              <span>${booking.dropoffLocation}</span>
            </div>
          </div>
          
          <div class="pricing">
            <div class="section-title">Pricing Details</div>
            <div class="info-row">
              <span>Rate per day:</span>
              <span>₹${booking.pricePerDay}</span>
            </div>
            <div class="info-row">
              <span>Number of days:</span>
              <span>${booking.totalDays}</span>
            </div>
            <div class="info-row">
              <span>Subtotal:</span>
              <span>₹${booking.subtotal}</span>
            </div>
            <div class="info-row">
              <span>GST (18%):</span>
              <span>₹${Math.round(booking.tax)}</span>
            </div>
            <div class="info-row total-row">
              <span>Total Amount:</span>
              <span>₹${Math.round(booking.total)}</span>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>Thank you for choosing RentEV!</p>
          <p>For support, contact us at support@rentev.com or +91-1234567890</p>
          <p>This is a computer-generated receipt and does not require a signature.</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([receiptContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RentEV-Receipt-${booking.id}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={generateReceipt}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      Download Receipt
    </Button>
  );
};

export default ReceiptDownload;
