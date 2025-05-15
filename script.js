// Utility Functions
function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "{}");
  }
  
  function setUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }
  
  function getAppointments(username) {
    return JSON.parse(localStorage.getItem(`appointments_${username}`) || "[]");
  }
  
  function setAppointments(username, appointments) {
    localStorage.setItem(`appointments_${username}`, JSON.stringify(appointments));
  }
  
  // Register Page Logic
  if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("registerUsername").value.trim();
      const password = document.getElementById("registerPassword").value;
      const users = getUsers();
  
      if (users[username]) {
        alert("User already exists.");
        return;
      }
  
      if (!username) {
        alert("Username cannot be empty.");
        return;
      }
  
      users[username] = password;
      setUsers(users);
      alert("Registered successfully!");
      window.location.href = "index.html";
    });
  }
  
  // Login Page Logic
  if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value;
      const users = getUsers();
  
      if (users[username] === password) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid credentials.");
      }
    });
  }
  
  // Dashboard Logic
  if (window.location.pathname.endsWith("dashboard.html")) {
    const username = localStorage.getItem("loggedInUser");
    if (!username) window.location.href = "index.html";
  
    // Populate assigned users dropdown (excluding self)
    function populateAssignedUsers() {
      const users = getUsers();
      const assignedUsersSelect = document.getElementById("assignedUsers");
      assignedUsersSelect.innerHTML = "";
  
      Object.keys(users).forEach(user => {
        if (user !== username) {
          const option = document.createElement("option");
          option.value = user;
          option.textContent = user;
          assignedUsersSelect.appendChild(option);
        }
      });
    }
    window.populateAssignedUsers = populateAssignedUsers;
  
    // Form submission for appointment creation
    document.getElementById("appointmentForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const title = document.getElementById("title").value.trim();
      const date = document.getElementById("date").value;
      const assignedUsersSelect = document.getElementById("assignedUsers");
  
      if (!title || !date) {
        alert("Please enter title and date.");
        return;
      }
  
      const assignedUsers = Array.from(assignedUsersSelect.selectedOptions).map(opt => opt.value);
  
      // Include self in assigned users
      if (!assignedUsers.includes(username)) {
        assignedUsers.push(username);
      }
  
      // Create and assign the appointment to each selected user
      assignedUsers.forEach(user => {
        const userAppointments = getAppointments(user);
        userAppointments.push({ title, date, assignedUsers, completed: false });
        setAppointments(user, userAppointments);
      });
  
      alert("Appointment added and shared!");
      e.target.reset();
      renderAppointments();
      refreshCalendar();
    });
  
    // Render appointments on the dashboard
    window.renderAppointments = function () {
      const appointmentsList = document.getElementById("appointmentsList");
      const completedList = document.getElementById("completedList");
      appointmentsList.innerHTML = "";
      completedList.innerHTML = "";
  
      let appointments = getAppointments(username).sort((a, b) => new Date(a.date) - new Date(b.date));
      const incomplete = appointments.filter(a => !a.completed);
      const completed = appointments.filter(a => a.completed);
  
      if (incomplete.length === 0) {
        appointmentsList.innerHTML = "<li>No upcoming appointments.</li>";
      } else {
        incomplete.forEach((appt, index) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <strong>${appt.title}</strong><br>
            <small>${new Date(appt.date).toLocaleString()}</small><br>
            <button onclick="markDone(${index})">Done</button>
            <button onclick="editAppointment(${index})">Edit</button>
            <button onclick="deleteAppointment(${index})">Delete</button>
            <br><small>Shared with: ${appt.assignedUsers.join(", ")}</small>
          `;
          appointmentsList.appendChild(li);
        });
      }
  
      if (completed.length === 0) {
        completedList.innerHTML = "<li>No completed appointments.</li>";
      } else {
        completed.forEach((appt, index) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <strong style="text-decoration: line-through;">${appt.title}</strong><br>
            <small style="text-decoration: line-through;">${new Date(appt.date).toLocaleString()}</small><br>
            <button onclick="deleteCompleted(${index})">Delete</button>
            <br><small>Shared with: ${appt.assignedUsers.join(", ")}</small>
          `;
          completedList.appendChild(li);
        });
      }
    };
  
    // Mark appointment as completed
    window.markDone = function (index) {
      let appointments = getAppointments(username);
      const incomplete = appointments.filter(a => !a.completed);
      const apptToMark = incomplete[index];
      const fullIndex = appointments.findIndex(a => a.title === apptToMark.title && a.date === apptToMark.date);
  
      if (fullIndex !== -1) {
        appointments[fullIndex].completed = true;
        setAppointments(username, appointments);
        renderAppointments();
        refreshCalendar();
      }
    };
  
    // Delete incomplete appointment
    window.deleteAppointment = function (index) {
      let appointments = getAppointments(username);
      const incomplete = appointments.filter(a => !a.completed);
      const apptToDelete = incomplete[index];
      appointments = appointments.filter(a => !(a.title === apptToDelete.title && a.date === apptToDelete.date));
      setAppointments(username, appointments);
      renderAppointments();
      refreshCalendar();
    };
  
    // Delete completed appointment
    window.deleteCompleted = function (index) {
      let appointments = getAppointments(username);
      const completed = appointments.filter(a => a.completed);
      const apptToDelete = completed[index];
      appointments = appointments.filter(a => !(a.title === apptToDelete.title && a.date === apptToDelete.date));
      setAppointments(username, appointments);
      renderAppointments();
      refreshCalendar();
    };
  
    // Edit appointment
    window.editAppointment = function (index) {
      let appointments = getAppointments(username);
      const incomplete = appointments.filter(a => !a.completed);
      const apptToEdit = incomplete[index];
      const fullIndex = appointments.findIndex(a => a.title === apptToEdit.title && a.date === apptToEdit.date);
  
      const newTitle = prompt("Edit Title:", apptToEdit.title);
      const newDate = prompt("Edit Date (YYYY-MM-DDTHH:MM):", apptToEdit.date);
  
      if (newTitle && newDate) {
        appointments[fullIndex].title = newTitle;
        appointments[fullIndex].date = newDate;
        setAppointments(username, appointments);
        renderAppointments();
        refreshCalendar();
      }
    };
  }
  
  // Logout function
  function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  }
  
  // Refresh FullCalendar events (called after render)
  function refreshCalendar() {
    const username = localStorage.getItem("loggedInUser");
    const appointments = getAppointments(username);
    const events = appointments.map(appt => ({
      title: appt.title,
      start: appt.date,
      allDay: false
    }));
  
    if (window._fcCalendar) {
      window._fcCalendar.removeAllEvents();
      window._fcCalendar.addEventSource(events);
    }
  }
  