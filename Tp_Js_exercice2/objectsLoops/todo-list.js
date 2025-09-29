const todoList = [{
  name: 'review course',
  dueDate: '2025-09-29'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  // Loop over every toDo object and append it to "todoListHTML"
  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
      <div class="todo-item">
        <span>${name}</span>
        <span>${dueDate}</span>
        <button class="delete-todo-button" data-index="${index}">Supprimer</button>
      </div>
    `;
    todoListHTML += html;
  });

  // Show the objects inside the class "js-todo-list"
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
  // Loop over evey delete button  add an eventListener that deletes the toDo and rerender the Tasks
  const deleteButtons = document.querySelectorAll('.delete-todo-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = event.target.dataset.index;
      todoList.splice(index, 1);
      renderTodoList();
    });
  });

}


document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  // Add these values to the variable "todoList"

if (name && dueDate) {
    todoList.push({ name, dueDate });
  }

  inputElement.value = '';
  dateInputElement.value = '';

  renderTodoList();
}