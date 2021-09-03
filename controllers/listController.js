const DB = require('../db/imgsDB')


const getList = async (listId, shoppingList) => {
  //TODO user id will be added after adding login code

  DB.getShoppingtList(listId, shoppingList)
}


//shopping list id is <USER_ID>_<LIST_ID>
const setShoppingList = async (listId, shoppingList) => {
  //TODO user id will be added after adding login code

  DB.upserShoppingtList(listId, shoppingList)
}