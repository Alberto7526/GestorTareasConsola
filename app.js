import colors from 'colors';

//import {mostrarMenu, pausa} from './helpers/mensaje';
import {inquirerMenu, 
        pausa,
        leerInput,
        listadoTareas,
        mostrarConfirmacion,
        listadoTareasCheck} from './helpers/inquirer.js'
import {Tareas} from './models/tareas.js'
import {guardarDB,
        leerDB} from './helpers/guardarArchivo.js'


console.clear();

const main = async() => {
    let opt = ''
    const tareas = new Tareas();
    const data = leerDB();
    if (data) {
        tareas.cargarTareasFromArray(data)
    }
    do {

        opt = await inquirerMenu();   // imprimir el menu 
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: '); // preguntar por la descripción de la nueva tarea
                tareas.crearTarea(desc) // agreagr la tarea a la instacia "tareas" de la clase tareas
                console.log(`tarea creada con exito`)
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarCompletadas(true);
            break;
            case '4':
                tareas.listarCompletadas(false);
            break;
            case '5':
                const ids = await listadoTareasCheck(tareas.listadoArr)
                tareas.completarTareas(ids);
            break;
            case '6':
                const id = await listadoTareas(tareas.listadoArr);
                let confirmacion = false  
                if (id!== 0){
                    confirmacion = await mostrarConfirmacion('¿Esta seguro que desea eliminar este elemento?');
                } 
                if (confirmacion){
                    tareas.deletetarea(id);
                }else{
                    console.log(`... ${'ok'.green} ...`);
                }

            break;

        }
        guardarDB(tareas.listadoArr);
        if (opt !== '0') await pausa(); 
    
    }while(opt !=='0')
    
}

main();