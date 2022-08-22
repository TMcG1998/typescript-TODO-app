import { v4 as uuidV4 } from "uuid" 
// Create a type for typescript
type Task = {
    id: string,
    title: string,
    completed: boolean,
    createdAt: Date
 }
// Constants to store DOM elements
const list = document.querySelector<HTMLUListElement>("#list");
const taskForm = document.getElementById("new-task-form") as HTMLFormElement | null;
const taskTitle = document.querySelector<HTMLInputElement>("#new-task-title");

// Array of Tasks to store tasks taken from local storage
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

// Upon submitting the form
taskForm?.addEventListener("submit", event => {
    event.preventDefault();

    // Ensure the title has a value
    if(taskTitle?.value == "" || taskTitle?.value == null) return

    // Set the task constant to contain the appropriate values
    const task: Task = {
        id: uuidV4(),
        title: taskTitle.value,
        completed: false,
        createdAt: new Date()
    }
    // Push this task into the task array
    tasks.push(task);

    // Call add list item and reset value in the input to empty
    addListItem(task)
    taskTitle.value = "";
})

// Adds a list item based on the form input
function addListItem(task: Task) {
    // Create elements to store the data we are displaying
    const item = document.createElement("li")
    const label = document.createElement("label")
    const checkbox = document.createElement("input")

    // If the checkbox is changed, update the task completed value
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked
        saveTasks()
    })

    // Set checkbox to be a checkbox that matches the status of its completed status
    checkbox.type = "checkbox"
    checkbox.checked = task.completed

    // Append the list item to the list
    label.append(checkbox, task.title)
    item.append(label)
    list?.append(item)
    // Save the new information into local storage
    saveTasks();
}

// Saves the current tasks array to local storage 
function saveTasks() {
    localStorage.setItem("Tasks", JSON.stringify(tasks))
}

// Loads the tasks array from local storage, if there are none, return an empty array
function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem("Tasks")
    if (taskJSON == null) return []
    return JSON.parse(taskJSON)
}