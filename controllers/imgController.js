const DB = require('../db/imgsDB')
const pixabayServices = require('../services/pixabayServices');
const pluralize = require('pluralize')

const getBestImgs = (imgName, imgUrls) => {
  return imgUrls.filter(imgUrl => {
    const url = imgUrl.split('/').pop();
    return ( url.includes(imgName) )
  })
}

const getImgGallery = async (imgName) => {
  
  const singularImgName = pluralize.singular(imgName);
  var imgUrls = await DB.getImgGallery(singularImgName);
  if(imgUrls){
    return imgUrls.gallery;
  }

  rawImgUrls = await pixabayServices.getImgGalleryFromPixabay(singularImgName);
  if(rawImgUrls.lenght !== 0) {
    imgUrls = getBestImgs(singularImgName, rawImgUrls);
    DB.setImgGallery(singularImgName, imgUrls);
    return imgUrls;  
  }
}

module.exports = { getImgGallery };