const { insertDefaultImg, 
        getDefaultImgByName, 
        getAllDefaultImgsFromDB, 
        insertSelectedImg, 
        getSelectedImgByName, 
        getAllSelectedImgs,
        updateSelectedImg} = require('../db/imgsDB')
const pixabayImgController = require('./pixabayImgController');

//get img from default imgs. if not found get from pixabay and save 1st result to default imgs
const getImg = async (imgName) => {
  let imgUrl
  const img = await getDefaultImgByName(imgName)
  if(img === null){
    console.log(`could not find ${imgName} in DB`)
    imgUrl = await pixabayImgController.getImgFromPixabay(imgName)
    console.log(imgUrl)
    insertDefaultImg({
      'name': imgName,
      'url': imgUrl
    })
  }
  else{
    imgUrl = img.url;
  }
  return imgUrl;
}

//increment counter of the img url in selected images
const setSelectedImg = async (imgName, imgUrl) => {
  const selectedImgs = await getSelectedImgByName(imgName);
  if( selectedImgs === null ){
    const newImgSelectionDoc = {
      'name': imgName,
      'selection' : {
        [imgUrl] : 1
      }
    }
    insertSelectedImg(newImgSelectionDoc);
  }else{
    console.log(selectedImgs)
    let newImgSelection = selectedImgs.selection;
    newImgSelection[imgUrl] = (newImgSelection[imgUrl]+1) || 1 ;
    updateSelectedImg(imgName, newImgSelection);
  }
}

const getImgGallery = (imgName) => {
  return pixabayImgController.getImgGalleryFromPixabay(imgName);
}

const getDefaultImgs = () => {
  return getAllDefaultImgsFromDB();
}

const getSelectedImgs = () => {
  return getAllSelectedImgs();
}

module.exports = {getImg, getImgGallery, getDefaultImgs, setSelectedImg , getSelectedImgs};