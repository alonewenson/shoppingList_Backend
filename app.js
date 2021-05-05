const express = require('express')
const imgController = require('./controllers/imgController');
const app = express()
const port = 3000

app.use(function(req, res, next) {
  //TODO not sure we need al these headears
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getImg/:imgName', async (req, res) => {
  const result = await imgController.getImg(req.params.imgName);
  res.send(result);
})

app.get('/getImgsGallery/:imgName', async (req, res) => {
  const result = await imgController.getImgGallery(req.params.imgName);
  res.send(result);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})