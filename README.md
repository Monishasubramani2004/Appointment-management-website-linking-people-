# 🗓️ Simple Appointment Management System

A straightforward and user-friendly web application designed for managing appointments efficiently. This project provides basic functionalities for user registration, login, appointment scheduling, and viewing appointments on a calendar.

## ✨ Features

* **User Authentication**: Secure registration and login for individual users.
* **Appointment Scheduling**: Users can add new appointments with a title, date, and time.
* **Appointment Management**:
    * View all upcoming appointments.
    * Mark appointments as completed.
    * Edit existing appointment details (title, date/time).
    * Delete appointments.
* **Share Appointments**: Ability to share appointments with other registered users.
* **Interactive Calendar View**: Integrates FullCalendar.js to display appointments in a visual calendar format (monthly, weekly, daily views).
* **Responsive Design**: A basic layout that adapts to different screen sizes.
* **Client-Side Data Storage**: Utilizes browser's `localStorage` for user and appointment data (no backend database required).

## 🚀 Technologies Used

* **Frontend**:
    * HTML5 (for structure: `index.html`, `register.html`, `dashboard.html`)
    * CSS3 (for styling: `style.css`)
    * JavaScript (for logic: `script.js`)
* **Libraries**:
    * [FullCalendar.js](https://fullcalendar.io/) (for the interactive calendar)

## 📁 Project Structure
.
├── index.html          # Login page
├── register.html       # User registration page
├── dashboard.html      # Main dashboard for appointment management
├── style.css           # Global styles for the application
├── script.js           # JavaScript logic for authentication, appointments, and calendar
└── README.md           # This file
## 🛠️ Installation and Setup

This is a client-side only application, so no complex backend setup is required.

1.  **Clone the Repository (or download the files):**

    ```bash
    git clone https://github.com/Monishasubramani2004/Appointment-management-website-linking-people-.git
    cd Appointment-management-website-linking-people-
    ```

2.  **Open in Browser:**
    Simply open the `index.html` file in your web browser. You can do this by navigating to the file in your file explorer and double-clicking it, or by dragging and dropping it into an open browser window.

    Alternatively, for a local server experience (recommended for development):
    If you have Python installed, you can quickly spin up a local server:
    ```bash
    python -m http.server 8000
    ```
    Then, open your browser and go to `http://localhost:8000`.

    
## 📸 Screenshots



### Register Page

<img width="970" height="617" alt="register" src="https://github.com/user-attachments/assets/befe71f4-3e01-4786-a6e5-4163d6edc80c" />

### Dashboard - Add Appointment

<img width="862" height="867" alt="dashboard" src="https://github.com/user-attachments/assets/3fd3567a-9bb0-45f9-91ac-c259b5f320b3" />


### Dashboard - Appointment List & Calendar

<img width="920" height="872" alt="appointment" src="https://github.com/user-attachments/assets/2751b0ec-151e-475e-8657-446e1503b58a" />


<img width="878" height="687" alt="appointment 1" src="https://github.com/user-attachments/assets/1db9acfe-78c4-4fb7-b44c-5a01228e24c5" />


