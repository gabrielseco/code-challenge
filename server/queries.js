import { Types } from 'mongoose';

// Done this function to return the result as an Iterable

export default async function findById(db, className, value) {
  const result = await db[className].findOne({ _id: new Types.ObjectId(value) });
  return [result];
}
