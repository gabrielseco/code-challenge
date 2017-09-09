import axios from 'axios';

const URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:4000/graphql' : 'https://code-challenge-billin.herokuapp.com/graphql';

export default function(query) {
  return new Promise((resolve, reject) => {
    axios.post(URL, { query })
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}
