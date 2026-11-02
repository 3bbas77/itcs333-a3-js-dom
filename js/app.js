// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
document.addEventListener('DOMContentLoaded', () => {

const todoList = document.getElementById('#todo-list');
const addButton = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const errorMessage = document.getElementById('error-message');
const deleteButton = document.getElementById('delete-btn');
const filterAll = document.getElementById('filter-all');
const filterActive = document.getElementById('filter-active');
const filterDone = document.getElementById('filter-done');

let currentFilter = 'all';

function updateCounter() {
    const left = todoList.querySelectorAll('li:not(.completed)').length;
    counter.textContent = `${left} item(s) left`;
  }

function applyFilter() {
  const items = todoList.querySelectorAll('li');

  // Using a loop to go through each list item
  items.forEach(li => {
    const isCompleted = li.classList.contains('completed');

    if (currentFilter === 'all') {
      li.style.display = '';
    } 
    else if (currentFilter === 'active') {
      if (isCompleted) {
        li.style.display = 'none';
      } else {
        li.style.display = '';
      }
    } 
    else if (currentFilter === 'done') {
      if (isCompleted) {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    }
  });
}

function addTodoItem(e) {
const text = e.target.value.trim();
if(text === '') {
    errorMsg.classList.remove('hidden');
    return;
}
errorMsg.classList.add('hidden');

const li = document.createElement('li');
li.textContent = text;

const deleteBtn = document.createElement('button');
deleteBtn.textContent = 'Delete';
li.appendChild(deleteBtn);

todoList.appendChild(li);
todoInput.value = '';

updateCounter();
applyFilter();
}

addButton.addEventListener('click', addTodoItem);

todoInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTodoItem(e);
  }
});

todoList.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('completed');
    updateCounter();
    applyFilter();
  }
});

if (e.target.classList.contains('delete-btn')) {
      const li = e.target.closest('li');
      if (li) {
        li.remove();
        updateCounter();
      }
    }
if (filterAll) {
    filterAll.addEventListener('click', () => {
      currentFilter = 'all';
      applyFilter();
    });
  }
  if (filterActive) {
    filterActive.addEventListener('click', () => {
      currentFilter = 'active';
      applyFilter();
    });
  }
  if (filterDone) {
    filterDone.addEventListener('click', () => {
      currentFilter = 'done';
      applyFilter();
    });
  }

  // Initial counter call on load
  updateCounter();
  });

