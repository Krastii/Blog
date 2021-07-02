//import http from 'http';
const http = require('http')
const fs = require('fs')
const _ = require('lodash')


const server = http.createServer((req,res)=>{
    //lodash - библиотека с методами
    const num = _.random(0,20)//случайное число от 0 до 20



    res.setHeader('Content-Type','text/html')
    let path = './docs/'
            switch (req.url) {
                case '/':
                    path+='index.html'
                    res.statusCode = 200;
                    break;
                case '/about':
                    path+='about.html'
                    res.statusCode = 200;
                    break;
                default:
                    path+='404.html'
                    res.statusCode = 404;
                    break;
            }
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
            res.end()
        } else {
            
            res.end(data)    
        }
    })
});

server.listen(3000,'localhost',()=>{
    console.log('listen now');
})