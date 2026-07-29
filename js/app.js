import { renderCalendar } from "./calendar.js";
import { renderSchedule } from "./schedule.js";
import { updateStats } from "./stats.js";

// ==========================
// Initialize
// ==========================

renderCalendar();
renderSchedule();
updateStats();

// ==========================
// Date
// ==========================

document.getElementById("todayDate").textContent =
new Date().toLocaleDateString(undefined,{
    weekday:"long",
    year:"numeric",
    month:"long",
    day:"numeric"
});

// ==========================
// Update stats when attendance changes
// ==========================

document.addEventListener(
    "attendanceChanged",
    updateStats
);

// ==========================
// Theme Button
// ==========================

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("theme");

if(savedTheme==="dark"){
    document.body.classList.add("dark");
    themeBtn.textContent="☀️";
}

themeBtn.onclick=()=>{

    document.body.classList.toggle("dark");

    const dark=document.body.classList.contains("dark");

    localStorage.setItem(
        "theme",
        dark ? "dark" : "light"
    );

    themeBtn.textContent=
        dark ? "☀️" : "🌙";

};

// ==========================
// Future Workout Toggle
// ==========================

const futureBtn = document.getElementById("futureBtn");

let allowFuture =
    localStorage.getItem("allowFuture") === "true";

function updateFutureButton() {

    futureBtn.textContent = allowFuture ? "🔓" : "🔒";

    futureBtn.title = allowFuture
        ? "Future Workouts Enabled"
        : "Future Workouts Locked";

}

futureBtn.onclick = () => {

    allowFuture = !allowFuture;

    console.log("allowFuture =", allowFuture);

    localStorage.setItem(
        "allowFuture",
        allowFuture
    );

    updateFutureButton();

    renderCalendar();

    updateStats();

};

updateFutureButton();

// ==========================
// Print
// ==========================

document
.getElementById("printBtn")
.onclick=()=>window.print();

// ==========================
// Reset
// ==========================

document
.getElementById("resetBtn")
.onclick=()=>{

    if(confirm("Reset all data?")){

        localStorage.clear();

        location.reload();

    }

};

// Export & Import
// (We'll build these in v2.0.2)
