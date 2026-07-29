export function updateStats() {

    const circles = [...document.querySelectorAll(".circle")];

    const completed = circles.filter(c => c.classList.contains("done")).length;
    const total = circles.length;
    const remaining = total - completed;

    const progress = total
        ? Math.round((completed / total) * 100)
        : 0;

    document.getElementById("completed").textContent = completed;
    document.getElementById("remaining").textContent = remaining;
    document.getElementById("progress").textContent = progress + "%";

    document.getElementById("completedLine").style.width = progress + "%";
    document.getElementById("progressLine").style.width = progress + "%";

    calculateStreak();

}

function calculateStreak() {

    const today = new Date();
    const year = today.getFullYear();

    // ---------- CURRENT STREAK ----------

    let streak = 0;

const cursor = new Date(today);
cursor.setHours(0, 0, 0, 0);

while (true) {

    const key =
        `attendance-${cursor.getFullYear()}-${cursor.getMonth()}-${cursor.getDate()}`;

    const state = localStorage.getItem(key);

    // Workout and Rest Day both count toward the streak
    if (state === "done" || state === "rest") {

        streak++;

    } else {

        break;

    }

    cursor.setDate(cursor.getDate() - 1);

}
    // ---------- LONGEST STREAK ----------

    let longest = 0;
    let running = 0;

    for (let month = 0; month < 12; month++) {

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {

            const key = `attendance-${year}-${month}-${day}`;

            const state = localStorage.getItem(key);

            if (state === "done") {

                running++;
                longest = Math.max(longest, running);

            } else if (state === "rest") {

                // Doesn't increase,
                // doesn't reset.

            } else {

                running = 0;

            }

        }

    }

    document.getElementById("streak").textContent = "🔥 " + streak;
    document.getElementById("longest").textContent = "Longest: " + longest;

}
