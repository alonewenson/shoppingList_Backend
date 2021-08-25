const { insertDefaultImg, 
        getDefaultImgByName, 
        getAllDefaultImgsFromDB, 
        insertSelectedImg, 
        getSelectedImgByName, 
        getAllSelectedImgs,
        updateSelectedImg} = require('../db/imgsDB')
const pixabayImgController = require('../services/pixabayServices');


const getBestImg = (imgName, imgUrls) => {
  let selectedImg = imgUrls.find(imgUrl => {
    const url = imgUrl.split('/').pop();
    return url.includes(imgName)
  })
  if (typeof selectedImg === 'undefined' ){
    selectedImg = imgUrls.pop();
  }
  return selectedImg;
}

const getBestImgs = (imgName, imgUrls) => {
  return imgUrls.filter(imgUrl => {
    const url = imgUrl.split('/').pop();
    return ( url.includes(imgName) || url.includes( url.substring(0, url.length -1 )) )
  })
}

//get img from default imgs. if not found get from pixabay and save 1st result to default imgs
const getImg = async (imgName) => {
  let imgUrl
  //TODO what if last letter is S like apples
  const img = await getDefaultImgByName(imgName)
  if(img === null){
    console.log(`could not find ${imgName} in DB`)
    const imgUrls = await pixabayImgController.getImgGalleryFromPixabay(imgName)
    if(imgUrls.lenght !== 0){
      imgUrl = getBestImg(imgName, imgUrls);
      insertDefaultImg({ 'name': imgName, 'url': imgUrl, 'source': 'web'});
    }
  }
  else{
    imgUrl = img.url;
  }
  return imgUrl;
}

const setImgSelection = async (imgName, imgs) => {
  const newImgSelectionDoc = {
    'name': imgName,
    'default' : {
      imgs
    }
  }
  insertSelectedImg(newImgSelectionDoc);
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
    //update default img
  }else{
    console.log(selectedImgs)
    let newImgSelection = selectedImgs.selection;
    newImgSelection[imgUrl] = (newImgSelection[imgUrl]+1) || 1 ;
    updateSelectedImg(imgName, newImgSelection);
  }
}

const getImgGallery = async (imgName) => {
  let selectedImgs = await getSelectedImgByName(imgName);
  if( selectedImgs === null ){
    const imgUrls = pixabayImgController.getImgGalleryFromPixabay(imgName);
    if(imgUrls.lenght !== 0) {
      const MIN_N_URLS = 9;
      const bestImgUrls = getBestImgs(imgName, imgUrls);
      if(bestImgUrls.lenght < 9){
        //ask for next page from pixabay
      }

      const newImgSelectionDoc = {
        'name': imgName,
        'selection' : {
          bestImgUrls
        }
      }
      insertSelectedImg(newImgSelectionDoc);

      selectedImgs = bestImgUrls;
    }
  }

  return selectedImgs;
}

const getDefaultImgs = () => {
  return getAllDefaultImgsFromDB();
}

const getSelectedImgs = () => {
  return getAllSelectedImgs();
}

module.exports = {getImg, getImgGallery, getDefaultImgs, setSelectedImg , getSelectedImgs};