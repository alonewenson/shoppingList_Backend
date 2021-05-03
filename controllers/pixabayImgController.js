
const axios = require('axios');

const PIXABAY_URL = 'https://pixabay.com/api/?key=13069670-c291adf8946c43c1ea7802448&image_type=vector&category=food&q=';
const PIXABAY_QUESTION_MARK_IMG = 'https://cdn.pixabay.com/photo/2017/02/13/01/26/the-question-mark-2061539_960_720.png';


const getImgGallery = async (imgName) =>{
  const url = PIXABAY_URL + imgName;
  const pixabayRes = await axios.get(url);
  let result = []

  if(pixabayRes.data &&
    pixabayRes.data.hits)
  {
    result = pixabayRes.data.hits.map( hit => hit.previewURL);
  }

  return result;
}

const getImg = async (imgName) =>{
  const pixabayRes = await getImgsGalleryFromPixabay(imgName);
  let result = PIXABAY_QUESTION_MARK_IMG;

  if(pixabayRes.length > 0 &&
    pixabayRes[0])
  {
    result = pixabayRes[0];
  }

  return result;
}

module.exports = {getImg, getImgGallery};