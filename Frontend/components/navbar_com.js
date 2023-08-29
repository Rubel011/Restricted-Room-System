function navbar() {
  return `      <div class="navbar-logo">
    <a href="index.html">VideoCall</a>
  </div>
  <ul class="navbar-menu">
    <li class="nav-item"><a href="./index.html" class="nav-link">Home</a></li>
    <li class="nav-item"><a href="#" class="nav-link">About</a></li>
    <li class="nav-item"><a href="createRoom.html" class="nav-link">Create Room</a></li>
    <li class="nav-item"><a href="joinRoom.html" class="nav-link">Join Room</a></li>
    <li class="nav-item">
        <a href="#" id="loginbtn" class="nav-link" style="background-color: #e54391; padding: 6px 20px; color: #fff; margin: 0 10px;border-radius: 5px;">Log in</a>
    </li>
    <li class="nav-item">
        <i class="fa-regular fa-user"></i>
    <a href="#" id="userName" class="nav-link" style="margin-left:3px;color: #fff;font-size: 18px;">User</a>
    </li>
    
  </ul>
  <div class="hamburger">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </div>`;
}

export { navbar };
