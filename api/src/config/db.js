import {createPool} from 'mysql2/promise';
import {
DB_HOST,DB_DATABASE,DB_PASSWORD,DB_PORT,DB_USER
} from './config.js';

//conexion a la base de datos mediante las variables de entorno
export const pool=createPool({
    host: DB_HOST,
    port:DB_PORT,
    database:DB_DATABASE,
    user:DB_USER,
    password:DB_PASSWORD
})
