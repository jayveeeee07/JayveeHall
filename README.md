# Jayvee Hall of Mansion - Hotel Management System

A **fully functional** hotel management system website built using **HTML, CSS, and JavaScript** (no database required).  
Supports **account registration, login, room browsing, booking with receipt download, and an admin panel** to view reservations.  
Optimized for **desktop and mobile** and deployable on **GitHub Pages**.

---

## 📌 Features

1. **Landing Page**
   - Welcome message with Terms & Policy checkbox.
   - "Get Started" button that navigates to Login page.

2. **Login & Signup**
   - User account registration with local storage.
   - Age check: under 18 requires parental assistance.
   - Admin Login (username: `admin`, password: `admin123`) to access admin panel.

3. **Home Page**
   - Grid layout of rooms with images, descriptions, and prices.
   - Click to view details or proceed to booking.
   - Responsive layout for **mobile & desktop**.

4. **Booking System**
   - Online reservation form with:
     - Name, number of people, date of stay
     - Online payment option (Gcash / Seabank)
     - Upload payment proof
   - Prevents **duplicate bookings for the same date**
   - Generates a **downloadable receipt (PNG)**

5. **Admin Panel**
   - View all user accounts and booking details.
   - Prevents **duplicate reservations**.
   - Stores data locally (browser localStorage).

---

## 📂 Project Structure

JayveeHall/ ├── index.html         # Landing Page ├── login.html         # Login Page ├── signup.html        # Signup Page ├── home.html          # Hotel Home with room grid ├── booking.html       # Booking / Reservation Form ├── admin.html         # Admin Panel ├── style.css          # Main CSS file (responsive) ├── script.js          # All functional JS ├── html2canvas.min.js # For receipt screenshot └── assets/ ├── logo.jpg ├── room1.jpg ├── room2.jpg ├── room3.jpg └── room4.jpg

---

## 💻 Installation

1. **Clone or download** the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/JayveeHall.git

2. Open the index.html file in a browser OR deploy using GitHub Pages.




---

🌐 GitHub Pages Deployment

1. Push the folder to a new GitHub repository.


2. Go to Settings → Pages.


3. Under Build and Deployment, select:

Source: Deploy from branch

Branch: main (or master)

Folder: /root



4. Click Save and wait for the deployment.


5. Your site will be live at:

https://Jayveeeee07.github.io/JayveeHall/




---

🛠 Technologies Used

HTML5

CSS3 (Responsive Design)

JavaScript (ES6) for functionality

html2canvas.js for generating receipts



---

🔑 Default Admin Credentials

Username: admin

Password: admin123



---

📸 Screenshots

Landing Page



Home Page (Room Grid)



Booking Form



Admin Panel




---

📜 License

This project is for educational purposes and can be modified for personal or commercial use.


---


