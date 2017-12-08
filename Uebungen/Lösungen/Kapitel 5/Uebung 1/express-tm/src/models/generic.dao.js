"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4 = require("uuid/v4");
var GenericDAO = /** @class */ (function () {
    function GenericDAO(db, collection) {
        this.db = db;
        this.collection = collection;
    }
    GenericDAO.prototype.create = function (entity, cb) {
        entity.id = uuidv4();
        entity.createdAt = new Date().getTime();
        this.db.collection(this.collection).insertOne(entity, function (err, result) {
            cb(err, entity);
        });
    };
    GenericDAO.prototype.findOne = function (entityFilter, cb) {
        this.db.collection(this.collection).findOne(entityFilter, function (err, result) {
            cb(err, result);
        });
    };
    GenericDAO.prototype.findAll = function (cb) {
        this.db.collection(this.collection)
            .find().sort({ createdAt: -1 })
            .toArray(function (err, entitys) {
            cb(err, entitys);
        });
    };
    GenericDAO.prototype.update = function (entity, cb) {
        this.db.collection(this.collection).updateOne({ id: entity.id }, { $set: entity }, function (err, result) {
            cb(err, entity);
        });
    };
    GenericDAO.prototype.delete = function (id, cb) {
        this.db.collection(this.collection).deleteOne({ id: id }, function (err, result) {
            cb(err, !!result.deletedCount);
        });
    };
    return GenericDAO;
}());
exports.GenericDAO = GenericDAO;
