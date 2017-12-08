"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class GenericDAO {
    constructor(db, collectionName) {
        this.db = db;
        this.collectionName = collectionName;
    }
    create(entity, cb) {
        entity.id = uuid_1.v4();
        entity.createdAt = new Date().getTime();
        this.db.collection(this.collectionName).insertOne(entity, (err, result) => {
            cb(err, entity);
        });
    }
    findAll(cb) {
        this.db.collection(this.collectionName)
            .find().sort({ createdAt: -1 })
            .toArray((err, entityList) => {
            cb(err, entityList);
        });
    }
    update(entity, updateObject, cb) {
        let id = entity.id;
        this.db.collection(this.collectionName).updateOne({ id }, { $set: updateObject }, (err, result) => {
            cb(err, entity);
        });
    }
    delete(id, cb) {
        this.db.collection(this.collectionName).deleteOne({ id }, (err, result) => {
            let deleted = false;
            if (result.deletedCount && result.deletedCount > 0) {
                deleted = true;
            }
            cb(err, deleted);
        });
    }
}
exports.GenericDAO = GenericDAO;
