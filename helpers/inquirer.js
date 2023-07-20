import inquirer from 'inquirer';
import colors  from 'colors';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices : [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`,
            },
            {
                value: '0',
                name: `${'7.'.green} Salir \n` 
            },  
        ]
    }
];

const inquirerMenu = async() => {
    /**
     * Muestra un menu para seleccionar y devuleve la opción seleccionada según el valor definido en el array preguntas 
     * 
     * Entradas: 
     * none
     * Salidas:
     * Opcion seleccionada del menu 
     */
    console.clear();
    console.log(`==============================`.green);
    console.log(`    Seleccione una opción     `.green);
    console.log(`==============================\n`.green);

    const opt = await inquirer.prompt (preguntas);
    return opt.opcion;
}

const pausa = async() => {
    /**
     * Genera una pausa en el programa esperando a que el usuario presione una tecla, 
     * se dugiere que sea enter por medio de un mensaje
     */
    const opt = await inquirer.prompt ([
        {
            type: 'input',
            name: 'opcion',
            message: `\nPresione ${'ENTER'.green} para continuar`
        }
        ]);      
};

const leerInput = async(message)=> {
    /**
     * Permite generar un input donde se va a preguntar por una opción a recivir, según el mensaje enviado
     * 
     * entradas:
     *  message --> Pregunta que verá el usuario
     * 
     * Salidas: 
     *  Descripción --> La información ingresada por el usuario, si el usuario no ingresa almenos un caracter no permitira continuar 
     */
    

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate (value){
                if (value.length===0) { 
                    return 'Por favor ingrese un valor';
                }
                return  true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(question);
    return desc;

};

const listadoTareas = async(listado = []) => {
    /**
     * Permite listar las tareas existentes y mostrarlas a modo de menu agregando al final la opción de salir 
     */

    let contador = 0;

    // definimos el listado a mostrar las choices
    const tareas = listado.map (e => {
        contador += 1;
        return {
            value: e.id,
            name : `${(contador.toString()+'.').green} ${e.desc} `
        }
    })
    // agregamos la tarea de salir como opcion 
    tareas.push ({
        value:0,
        name : `${((contador+=1).toString()+'.').green} Cancelar `
    })

    // generamos la estructura y la mostramos 
    const preguntas = [
        {
            type: 'list',
            name: 'opcion',
            message: '¿Qué Elemento desea eliminar?',
            choices :tareas
        }]
    
    console.clear();
    const opt = await inquirer.prompt (preguntas);
    return opt.opcion;

};

const mostrarConfirmacion = async(message) => {
    /**
     * Generamos un mensaje de confirmación 
     */
    const preguntas = [
        {
            type: 'list',
            name: 'opcion',
            message,
            choices :[
                {
                    value : true,
                    name: 'Si'
                },
                {
                    value : false,
                    name: 'No'
                }
            ]
        }]
    const opt = await inquirer.prompt (preguntas);
    return opt.opcion;
    
}

const listadoTareasCheck = async(listado = []) => {
    /**
     * Permite listar las tareas existentes y mostrarlas a modo de menu agregando al final la opción de salir 
     */

    let contador = 0;

    // definimos el listado a mostrar las choices
    const tareas = listado.filter(tarea =>tarea.completadoEn===null).map (e => {
        contador += 1;
        return {
            value: e.id,
            name : `${(contador.toString()+'.').green} ${e.desc} `,
            checked : false
        }
    })

    // generamos la estructura y la mostramos 
    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices :tareas
        }]
    
    console.clear();
    const {ids} = await inquirer.prompt (preguntas);
    return ids;

};




export {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareas,
    mostrarConfirmacion,
    listadoTareasCheck
};