const apiUrl = "http://localhost:3000/users"; // Replace with your API's URL if different

// Fetch and display all users
function fetchUsers() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const userList = document.getElementById("userList");
      userList.innerHTML = "";
      data.forEach(user => {
        const li = document.createElement("li");
        li.innerHTML = `<span>ID: ${user.id}, Name: ${user.name}, Email: ${user.email}</span>`;
        userList.appendChild(li);
      });
    })
    .catch(error => console.error("Error fetching users:", error));
}

// Create a new user
document.getElementById("createUserForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const name = document.getElementById("createName").value;
  const email = document.getElementById("createEmail").value;

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email })
  })
    .then(response => response.json())
    .then(user => {
      alert(`User created: ID ${user.id}`);
      fetchUsers();
    })
    .catch(error => console.error("Error creating user:", error));
});

// Update an existing user
document.getElementById("updateUserForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const id = document.getElementById("updateId").value;
  const name = document.getElementById("updateName").value;
  const email = document.getElementById("updateEmail").value;

  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email })
  })
    .then(response => {
      if (response.ok) {
        alert("User updated");
        fetchUsers();
      } else {
        alert("User not found");
      }
    })
    .catch(error => console.error("Error updating user:", error));
});

// Delete a user
document.getElementById("deleteUserForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const id = document.getElementById("deleteId").value;

  fetch(`${apiUrl}/${id}`, { method: "DELETE" })
    .then(response => {
      if (response.ok) {
        alert("User deleted");
        fetchUsers();
      } else {
        alert("User not found");
      }
    })
    .catch(error => console.error("Error deleting user:", error));
});

// Initial fetch to display all users on page load
fetchUsers();
