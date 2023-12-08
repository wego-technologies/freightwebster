/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "b4vj3rzadxp8oqg",
    "created": "2023-12-08 05:35:50.279Z",
    "updated": "2023-12-08 05:35:50.279Z",
    "name": "terms",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
        "system": false,
        "id": "dxt47uew",
        "name": "defenition",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("b4vj3rzadxp8oqg");

  return dao.deleteCollection(collection);
})
