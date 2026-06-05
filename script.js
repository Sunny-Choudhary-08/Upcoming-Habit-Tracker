let allTasks = [];
let totalTask = 0;
let completedTask = 0;

let inputTask = document.querySelector("#inputHu");
let addBtn = document.querySelector("#addBtn");
let todoTask = document.querySelector(".todoTask");
let progressBar = document.querySelector(".progressBar");

let date = new Date();
let currDate = date.toDateString();
let yesterdayDate = new Date();
yesterdayDate.setDate(yesterdayDate.getDate() - 1);
yesterdayDate = yesterdayDate.toDateString();



console.log(currDate)

let items = localStorage.getItem("tasks");

let newArr = JSON.parse(items);

forRefresh(newArr);





addBtn.addEventListener("click", () => {

    if (inputTask.value != "") {
        checkDuplicateTask(allTasks);
        if (found === false) {
            createTaskAddListener();
        }

    }
    else {
        console.error("task cannot be empty");
    }


});



let found = false;

function checkDuplicateTask(allTasks) {
    found = false;
    if (allTasks.length != 0) {
        allTasks.forEach((arr) => {
            if (arr.input === inputTask.value) {
                found = true;
                console.error("duplicate Task not allowed !!")
            }
        })
    }
    return found;

};


function saveToLocalStorage(allTasks) {
    if (allTasks.length === 0) {
        localStorage.clear();
    }
    else {
        localStorage.setItem("tasks", JSON.stringify(allTasks));
    }
}




function forRefresh(newArr) {

    if (newArr != null) {
        newArr.forEach((lala) => {

            allTasks.push({
                input: lala.input,
                status: lala.status,
                streak: lala.streak,
                lastStreakDate: lala.lastStreakDate
            });

        });


        calculateProgress();


        createTaskForRefresh();

    }


}


function calculateProgress() {

    completedTask = 0;
    streak = 0;
    allTasks.forEach((cmp) => {
        if (cmp.status === "completed") {
            completedTask = completedTask + 1
        }
    });

    totalTask = allTasks.length;



    if (totalTask === 0) {
        progressBar.textContent = "0%";
        progressBar.style.backgroundColor = "white";
        progressBar.style.width = "0%"
        document.querySelector(".data1").textContent = "0"
        document.querySelector(".data2").textContent = "0";

    }
    else {

        document.querySelector(".data1").textContent = `${completedTask}`
        document.querySelector(".data2").textContent = totalTask;

        progressBar.textContent = `${((completedTask / totalTask)) * 100}%`;
        progressBar.style.width = `${((completedTask / totalTask)) * 100}%`;
        progressBar.style.backgroundColor = "blue"
    }


}


function createTaskAddListener() {



    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const taskTitle = document.createElement("h2");
    taskTitle.setAttribute("id", "todoTask");
    taskTitle.textContent = inputTask.value.trim();

    const streakInfo = document.createElement("h4");
    streakInfo.textContent = "Streak : 0"

    const status = document.createElement("p");
    status.textContent = "incomplete";

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";

     const editBtn = document.createElement("button");
        editBtn.textContent = "Update";

        editBtn.classList.add("editBtn");
delBtn.classList.add("deleteBtn");


    let user = {
        input: inputTask.value,
        status: status.textContent,
        streak: 0,
        lastStreakDate: null
    }


    allTasks.push(user);
    calculateProgress();




    checkbox.addEventListener("click", () => {

        if (checkbox.checked) {
            taskTitle.style.textDecoration = "line-through";
            status.textContent = "completed";
            if (user.lastStreakDate != currDate) {
                user.streak += 1
                user.lastStreakDate = currDate
                streakInfo.textContent = `Streak : ${user.streak}`;
            }
        } else {
            taskTitle.style.textDecoration = "none";
            status.textContent = "incomplete";
        }
        user.status = status.textContent;
        calculateProgress();


        saveToLocalStorage(allTasks)

    });


    delBtn.addEventListener("click", () => {
        alert("Do you want to delete your task");
        taskDiv.remove();

        allTasks = allTasks.filter((task) => {
            return taskTitle.textContent != task.input; // jis ki bhi value false aayegi usko he hata dega yee filter krdega array se

        });
        // totalTask = allTasks.length;

        calculateProgress();

        saveToLocalStorage(allTasks);


        console.log(` deleted Task : - ${taskTitle.textContent}`);
    });

    editBtn.addEventListener("click" , () => {
     

        alert("Do you want to edit");
        let edited = prompt("Enter the new task");
        let newEdited ="";

        if(edited === null ) {
            return
        }else {
            newEdited= edited.trim()
        }
           

           if(newEdited != null&& newEdited !="") {

           if(newEdited!=user.input) {
            taskTitle.textContent = newEdited;
           user.input = newEdited
           }else {
            console.error("Same input cannot be taken again")
           }

           }
           else {
            console.error("cannot be empty")
           }


            saveToLocalStorage(allTasks);


    });




    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(status);
    taskDiv.appendChild(editBtn);
    taskDiv.appendChild(delBtn);
    taskDiv.appendChild(streakInfo)
    document.querySelector(".allTasks").appendChild(taskDiv);

    saveToLocalStorage(allTasks);
    inputTask.value = "";
}

function createTaskForRefresh() {
    allTasks.forEach((mamla) => {

        reset(mamla);
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const taskTitle = document.createElement("h2");
        taskTitle.setAttribute("id", "todoTask");
        taskTitle.textContent = mamla.input;

        const status = document.createElement("h4");
        status.textContent = mamla.status

        const streakInfo = document.createElement("p");
        streakInfo.textContent = `Streak : ${mamla.streak}`;

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Update";

        editBtn.classList.add("editBtn");
delBtn.classList.add("deleteBtn");

        checkbox.addEventListener("click", () => {
            if (checkbox.checked) {

                taskTitle.style.textDecoration = "line-through";
                status.textContent = "completed";

                if (mamla.lastStreakDate === currDate) {
                    console.log("do nothing")
                }
                else if (mamla.lastStreakDate === null) {
                    mamla.streak = 1;
                    mamla.lastStreakDate = currDate;
                }
                else if (mamla.lastStreakDate === yesterdayDate) {
                    mamla.streak++;
                    mamla.lastStreakDate = currDate;

                }
                else {
                    mamla.streak = 1
                    mamla.lastStreakDate = currDate;
                }

                streakInfo.textContent = `Streak : ${mamla.streak}`;


            } else {
                taskTitle.style.textDecoration = "none";
                status.textContent = "incomplete";
            }


            mamla.status = status.textContent;
            calculateProgress();


            saveToLocalStorage(allTasks);

        });


        if (mamla.status === 'completed') {
            taskTitle.style.textDecoration = "line-through";
            checkbox.checked = true;
        }

        delBtn.addEventListener("click", () => {
            alert("Do you want to delete your task");
            taskDiv.remove();

            allTasks = allTasks.filter((task) => {
                return taskTitle.textContent != task.input;
            });

            calculateProgress();
            saveToLocalStorage(allTasks);
            console.log(` deleted Task : - ${taskTitle.textContent}`);
        });

    
     editBtn.addEventListener("click" , () => {
     

        alert("Do you want to edit");
        let edited = prompt("Enter the new task");
        let newEdited ="";

        if(edited === null ) {
            return
        }else {
            newEdited= edited.trim()
        }
           
           if(newEdited != null&& newEdited !="") {

           if(newEdited!=mamla.input) {
            taskTitle.textContent = newEdited;
           mamla.input = newEdited
           }else {
            console.error("Same input cannot be taken again")
           }

           }
           else {
            console.error("cannot be empty")
           }


            saveToLocalStorage(allTasks);

    });

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskTitle);
        taskDiv.appendChild(status);
        taskDiv.appendChild(editBtn);
        taskDiv.appendChild(delBtn);
        taskDiv.appendChild(streakInfo);
        document.querySelector(".allTasks").appendChild(taskDiv);
    })
    saveToLocalStorage(allTasks);

}


// function reset(mamla) {

//     if (mamla.lastStreakDate != currDate) {
//         mamla.status = "incomplete"
//     }
// }


function reset(mamla) {

    if (mamla.lastStreakDate === null) {
        return;
    }

    let lastDate = new Date(mamla.lastStreakDate);
    let today = new Date(currDate);

    let diffTime = today - lastDate;
    let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Daily reset
    if (diffDays >= 1) {
        mamla.status = "incomplete";
    }

    // Streak break
    if (diffDays > 1) {
        mamla.streak = 0;
    }
}



