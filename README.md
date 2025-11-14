# Space Travel Booking App

## Overview
The **Space Travel Booking App** is an interactive, front-end-only web application that allows users to book space travel experiences. The app provides a dynamic and engaging user experience, featuring simulated authentication, real-time price calculations, and persistent booking management using `localStorage`.  

Users can log in, create and manage bookings, and view their reservations—all entirely on the client side.

---

## Features

### User Authentication & Session Management
- **Simulated User Login**
  - Login form available on the **Account/Login** page
  - Accepts email and password (no backend required)
  - Credentials saved in `localStorage` to simulate successful login
  - Session state (`isLoggedIn`, `username`) stored in `localStorage`
  - User redirected to home or dashboard after login

- **Session State & Logout**
  - Checks `localStorage` on page load for session information
  - Header displays user name/email when logged in
  - "Logout" button appears in header when logged in
  - Logging out clears session and updates UI

---

### Booking Creation & Management
- **Dynamic Booking Form**
  - Populates options from a local `data.json` file
  - Selecting a destination updates available packages
  - Form fields show/hide based on package selection (e.g., Suit Size only for “moonwalk”)
  - Supports multiple passengers dynamically

- **Live Price Calculation & Extras**
  - Base price updates with destination/package selection
  - Optional extras (insurance, photo pack, etc.) with clear pricing
  - Total price recalculates instantly as selections change
  - Final price displayed before submission

- **Client-Side Form Validation**
  - Validates required fields (name, email)
  - Email and phone formats validated using regex
  - Date restricted to future bookings within a 30-day window
  - Inline error messages next to invalid fields
  - Form cannot be submitted until all errors are resolved

- **Booking Persistence (Create)**
  - Valid bookings saved with unique IDs in `localStorage`
  - Users can log in or book as a “guest”
  - Confirmation shown after booking, with redirection to **My Bookings** or ticket page

---

### Booking CRUD Interface
- **View My Bookings**
  - Displays all reservations for the current user or guest session from `localStorage`
  - Each booking shows destination, date, and total price
  - Responsive, clear list layout for easy management

---

## User Stories

### Epic: User Authentication & Session Management
1. **Fake User Login**
   - User can log in with email/password
   - Session persists in `localStorage`
2. **Session State & Logout**
   - UI updates based on login state
   - Logout clears session

### Epic: Booking Creation & Management
3. **Dynamic Booking Form**
   - Destination selection updates packages and fields
   - Multiple passengers supported
4. **Live Price Calculation & Extras**
   - Total price updates in real time
5. **Client-Side Form Validation**
   - Validates required fields and correct formats
   - Prevents submission if errors exist
6. **Booking Persistence (Create)**
   - Stores bookings in `localStorage`
   - Shows confirmation and redirects after submission

### Epic: Booking CRUD Interface
7. **View My Bookings**
   - Displays user or guest bookings
   - Clear, responsive layout

---

## Technologies Used
- HTML, CSS, JavaScript
- `localStorage` for data persistence
- Client-side form validation and dynamic updates
- JSON file for destinations and packages

---

## How to Use
1. Open the application in a browser.
2. Log in using any email/password.
3. Navigate to the booking form and select a destination and package.
4. Add passengers and optional extras.
5. Review the dynamically calculated price.
6. Submit the booking to save it in `localStorage`.
7. View or manage your bookings on the **My Bookings** page.

---
