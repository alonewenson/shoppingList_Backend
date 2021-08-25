const { MongoClient } = require('mongodb')

//this param should not be here since it includes username and password, in a real world app this would be hidden in some config file
const connectionString = 'mongodb+srv://alonewenson:xnfGF8mDz6BbTNr@cluster0.kfulp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const dbName = 'images'
const defaultImgsCollectionName = 'defualt_imgs'
const selectedImgsCollectionName = 'selected_imgs'
const shoppingListCollectionName = 'shopping_lists'

let db

const init = () =>
  MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true  }).then( async (client) => {
    console.log('mongodb connected')
   
    db = client.db(dbName)
  })


//defualt images
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

const getAllDefaultImgsFromDB = () => {
  const collection = db.collection(defaultImgsCollectionName)
  return collection.find().toArray()  
}


//non default images
const insertSelectedImg = async (img) => {
  const collection = db.collection(selectedImgsCollectionName)
     
  const result = await collection.createIndexes({ name: 1 }, { unique: true });
  console.log(`unique index created: ${result}`);

  return collection.insertOne(img)
}

const updateSelectedImg = async (imgName , selection) => {
  const collection = db.collection(selectedImgsCollectionName)
  return collection.updateOne({ 'name': imgName } , {$set: {'selection' :selection}})
}

const getSelectedImgByName = (imgName) => {
  const collection = db.collection(selectedImgsCollectionName)
  return collection.findOne({ 'name': imgName })
}

const getAllSelectedImgs = () => {
  const collection = db.collection(selectedImgsCollectionName)
  return collection.find().toArray()  
}


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
  getAllDefaultImgsFromDB,
  insertSelectedImg,
  getSelectedImgByName,
  updateSelectedImg,
  getAllSelectedImgs,
  upserShoppingtList,
  getShoppingtList
}