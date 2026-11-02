// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
document.addEventListener('DOMContentLoaded', () => {

  const todoList = document.getElementById('#todo-list'); // fixed: removed '#'
  const addButton = document.getElementById('#add-btn');
  const todoInput = document.getElementById('#todo-input');
  const errorMsg = document.getElementById('#error-msg'); 
  const counter = document.getElementById('#counter');     
  const filterAll = document.getElementById('filter-all');
  const filterActive = document.getElementById('#filter-active');
  const filterDone = document.getElementById('#filter-done');

  let currentFilter = 'all';

  function updateCounter() {
    const left = todoList.querySelectorAll('li:not(.completed)').length;
    if (counter) {
      counter.textContent = `${left} item left`; 
    }
  }

  function applyFilter() {
    const items = todoList.querySelectorAll('li');
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

  function addTodoItem() {
    const text = todoInput.value.trim(); // fixed: read directly from todoInput

    if (text === '') {
      if (errorMsg) errorMsg.classList.remove('hidden');
      return;
    }
    if (errorMsg) errorMsg.classList.add('hidden');

    const li = document.createElement('li');
    li.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn'); // added class so delegation works
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    todoInput.value = '';

    updateCounter();
    applyFilter();
  }

  addButton.addEventListener('click', addTodoItem);

  todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addTodoItem();
    }
  });

  // Single event delegation listener on #todo-list handling both toggle and delete
  todoList.addEventListener('click', function(e) {
    // 1. Toggle complete
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('completed');
      updateCounter();
      applyFilter();
    }
    
    // 2. Delete item
    if (e.target.classList.contains('delete-btn')) {
      const li = e.target.closest('li');
      if (li) {
        li.remove();
        updateCounter();
      }
    }
  });

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

  updateCounter();
});
