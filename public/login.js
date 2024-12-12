document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default submission

    const role = document.getElementById('role').value;
    const email = document.getElementById('email').value.trim(); // Trim to remove spaces
    const password = document.getElementById('password').value;

    if (!role || !email || !password) {
        alert('All fields are required!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Log for debugging
    console.log('Stored Users:', users);
    console.log('Login Inputs:', { role, email, password });

    // Check if the user exists
    const user = users.find(
        user => user.role === role && user.email === email && user.password === password
    );

    if (user) {
        alert(`${role} login successful!`);
        window.location.href = role === 'admin' ? 'index.html' : 'index.html';
    } else {
        alert('Invalid login credentials.');
    }
});
