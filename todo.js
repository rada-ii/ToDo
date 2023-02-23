let addTodo = document.querySelector(".add");
let list = document.querySelector(".todos");
const search = document.querySelector(".search input");
let timer = document.querySelector("#timer");

let addTemplate = (todo, alarm) => {
  let html = `<li class="list-group-item d-flex justify-content-between align-items-center">
                <div class="w-100">
                  <span class="mr-1 description">${todo}</span>`;
  if (alarm) {
    const alarmTime = new Date(alarm).getTime();
    const currentTime = Date.now();
    let alarmHtml = `<div class="d-flex justify-content-end align-items-center w-100 icons">
                      <div class="alarm d-flex align-items-right"><i class="far fa-clock"></i><span class="ml-0">${alarm}</span>`;
    if (alarmTime < currentTime) {
      alarmHtml += '<i class="fas fa-exclamation-triangle text-danger "></i>';
    }
    alarmHtml += `</div>                                   
                    <i class="far fa-trash-alt delete" style="float: right;"></i>
                  </div>
                </div>
              </li>`;
    html += alarmHtml;
  } else {
    html += `  <i class="far fa-trash-alt delete" style="float: right;"></i>
         </div>
            </li>`;
  }
  list.innerHTML += html;
};

const filterTodo = (term) => {
  // add filtered class
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  // remove filtered class
  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

// Listen for the submit event on the addTodo form
addTodo.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent default form submission behavior
  let todo = addTodo.add.value.trim();
  let alarm = addTodo.alarm.value.trim();
  if (todo.length) {
    addTemplate(todo, alarm); // call the addTemplate function directly
    if (alarm) {
      let time = new Date(alarm).getTime() - Date.now();
      setTimeout(() => {
        alert(`Time's up for ${todo}!`);
      }, time);
    }
    list.lastElementChild.scrollIntoView({ behavior: "smooth" });
  }
  addTodo.reset(); // reset the form fields
});

// filter todos event
search.addEventListener("input", () => {
  const term = search.value.trim().toLowerCase();
  filterTodo(term);
});

// delete search value

// search.addEventListener("mouseout", () => {
//   search.value = "";
// });

// // delete todo event
// list.addEventListener("click", (e) => {
//   if (e.target.classList.contains("delete")) {
//     e.target.parentElement.parentElement.remove();
//   }
// });
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const todoItem = e.target.closest("li"); // find the closest li element
    if (todoItem) {
      todoItem.remove(); // remove the li element if found
    }
  }
});

timer.addEventListener("mouseover", (e) => {
  e.currentTarget.type = "datetime-local";
});
timer.addEventListener("mouseleave", (e) => {
  e.currentTarget.type = "text";
});
