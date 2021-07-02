const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
const { create, result } = require('lodash')
const app = express()
const fs = require('fs')
const path = require('path');
const multer  = require('multer')





//чтобы express видел ejs

app.set('view engine','ejs')

//conect to MongoDB

const dbURI = 'mongodb+srv://Krastii:170199eperol@nodetutorial.s7g8l.mongodb.net/Node-tut?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err))


app.use(morgan('dev'))// статистика в консоли
app.use(express.static('public'))// делает файл style.css доступным в браузере
app.use(express.urlencoded({extended: true}))






app.get('/',(req,res)=>{
    //res.send('<h1>home page</h1>')
    //res.sendFile('./docs/index.html',{root: __dirname})
    //res.render('index', { title: 'Blog' , blogs })
    res.redirect('/blogs')
})




app.get('/about',(req,res)=>{
    //res.send('<h1>home page</h1>')
    //res.sendFile('./docs/about.html',{root: __dirname})
    res.render('about',{title: 'About'})
})


// перенаправление 

app.get('/about-us',(req,res)=>{
    res.redirect('/about')
})

// blog routes

app.use('/blogs',blogRoutes)

//для любого запроса

app.use((req,res)=>{
    //res.status(404).sendFile('./docs/404.html',{root: __dirname})
    res.status(404).render('404',{title: '404'})
})