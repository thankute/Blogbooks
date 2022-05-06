const express = require('express')
const router = express.Router()
const Blog = require('../model/Blog')

router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog
            .find({user: req.params.id, status: 'public' })
            .populate('user')
            .sort({createdAt: 'desc'})
            .lean()
        res.render('user/other', {
            blog,
            user: blog[0].user,
            userLogin: req.session.user,
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router