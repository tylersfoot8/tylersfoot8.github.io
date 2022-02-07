
function start() {
  if (localStorage.darkmode == 0) {
    var body = document.body;
    body.classList.toggle("dark-mode");
  } else {
    localStorage.darkmode = 1;
  }
}
window.onload = start;

function darkMode() {
   var body = document.body;
   body.classList.toggle("dark-mode");
   if (localStorage.darkmode != 1) {
     localStorage.darkmode = 1;
   } else {
     localStorage.darkmode = 0;
   }
}
