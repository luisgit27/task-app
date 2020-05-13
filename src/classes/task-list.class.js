import { createTaskHtml, divTaskList } from "../js/componentes";
import { Task } from "./index";

export class TaskList{

    constructor(){
        // this.tasks = [];
        this.loadLocalStorage();
    }

    newTask(task){
        this.tasks.push(task);
        this.saveLocalStorage();
    }
    
    deleteTask(id){

        this.tasks = this.tasks.filter(task => task.id != id);
        this.saveLocalStorage();
    }

    markCompleted(id){

        for(const task of this.tasks){

            if(task.id == id ){
                task.completado = !task.completado;
                this.saveLocalStorage();
                break;
            }
        }

    }

    deleteCompleteds(){

        this.tasks = this.tasks.filter(task => !task.completado);
        this.saveLocalStorage();
    }

    saveLocalStorage(){

        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadLocalStorage(){

        this.tasks = (localStorage.getItem('tasks')) ? 
        JSON.parse(localStorage.getItem('tasks')) :
        [];
        
        this.tasks = this.tasks.map(obj => Task.fromJson(obj));
    }
}