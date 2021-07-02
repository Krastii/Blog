const express = require('express')
const router = express.Router()
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/image')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'.png')
          //console.log(req);
      }
})

const upload = multer({ storage: storage })
const blogController = require('../controllers/blogController')


router.get('/', blogController.blog_index)

router.get('/create',blogController.blog_create_get)


router.post('/',upload.single('image'),blogController.blog_create_post)

router.get('/:id',blogController.blog_details)

router.delete('/:id',blogController.blog_delete)   //delete blog for id

module.exports = router;