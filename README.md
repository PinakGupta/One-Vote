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

### User Interface Overview
![User Interface Overview](https://res.cloudinary.com/dkk2rer7z/image/upload/v1751739791/Screenshot_2025-07-05_235144_i6enzo.png)![](https://res.cloudinary.com/dkk2rer7z/image/upload/v1751739877/Screenshot_2025-07-05_235410_ld2xas.png)


### Admin Side Functionalities
![](https://res.cloudinary.com/dkk2rer7z/image/upload/v1751740012/Screenshot_2025-07-05_235622_zrutrw.png)
<br>
#### Create Election
![Create Election](https://res.cloudinary.com/dkk2rer7z/image/upload/v1751740109/Screenshot_2025-07-05_235802_rzogfa.png)

#### Manage Candidates
![Manage Candidates](https://res.cloudinary.com/dkk2rer7z/image/upload/v1751740231/Screenshot_2025-07-05_235953_hkjriw.png)

#### Voter Whitelisting
![Voter Whitelisting](https://res.cloudinary.com/dkk2rer7z/image/upload/v1751740323/IMG-20250705-WA0050_mvuolb.jpg)

#### Result Control
![Result Control](https://res.cloudinary.com/dkk2rer7z/image/upload/v1751740395/IMG-20250705-WA0042_rkv6xf.jpg)

### Voter Side Functionalities

#### Registration & OTP Verification
![Registration & OTP Verification](https://res.cloudinary.com/dkk2rer7z/image/upload/v1751740457/IMG-20250705-WA0037_rratdu.jpg)![](https://res.cloudinary.com/dkk2rer7z/image/upload/v1751740514/WhatsApp_Image_2025-05-20_at_02.10.14_6225b492_mo7bjm.jpg)
![](https://res.cloudinary.com/dkk2rer7z/image/upload/v1751740870/Screenshot_2025-07-06_000549_csvmm2.png)

#### Join Election
![Join Election](https://res.cloudinary.com/dkk2rer7z/image/upload/v1751740980/Screenshot_2025-07-06_001219_l2am0h.png)


#### Cast Vote
![Cast Vote](https://res.cloudinary.com/dkk2rer7z/image/upload/v1751741089/Screenshot_2025-07-06_001359_ddkgc6.png)

#### View Results
![View Results](https://res.cloudinary.com/dkk2rer7z/image/upload/v1751740788/IMG-20250705-WA0034_edotp2.jpg)

#### Account Management
![Account Management](https://res.cloudinary.com/dkk2rer7z/image/upload/v1751741182/IMG-20250705-WA0029_rskt44.jpg)

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
```

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
