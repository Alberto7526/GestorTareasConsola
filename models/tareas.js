import {Tarea} from './tarea.js'

/*
* _listado :
{ 'uuid-1254': {id_12, desc: 'descrpcion', completadoEn: '20230805'}}
*/
class Tareas {
    /**
     * Permite administrar todas las teareas que se van agregando de la clase Tarea
     */

    _listado = {};

    constructor(){
        /**
         * Medodo contructor, permite crear una instacia de la tarea con un objeto vacio donde posteriormente se almacenaran las tareas
         */
        this._listado = {};
    }

    get listadoArr(){
        /**
         * Recorre el objeto _listado tomando cada uno de los keys para luego extraer cada objeto de la tarea 
         * y agregarlo en un arrar llamado listado
         */
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key]; // se obtiene cada uno de los objetos que continen cada tarea
            listado.push(tarea);
        });

        return listado;
    }


    crearTarea (desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []) {
        /**
         * Permite tomar la información que viene del archivo json y 
         * agregarlas a la instancia de tareas 
         * Entradas:
         * tareas --> array de tareas (precargado de un json)
         * Salidas: 
         * La instancia con todas las tareas ya cargadas para utilizar
         */
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }
    
    listadoCompleto (){
        const listado = this.listadoArr;
        console.log('\n')
        listado.forEach((tarea,i) =>{
            let mensaje = '';
            (tarea.completadoEn === null)
                ? mensaje = `${(i+1).toString().green}. ${tarea.desc} :: ${'Pendiente'.red}`
                : mensaje = `${(i+1).toString().green}. ${tarea.desc} :: ${'Completada'.green}`
            console.log(mensaje);
        })
        console.log('\n');
    }

    listarCompletadas (completadas = true){
        const listado = this.listadoArr;
        console.log('\n');
        let contador = 0;
        listado.forEach((tarea) =>{
            let mensaje = '';
            if (!(tarea.completadoEn === null) && completadas === true){
                contador +=1;
                mensaje = `${((contador).toString()+'.').green} ${tarea.desc} :: Completado en: ${tarea.completadoEn.toString().green}`;
                console.log(mensaje);
            }else if (((tarea.completadoEn === null) && completadas === false)){
                contador += 1;
                mensaje = `${((contador).toString()+'.').green} ${tarea.desc} :: ${'Pendiente'.red}`;
                console.log(mensaje);
            }
            
        })
        console.log('\n');
        
    }

    completarTareas (ids = []) {
        ids.forEach(id => {
            this._listado[id].completadoEn = new Date().toLocaleString();
            console.log(`${'... Tarea:'.green} ${this._listado[id].desc.white} ${'completada con exito...'.green}`)
        });

    }

    deletetarea (id) {
        if (this._listado [id]){
            delete this._listado[id];
            console.log(`... ${'Elemento eliminado'.green} ...`);
        } else{
            console.log(`... ${'ok'.green} ...`);
        }
    }
};


export {
    Tareas
};