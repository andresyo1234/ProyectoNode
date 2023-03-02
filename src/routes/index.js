import { PrismaClient } from '@prisma/client'
import express from 'express'
import { Router } from 'express'
import {pool} from '../db.js'
import bcrypt from 'bcrypt'


import session from 'express-session'
const prisma = new PrismaClient()
const router = Router()
const app = express()



app.use(session({
    secret:'12345',
    resave:true,
    saveUninitialized:true
}))



// Ruta de las paginas
router.get('/', (req, res) => {
    res.render('index.ejs', {title: 'HOME'})
})

router.get('/registro', (req, res) => {
    res.render('registro.ejs', {title: 'REGISTRO'})
})

router.get('/login', (req, res) => {
    res.render('login.ejs', {title: 'LOGIN'})
})

router.get('/crud', (req, res) => {
    res.render('crud.ejs', {title: 'CRUD'})
})

router.post('/', async (req,res)=>{
     const [result]= await pool.query('select 1 as lol')
     res.json(result)
})
/*router.post('/l',async(req,res)=>{
    console.log(req)
    const mail = req.body.mail;
    console.log('a')
    const pass = req.body.pass;
    
    if (user && pass) {
        try {
            const[results] = await pool.query('select * from usuario where Email = ?',[mail])
            if (results.lenght == 0 || !(await bcryptjs.compare(pass,results[0].Pass))) {
                res.send('usuario o password incorrecta')
            }else{
                res.send('login correcto')
            }
        } catch (error) { 
            
        }
    }
})*/

router.post('/registro',async(req,res)=>{
    const Nombre= req.body.Nombre;
    const Apellido= req.body.Apellido;
    const user= req.body.user;
    const mail= req.body.mail;
    const pass= req.body.pass;
    const address= req.body.address;
    const phone= req.body.phone;
    const country= req.body.country;
    const state= req.body.state;
    console.log('BBBBBBBBB')
    let passwordHash = await bcrypt.hash(pass,8);
    console.log('AAAAAAAAAAA')
    pool.query('insert into usuario set ?',{Nombre:Nombre,Apellido:Apellido,NombreUsuario:user,Pass:passwordHash,Email:mail,Direccion:address,Telefono:phone,Pais:country,Provincia:state})
    res.send('a');
})

router.get('/a', async (req,res)=>{

    await prisma.usuario.create({
        data:{
            Nombre:'a',
            Apellido:'a',
            NombreUsuario:'a',
            Pass:'a',
            Email:'a@a.com',
            Direccion:'a',
            Telefono:'a',
            Pais:'a',
            Provincia:'a'
        }
    })
    console.log(await prisma.usuario.findMany()) 
})


export default router