const express = require('express')
const router = express.Router()
const MeController = require('../controller/MeController')
const upload = require('../middleware/multer')


router.get('/blog/create', MeController.create)
router.post('/blog/store', upload.single('image') ,MeController.store)
router.get('/blog/:id/edit', MeController.edit)
router.put('/blog/:id', MeController.update)
router.delete('/blog/:id', MeController.delete)
router.get('/blog', MeController.show)



module.exports = router
