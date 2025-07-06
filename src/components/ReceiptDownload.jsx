import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2pdf from "html2pdf.js";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-GB");

const ReceiptDownload = ({ booking }) => {
  const generateHTML = () => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Pick&Go Booking Receipt</title>
      <style>
        body {
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #f0f4f8;
          color: #1f2937;
          max-width: 720px;
          margin: auto;
          padding: 40px 20px;
        }
        .header {
          text-align: center;
          background: linear-gradient(to right, #3b82f6, #60a5fa);
          color: white;
          padding: 24px;
          border-radius: 12px 12px 0 0;
        }
        .logo {
          font-size: 32px;
          font-weight: 700;
        }
        .receipt-title {
          font-size: 18px;
          margin-top: 4px;
        }
        .section {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          padding: 20px;
          margin-top: 20px;
        }
        .section-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 10px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 4px;
        }
        .row {
          display: flex;
          justify-content: space-between;
          margin: 5px 0;
        }
        .total-row {
          margin-top: 12px;
          border-top: 2px dashed #3b82f6;
          font-weight: bold;
          font-size: 16px;
          padding-top: 8px;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          font-size: 13px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Pick&Go</div>
        <div class="receipt-title">Booking Receipt</div>
        <div>Receipt #${booking.id}</div>
      </div>

      <div class="section">
        <div class="section-title">Booking Information</div>
        <div class="row"><span>Booking Date:</span><span>${formatDate(booking.bookingDate)}</span></div>
        <div class="row"><span>Status:</span><span>${booking.status.toUpperCase()}</span></div>
        <div class="row"><span>Pickup Date:</span><span>${formatDate(booking.startDate)}</span></div>
        <div class="row"><span>Return Date:</span><span>${formatDate(booking.endDate)}</span></div>
        <div class="row"><span>Duration:</span><span>${booking.totalDays} days</span></div>
      </div>

      <div class="section">
        <div class="section-title">Vehicle Information</div>
        <div class="row"><span>Vehicle:</span><span>${booking.carBrand} ${booking.carName}</span></div>
        <div class="row"><span>Pickup Location:</span><span>${booking.pickupLocation}</span></div>
        <div class="row"><span>Drop-off Location:</span><span>${booking.dropoffLocation}</span></div>
      </div>

      <div class="section">
        <div class="section-title">Pricing Details</div>
        <div class="row"><span>Rate per Day:</span><span>₹${booking.pricePerDay}</span></div>
        <div class="row"><span>Subtotal:</span><span>₹${booking.subtotal}</span></div>
        <div class="row"><span>GST (18%):</span><span>₹${Math.round(booking.tax)}</span></div>
        <div class="row total-row"><span>Total:</span><span>₹${Math.round(booking.total)}</span></div>
      </div>

      <div class="footer">
        <p>Thanks for choosing <strong>Pick&Go</strong> 🚗</p>
        <p>Contact us at <a href="mailto:support@pickgo.com">support@pickgo.com</a> or +91-1234567890</p>
        <p>This is a computer-generated receipt and doesn't need a signature.</p>
      </div>
    </body>
    </html>
  `;

  const downloadAsPDF = () => {
    const element = document.createElement("div");
    element.innerHTML = generateHTML();
    html2pdf().from(element).save(`Pick&Go_Receipt_${booking.id}.pdf`);
  };

  return (
    <div className="flex gap-3">
      <Button
        onClick={() => {
          const blob = new Blob([generateHTML()], { type: "text/html" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `Pick&Go_Receipt_${booking.id}.html`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }}
        variant="outline"
        className="text-blue-600 border-blue-500 hover:bg-blue-50"
      >
        <Download className="mr-2 h-4 w-4" />
        Download Web
      </Button>

      <Button
        onClick={downloadAsPDF}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        <Download className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
    </div>
  );
};

export default ReceiptDownload;
