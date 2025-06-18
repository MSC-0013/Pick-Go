# 🛺 Pick‑Go

A full-featured, responsive MERN stack application for booking and managing electric vehicle (EV) trips.
Built using MongoDB, Express, React, Node.js, and enhanced with TailwindCSS, JWT Auth, and modern UI libraries.

🌐 Live URL: [https://pick-go-rho.vercel.app](https://pick-go-rho.vercel.app)

🚀 Features
🌐 Full user registration and login with JWT authentication

🔍 Browse and filter available EVs

🗓️ Intuitive booking with date selection and pricing

📋 Trip dashboard to manage upcoming, active, and past bookings

📄 Downloadable receipts (HTML & PDF format)

🔔 Beautiful toast notifications for actions

🛠️ Optional admin panel for managing vehicles and users (if enabled)

🛠️ Tech Stack
Layer    Technology
Frontend    React, React Router, Tailwind CSS
Backend     Node.js, Express.js, JWT, bcrypt
Database     MongoDB,  Atlas
PDF Tool   html2pdf.js / jsPDF
Storage    Local Storage (auth token, bookings)
UI Library  Radix UI / ShadCN, Lucide Icons
Toast   Custom Toast Hook + Toast UI

📦 Installation & Setup

1. Clone the Repository
git clone [https://github.com/MSC-0013/Pick-Go.git](https://github.com/MSC-0013/Pick-Go.git)
cd Pick-Go
2. Configure Environment Variables
Backend .env (inside /server):

env
Copy
Edit
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
Frontend .env (inside /client):
REACT_APP_API_URL=<http://localhost:5000/api>
3. Run the App
Start Backend:
cd server
npm install
npm run dev
Start Frontend:
npm install
npm run dev

🧪 Usage
Navigate to [http://localhost:3000](http://localhost:3000)

Register or log in

Browse available EVs

Book a trip with selected dates

View bookings in the dashboard

Download trip receipts as PDF or HTML

🔐 Security & Authentication
Passwords hashed using bcrypt

JWT-based token authentication

Protected API routes on backend

Auth-guarded routes on frontend

Basic form validation and error handling

✅ Contributing
Contributions are welcome!
Feel free to open issues, suggest features, or submit pull requests.

Suggested Improvements:
Add payment gateway (Razorpay/Stripe)

Improve calendar UX

Add vehicle images and filters

Build full admin dashboard

Add internationalization (i18n) support

📸 Optional Enhancements
📷 Add screenshots of UI inside a /screenshots folder

🎥 Demo video or GIF preview

🧪 API documentation inside a /docs folder

🌐 Deployment instructions (Vercel/Render/Heroku)

🏷️ Badges: GitHub stars, build status, license, etc.
