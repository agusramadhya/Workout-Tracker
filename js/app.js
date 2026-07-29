console.log("app.js loaded");

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
console.log(futureBtn);

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

// ==========================
// User Name
// ==========================

const userName = document.getElementById("userName");
const welcomeOverlay = document.getElementById("welcomeOverlay");
const nameInput = document.getElementById("nameInput");
const continueBtn = document.getElementById("continueBtn");

function loadUserName() {

    const saved = localStorage.getItem("userName");

    if (saved) {

        userName.textContent = saved;
        userName.classList.remove("empty");

    } else {

        userName.textContent = "Type your name...";
        userName.classList.add("empty");

        welcomeOverlay.classList.add("show");

        setTimeout(() => {

            nameInput.focus();

        }, 250);

    }

}

function saveUserName(name) {

    name = name.trim();

    if (!name) {

        localStorage.removeItem("userName");

        userName.textContent = "Type your name...";
        userName.classList.add("empty");

        return;

    }

    localStorage.setItem("userName", name);

    userName.textContent = name;
    userName.classList.remove("empty");

}

continueBtn.addEventListener("click", () => {

    const name = nameInput.value.trim();

    if (!name) return;

    saveUserName(name);

    welcomeOverlay.classList.remove("show");

});

nameInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        continueBtn.click();

    }

});

userName.addEventListener("click", () => {

    const current =
        localStorage.getItem("userName") || "";

    userName.contentEditable = true;

    userName.focus();

    document.execCommand("selectAll", false, null);

});

userName.addEventListener("blur", () => {

    userName.contentEditable = false;

    saveUserName(userName.textContent);

});

loadUserName();

// Export & Import
// (We'll build these in v2.0.2)

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 20) {

        header.classList.add("header-small");

    } else {

        header.classList.remove("header-small");

    }

});

