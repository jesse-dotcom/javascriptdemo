//Tehdään vakio muuttujat

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//Tapahtumat
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

// Luodaan funktiot

function addTodo(event) { //Toiminto syötteen lisäämisestä listalle

    event.preventDefault(); //Tämä funktio estämään sivun päivittymistä


    const todoDiv = document.createElement('div'); //Luodaan todo -luokka
    todoDiv.classList.add('todo');

    const newToDo = document.createElement('li'); // luodaan lista
    if (todoInput.value === '') {
        alert("Kirjoita jotain...");
    } else {
    newToDo.innerText = todoInput.value;
    newToDo.classList.add('todo-item');
    todoDiv.appendChild(newToDo); 

    

    saveLocalTodos(todoInput.value); //Tällä lisätään todo selaimen muistiin

    const completed = document.createElement('button'); //Luodaan "Valmis" näppäin
    completed.innerHTML = "<i class='fas fa-check-circle'></i>";
    completed.classList.add('complete-btn');
    todoDiv.appendChild(completed)

    const del = document.createElement('button'); //Luodaan  "Poisto" näppäin
    del.innerHTML = "<i class='fas fa-trash-alt'></i>";
    del.classList.add('del-btn');
    todoDiv.appendChild(del);

    todoList.appendChild(todoDiv); //Komento lisää syötteen listalle

    todoInput.value = ""; //Syötteen lisäämisen jälkeen tämä komento tyhjentää input kentän
}
}
function deleteCheck(event) { //Funktio poisto ja valmis napille
    const item = event.target;

    if (item.classList[0] === 'del-btn') { //Poisto nappi
        const todo = item.parentElement;

        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });

    }

    if (item.classList[0] === 'complete-btn') { //Valmis nappi
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}



function saveLocalTodos(todo) { //Tallennetaan lista selaimen muistiin
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() { //Haetaan listan asiat selaimen muistista jos siellä jotain on
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) { //Toiminto listan asioille, Toiminnolla lisätään listaan asia, tallennetaan se selaimen muiostiin ja lisätään poisto ja valmis nappi

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newToDo = document.createElement('li');
        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        todoDiv.appendChild(newToDo);

        const completed = document.createElement('button'); //"Valmis" nappi ja liitetään se listan asiaan
        completed.innerHTML = "<i class='fas fa-check-circle'></i>";
        completed.classList.add('complete-btn');
        todoDiv.appendChild(completed)

        const del = document.createElement('button'); //Poisto nappi ja liitetään se listan asiaan
        del.innerHTML = "<i class='fas fa-trash-alt'></i>";
        del.classList.add('del-btn');
        todoDiv.appendChild(del);

        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) { //KOmento poistaa listan asiat selaimen muistista kun lista on tyhjä
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoindex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}