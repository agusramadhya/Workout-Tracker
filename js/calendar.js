const MONTHS=[
"JAN","FEB","MAR","APR","MAY","JUN",
"JUL","AUG","SEP","OCT","NOV","DEC"
];

export function renderCalendar() {

    const calendar = document.getElementById("calendar");

    calendar.innerHTML = "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Show the next 18 months
    for (let i = 0; i < 18; i++) {

        const currentMonth = new Date(
            today.getFullYear(),
            today.getMonth() + i,
            1
        );

        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const row = document.createElement("div");
        row.className = "month-row";

        const label = document.createElement("div");
        label.className = "month-label";
        label.textContent = `${MONTHS[month]} ${year}`;

        const days = document.createElement("div");
        days.className = "days";

        const totalDays = new Date(year, month + 1, 0).getDate();

        for (let day = 1; day <= totalDays; day++) {

            const wrapper = document.createElement("div");
            wrapper.className = "day";

            const number = document.createElement("div");
            number.className = "day-number";
            number.textContent = day;

            const circle = document.createElement("div");
            circle.className = "circle";
            circle.title = "Not Logged";

            const key = `attendance-${year}-${month}-${day}`;

            const circleDate = new Date(year, month, day);
            circleDate.setHours(0, 0, 0, 0);

            const allowFuture =
                localStorage.getItem("allowFuture") === "true";

            const isFuture = circleDate > today;

            if (isFuture && !allowFuture) {
                circle.classList.add("future");
            }

            const state = localStorage.getItem(key);

            if (state === "done") {
                circle.classList.add("done");
                circle.title = "Workout";
            }

            if (state === "rest") {
                circle.classList.add("rest");
                circle.title = "Rest Day";
            }

            if (
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {
                circle.classList.add("today");
            }

            circle.addEventListener("click", (e) => {

                e.stopPropagation();

                const allowFuture =
                    localStorage.getItem("allowFuture") === "true";

                if (isFuture && !allowFuture) {

                    showToast("⏳ Future workouts are locked.");

                    return;

                }

                showStatusMenu(circle, key);

            });

            wrapper.appendChild(number);
            wrapper.appendChild(circle);

            days.appendChild(wrapper);

        }

        row.appendChild(label);
        row.appendChild(days);

        calendar.appendChild(row);

    }

}

// ==========================================================
// STATUS MENU
// ==========================================================

const statusMenu = document.getElementById("statusMenu");

let activeCircle = null;
let activeKey = null;

function showStatusMenu(circle, key){

    activeCircle = circle;
    activeKey = key;

    const rect = circle.getBoundingClientRect();

statusMenu.style.left =
`${rect.left + rect.width/2 - 85}px`;
    statusMenu.style.top = `${rect.bottom + 8}px`;

    statusMenu.classList.add("show");

}

statusMenu.addEventListener("click",(e)=>{

    const button = e.target.closest("button");

    if(!button) return;

    const status = button.dataset.status;

activeCircle.classList.remove("done", "rest");

switch (status) {

    case "done":
        activeCircle.classList.add("done");
        localStorage.setItem(activeKey, "done");
        activeCircle.title = "Workout";
        break;

    case "rest":
        activeCircle.classList.add("rest");
        localStorage.setItem(activeKey, "rest");
        activeCircle.title = "Rest Day";
        break;

    default:
        localStorage.removeItem(activeKey);
        activeCircle.title = "Not Logged";
        break;

}

    statusMenu.classList.remove("show");

    document.dispatchEvent(
        new CustomEvent("attendanceChanged")
    );

});

document.addEventListener("click",()=>{

    statusMenu.classList.remove("show");

});

function showToast(message){

    const toast=document.getElementById("toast");

    if(!toast){
        alert(message);
        return;
    }

    toast.textContent=message;

    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer=setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}
