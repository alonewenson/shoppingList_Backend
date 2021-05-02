const express = require('express')
const axios = require('axios');
const app = express()
const port = 3000


const PIXABAY_URL = 'https://pixabay.com/api/?key=13069670-c291adf8946c43c1ea7802448&image_type=vector&category=food';
const PIXABAY_QUESTION_MARK = 'https://cdn.pixabay.com/photo/2017/02/13/01/26/the-question-mark-2061539_960_720.png';


const getImagesFromPixabay = async (imgName) =>{
  const url = PIXABAY_URL + '&q=' + imgName;
  const pixabayRes = await axios.get(url);
  let result = []

  if(pixabayRes.data &&
    pixabayRes.data.hits)
  {
    result = pixabayRes.data.hits.map( hit => hit.previewURL);
  }

  return result;
}

const getImageFromPixabay = async (imgName) =>{
  const pixabayRes = await getImagesFromPixabay(imgName);
  let result = PIXABAY_QUESTION_MARK;

  if(pixabayRes.length > 0 &&
    pixabayRes[0])
  {
    result = pixabayRes[0];
  }

  return result;
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getImg/:imgName', async (req, res) => {
  const result = await getImageFromPixabay(req.params.imgName);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  res.send(result);
})


app.get('/getImgsGallery/:imgName', async (req, res) => {
  const result = await getImagesFromPixabay(req.params.imgName);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  res.send(result);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})