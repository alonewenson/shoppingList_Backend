const { MongoClient } = require('mongodb')

//this param should not be here since it includes username and password, in a real world app this would be hidden in some config file
const connectionString = 'mongodb+srv://alonewenson:xnfGF8mDz6BbTNr@cluster0.kfulp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const dbName = 'images'
const defaultImgsCollectionName = 'defualt_imgs'
const ImgsGaleriesCollectionName = 'img_galeries'
const shoppingListCollectionName = 'shopping_lists'

let db

const init = () =>
  MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true  }).then( async (client) => {
    console.log('mongodb connected')
   
    db = client.db(dbName)

    //TODO when is the correct time to create index?
    const defaultImgsCollection = db.collection(defaultImgsCollectionName)
    const resultA = await defaultImgsCollection.createIndexes({ name: 1 }, { unique: true });
    console.log(`${defaultImgsCollectionName} unique index created: ${resultA}`);

    const ImgsGaleriesCollection = db.collection(ImgsGaleriesCollectionName)
    const resultB = await ImgsGaleriesCollection.createIndexes({ name: 1 }, { unique: true });
    console.log(`${ImgsGaleriesCollectionName} unique index created: ${resultB}`);
  })


//---------------- default img

const setDefaultImg = async ( imgName, imgUrl ) => {
  const collection = db.collection(defaultImgsCollectionName)
  return collection.insertOne({ name: imgName, url: imgUrl})
}

const getDefaultImg = (imgName) => {
  const collection = db.collection(defaultImgsCollectionName)
  return collection.findOne({ 'name': imgName })
}

//---------------- img gallery

const setImgGallery = async ( imgName, imgGallery ) => {
  const collection = db.collection(ImgsGaleriesCollectionName)
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
  
  setDefaultImg, 
  getDefaultImg,
  
  setImgGallery,
  getImgGallery,

  upserShoppingtList,
  getShoppingtList
}