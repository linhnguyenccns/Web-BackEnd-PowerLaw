const express = require('express')
var router = express.Router()
const middlewareCntroller = require("../controllers/middlewareController")
//DB models

const postServiceModel = require('../models/postService')
const aboutModule = require('../models/about')
const blogModule = require('../models/blog')
const questionModule = require('../models/question')
const nofModule = require('../models/nof')
const inforModule = require('../models/info')
const topModule = require('../models/top')
const emailModule = require('../models/email')

//================================================
//Thồn tin chung
router.post('/infor', middlewareCntroller.verifyToken, async (req, res) => {

    const { Logo, IconPhone, PhoneNumber, IconInfor, Infor, IconEmail, Email, IconAddress, Address, IconTime, Time, Facebook } = req.body

    if (!Logo || !IconPhone || !PhoneNumber || !IconInfor || !Infor || !IconEmail || !Email || !IconAddress || !Address || !IconTime || !Time ||!Facebook) {
        return res.status(402).json({ success: false, message: 'Vui lòng nhận đủ các trường trước khi đăng' })
    }

    try {
        const data = await inforModule({ Logo, IconPhone, PhoneNumber, IconInfor, Infor, IconEmail, Email, IconAddress, Address, IconTime, Time, Facebook })
        await data.save()

        return res.status(200).json({ success: true, message: 'Created successfully' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

router.get('/infor', async (req, res) => {
    try {
        const data = await inforModule.find()

        return res.status(200).json({ success: true, message: 'successfully', data: data })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

//put
router.put('/infor', middlewareCntroller.verifyToken, async (req, res) => {

    const { Logo, IconPhone, PhoneNumber, IconInfor, Infor, IconEmail, Email, IconAddress, Address, IconTime, Time,Facebook, id } = req.body

    if (!Logo || !IconPhone || !PhoneNumber || !IconInfor || !Infor || !IconEmail || !Email || !IconAddress || !Address || !IconTime || !Time || !Facebook) {
        return res.status(402).json({ success: false, message: 'Vui lòng nhận đủ các trường trước khi đăng' })
    }

    try {
        const data = await inforModule.findByIdAndUpdate({_id: id},{Logo, IconPhone, PhoneNumber, IconInfor, Infor, IconEmail, Email, IconAddress, Address, IconTime, Time, Facebook})

        return res.status(200).json({ success: true, message: 'Created successfully' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error '+error })
    }
})


//================================================
//Tao thêm dịch vụ
router.post('/service', middlewareCntroller.verifyToken, async (req, res) => {
    const { Icon, Title, Content } = req.body

    if (!Icon || !Title || !Content) {
        return res.status(402).json({ success: false, message: 'Vui lòng nhận đủ các trường trước khi đăng' })
    }

    try {
        const data = await postServiceModel({ Icon, Title, Content })
        await data.save()

        return res.status(200).json({ success: true, message: 'Tạp thành công' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

//đọc dich vụ
router.get('/service', async (req, res) => {

    try {
        const data = await postServiceModel.find()

        return res.status(200).json({ success: true, message: 'successfully', data: data })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

//đọc dịch vụ theo id
router.get('/service/:id', async (req, res) => {
    const id = req.params.id

    try {
        const data = await postServiceModel.findById(id)

        return res.status(200).json({ success: true, message: 'successfully', data: data })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

//Xóa dịch vụ
router.delete('/service/:id', async (req, res) => {
    const id = req.params.id

    try {
        const data = await postServiceModel.findByIdAndDelete(id)

        if (data === '') {
            return res.status(400).json({ success: false, message: 'Không tồn tại' })
        }

        return res.status(200).json({ success: true, message: 'Thành Công' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

router.put('/service/:id', async (req, res)=> {
    const id = req.params.id
    const { Icon, Title, Content } = req.body

    try {
        const data = await postServiceModel.findByIdAndUpdate({_id: id}, {Icon, Title, Content })

        return res.status(200).json({ success: true, message: 'Thành Công' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' +error})
    }
})

//================================================
router.get('/about', async (req, res) => {
    try {
        const data = await aboutModule.find()

        return res.status(200).json({ success: true, message: 'Xóa thành công', data: data })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

router.post('/about', middlewareCntroller.verifyToken, async (req, res) => {
    const { Icon, Title1, Title2, Content } = req.body

    if (!Icon || !Title1 || !Title2 || !Content) {
        return res.status(402).json({ success: false, message: 'Vui lòng nhận đủ các trường trước khi đăng' })
    }

    try {
        const data = await aboutModule({ Icon, Title1, Title2, Content })
        await data.save()

        return res.status(200).json({ success: true, message: 'Created successfully' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

//đọc dịch vụ theo id
router.get('/about/:id', async (req, res) => {
    const id = req.params.id

    try {
        const data = await aboutModule.findById(id)

        return res.status(200).json({ success: true, message: 'successfully', data: data })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

//Xóa dịch vụ
router.delete('/about/:id', async (req, res) => {
    const id = req.params.id

    try {
        const data = await aboutModule.findByIdAndDelete(id)

        if (data === '') {
            return res.status(400).json({ success: false, message: 'Không tồn tại' })
        }

        return res.status(200).json({ success: true, message: 'Thành Công' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

router.put('/about/:id', async (req, res)=> {
    const id = req.params.id
    const { Icon, Title1, Title2, Content } = req.body

    try {
        const data = await aboutModule.findByIdAndUpdate({_id: id}, {Icon, Title1, Title2, Content })

        return res.status(200).json({ success: true, message: 'Thành Công' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' +error})
    }
})

//================================================
router.get('/blog', async (req, res) => {
    try {
        const data = await blogModule.find()

        return res.status(200).json({ success: true, message: 'successfully', data: data })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

router.post('/blog', middlewareCntroller.verifyToken, async (req, res) => {
    const { Icon, Title1, Title2, Content } = req.body

    if (!Icon || !Title1 || !Title2 || !Content) {
        return res.status(402).json({ success: false, message: 'Vui lòng nhận đủ các trường trước khi đăng' })
    }

    try {
        const data = await blogModule({ Icon, Title1, Title2, Content })
        await data.save()

        return res.status(200).json({ success: true, message: 'Created successfully' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

//đọc dịch vụ theo id
router.get('/blog/:id', async (req, res) => {
    const id = req.params.id

    try {
        const data = await blogModule.findById(id)

        return res.status(200).json({ success: true, message: 'successfully', data: data })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

//Xóa blog
router.delete('/blog/:id', async (req, res) => {
    const id = req.params.id

    try {
        const data = await blogModule.findByIdAndDelete(id)

        if (data === '') {
            return res.status(400).json({ success: false, message: 'Không tồn tại' })
        }

        return res.status(200).json({ success: true, message: 'Thành Công' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

router.put('/blog/:id', async (req, res)=> {
    const id = req.params.id
    const { Icon, Title1, Title2, Content } = req.body

    try {
        const data = await blogModule.findByIdAndUpdate({_id: id}, {Icon, Title1, Title2, Content })

        return res.status(200).json({ success: true, message: 'Thành Công' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' +error})
    }
})
//================================================
//câu hỏi

router.get('/question', async (req, res) => {
    try {
        const data = await questionModule.find()

        return res.status(200).json({ success: true, message: 'successfully', data: data })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

//đọc dịch vụ theo id
router.get('/question/:id', async (req, res) => {
    const id = req.params.id

    try {
        const data = await questionModule.findById(id)

        return res.status(200).json({ success: true, message: 'successfully', data: data })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

router.put('/question/:id', async (req, res)=> {
    const id = req.params.id
    const { Title, Content } = req.body

    try {
        const data = await questionModule.findByIdAndUpdate({_id: id}, {Title, Content })

        return res.status(200).json({ success: true, message: 'Thành Công' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' +error})
    }
})

router.post('/question', middlewareCntroller.verifyToken, async (req, res) => {
    const { Title, Content } = req.body

    if (!Title || !Content) {
        return res.status(402).json({ success: false, message: 'Vui lòng nhận đủ các trường trước khi đăng' })
    }

    try {
        const data = await questionModule({ Title, Content })
        await data.save()

        return res.status(200).json({ success: true, message: 'Created successfully' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

//xóa giải đáp
router.delete('/question/:id', async (req, res) => {
    const id = req.params.id

    try {
        const data = await questionModule.findByIdAndDelete(id)

        if (data === '') {
            return res.status(400).json({ success: false, message: 'Không tồn tại' })
        }

        return res.status(200).json({ success: true, message: 'Thành Công' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})
//================================================
//Nof
router.get('/nof', async (req, res) => {
    try {
        const data = await nofModule.find()

        return res.status(200).json({ success: true, message: 'successfully', data: data })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

router.post('/nof', middlewareCntroller.verifyToken, async (req, res) => {
    const { Icon, Title1, Title2, Content } = req.body

    if (!Icon || !Title1 || !Title2 || !Content) {
        return res.status(402).json({ success: false, message: 'Vui lòng nhận đủ các trường trước khi đăng' })
    }

    try {
        const data = await nofModule({ Icon, Title1, Title2, Content })
        await data.save()

        return res.status(200).json({ success: true, message: 'Created successfully' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

//xóa thông báo
router.delete('/nof/:id', async (req, res) => {
    const id = req.params.id

    try {
        const data = await nofModule.findByIdAndDelete(id)

        if (data === '') {
            return res.status(400).json({ success: false, message: 'Không tồn tại' })
        }

        return res.status(200).json({ success: true, message: 'Thành Công' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

//đọc dịch vụ theo id
router.get('/nof/:id', async (req, res) => {
    const id = req.params.id

    try {
        const data = await nofModule.findById(id)

        return res.status(200).json({ success: true, message: 'successfully', data: data })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

router.put('/nof/:id', async (req, res)=> {
    const id = req.params.id
    const { Icon, Title1, Title2, Content } = req.body

    try {
        const data = await nofModule.findByIdAndUpdate({_id: id}, {Icon, Title1, Title2, Content })

        return res.status(200).json({ success: true, message: 'Thành Công' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' +error})
    }
})

//================================================
//Email
router.post('/email', middlewareCntroller.verifyToken, async (req, res) => {
    const {Content } = req.body

    if (!Content) {
        return res.status(402).json({ success: false, message: 'Vui lòng nhận đủ các trường trước khi đăng' })
    }

    try {
        const data = await emailModule({Content })
        await data.save()

        return res.status(200).json({ success: true, message: 'Created successfully' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

router.get('/email', async (req, res) => {
    try {
        const data = await emailModule.find()

        return res.status(200).json({ success: true, message: 'successfully', data: data })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})


router.get('/email/:id', async (req, res) => {
    const id = req.params.id

    try {
        const data = await emailModule.findById(id)

        return res.status(200).json({ success: true, message: 'successfully', data: data })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

router.put('/email/:id', async (req, res)=> {
    const id = req.params.id
    const {Content } = req.body

    if(!Content) {
        return res.status(401).json({ success: false, message: 'Vui Lòng điền đầy đủ thông tin' })
    }

    try {
        const data = await emailModule.findByIdAndUpdate({_id: id}, { Content })

        return res.status(200).json({ success: true, message: 'Thành Công' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' +error})
    }
})

//================================================
//Top Img
router.post('/top', middlewareCntroller.verifyToken, async (req, res) => {
    const { Icon, Content } = req.body

    if (!Icon || !Content) {
        return res.status(402).json({ success: false, message: 'Vui lòng nhận đủ các trường trước khi đăng' })
    }

    try {
        const data = await topModule({ Icon,  Content })
        await data.save()

        return res.status(200).json({ success: true, message: 'Created successfully' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

router.get('/top', async (req, res) => {

    try {
        const data = await topModule.find()

        return res.status(200).json({ success: true, message: 'successfully', data: data })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

router.get('/top/:id', async (req, res) => {
    const id = req.params.id

    try {
        const data = await topModule.findById(id)

        return res.status(200).json({ success: true, message: 'successfully', data: data })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
})

router.put('/top/:id', async (req, res)=> {
    const id = req.params.id
    const { Icon, Content } = req.body

    try {
        const data = await topModule.findByIdAndUpdate({_id: id}, {Icon, Content })

        return res.status(200).json({ success: true, message: 'Thành Công' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' +error})
    }
})

module.exports = router