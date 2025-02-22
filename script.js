document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus();
});

// Function to check login status
function checkLoginStatus() {
    if (localStorage.getItem("loggedIn") === "true") {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("password-container").style.display = "block";
        showPasswords();
    } else {
        document.getElementById("login-container").style.display = "block";
        document.getElementById("password-container").style.display = "none";
    }
}

// Function to log in user
function loginUser() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (username === "admin" && password === "password") {
        localStorage.setItem("loggedIn", "true");
        checkLoginStatus();
    } else {
        alert("Invalid credentials!");
    }
    return false;
}

// Function to log out
function logout() {
    localStorage.removeItem("loggedIn");
    checkLoginStatus();
}

// Function to mask password
function maskPassword(pass) {
    return "*".repeat(pass.length);
}

// Function to copy text
function copyText(txt) {
    navigator.clipboard.writeText(txt).then(() => {
        document.getElementById("alert").style.display = "inline";
        setTimeout(() => {
            document.getElementById("alert").style.display = "none";
        }, 2000);
    });
}

// Function to delete a password
const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    let arrUpdated = arr.filter(e => e.website !== website);
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    alert(`Deleted password for ${website}`);
    showPasswords();
};

// Function to display passwords
const showPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (!data || JSON.parse(data).length === 0) {
        tb.innerHTML = "<tr><td colspan='4'>No Data To Show</td></tr>";
    } else {
        tb.innerHTML = `<tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr>`;
        let arr = JSON.parse(data);
        arr.forEach(element => {
            tb.innerHTML += `<tr>
                <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.svg" width="10"></td>
                <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" width="10"></td>
                <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copy.svg" width="10"></td>
                <td><button onclick="deletePassword('${element.website}')">Delete</button></td>
            </tr>`;
        });
    }
};

// Function to save passwords
function savePassword() {
    let website = document.getElementById("website").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let passwords = localStorage.getItem("passwords");
    let json = passwords ? JSON.parse(passwords) : [];
    json.push({ website, username, password });
    localStorage.setItem("passwords", JSON.stringify(json));

    alert("Password Saved");
    showPasswords();
    return false;
}
