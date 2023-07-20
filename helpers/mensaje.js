import colors from 'colors';
import resolve from 'path';

const mostrarMenu = () => {

    return new Promise(resolve => {
        console.clear();
        console.log(`==============================`.green);
        console.log(`    Seleccione una opción     `.green);
        console.log(`==============================\n`.green);

        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir \n`);

        /*
        A continuación se crea la interfaz para recibir y mostrar información del usuario 
        definimos readline
        */

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question('Seleccione una opción: ', (opt) => {
        readline.close();
        resolve(opt);
    })

    });

};

const pausa = () => {

    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        /*
        ahora preguntamos al usuario
        */
        readline.question(`Presiones ${'ENTER'.green} para continuar`, (opt) => {
        readline.close();
        resolve();
       });

    });
    
};



module.exports = {
    mostrarMenu,
    pausa
}