document.getElementById("signup-toggle").addEventListener("click", function () {
    document.getElementById("login-form").classList.remove("active");
    document.getElementById("signup-form").classList.add("active");
});

document.getElementById("login-toggle").addEventListener("click", function () {
    document.getElementById("signup-form").classList.remove("active");
    document.getElementById("login-form").classList.add("active");
});
const backend_link = 'https://restricted-room.onrender.com'
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const usernameInput = document.getElementById("loginemail");
    const passwordInput = document.getElementById("loginPassword");
    const username = usernameInput.value;
    const password = passwordInput.value;
    const data = { email: username, password: password };
    console.log(data)
    if (password && username != "") {
        fetch(`${backend_link}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.error) {
                    printError(res.error)
                } else {
                    localStorage.setItem("token", res.token)
                    localStorage.setItem("userDetails", JSON.stringify(res.user))
                    Swal.fire(
                        'Good job!',
                        res.success || 'Successfully LoggedIn',
                        'success'
                    )
                    setTimeout(() => {
                        window.location.href = "joinRoom.html"
                    }, 1500)


                }
            })
            .catch(error => {
                console.error(error);
                alert("Invalid Credentials")
            });
    } else {
        printError()
    }

});

const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("Password");
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const data = { userName: username, email: email, password: password };
    console.log(data)
    if (email && password && username != "") {
        fetch(`${backend_link}/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.success) {
                    // alert(res.msg)
                    Swal.fire(
                        'Good job!',
                        `${res.success}`,
                        'success'
                    )
                    setTimeout(() => {
                        document.getElementById("signup-form").classList.remove("active");
                        document.getElementById("login-form").classList.add("active");
                    }, 1000)
                } else {
                    // alert(res.message)
                    printError(res.error)
                }

            })
            .catch(error => {

                console.error(error);
            });
    } else {
        printError()
        // alert("please fill all details")
    }

});


function printError(text) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: text || 'please fill all details',
        footer: '<a href="">Why do I have this issue?</a>'
    })
}