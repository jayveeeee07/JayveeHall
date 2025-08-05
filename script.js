// Utility Functions for Local Storage
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getBookings() {
  return JSON.parse(localStorage.getItem("bookings") || "[]");
}

function saveBookings(bookings) {
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

/* -------------------- LOGIN -------------------- */
function handleLogin(formId) {
  const form = document.getElementById(formId);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = form.username.value.trim();
    const password = form.password.value.trim();

    // Admin Check
    if (username === "admin" && password === "admin123") {
      window.location.href = "admin.html";
      return;
    }

    const users = getUsers();
    const found = users.find(u => u.username === username && u.password === password);

    if (found) {
      localStorage.setItem("loggedInUser", JSON.stringify(found));
      alert("Login successful!");
      window.location.href = "home.html";
    } else {
      alert("Invalid username or password!");
    }
  });
}

/* -------------------- SIGNUP -------------------- */
function handleSignup(formId) {
  const form = document.getElementById(formId);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newUser = {
      firstName: form.firstName.value.trim(),
      middleName: form.middleName.value.trim(),
      lastName: form.lastName.value.trim(),
      suffix: form.suffix.value,
      sex: form.sex.value,
      status: form.status.value,
      birthdate: form.birthdate.value,
      age: form.age.value,
      address: form.address.value.trim(),
      contact: form.contact.value.trim(),
      email: form.email.value.trim(),
      username: form.username.value.trim(),
      password: form.password.value.trim(),
    };

    const users = getUsers();

    if (users.some(u => u.username === newUser.username)) {
      alert("Username already exists! Choose another.");
      return;
    }

    users.push(newUser);
    saveUsers(users);

    alert("Account created successfully! Please log in.");
    window.location.href = "login.html";
  });
}

/* -------------------- ROOM DETAILS MODAL -------------------- */
const rooms = [
  {
    title: "Deluxe Room - Room 101",
    desc: "Spacious deluxe room with a queen-sized bed, modern bathroom, free Wi-Fi, and a scenic view of Malungon. Enjoy a relaxing stay with our top amenities and 24/7 service.",
    price: "₱3,500 / night"
  },
  {
    title: "Executive Suite - Room 201",
    desc: "Our Executive Suite features a king-sized bed, living area, luxury bathroom, and balcony with stunning views. Perfect for business travelers or couples seeking comfort.",
    price: "₱5,200 / night"
  },
  {
    title: "Family Room - Room 301",
    desc: "Ideal for families, this room includes two double beds, a large bathroom, flat-screen TV, and complimentary breakfast. Enjoy spacious comfort for the whole family.",
    price: "₱4,000 / night"
  },
  {
    title: "Presidential Suite - Room 401",
    desc: "Experience ultimate luxury in our Presidential Suite with a master bedroom, living area, private dining, and a panoramic view of Sarangani. Perfect for VIP guests.",
    price: "₱8,000 / night"
  }
];

function showRoomDetails(index) {
  const modal = document.getElementById("roomModal");
  document.getElementById("roomTitle").innerText = rooms[index].title;
  document.getElementById("roomDesc").innerText = rooms[index].desc;
  document.getElementById("roomPrice").innerText = rooms[index].price;
  modal.style.display = "flex";
}

function closeRoomModal() {
  document.getElementById("roomModal").style.display = "none";
}

/* -------------------- BOOKING -------------------- */
function handleBooking(formId) {
  const form = document.getElementById(formId);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const people = form.people.value;
    const date = form.date.value;
    const payment = form.payment.value;
    const proof = form.proof.files[0];

    if (!date) {
      alert("Please select a date.");
      return;
    }

    // Check duplicate booking for same date
    const bookings = getBookings();
    if (bookings.some(b => b.date === date)) {
      alert("This date is already reserved! Please select another date.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const booking = {
        name,
        people,
        date,
        payment,
        proof: event.target.result,
      };

      bookings.push(booking);
      saveBookings(bookings);

      // Download Receipt as PNG
      generateReceiptPNG(booking);

      alert("Booking confirmed and saved!");
      window.location.href = "home.html";
    };

    if (proof) {
      reader.readAsDataURL(proof);
    } else {
      const booking = {
        name,
        people,
        date,
        payment,
        proof: null
      };
      bookings.push(booking);
      saveBookings(bookings);
      generateReceiptPNG(booking);
      alert("Booking confirmed and saved!");
      window.location.href = "home.html";
    }
  });
}

/* -------------------- GENERATE RECEIPT PNG -------------------- */
function generateReceiptPNG(booking) {
  const receipt = document.createElement("div");
  receipt.style.padding = "20px";
  receipt.style.background = "white";
  receipt.style.border = "1px solid #ccc";
  receipt.style.width = "300px";
  receipt.innerHTML = `
    <h3>Jayvee Hall of Mansion</h3>
    <p><strong>Name:</strong> ${booking.name}</p>
    <p><strong>People:</strong> ${booking.people}</p>
    <p><strong>Date:</strong> ${booking.date}</p>
    <p><strong>Payment:</strong> ${booking.payment}</p>
    <p><strong>Gcash:</strong> 09464766208 (E.C)</p>
    <p><strong>Seabank:</strong> 19169025449 (J.C)</p>
  `;
  document.body.appendChild(receipt);

  html2canvas(receipt).then(canvas => {
    const link = document.createElement("a");
    link.download = "Booking_Receipt.png";
    link.href = canvas.toDataURL();
    link.click();
    document.body.removeChild(receipt);
  });
}

/* -------------------- ADMIN PANEL -------------------- */
function loadAdminData() {
  const users = getUsers();
  const bookings = getBookings();

  const userList = document.getElementById("userList");
  const bookingList = document.getElementById("bookingList");

  if (userList) {
    userList.innerHTML = "";
    const uniqueUsers = Array.from(new Set(users.map(u => u.username)));
    uniqueUsers.forEach(username => {
      const u = users.find(x => x.username === username);
      const li = document.createElement("li");
      li.textContent = `${u.firstName} ${u.lastName} (${u.username})`;
      userList.appendChild(li);
    });
  }

  if (bookingList) {
    bookingList.innerHTML = "";
    const uniqueBookings = Array.from(new Set(bookings.map(b => b.date)));
    uniqueBookings.forEach(date => {
      const b = bookings.find(x => x.date === date);
      const li = document.createElement("li");
      li.textContent = `${b.name} - ${b.date} - ${b.people} People - ${b.payment}`;
      bookingList.appendChild(li);
    });
  }
        }
