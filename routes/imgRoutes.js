const express = require('express')
const imgController = require('../controllers/imgController');

const router = express.Router()

router.get('/getImg/:imgName', async (req, res) => {
  const result = await imgController.getImg(req.params.imgName);
  res.json(result);
})  

router.get('/getImgGallery/:imgName', async (req, res) => {
  const result = await imgController.getImgGallery(req.params.imgName);
  res.json(result);
})

module.exports = router