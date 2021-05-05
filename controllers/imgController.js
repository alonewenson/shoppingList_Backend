const pixabayImgController = require('./pixabayImgController');


const getImgGallery = (imgName) => {
  return pixabayImgController.getImgGalleryFromPixabay(imgName);
}

const getImg = imgName => {
  return pixabayImgController.getImgFromPixabay(imgName);
}

module.exports = {getImg, getImgGallery};