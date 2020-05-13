export class Task{

    static fromJson({id, name, completado, creado}){

        const tempTask = new Task(name);
        tempTask.id = id;
        tempTask.completado = completado;
        tempTask.creado = creado;

        return tempTask;
    }
   
    constructor(tarea){
        this.name = tarea;
        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();
    }
}