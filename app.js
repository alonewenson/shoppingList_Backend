const express = require('express')
const imgController = require('./controllers/imgController');
const app = express()
const port = 3000



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getImg/:imgName', async (req, res) => {
  const result = await imgController.getImg(req.params.imgName);

  //TODO move all set header to 1 place
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  res.send(result);
})


app.get('/getImgsGallery/:imgName', async (req, res) => {
  const result = await imgController.getImgGallery(req.params.imgName);

  //TODO move all set header to 1 place
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  res.send(result);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})