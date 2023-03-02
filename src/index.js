console.log('Mi primer nodejs');

// Requerir los modulos
import express from 'express'
import ejs from 'ejs'

import indexRoutes from './routes/index.js'

import { dirname, join } from 'path'
import { fileURLToPath } from "url";
import bodyParser from 'body-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import {pool} from './db.js'
import bcrypt from 'bcrypt'
//import pool from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({pah:join(__dirname,'/env/.env')})
//  DeviceMotionEvent.config({path: './.env'})
// Iniciar modulos
const app = express()

// Configuraciones
    // Crear servidor
    const port = process.env.PORT || 4000
    app.listen(port);
    console.log("El servidor funcina en el puerto " + port);

    // Configurar el motor de plantilla EJS
    app.set('views', join(__dirname, 'views'))
    app.set('view engine', 'ejs')

    // Configurar routes
    app.use(indexRoutes)

    // confugurar urlencode 

    app.use(express.urlencoded({extended:true}))

    app.use(session({
        secret:'12345',
        resave:true,
        saveUninitialized:true
    }))
    app.get('/p',(req,res)=>{
        req.session.usuario = "Antonio";
        req.session.rol = "admin";
        req.session.visitas = req.session.visitas?++req.session.visitas:1;
        res.send(`El usuario ${req.session.usuario} con el rol de ${req.session.rol} ha visitado la pagina ${req.session.visitas} veces`);
    })


    app.post('/l',async(req,res)=>{
        
        const mail = req.body.mail;
        const pass = req.body.pass;
        
        if (mail && pass) {
            try {
                const[results] = await pool.query('select * from usuario where Email = ?',[mail])
                console.log(pass,results[0].Pass)
                console.log((await bcrypt.compare(pass,results[0].Pass)))
                if (results.lenght == 0 || !(await bcrypt.compare(pass,results[0].Pass))) {
                    res.send('usuario o password incorrecta')
                }else{
                    res.send('login correcto')
                }
            } catch (error) { 
                console.log(error)
            }
        }
    })


    
    //Configurar estilos CSS
    app.use(express.static(join(__dirname, 'public')))
    



