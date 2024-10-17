function togglePassword() {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.getElementById("togglePassword");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    }
}

function setRole(role) {
    document.getElementById('role').value = role;
    document.getElementById('dropdownMenuButton').innerText = role;
    validateFields();
}

function validateFields() {
    let isValid = true;

    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const role = document.getElementById('role');
    const loginBtn = document.getElementById('login-btn');

    if (!username.value) {
        document.getElementById('username-error').innerText = 'ต้องกรอก Username';
        isValid = false;
    } else {
        document.getElementById('username-error').innerText = '';
    }

    if (!password.value) {
        document.getElementById('password-error').innerText = 'ต้องกรอก Password';
        isValid = false;
    } else {
        document.getElementById('password-error').innerText = '';
    }

    if (!role.value) {
        document.getElementById('role-error').innerText = 'ต้องกรอกตำแหน่ง';
        isValid = false;
    } else {
        document.getElementById('role-error').innerText = '';
    }


    loginBtn.disabled = !isValid;
}

document.getElementById('username').addEventListener('input', validateFields);
document.getElementById('password').addEventListener('input', validateFields);

document.getElementById("login-btn").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const data = {
        "UserName": username,
        "PassWord": password
    };

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TUf3bc02630252c4888c22e4d592c1a7681d352bc6a55567cd47f3ff91b23c9724279d2a6c6d718005d62b99bdc2bc2160'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === true) {
                document.getElementById("displayname_th").textContent = data.displayname_th;
                document.getElementById("result").style.display = "block";
            } else {
                alert("Login failed: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
});