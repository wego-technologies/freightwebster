/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4vj3rzadxp8oqg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h1lsfn4f",
    "name": "word",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4vj3rzadxp8oqg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h1lsfn4f",
    "name": "term",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
