function addTodo(){
    if (!input_todo.value || input_todo.value.replace(/\s/g, '') === ''){ // 정규식으로 공백만 존재할 경우를 제외
        input_todo.value=''
        return 0
    }
    todos.push({'text': input_todo.value, 'checked': false});
    saveData();
    createTodoList();
    input_todo.value = '';
}
function saveData(){ // object 형태로 배열에 추가하고 
    storage.setItem('todos', JSON.stringify(todos));
}
function loadStorage(){ // 읽어올 todo가 있다면 배열로 반환, 아니라면 빈 배열로 반환
    return storage.length != 0 ? JSON.parse(storage.getItem('todos')):[]
}
function createTodoList(){
    todo_list_container.innerHTML = ''; // elements를 지워 중복된 todo list를 방지
    todos.forEach((todo,index) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const button = document.createElement('button');
        
        if (todo.checked) span.classList.add('checked');
        li.classList.add('flex', 'horizontal-between', 'vertical-center', 'li-spacing');
        span.classList.add('hover-pointer', 'test-class');
        button.className = 'del-btn';
        
        span.textContent=todo.text;
        button.textContent = 'x';

        span.addEventListener('click', () => {
            if (span.getAttribute('class').split(' ').length === 2){
                todo.checked = true;
                span.classList.add('checked');
                saveData();
            }else{
                todo.checked = false;
                span.classList.remove('checked');
                saveData();
            }
        });
        button.addEventListener('click', () => { // todo 삭제
            todos.splice(index, 1);
            saveData();
            createTodoList();
        });
        
        li.appendChild(span);
        li.appendChild(button);
        todo_list_container.appendChild(li);
    });
}

const input_todo = document.querySelector('.input-todo');
const add_todo_button = document.querySelector('.btn-add-todo');
const todo_list_container = document.querySelector('.todo-list-container');
const storage = window.localStorage;
let todos = loadStorage() // todo를 담을 배열
createTodoList();

input_todo.addEventListener('keyup', e => { // 엔터키를 누를 때 이벤트 발생
    if (e.key === 'Enter') {
        addTodo();
    }
});
add_todo_button.addEventListener('click', e => { // 버튼을 클릭할 때 이벤트 발생
    addTodo();
});
