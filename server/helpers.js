import { Types } from 'mongoose';

// Done this function to return the result as an Iterable

export async function findById(db, className, value) {
  const result = await db[className].findOne({ _id: new Types.ObjectId(value) });
  return [result];
}

export async function remove(db, className, value) {
  const result = await db[className].findOneAndRemove({ _id: new Types.ObjectId(value) });
  return result;
}

export async function save(db, className, doc) {
  const result = await db[className].create(doc);
  return result;
}
