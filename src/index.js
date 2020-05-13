import './styles.css'; //Importa estilos
import {Task, TaskList} from './classes'; 
import { createTaskHtml } from './js/componentes';

export const taskList = new TaskList();

taskList.tasks.forEach(task => createTaskHtml(task));

console.log('tasks:', taskList.tasks);