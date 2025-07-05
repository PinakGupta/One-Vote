Here's the properly formatted and cleaned-up version of your provided content in complete **README.md** code form:

````markdown
# OneVote - Secure, Flexible Voting Platform

**OneVote** is a comprehensive web-based voting platform built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It delivers a secure, transparent, and user-friendly voting experience designed for educational institutions, societies, and organizations.

---

## 🚀 Features

### 🔧 Admin Capabilities

- **Multiple Election Management**  
  Create and manage multiple elections simultaneously. Each election has:
  - Unique Election ID
  - Title & description
  

- **Candidate Control**  
  Add candidates with name, party, state, and photo. Remove candidates even during active elections to handle disqualifications or withdrawals.

- **Voter Whitelisting & Email Integration**  
  Whitelist voters per election and send Election IDs automatically via email using Resend API.

- **Result Visibility Control**  
  Choose when to display results (immediately or later) with interactive bar charts built with Recharts.

---

## 💡 Voter Experience

- Responsive UI for both desktop and mobile  
- Access elections via unique **Election ID**  
- One-click vote submission  
- Detailed candidate cards with photos and manifestos  
- View participation history across multiple elections

---

## 📸 Screenshots

> _Add screenshots of admin dashboard, voting page, OTP verification, result chart, etc._

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT, Bcrypt, OTP  
- **Email API:** Resend  
- **Image Hosting:** Cloudinary  
- **Charting:** Recharts

---

## 🚧 Setup Instructions

### 🔹 Frontend (Client)

```bash
git clone https://github.com/your-repo/onevote-frontend.git
cd onevote-frontend
npm install
npm start
````

* Runs at: `http://localhost:3000`
* By default, communicates with backend at: `http://localhost:5000`

---

### 🔹 Backend (Server)

```bash
git clone https://github.com/your-repo/onevote-backend.git
cd onevote-backend
npm install
```

Create a `.env` file with the following variables:

```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
RESEND_API_KEY=<your-resend-api-key>
CLOUDINARY_URL=<your-cloudinary-url>
```

Start the backend in development mode:

```bash
npm run dev
```

* Runs at: `http://localhost:5000`
* Exposes REST APIs for: authentication, OTP verification, election handling, candidate management, voting, and result retrieval.

---

## 📈 Use Cases

* Student council elections
* University or departmental voting
* Club or society leadership polls
* Organizational board or leadership elections

---

## 🎯 Conclusion

**OneVote** is a **professional, secure, and flexible** voting solution. It enhances traditional tools like Google Forms by offering:

* Real-time candidate management
* Voter authentication
* Election-specific access via Election IDs
* Transparent result handling
* Responsive design for modern users
