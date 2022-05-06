const Blog = require('../model/Blog')

class MeController {
    async show(req, res, next) {
        try {
            const blog = await Blog.find({user: req.session.user._id}).lean()
            const user = req.session.user
            res.render('user/show', {
                user: user,
                blog: blog
            })            
        } catch (error) {
            console.log(error)
        }
    }

    // [GET] /blog/create
    create(req, res) {
        res.render('user/create')
    }

    // [POST] /blog/store
    async store(req, res) {
        try {
            req.body.user = req.session.user._id
            let imageFile = req.file ? req.file.filename : '';
            const blog = new Blog({
                title: req.body.title,
                body: req.body.body,
                status: req.body.status,
                user: req.body.user,
                image: imageFile
            })
            console.log(req.file)
            await blog.save()
            res.redirect('/me/blog')
        } catch (error) {
            console.log(error);
        }
    }

    // [GET] /blog/:id/edit
    async edit(req, res) {
        try {
            const blog = await Blog.findById(req.params.id).lean()
            res.render('user/edit', {blog: blog})
        } catch (error) {
            console.log(error);
        }
    }

    // [PUT] /blog/:id
    async update(req, res) {
        try {
            const blog = await Blog.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/me/blog')

        } catch (error) {
            console.log(error);            
        }
    }

    // [DELETE] /blog/:id
    async delete(req, res) {
        Blog.delete({_id : req.params.id})
            .then(() => res.redirect('back'))
    }






}

module.exports = new MeController()
