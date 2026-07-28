const DEFAULT_SCHEDULE = {
    monday: {
        title: "🏋 Push",
        workouts: [
            "Bench Press",
            "Incline DB Press",
            "Cable Fly",
            "Tricep Pushdown"
        ]
    },
    tuesday: {
        title: "💪 Pull",
        workouts: [
            "Pull Up",
            "Barbell Row",
            "Lat Pulldown",
            "Hammer Curl"
        ]
    },
    wednesday: {
        title: "🦵 Legs",
        workouts: [
            "Squat",
            "Romanian Deadlift",
            "Leg Extension",
            "Standing Calf Raise"
        ]
    },
    thursday: {
        title: "🔥 Upper",
        workouts: [
            "Shoulder Press",
            "Chest Press",
            "Cable Row"
        ]
    },
    friday: {
        title: "⚡ Arms",
        workouts: [
            "EZ Curl",
            "Tricep Extension",
            "Lateral Raise"
        ]
    },
    saturday: {
        title: "🏃 Cardio",
        workouts: [
            "30 min Walking",
            "Stretching"
        ]
    },
    sunday: {
        title: "😴 Rest",
        workouts: [
            "Recovery",
            "Mobility"
        ]
    }
};

const DAYS = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
];

export function renderSchedule(){

    const container=document.getElementById("schedule");

    container.innerHTML="";

    DAYS.forEach(day=>{

        const saved=JSON.parse(
            localStorage.getItem("schedule-"+day)
        ) || DEFAULT_SCHEDULE[day];

        const card=document.createElement("div");
        card.className="workout-card";

        card.innerHTML=`
            <div class="card-header">
                <h3 contenteditable="true"
                    class="editable-title">
                    ${saved.title}
                </h3>

                <span>${day.toUpperCase()}</span>
            </div>

            <div class="exercise-list"></div>

            <button class="add-btn">
                + Add Exercise
            </button>
        `;

        const list=card.querySelector(".exercise-list");

        saved.workouts.forEach(ex=>{

            addExercise(list,ex);

        });

        card.querySelector(".add-btn")
        .onclick=()=>{

            addExercise(list,"");

            saveCard(card,day);

        };

        card.addEventListener(
            "input",
            ()=>saveCard(card,day)
        );

        container.appendChild(card);

    });

}

function addExercise(parent,value){

    const row=document.createElement("div");

    row.className="exercise-row";

    row.innerHTML=`

        <input
            value="${value}"
            placeholder="Exercise name">

        <button class="delete-btn">

            ✕

        </button>

    `;

    row.querySelector(".delete-btn")
    .onclick=()=>{

        row.remove();

        document.dispatchEvent(
            new Event("scheduleChanged")
        );

    };

    row.querySelector("input")
    .addEventListener(
        "input",
        ()=>document.dispatchEvent(
            new Event("scheduleChanged")
        )
    );

    parent.appendChild(row);

}

function saveCard(card,day){

    const title=
    card.querySelector(".editable-title").innerText;

    const workouts=[
        ...card.querySelectorAll("input")
    ].map(i=>i.value)
    .filter(Boolean);

    localStorage.setItem(
        "schedule-"+day,
        JSON.stringify({
            title,
            workouts
        })
    );

}