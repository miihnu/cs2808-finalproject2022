let username = document.getElementById("username")
let password = document.getElementById("password")

username.style.backgroundColor = "orange";
password.style.backgroundColor = "orange";


username.addEventListener("input", checkUsername)
password.addEventListener("input", checkPassword)

let usernameValid = false;
let passwordValid = false;

function checkUsername(event) {
    username.style.backgroundColor = "orange";
    usernameValid = false;

    if (username.value.length > 5 && username.value.length <= 16) {
        usernameValid = true;
        username.style.backgroundColor = "lightgreen";
    }
}
function checkPassword(event) {
    password.style.backgroundColor = "orange";
    passwordValid = false;

    if (password.value.length > 6 && password.value.length <= 16) {
        passwordValid = true;
        password.style.backgroundColor = "lightgreen";
    }
}
function validate(event) {
    if (!(usernameValid && passwordValid)) {
        event.preventDefault();
    }
}