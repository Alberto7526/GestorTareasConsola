import fs from 'fs';

const Archivo = './db/data.json'; // ruta del archivo a trabajar

const guardarDB = (data) =>{
    /**
     * Recibe la data y la guarda como un archivo .json (tambien funciona para txt solo es cambiar la extensión del archivo)
     */
    fs.writeFileSync (Archivo, JSON.stringify(data)); // convierte un objeto a un string
}

const leerDB = () => {
    if (!fs.existsSync(Archivo)){
        return false;
    }
    const info = fs.readFileSync(Archivo, {encoding: 'utf-8'});
    const data = JSON.parse(info); // lo convierte al objeto incial en este caso un array  el opuesto de stringfy
    return data;
}

export {
    guardarDB,
    leerDB
}