import { navbar } from "../components/navbar_com.js";
const navbarContainer = document.getElementById("navbarContainer");
const backend_link = 'https://restricted-room.onrender.com'
navbarContainer.innerHTML = navbar();

// hambarger codes
document.querySelector('.hamburger').addEventListener('click', function () {
    document.querySelector('.navbar-menu').classList.toggle('active');
    document.querySelector('.hamburger').classList.toggle('active');
});




// setting username
let userDetails = JSON.parse(localStorage.getItem("userDetails")) || null;
let loginbtn = document.getElementById("loginbtn");

if (userDetails) {
    document.getElementById("userName").innerText = `👏Hi, ${userDetails?.userName}`;
    loginbtn.innerText = "Logout";
} else {
    setTimeout(() => {
        printLoginError("Please login Yourself first")

    }, 2000)
    // window.location.href = "login.html"
}

loginbtn.addEventListener("click", () => {
    if (userDetails) {
        fetch(`${backend_link}/users/logout`, {
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then((res) => res.json()).then((res) => {
            localStorage.removeItem("userDetails");
            localStorage.removeItem("token");
            window.location.href = "index.html";

        }).catch((err) => { console.log(err) })


    } else {
        window.location.href = "login.html";

    }
});



function printLoginError(text) {
    Swal.fire({
        position: "center",
        icon: "error",
        title: text || "Please Login First",
        showConfirmButton: true,
    });
}

