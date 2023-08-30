const form = document.getElementById("lobby__form");
const backend_link = 'https://restricted-room.onrender.com'


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const roomName = e.target.name.value;
    const allowedEmailIds = e.target.emailIds.value.split(',') || [];

    fetch(`${backend_link}/rooms/createRoom`, {
        method: "POST",
        headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ roomName, allowedEmailIds })
    }).then(e => e.json()).then((response) => {
        console.log(response) 
        window.location.href = "joinRoom.html"
    }).catch(e => { console.log(e) })


})