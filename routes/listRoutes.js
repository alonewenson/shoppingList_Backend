const express = require('express')
const listController = require('../controllers/listController');
const router = express.Router()

router.get('/getList/:listId', async (req, res) => {
  const result = await listController.getList(req.params.listId);
  res.send(result);
})

router.post('/setList/:listId', async (req, res) => {
  const result = listController.setList(req.params.listId, req.body.shoppingList);
  res.send(result);
})

module.exports = router