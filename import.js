const {nam,number} = require('./test')

// console.log(`Hi ${number}`);
const fs = require('fs') 
// console.log(fs);

//read file
fs.readFile('./docs/blogOne.txt',(err,data)=>{
    if(err){
        console.log(`Error ${err}`);
    }
    console.log(data.toString());
})

// write file
fs.writeFile('./docs/blogTwo.txt',`Hi, it's second blog`,()=>{
    console.log('file has written');
    //когда метод не находт нужный файл, он его создаёт
})

//directories
if(!fs.existsSync('./assets')){
  fs.mkdir('./assets',(err)=>{//create folder
    if(err){
        console.log(err);
    }else{
        console.log('folder created');
    }
})  
}else{
    fs.rmdir('./assets',(err)=>{//delete folder
        if(err){console.log(err);}else{
            console.log('folder delete');
        }
    })
}

//delete file
if(fs.existsSync('./docs/deleteMe.txt')){
    fs.unlink('./docs/deleteMe.txt',(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('file delete');
        }
    })
}else{
    console.log('file dont exist');
}

//stream and buffer

const readStream = fs.createReadStream('./docs/blogOne.txt',{encoding: 'utf8'})
const writeStream = fs.createWriteStream('./docs/blogFree.txt')

readStream.on('data',(chunk)=>{
    console.log('--------');
    // console.log(chunk);
    writeStream.write('\n new chunk \n')
    writeStream.write(chunk)
})// можно заменить readSrteam.pipe(writeStream)


