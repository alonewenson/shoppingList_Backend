const express = require('express')
const imgRoutes = require('./routes/imgRoutes');
const { init } = require('./db/imgsDB')
const app = express()
const port = 3000


init().then(() => {

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
  
  app.use('/getImg' , imgRoutes);
  
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})
.catch( err => console.log(err))