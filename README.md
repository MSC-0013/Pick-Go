# 🛺 Pick‑Go

A full-featured, responsive **MERN Stack** application for booking and managing electric vehicle (EV) trips.

Built using **MongoDB**, **Express**, **React**, **Node.js**, styled with **TailwindCSS**, and secured via **JWT Authentication**.

---

## 🌐 Live Demo

🔗 [Click to Visit: Pick-Go Live](https://pick-go-rho.vercel.app)

---

## 🚀 Features

- 🔐 User Registration & Login (JWT based)
- 🔍 Browse, filter, and select EVs
- 📅 Book trips with date pickers
- 📋 View dashboard of all bookings (past, upcoming, current)
- 📄 Download trip receipts (PDF & HTML)
- 🛠 Admin panel for EV/user management
- 🔔 Toast notifications for actions

---

## 🧑‍💻 Tech Stack

| Layer     | Technologies |
|-----------|--------------|
| Frontend  | React, React Router, Tailwind CSS |
| Backend   | Node.js, Express.js, JWT, bcrypt |
| Database  | MongoDB Atlas |
| UI Lib    | Radix UI / ShadCN, Lucide Icons |
| Toast     | Custom Hook + Toast UI |
| Storage   | LocalStorage (tokens, data) |
| PDF Tool  | `html2pdf.js`, `jsPDF` |

---

## 📸 Screenshots

---

### 🏠 Home Page

<pre>
The landing page introduces the platform with animations and call-to-actions.
Showcases electric vehicle availability and quick access to book a ride.
</pre>

<p float="left">
  <img src="screenshots/Home1.png" width="280"/>
  <img src="screenshots/Home2.png" width="280"/>
  <img src="screenshots/Home3.png" width="280"/>
  <img src="screenshots/Home4.png" width="280"/>
</p>

---

### 🔐 Authentication

<pre>
Simple and secure login & registration using JWT and bcrypt.
Handles new user onboarding and login state persistence via LocalStorage.
</pre>

<p float="left">
  <img src="screenshots/Login.png" width="300"/>
  <img src="screenshots/Register.png" width="300"/>
</p>

---

### 🛍️ Shop / Product Pages

<pre>
Users can browse electric vehicles, view details, and filter based on needs.
Each product page gives a detailed description, price, and availability.
</pre>

<p float="left">
  <img src="screenshots/Shop1.png" width="300"/>
  <img src="screenshots/Shop2.png" width="300"/>
  <img src="screenshots/Product.png" width="300"/>
</p>

---

### 🧾 Booking & Trip Dashboard

<pre>
Users can book a trip with date/time selection and manage all trips.
Displays current, upcoming, and past trips with downloadable receipts.
</pre>

<p float="left">
  <img src="screenshots/Booking.png" width="300"/>
  <img src="screenshots/Trip2.png" width="300"/>
  <img src="screenshots/Trip3.png" width="300"/>
</p>

---

### 👤 Profile & Settings

<pre>
Manage personal info, change password, and configure settings.
Update email, username, and enable/disable trip notifications.
</pre>

<p float="left">
  <img src="screenshots/Profile.png" width="300"/>
  <img src="screenshots/Setting1.png" width="300"/>
  <img src="screenshots/Setting2.png" width="300"/>
</p>

---

### 🛠 Admin Panel

<pre>
Powerful dashboard to manage users, bookings, and EV listings.
Add/edit/delete EVs, moderate users, and view system analytics.
</pre>

<p float="left">
  <img src="screenshots/Admin1.png" width="270"/>
  <img src="screenshots/Admin2.png" width="270"/>
  <img src="screenshots/Admin3.png" width="270"/>
  <img src="screenshots/Admin4.png" width="270"/>
  <img src="screenshots/Admin5.png" width="270"/>
</p>

---

### 💬 Support Page

<pre>
Users can reach out to customer support for queries or complaints.
Includes a simple contact form and quick help documentation.
</pre>

<p float="left">
  <img src="screenshots/Support.png" width="300"/>
</p>

---

## 📁 Project Structure (Optional)


---

## 📦 Installation & Setup

### 1. Clone the Repository
<pre>

git clone https://github.com/MSC-0013/Pick-Go.git
cd Pick-Go
</pre>

2. Configure Environment Variables
Backend – /server/.env
<pre>

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
</pre>

Frontend – /client/.env
<pre>

REACT_APP_API_URL=http://localhost:5000/api
</pre>


3. Run the App
Start Backend

<pre>

cd server
npm install
npm run dev
</pre>


Start Frontend
<pre>

cd client
npm install
npm run dev
</pre>



🧪 Usage Guide
<pre>
Register or log in as a user

Browse available electric vehicles

Select trip dates & confirm booking

Manage all your trips from the dashboard

Download trip receipts

If admin, manage users & EVs
</pre>

🔐 Security & Auth
<pre>

Passwords hashed via bcrypt

Auth handled via JWT tokens

Protected API routes with middleware

Frontend route guards and validation
</pre>

✨ Suggested Improvements
<pre>

🔁 Integrate Razorpay or Stripe for payments

📸 Add real vehicle images

🗓 Improve calendar UX with better date pickers

🌍 Add internationalization (i18n)

🧠 Add ML-based vehicle suggestions
</pre>
<pre>

🤝 Contributing
Contributions are welcome!
Submit a PR, open an issue, or suggest a new feature.

📂 Optional Enhancements
📸 All screenshots are placed in the /screenshots/ folder

📃 API documentation can go inside /docs/

🚀 Deployment via Vercel (Frontend) & Render (Backend)

🪪 License
This project is licensed under the MIT License

</pre>

👤 Author
Soumayshree Rout

🔗 GitHub: @MSC-0013

🌐 Portfolio: [[Portfolio](https://port-folio-tau-coral.vercel.app)]

📬 Contact
📧 Email: <soumyashreerout99@gmail.com>

💼 LinkedIn: [Linkedin Profile](https://www.linkedin.com/in/soumyashree-rout-500671253)
