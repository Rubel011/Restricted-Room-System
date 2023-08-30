const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
let roomId = urlParams.get('room')
const backend_link = 'https://restricted-room.onrender.com'
let userDetails = JSON.parse(localStorage.getItem("userDetails")) || null;

if (!userDetails) {
    printError("You are not logged in, please login")
    setTimeout(() => { window.location.href = "login.html" }, 20000)
} else {
    checkUser()
}
function checkUser() {
    fetch(`${backend_link}/rooms/checkUser`, {
        method: "POST",
        headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ roomId })
    }).then(e => e.json()).then((response) => {
        console.log(response)
        if (response.message) {
            printSuccessMessage(response.message)
        } else {
            setInterval(() => {
                printError()
            }, 1000);
        }

    }).catch(e => {
        console.log(e);

    });
}


function printError(text) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: text || 'You are not allowed to access this room',
        footer: '<a href="">Why do I have this issue?</a>'
    })
}


function printSuccessMessage(text) {
    text = text || "You have successfully joined the room"
    Swal.fire(
        'Good job!',
        `${text}`,
        'success'
    )
}