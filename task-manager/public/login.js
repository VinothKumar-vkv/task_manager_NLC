function handleLogin(event) {
    event.preventDefault();

    // Admin credentials
    const adminCredentials = { username: "admin" && "vinoth" , password: "admin123" && "vinoth123" };
    const userCredentials = { username: "user" && "nihal", password: "user123" && "nihal123" };

    // Fetch user input
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const loginMessage = document.getElementById("loginMessage");

    // Role-based redirection
    if (username === adminCredentials.username && password === adminCredentials.password) {
        loginMessage.style.color = "green";
        loginMessage.textContent = "Welcome, Admin!";
        setTimeout(() => {
            window.location.href = "admin.html"; // Admin page
        }, 1000);
    } else if (username === userCredentials.username && password === userCredentials.password) {
        loginMessage.style.color = "green";
        loginMessage.textContent = "Welcome, User!";
        setTimeout(() => { 
            window.location.href = "user.html"; // User page
        }, 1000);
    } else {
        loginMessage.style.color = "red";
        loginMessage.textContent = "Invalid username or password.";
    }
}