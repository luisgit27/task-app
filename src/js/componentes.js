
// Referencias en el html

import {Task} from '../classes';
import {taskList} from '../index'

export const divTaskList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const createTaskHtml = (task) =>{

    const htmlTask = `
    
    <li class="${(task.completado) ? 'completed' : ''}" data-id="${task.id}">
	    <div class="view">
		    <input class="toggle" type="checkbox" ${(task.completado) ? 'checked' : ''}>
			<label>${task.name}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTask;
    divTaskList.append(div.firstElementChild); //Inserta el primer hijo

    return div.firstElementChild;

};

//Events

// Add task

txtInput.addEventListener('keyup', (event) =>{

    if(event.keyCode === 13 && txtInput.value.length > 0){

        const task = new Task(txtInput.value);
        taskList.newTask(task);
        
        createTaskHtml(task);
        txtInput.value = '';
    }
});

//Mark Completed

divTaskList.addEventListener('click', (event) =>{
    
    const nombreElemento = event.target.localName //input, label, boton
    const taskElemento = event.target.parentElement.parentElement;

    const taskId = taskElemento.getAttribute('data-id');
    

    if(nombreElemento.includes('input')){ //Click en el check
        taskList.markCompleted(taskId);
        taskElemento.classList.toggle('completed'); //Si no existe la clase la agrega y si no la quita
    } else if(nombreElemento.includes('button')){ //Hay que borrar
        taskList.deleteTask(taskId);
        divTaskList.removeChild(taskElemento); //Elimina el elemento html
    }
});

btnBorrar.addEventListener('click', () =>{
    
    taskList.deleteCompleteds();

    for(let i = divTaskList.children.length - 1; i >= 0; i-- ){

        const elemento = divTaskList.children[i];
        
        if(elemento.classList.contains('completed')){
            divTaskList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) =>{
    
    const filtro = event.target.text;

    if(!filtro){return;}

    anchorFiltros.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTaskList.children){

        elemento.classList.remove('hidden');

        const completado = elemento.classList.contains('completed');

        switch(filtro){

            case 'Pendientes':

                if(completado){
                    elemento.classList.add('hidden');
                }
                break;
            
            case 'Completados':

                if(!completado){
                    elemento.classList.add('hidden');
                }
        }
    }
});


