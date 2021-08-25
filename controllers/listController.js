const { upserShoppingtList ,getShoppingtList } = require('../db/imgsDB')


const getList = async (listId, shoppingList) => {
  //TODO user id will be added after adding login code

  getShoppingtList(listId, shoppingList)
}


//shopping list id is <USER_ID>_<LIST_ID>
const setShoppingList = async (listId, shoppingList) => {
  //TODO user id will be added after adding login code

  upserShoppingtList(listId, shoppingList)
}