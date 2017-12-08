import { Db } from 'mongodb';
import * as uuidv4 from 'uuid/v4';

interface Entity {
  id: string
  createdAt: number
}

export interface DAOCallback<T> {
  (error: Error, result: T): void;
}

export class GenericDAO<T extends Entity> {
  constructor(private db: Db, private collection: string) { }

  create(entity: T, cb: DAOCallback<T>) {
    entity.id = uuidv4();
    entity.createdAt = new Date().getTime();
    this.db.collection(this.collection).insertOne(
      entity,
      (err, result) => {
        cb(err, entity)
      });
  }

  findAll(cb: DAOCallback<Array<T>>) {
    this.db.collection(this.collection)
      .find().sort({ createdAt: -1 })
      .toArray((err, entitys) => {
        cb(err, entitys);
      });
  }

  update(entity: Partial<T>, cb: DAOCallback<Partial<T>>) {
    this.db.collection(this.collection).updateOne(
      { id: entity.id }, { $set: entity },
      (err, result) => {
        cb(err, entity)
      });
  }

  delete(id: string, cb: DAOCallback<boolean>) {
    this.db.collection(this.collection).deleteOne(
      { id },
      (err, result) => {
        cb(err, !!result.deletedCount);
      });
  }

}