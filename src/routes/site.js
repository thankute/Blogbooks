const express = require('express')
const isLogin = require('../middleware/isLogin')
const router = express.Router()
const Blog = require('../model/Blog')

router.get('/',isLogin, async (req, res) => {
    try {
        const blog = await Blog.find({status: 'public'}).populate('user').sort({createdAt: 'desc'}).lean()
        res.render('home' , {
            userLogin: req.session.user,
            blog: blog
        })
        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router