const { MongoClient } = require('mongodb')

//this param should not be here since it includes username and password, in a real world app this would be hidden in some config file
const connectionString = 'mongodb+srv://alonewenson:xnfGF8mDz6BbTNr@cluster0.kfulp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const dbName = 'images'
const defaultImgsCollectionName = 'defualt_imgs'
const ImgsGaleriesCollectionName = 'imgs_galeries'
const shoppingListCollectionName = 'shopping_lists'

let db

const init = () =>
  MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true  }).then( async (client) => {
    console.log('mongodb connected')
   
    db = client.db(dbName)
  })


//---------------- default img

const insertDefaultImg = async (img) => {
  const collection = db.collection(defaultImgsCollectionName)
     
  const result = await collection.createIndexes({ name: 1 }, { unique: true });
  console.log(`unique index created: ${result}`);

  return collection.insertOne(img)
}

const getDefaultImgByName = (imgName) => {
  const collection = db.collection(defaultImgsCollectionName)
  return collection.findOne({ 'name': imgName })
}

//---------------- img gallery

const setImgGallery = async ( imgName,imgGallery) => {
  setTimeout(() => {console.log('setting gallery'), 1000});
  const collection = db.collection(ImgsGaleriesCollectionName)
     
  // const result = await collection.createIndexes({ name: 1 }, { unique: true });
  // console.log(`unique index created: ${result}`);

  return collection.insertOne({ name: imgName, gallery: imgGallery});
}

const getImgGallery = (imgName) => {
  const collection = db.collection(ImgsGaleriesCollectionName)
  return collection.findOne({ 'name': imgName })
}

//---------------- shopping list

const getShoppingtList = ( listId ) => {
  const collection = db.collection(shoppingListCollectionName)
  return collection.findOne({ '_id': listId })
}

const upserShoppingtList = ( listId, listJson, timesTamp ) => {
  const collection = db.collection(shoppingListCollectionName)
  return collection.updateOne({ '_id': listId },
    { $set: {'listId' :listId, 'list': listJson, 'last_edit': timesTamp},
      $setOnInsert: { 'created_at': timesTamp }}, 
    { upsert: true })
}


module.exports = { 
  init,
  
  insertDefaultImg, 
  getDefaultImgByName,
  
  setImgGallery,
  getImgGallery,

  upserShoppingtList,
  getShoppingtList
}