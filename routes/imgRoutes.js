const express = require('express')
const imgController = require('../controllers/imgController');

const router = express.Router()

router.get('/getImgByName/:imgName', async (req, res) => {
  const result = await imgController.getImg(req.params.imgName);
  res.send(result);
})

router.post('/setSelectedImg/:imgName/:imgUrl', async (req, res) => {
  imgController.setSelectedImg(req.params.imgName, req.params.imgUrl);
  res.send('selected image')
})


router.get('/getImgsGallery/:imgName', async (req, res) => {
  const result = await imgController.getImgGallery(req.params.imgName);
  res.send(result);
})

router.get('/getAllDefaultImgs', async (req, res) => {
  const result = await imgController.getDefaultImgs();
  res.send(result);
})

router.get('/getSelectedImgs', async (req, res) => {
  const result = await imgController.getSelectedImgs();
  res.send(result);
})


module.exports = router