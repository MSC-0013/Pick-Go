# 🛺 Pick‑Go

A responsive **MERN stack** application for booking and managing electric vehicle (EV) trips.  
Built with **MongoDB**, **Express**, **React**, **Node.js**, and optional **TypeScript** support.

---

## 🚀 Features

- 🌐 Full user registration and authentication  
- 🔍 Browse and filter EVs  
- 🗓️ Booking flow with date selection, price calculation  
- 📋 “My Trips” dashboard (upcoming, active, past)  
- 📥 Download receipts as HTML/PDF  
- 📧 Realistic toast notifications and friendly UI  
- 🔧 Admin panel for managing listings & users (if implemented)

---

## 🛠️ Tech Stack

| Layer         | Technology              |
|---------------|-------------------------|
| Frontend      | React, React Router, Tailwind CSS |
| Backend       | Node.js, Express, JWT, bcrypt |
| Database      | MongoDB (Atlas or local) |
| PDF Generation| html2pdf.js or jsPDF |
| Storage       | Local storage (tokens, persisted bookings) |
| UI Library    | RADIX UI / ShadCN + Lucide Icons |
| Notifications | Custom hook + Toast UI |

---

## 🛠️ Installation & Setup

1. **Clone**

   ```bash
   git clone https://github.com/MSC-0013/Pick-Go.git
   cd Pick-Go
# Server – .env
MONGO_URI=<your_mongo_uri>
JWT_SECRET=<your_jwt_secret>
# Client – .env
REACT_APP_API_URL=http://localhost:5000/api
cd server && npm install && npm run dev
cd ../client && npm install && npm start
🧪 Usage
Navigate to http://localhost:3000

Register and log in

Browse EVs and make a booking

View your trips dashboard

Download receipts via Download buttons

🛡️ Security & Auth
Password hashing with bcrypt

JWT-based authentication

Protected routes on backend and frontend

Basic validation + error handling

✅ Contributing
Feel free to submit issues or PRs!
Suggested roadmap:

Add payment gateway

Enhance booking calendar UX

Admin dashboard improvements

Internationalization (i18n)


---

### 💡 Tips to Elevate It

- **Screenshots**: Add GitHub screenshots of your UI.
- **Demo link**: Add a live demo or video walkthrough.
- **Endpoints**: Document API endpoints in a `docs/` folder.
- **Deploy instructions**: Include Heroku/Vercel details if deployed.
- **Badges**: Add build status, license, npm version badges.

Just copy, paste, and adapt—your README will be clean, professional, and very user-friendly. Let me know if you want help customizing any section!
::contentReference[oaicite:0]{index=0}
