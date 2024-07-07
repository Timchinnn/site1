const inputElement = document.getElementById("title");
const createBtn = document.getElementById("create");
const listElement = document.getElementById("list");
const inputEditElement = document.getElementsByName("editTitle");

// const listElement = document.getElementById("list");
// const listElement = document.getElementById("list");

// const notes = ["Записать блог", "рассказать теорию", 45, 43657];

// function render() {
//   for (let note of notes) {
//     listElement.insertAdjacentHTML("beforeend", getNoteTemplate(note));
//   }
// }

// render();

// createBtn.onclick = function () {
//   if (inputElement.value.length === 0) {
//     return;
//   }
//   listElement.insertAdjacentHTML(
//     "beforeend",
//     getNoteTemplate(inputElement.value)
//   );

//   inputElement.value = "";
// };

// function getNoteTemplate(title) {
//   return `
//         <li
//             class="list-group-item d-flex justify-content-between align-items-center"
//             >
//             <span>${title}</span>
//             <span>
//                 <span class="btn btn-small btn-success">&check;</span>
//                 <span class="btn btn-small btn-danger">&times;</span>
//             </span>
//         </li>
//         `;
// }

const notes = [
  {
    title: "Записать блог",
    completed: false,
  },
  {
    title: "рассказать теорию",
    completed: true,
  },
];

function updateNoteTitle(index, newTitle) {
  notes[index].title = newTitle;
}

function render() {
  // for (let note of notes) {
  //   listElement.insertAdjacentHTML("beforeend", getNoteTemplate(note));
  // }
  listElement.innerHTML = "";
  if (notes.length === 0) {
    listElement.innerHTML = "<p>Нет элементов</p>";
  }
  for (let i = 0; i < notes.length; i++) {
    listElement.insertAdjacentHTML("beforeend", getNoteTemplate(notes[i], i));
  }
}

render();

createBtn.onclick = function () {
  if (inputElement.value.length === 0) {
    return;
  }
  const newNote = {
    title: inputElement.value,
    completed: false,
  };
  notes.push(newNote);
  render();

  inputElement.value = "";
};

listElement.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = Number(event.target.dataset.index);
    const type = event.target.dataset.type;
    const text = event.target.dataset.text;

    if (type === "toggle") {
      notes[index].completed = !notes[index].completed;
      render();
    } else if (type === "remove") {
      notes.splice(index, 1);
      render();
    } else if (type === "edit") {
      editNoteTitle(text, "");
    } else if (type === "toggleEdit") {
      const inputEditElement = document.getElementsByName("editTitle")[0];
      let currentValue = inputEditElement.value;
      if (currentValue === "") {
        alert("Пустое поле!");
        render();
      } else {
        updateNoteTitle(index, currentValue);
        render();
      }
    } else if (type === "editEdit") {
      const inputEditElement = document.getElementsByName("editTitle")[0];
      inputEditElement.value = "";
    } else if (type === "removeEdit") {
      render();
    }
  }
};

function editNoteTitle(noteTitle, newTitle) {
  const noteItems = document.querySelectorAll(".note-item");
  noteItems.forEach((noteItem, index) => {
    const noteContentSpan = noteItem.querySelector(".note-content span");
    if (noteContentSpan) {
      const noteTitle1 = noteContentSpan.textContent;
      if (noteTitle === noteTitle1) {
        const input = document.createElement("input");
        input.name = "editTitle";
        input.id = "editTitle";
        input.value = newTitle;
        input.classList.add("form-control");
        noteContentSpan.parentNode.replaceChild(input, noteContentSpan);

        const buttons = noteItem.querySelectorAll(".note-actions button");

        buttons.forEach((button) => {
          const buttonType = button.dataset.type;
          switch (buttonType) {
            case "toggle":
              button.dataset.type = "toggleEdit";
              break;
            case "remove":
              button.dataset.type = "removeEdit";
              break;
            case "edit":
              button.dataset.type = "editEdit";
              break;
          }
        });

        // Добавь обработчик события нажатия клавиши Enter
        const inputEditElement = document.getElementById("editTitle");
        if (inputEditElement) {
          inputEditElement.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
              let currentValue = inputEditElement.value;
              if (currentValue === "") {
                alert("Пустое поле!");
                render();
              } else {
                updateNoteTitle(index, currentValue);
                render();
              }
            }
          });
        }
      }
    }
  });
}

function getNoteTemplate(note, index) {
  return `<li class="list-group-item note-item">
  <div class="note-content">
    <span class="${note.completed ? "text-decoration-line-through" : ""}">${
    note.title
  }</span>
  </div>
  <div class="note-actions">
    <button class="btn btn-small btn-${
      note.completed ? "warning" : "success"
    }" data-index="${index}" data-type="toggle">
      &check;
    </button>
    <button class="btn btn-small btn-danger" data-index="${index}" data-type="remove">
      &times;
    </button>
     <button class="btn btn-small btn-primary" data-index="${index}" data-type="edit" data-text="${
    note.title
  }">
      🖊
    </button>
  </div>
</li>`;
}

const enterKey = document.addEventListener("DOMContentLoaded", function () {
  const inputElement = document.getElementById("title");
  inputElement.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      if (this.value.length === 0) {
        return;
      }
      const newNote = {
        title: this.value,
        completed: false,
      };
      notes.push(newNote);
      render();

      this.value = "";
    }
  });
});
