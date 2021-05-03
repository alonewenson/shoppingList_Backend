const pixabayImgController = require('./pixabayImgController');


const getImgGallery = (imgName) => {
  return pixabayImgController.getImgGallery(imgName);
}

const getImg = imgName => {
  return pixabayImgController.getImg(imgName);
}

module.exports = {getImg, getImgGallery};