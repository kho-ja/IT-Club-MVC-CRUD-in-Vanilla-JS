//! Model

let modelTodos = [
  {
    id: 1,
    todo: "Uxlash",
    isdone: true,
  },
  {
    id: 2,
    todo: "Yugurish",
    isdone: false,
  },
  {
    id: 3,
    todo: "Code yozish",
    isdone: false,
  },
  {
    id: 4,
    todo: "MVCni o'rganish",
    isdone: true,
  },
  {
    id: 5,
    todo: "Vscodeni bilish",
    isdone: true,
  },
];

//! View
const todos = document.querySelector("#todos");
function view(model = modelTodos) {
  todos.innerHTML = "";

  for (let i = 0; i < model.length; i++) {
    const e = model[i];
    let li = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = e.isdone;
    checkbox.onchange = () => changeIsDone(e.id, !e.isdone);
    li.appendChild(checkbox);

    let button = document.createElement("button");
    button.innerText = "delete";
    button.onclick = () => deleteTodo(e.id);

    if (e.isdone) {
      let s = document.createElement("s");
      s.innerText = e.todo;
      li.append(s);
    } else {
      let text = document.createTextNode(e.todo);
      li.appendChild(text);
    }

    li.append(button);

    todos.append(li);
  }
}
view();

//! Controller
//* Create
function create(text) {
  modelTodos.push({
    id: Math.max(...modelTodos.map((e) => e.id)) + 1,
    todo: text,
    isdone: false,
  });

  view();
}

//* Read
function filter(text) {
  let filteredItems = modelTodos.filter((e) =>
    e.todo.toLowerCase().includes(text.toLowerCase())
  );

  view(filteredItems);
}

//* Update
function changeIsDone(id, isdone) {
  let todo = modelTodos.find((e) => e.id == id);

  todo.isdone = isdone;

  view();
}

//* Delete
function deleteTodo(id) {
  let newModelTodos = modelTodos.filter((e) => e.id != id);

  modelTodos = newModelTodos;

  view();
}
