
const form = document.getElementById("todo-form")
const input = document.getElementById("new-todo")
const addBtn = document.getElementById("addBtn")

let userData = []
let user_id = null

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let inputVal = input.value

    // input me data hai to chalega
    if(inputVal !== ""){
        if(user_id !== null){
            // edit
            localStorage.removeItem("todos")
            userData.splice(user_id, 1, inputVal)
            localStorage.setItem("todos", JSON.stringify(userData))
            user_id = null
        }else{
            // insert
            userData.push(inputVal)
            localStorage.setItem("todos", JSON.stringify(userData))
        }

        // remove duplication date
        let removDuplicateData = new Set(userData)
        userData = [...removDuplicateData]

        input.value = ""
        render(userData)
        addBtn.innerText = "Add"
    }else{
        alert("Please enter text here...")
    }
})

const render = (data) => {
    let str = ""
    data.forEach((element, i) => {
        str += `
            <li>
                <p>${element}</p>
                <span>
                    <i onclick="deleteTodo(${i})" class="fa-solid fa-trash delete"></i>
                    <i onclick="updateTodo(${i})" class="fa-solid fa-pen-to-square edit"></i>
                </span>
            </li>
        `
    });
    document.getElementById("todo-list").innerHTML = str
}

const updateTodo = (id) => {
    user_id = id
    input.value = userData[id]
    addBtn.innerText = "Update"
}

const deleteTodo = (id) => {
    userData.splice(id, 1)
    localStorage.setItem("todos", JSON.stringify(userData))
    render(userData)
}

// IIFE :- Immedietaly invoked function expression

(
    function(){
        let preveData = JSON.parse(localStorage.getItem("todos")) || []
        userData = preveData
        render(userData)
    }
)()