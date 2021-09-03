const express = require('express')
const imgController = require('../controllers/imgController');

const router = express.Router()

router.get('/getImgGallery/:imgName', async (req, res) => {
  const result = await imgController.getImgGallery(req.params.imgName);
  res.send(result);
})

module.exports = router