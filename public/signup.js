document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default submission

    const role = document.getElementById('role').value;
    const email = document.getElementById('email').value.trim(); // Trim to remove spaces
    const password = document.getElementById('password').value;

    if (!role || !email || !password) {
        alert('All fields are required!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check for duplicate email
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert('User already exists. Please log in.');
        return;
    }

    // Add the new user to storage
    users.push({ role, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Signup successful! You can now log in.');
    window.location.href = 'login.html';
});
