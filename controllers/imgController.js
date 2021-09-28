const DB = require('../db/imgsDB')
const pixabayServices = require('../services/pixabayServices');

const getBestImgs = (imgName, imgUrls) => {
  return imgUrls.filter(imgUrl => {
    const url = imgUrl.split('/').pop();
    return ( url.includes(imgName) )
  })
}

const getImgGallery = async (imgName) => {
  var imgUrls = await DB.getImgGallery(imgName);
  if(imgUrls){
    return imgUrls.gallery;
  }

  rawImgUrls = await pixabayServices.getImgGalleryFromPixabay(imgName);
  if(rawImgUrls && rawImgUrls.length !== 0) {
    imgUrls = getBestImgs(imgName, rawImgUrls).slice(0,18);
    DB.setImgGallery(imgName, imgUrls);
    return imgUrls;  
  }
}

const getImg = async (imgName) => {
  const img = await DB.getDefaultImg(imgName);
  if(img){
    return img.url;
  }

  const imgGallery = await getImgGallery(imgName)
  if(imgGallery && imgGallery.length !== 0) {
    DB.setDefaultImg(imgName, imgGallery[0]);
    return imgGallery[0];  
  }
}

module.exports = { getImg, getImgGallery };