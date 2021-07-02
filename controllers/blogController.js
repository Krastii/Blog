const Blog = require('../models/blog')
// const multer  = require('multer')
const blogController = require('../controllers/blogController')


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/image')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname + '-' + Date.now()+'.png')
//       }
// })

// const upload = multer({ storage: storage })

const blog_index = (req,res) =>{
    Blog.find().sort({createdAt: -1})
        .then((result)=>{
            res.render('index',{ title:'All Blogs', blogs: result})
        })
        .catch((err)=>{
            console.log(err);
        })
}

const blog_details =(req,res)=>{
    const id = req.params.id
    Blog.findById(id)
    .then((result)=>{
        res.render('blogById',{title:'detal' ,blog: result})
    })
    .catch((err)=>{
        res.status(404).render('404',{title: '404'})
    })
}

const blog_create_get = (req,res)=>{
    res.render('create',{title: 'Create blog'})
}

const blog_create_post = (req,res) =>{
    req.body.fileName = req.file.filename
    const blog = new Blog(req.body) 
    console.log(req.file) 
        blog.save()
            .then((result)=>{
                res.redirect('/blogs')
            })
            .catch((err)=>{
                console.log(err);
            })
}

const blog_delete = (req,res) =>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect: '/blogs'})
    })
    .catch((err)=>{
        console.log(err)
    })
}


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}
