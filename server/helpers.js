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

export async function update(db, className, doc) {
  const { id } = doc;
  const result = await db[className].findOneAndUpdate({ _id: new Types.ObjectId(id) }, doc, { upsert: true });
  const key = '_doc';
  return Object.assign({}, result[key], doc);
}
