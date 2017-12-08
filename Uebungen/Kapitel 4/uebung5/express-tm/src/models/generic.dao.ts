import { Db } from 'mongodb';
import { v4 } from 'uuid';

export class GenericDAO<T extends Entity> {
    private db: Db;
    private collectionName: string;
    
    constructor(db: Db, collectionName: string) {
        this.db = db;
        this.collectionName = collectionName;
    }

    create(entity: Entity, cb: any) {
        entity.id = v4();
        entity.createdAt = new Date().getTime();
        this.db.collection(this.collectionName).insertOne(entity, (err, result) => {
          cb(err, entity);
        });
    }

    findAll(cb: any) {
        this.db.collection(this.collectionName)
          .find().sort({ createdAt: -1 })
          .toArray((err, entityList) => {
              cb(err, entityList);
          });
    }

    update(entity: Entity, updateObject: any, cb: any) {
        let id: string = entity.id;
        this.db.collection(this.collectionName).updateOne( { id }, { $set: updateObject },
            (err, result) => {
                cb(err, entity);
            });
    }

    delete(id: string, cb: any) {
        this.db.collection(this.collectionName).deleteOne({ id }, (err, result) => {
            let deleted: boolean = false;
            if (result.deletedCount && result.deletedCount > 0) {
                deleted = true;
            }
            cb(err, deleted);
        });
    }    
}

export interface Entity {
    id: string;
    createdAt: number;
}

export interface DAOCallback<T> {

}