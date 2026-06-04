    let allTasks = [];
    let totalTask = 0;
    let completedTask = 0;

    let inputTask = document.querySelector("#inputHu");
    let addBtn = document.querySelector("#addBtn");
    let todoTask = document.querySelector(".todoTask");
    let progressBar = document.querySelector(".progressBar");


    let items = localStorage.getItem("tasks");

    let newArr = JSON.parse(items);

    forRefresh(newArr);




    addBtn.addEventListener("click", () => {

        if (inputTask.value != "") {
            checkDuplicateTask(allTasks);
            if (found === false) {


                const taskDiv = document.createElement("div");
                taskDiv.classList.add("task");

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";

                const taskTitle = document.createElement("h2");
                taskTitle.setAttribute("id", "todoTask");
                taskTitle.textContent = inputTask.value.trim();

                const status = document.createElement("h4");
                status.textContent = "Status : incomplete";

                const delBtn = document.createElement("button");
                delBtn.textContent = "Delete";

                let user = {
                    input: inputTask.value,
                    status: status.textContent
                }


                allTasks.push(user);
                  calculateProgress();




                checkbox.addEventListener("click", () => {

                    if (checkbox.checked) {
                        taskTitle.style.textDecoration = "line-through";
                        status.textContent = "completed";

                    } else {
                        taskTitle.style.textDecoration = "none";
                        status.textContent = "incomplete";

                    }
                    user.status = status.textContent;
                    // completedTask = 0;
                    // allTasks.forEach((cmp) => {
                    //     if (cmp.status === "completed") {
                    //         completedTask = completedTask + 1
                    //     }
                    // });
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




                taskDiv.appendChild(checkbox);
                taskDiv.appendChild(taskTitle);
                taskDiv.appendChild(status);
                taskDiv.appendChild(delBtn);
                document.querySelector(".allTasks").appendChild(taskDiv);

                saveToLocalStorage(allTasks);
                inputTask.value = "";
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
                    status: lala.status
                });
            
            });


            // totalTask = allTasks.length;

            calculateProgress();

                    


            // progressBar.textContent = `${((completedTask / totalTask)) * 100}%`;






            allTasks.forEach((mamla) => {
                const taskDiv = document.createElement("div");
                taskDiv.classList.add("task");

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";

                const taskTitle = document.createElement("h2");
                taskTitle.setAttribute("id", "todoTask");
                taskTitle.textContent = mamla.input;

                const status = document.createElement("h4");
                status.textContent = mamla.status

                const delBtn = document.createElement("button");
                delBtn.textContent = "Delete";

                checkbox.addEventListener("click", () => {
                    if (checkbox.checked) {
                        taskTitle.style.textDecoration = "line-through";
                        status.textContent = "completed";

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

                taskDiv.appendChild(checkbox);
                taskDiv.appendChild(taskTitle);
                taskDiv.appendChild(status);
                taskDiv.appendChild(delBtn);
                document.querySelector(".allTasks").appendChild(taskDiv);
            })


        }

        console.log(`totalTask : ${totalTask}`)
        console.log(`completedTask : ${completedTask}`)


    }


    function calculateProgress() {

        completedTask = 0;
                    allTasks.forEach((cmp) => {
                        if (cmp.status === "completed") {
                            completedTask = completedTask + 1
                        }
                    });

                    totalTask=allTasks.length;

          

            if(totalTask===0) {
                 progressBar.textContent = "0%";
                         progressBar.style.backgroundColor = "white";
                         progressBar.style.width = "0%"
                         document.querySelector(".data1").textContent = "0|"
                    document.querySelector(".data2").textContent = "0";
       
            }
            else {

                    document.querySelector(".data1").textContent = `${completedTask}|`
                    document.querySelector(".data2").textContent = totalTask;

                       progressBar.textContent = `${((completedTask / totalTask)) * 100}%`;
                         progressBar.style.width = `${((completedTask / totalTask)) * 100}%`;
                         progressBar.style.backgroundColor = "blue"
            }

        
    }






