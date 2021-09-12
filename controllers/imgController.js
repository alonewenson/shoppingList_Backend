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
  if(rawImgUrls && rawImgUrls.length !== 0) {
    imgUrls = getBestImgs(singularImgName, rawImgUrls);
    DB.setImgGallery(singularImgName, imgUrls);
    return imgUrls;  
  }
}

const getImg = async (imgName) => {
  const singularImgName = pluralize.singular(imgName);
  const img = await DB.getDefaultImg(singularImgName);
  if(img){
    return img.url;
  }

  const imgGallery = await getImgGallery(imgName)
  if(imgGallery && imgGallery.length !== 0) {
    DB.setDefaultImg(singularImgName, imgGallery[0]);
    return imgGallery[0];  
  }
}

module.exports = { getImg, getImgGallery };