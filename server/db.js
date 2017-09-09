import _ from 'lodash';
import Faker from 'faker';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const db = mongoose.createConnection(process.env.MONGO_URL, {
  useMongoClient: true,
});

const Article = db.model('Article', {
  author: String,
  content: String,
  excerpt: String,
  published: Boolean,
  tags: [String],
  title: String,
});

Article.remove({}, (err) => {
  if (!err) {
    _.times(10, () => {
      const content = `
${Faker.lorem.paragraphs()}
${Faker.lorem.paragraphs()}
${Faker.lorem.paragraphs()}
${Faker.lorem.paragraphs()}
${Faker.lorem.paragraphs()}
`;
      return Article.create({
        author: Faker.name.findName(),
        content,
        excerpt: content.slice(0, 350),
        published: Faker.random.boolean(),
        tags: [Faker.random.words(), Faker.random.words()],
        title: Faker.name.title(),
      });
    });
  }
});

export default { Article };
