// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
document.addEventListener('DOMContentLoaded', () => {

  const todoList = document.getElementById('todo-list'); 
  const addButton = document.getElementById('add-btn');
  const todoInput = document.getElementById('todo-input');
  const errorMsg = document.getElementById('error-msg'); 
  const counter = document.getElementById('counter');     
  const filterAll = document.getElementById('filter-all');
  const filterActive = document.getElementById('filter-active');
  const filterDone = document.getElementById('filter-done');


  let currentFilter = 'all';

  function updateCounter() {
    const left = todoList.querySelectorAll('li:not(.completed)').length;
      counter.textContent = `${left} item left`; 
  }

  function applyFilter() {
    todoList.querySelectorAll('li').forEach(li => {
      const done = li.classList.contains('completed');
      const show =
        currentFilter === 'all' ||
        (currentFilter === 'active' && !done) ||
        (currentFilter === 'done' && done);
      li.style.display = show ? '' : 'none';
    });
  }


addButton.addEventListener('click', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if(text === '') {
    errorMsg.classList.remove('hidden');
    return;
  }
  errorMsg.classList.add('hidden');

  const li = document.createElement('li');
  const span = document.createElement('span');
  span.classList.add('item-text');
  span.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = 'Delete';

  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
  
  todoInput.value = '';
  updateCounter();
  applyFilter(); 
});

todoList.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  
  if (e.target.classList.contains('delete-btn')) {
    li.remove();
  } else {
    li.classList.toggle('completed');
  }
  updateCounter();
  applyFilter(); 
});

filterAll.addEventListener('click', () => {
  currentFilter = 'all';
  applyFilter();
});

filterActive.addEventListener('click', () => {
  currentFilter = 'active';
  applyFilter();
});

filterDone.addEventListener('click', () => {
  currentFilter = 'done';
  applyFilter();
});


updateCounter();
});


