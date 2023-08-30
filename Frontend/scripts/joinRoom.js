const form = document.getElementById("lobby__form");
const backend_link = 'https://restricted-room.onrender.com'


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const roomName = e.target.name.value;
    const roomId = e.target.room.value
    window.location = `mainRoom.html?room=${roomId}`
})