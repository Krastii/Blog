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

const dbURI = 'mongodb+srv://<name>:<password>@nodetutorial.s7g8l.mongodb.net/<nameCollections>?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err))


app.use(morgan('dev'))// статистика в консоли
app.use(express.static('public'))// делает файл style.css доступным в браузере
app.use(express.urlencoded({extended: true}))






app.get('/',(req,res)=>{
    res.redirect('/blogs')
})




app.get('/about',(req,res)=>{
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
    res.status(404).render('404',{title: '404'})
})